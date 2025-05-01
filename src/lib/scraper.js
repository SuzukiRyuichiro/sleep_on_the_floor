import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
