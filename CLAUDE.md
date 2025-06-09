# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This app is to help people find good place to sleep at (for free). It is an user aggregated website where people who likes to travel and stealth camp can share information about their experience on sleeping at a location.
It could help the users make an informed decision while they are on a long trail walk, a bike packing trip, etc.
It would also aggregate information about useful facilities nearby, such as convenience stores, water fountains, public bath, etc.

## Common Commands

```bash
# Development
yarn dev                    # Start development server
yarn dev -- --open        # Start dev server and open browser

# Build and Testing
yarn build                 # Build for production
yarn preview               # Preview production build
yarn check                 # Type checking
yarn check:watch           # Type checking in watch mode
yarn test                  # Run e2e tests (Playwright)
yarn test:e2e              # Run e2e tests (Playwright)

# Code Quality
yarn lint                  # Run linting (Prettier + ESLint)
yarn format               # Format code with Prettier

# Data Management
yarn scrape               # Scrape camping site data
yarn import-listings      # Import listings to PocketBase
```

## Architecture

### Tech Stack
- **Framework**: SvelteKit 2.x with TypeScript
- **Styling**: TailwindCSS 4.x with Skeleton UI components
- **Mapping**: Mapbox GL JS for interactive maps
- **Internationalization**: Paraglide.js with English/Japanese locales
- **Database**: PocketBase (optional, for dynamic data)
- **Deployment**: Netlify (configured with adapter)

### Core Components
- **Map View**: Interactive Mapbox map showing camping locations with tent emoji markers
- **Card Components**: Listing cards with images, ratings, and location details
- **Responsive Layout**: Desktop sidebar + map, mobile drawer overlay
- **Data Pipeline**: Web scraper → Static data → Optional PocketBase import

### Key Files
- `src/lib/data/listings.ts` - Static camping site data with coordinates
- `src/lib/scraper.ts` - Web scraper for tabinchuya.com camping data
- `src/scripts/import-listings.ts` - PocketBase data import script
- `src/routes/+page.svelte` - Main map and listing view
- `messages/` - i18n translations (en/jp)

### Environment Variables
- `PUBLIC_MAPBOX_API_KEY` - Required for map functionality
- `POCKETBASE_ADMIN_TOKEN` - Required for data import script

### Internationalization
Uses Paraglide.js with base locale 'en' and support for Japanese ('jp'). Translation files are in `messages/` directory.
- Always implement features in both languages. Never put untranslated text in the component and always modify the locale json.
