import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getCoordinates = async (url) => {
  const browser = await chromium.launch({
    slowMo: 50
  });

  // Create a context with request interception
  const context = await browser.newContext();
  const page = await context.newPage();

  // Block unnecessary requests
  await page.route('**/*', async (route) => {
    const request = route.request();
    const resourceType = request.resourceType();
    const url = request.url();

    // Allow only essential resources
    if (
      resourceType === 'document' ||
      resourceType === 'script' ||
      resourceType === 'xhr' ||
      resourceType === 'fetch' ||
      url.includes('camp.tabinchuya.com')
    ) {
      await route.continue();
    } else {
      await route.abort();
    }
  });

  try {
    console.log(`Navigating to ${url}`);

    // Set a longer timeout and wait for network idle
    await page.goto(url, {
      waitUntil: 'domcontentloaded', // Changed from networkidle to domcontentloaded
      timeout: 60000
    }).catch(error => {
      console.error('Navigation error:', error);
      throw error;
    });

    console.log("Page loaded, waiting for coordinates span");

    // Wait for the span to be visible with a longer timeout
    await page.waitForSelector('#coordinates', {
      timeout: 30000,
      state: 'visible'
    }).catch(error => {
      console.error('Selector wait error:', error);
      throw error;
    });

    console.log("Coordinates span found");

    // Take a screenshot for debugging
    await page.screenshot({ path: `debug-screenshot-${url}.png` });
    console.log("Screenshot taken");

    // Get coordinates
    const coordinates = await page.evaluate(() => {
      const coordinateSpan = document.querySelector('#coordinates');
      if (coordinateSpan) {
        const [lat, lng] = coordinateSpan.textContent.trim().split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) {
          return {
            lat,
            lng
          };
        }
      }
      return null;
    });

    console.log("Coordinates retrieved:", coordinates);
    return coordinates;
  } catch (error) {
    console.error(`Error getting coordinates for ${url}:`, error.message);
    // Take a screenshot on error
    await page.screenshot({ path: 'error-screenshot.png' });
    return null;
  } finally {
    await browser.close();
  }
};

getCoordinates("https://camp.tabinchuya.com/nagano/shiminnomori.html");


async function scrapeCampingSites() {
  const baseUrl = 'https://camp.tabinchuya.com/nagano/';
  console.log('Fetching data from:', baseUrl);
  const response = await axios.get(baseUrl);
  const $ = cheerio.load(response.data);
  const sites = [];
  let id = 1;

  // Find all camping site entries using the campsite_list class
  $('.campsite_list').each((_, element) => {
    const titleElement = $(element).find('.name a');
    const title = titleElement.text().trim();
    const detailUrl = titleElement.attr('href');

    // Get location and other details from the list items
    const listItems = $(element).find('.td1_list ul li');
    let location = '';
    let price = 0;
    let elevation = '';

    listItems.each((_, item) => {
      const text = $(item).text().trim();
      if (text.includes('所在地：')) {
        const locationParts = text.split('・');
        location = locationParts[0].replace('所在地：', '').trim();
        elevation = locationParts[1]?.trim() || '';
      }
      if (text.includes('利用料：')) {
        const priceText = text.replace('利用料：', '').trim();
        price = priceText.includes('無料') ? 0 : parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
      }
    });

    // Get image URL
    const imageElement = $(element).find('.td2_list img');
    const imageUrl = imageElement.attr('src');
    const fullImageUrl = imageUrl ? new URL(imageUrl, baseUrl).href : `https://picsum.photos/400/400?random=${id}`;

    if (title && location && !title.includes('未訪問')) {
      sites.push({
        id,
        title: title.replace('キャンプ場', '').trim(),
        imageUrl: fullImageUrl,
        price,
        rating: 4.5, // Default rating since the site doesn't provide ratings
        location,
        elevation,
        detailUrl: detailUrl ? new URL(detailUrl, baseUrl).href : null
      });
      id++;
    }
  });

  console.log(`Found ${sites.length} camping sites`);

  // Get coordinates for each site using Playwright
  for (const site of sites) {
    if (site.detailUrl) {
      console.log(`Getting coordinates for ${site.title}...`);
      const coordinates = await getCoordinates(site.detailUrl);
      if (coordinates) {
        site.coordinates = coordinates;
        console.log(`Successfully got coordinates for ${site.title}:`, coordinates);
      } else {
        console.log(`Failed to get coordinates for ${site.title}`);
      }
    }
  }

  return sites;
}

async function main() {
  try {
    const sites = await scrapeCampingSites();
    const outputPath = join(__dirname, 'data', 'listings.ts');

    const fileContent = `export interface Listing {
    id: number;
    title: string;
    imageUrl: string;
    price: number;
    rating: number;
    location: string;
    elevation?: string;
    detailUrl?: string;
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export const listings: Listing[] = ${JSON.stringify(sites, null, 2)};`;

    writeFileSync(outputPath, fileContent);
    console.log('Successfully scraped and saved camping sites!');
    console.log('Found', sites.length, 'camping sites');

    if (sites.length > 0) {
      console.log('\nExample of first camping site:');
      console.log(JSON.stringify(sites[0], null, 2));
    }
  } catch (error) {
    console.error('Error scraping camping sites:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }
}

main();
