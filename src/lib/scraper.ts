import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface CampingSite {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  rating: number;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

async function scrapeCampingSites(): Promise<CampingSite[]> {
  const baseUrl = 'https://camp.tabinchuya.com/nagano/';
  const response = await axios.get(baseUrl);
  const $ = cheerio.load(response.data);
  const sites: CampingSite[] = [];
  let id = 1;

  // Find all camping site cards
  $('.camp-site-card').each((_: number, element: cheerio.Element) => {
    const title = $(element).find('.site-title').text().trim();
    const location = $(element).find('.site-location').text().trim();
    const priceText = $(element).find('.site-price').text().trim();
    const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
    const ratingText = $(element).find('.site-rating').text().trim();
    const rating = parseFloat(ratingText) || 4.5; // Default rating if not found
    const imageUrl = $(element).find('.site-image').attr('src') || 'https://picsum.photos/400/400?random=' + id;

    // Get coordinates from the detail page
    const detailUrl = $(element).find('a').attr('href');
    if (detailUrl) {
      // TODO: Scrape coordinates from detail page
      // This will require another axios request to the detail page
    }

    sites.push({
      id,
      title,
      imageUrl,
      price,
      rating,
      location
    });

    id++;
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
    coordinates?: {
        lat: number;
        lng: number;
    };
}

export const listings: Listing[] = ${JSON.stringify(sites, null, 4)};`;

    writeFileSync(outputPath, fileContent);
    console.log('Successfully scraped and saved camping sites!');
  } catch (error) {
    console.error('Error scraping camping sites:', error);
  }
}

main();
