import PocketBase from 'pocketbase';
import { listings } from '../lib/data/listings';
import 'dotenv/config';

const pb = new PocketBase('http://127.0.0.1:8090');

// Helper function to extract slug from detailUrl
const extractSlug = (detailUrl: string): string => {
  try {
    // Extract the last part of the URL before .html
    const match = detailUrl.match(/\/([^/]+)\.html$/);
    if (!match) {
      throw new Error('Invalid URL format');
    }
    const slug = match[1];
    // Ensure the slug is URL-safe
    return slug.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
  } catch (error) {
    console.error('Error extracting slug:', error);
    return '';
  }
};

async function importListings() {
  try {
    // Set the admin token
    const token = process.env.POCKETBASE_ADMIN_TOKEN;
    if (!token) {
      throw new Error('Please set POCKETBASE_ADMIN_TOKEN in your .env file');
    }
    pb.authStore.save(token, null);

    for (const listing of listings) {
      if (!listing.detailUrl || !listing.coordinates) {
        console.log(`Skipping ${listing.title} - missing detailUrl or coordinates`);
        continue;
      }

      const slug = extractSlug(listing.detailUrl);
      if (!slug) {
        console.log(`Skipping ${listing.title} - could not extract valid slug`);
        continue;
      }

      try {
        const record = {
          name: listing.title,
          slug: slug,
          location: listing.location,
          geolocation: {
            lon: listing.coordinates.lng,
            lat: listing.coordinates.lat
          }
        };

        await pb.collection('locations').create(record);
        console.log(`Created record for ${listing.title} with slug: ${slug}`);
      } catch (error) {
        console.error(`Failed to create record for ${listing.title}:`, error);
      }
    }

    console.log('Successfully imported all listings');
  } catch (error) {
    console.error('Error importing listings:', error);
  }
}

importListings();
