# TravelTrucks

## Description

TravelTrucks is a frontend web application for a camper rental service.  
Users can browse available campers, filter them based on preferences, view detailed information, and make bookings.

## Features

- Camper catalog with backend filtering
- Infinite scroll pagination (Load More)
- Camper details page with gallery and reviews
- Favorites functionality
- Booking form with notification
- Responsive UI based on Figma design

## Pages

- `/` — Home page with CTA banner
- `/catalog` — Camper catalog with filters and pagination
- `/catalog/[camperId]` — Camper details page with full info, reviews, and booking form

## Tech stack

- Next.js (App Router)
- TypeScript
- TanStack Query (useInfiniteQuery)
- Zustand (state management)
- Axios (API requests)
- CSS Modules (styling)

## Installation & Run

```bash
git clone https://github.com/your-username/traveltrucks-campers.git
cd traveltrucks-campers
npm install
npm run dev
```

## Demo

```
Live site: https://traveltrucks-campers-xi.vercel.app/
Repository: https://github.com/Alina29051981/traveltrucks-campers
```

## Functionality Details

### Filters

Users can filter campers by:

- Location
- Body type
- Engine type
- Transmission

### Pagination

- Implemented using useInfiniteQuery
- Loads 4 campers per request
- Supports active filters

## Author

Alina Kuchma
