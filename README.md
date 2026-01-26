# TravelTrucks

## Description

TravelTrucks is a modern frontend web application for a camper rental service, built with Next.js and TypeScript.  
It allows users to explore available campers, apply filters, view detailed information, and book campers online.

## Features

- Camper catalog with backend filtering
- Infinite scroll pagination (Load More)
- Camper details page with gallery and reviews
- Favorites functionality
- Booking form with notification
- Responsive UI based on Figma design
- Loader during data fetching
- Clean and intuitive UI

## Pages

- `/` — Home page with CTA banner
- `/catalog` — Camper catalog with filters and pagination
- `/catalog/[camperId]` — Camper details page with full info, reviews, and booking form

## Tech stack

- ![Next.js](https://img.shields.io/badge/Next.js-13-black) (App Router)
- ![TypeScript](https://img.shields.io/badge/TypeScript-blue)
- TanStack Query (useInfiniteQuery)
- Zustand (state management)
- Axios (API requests)
- CSS Modules (styling)

  ![Status](https://img.shields.io/badge/status-active-success)

## Installation & Run

```bash
git clone https://github.com/Alina29051981/traveltrucks-campers.git
cd traveltrucks-campers
npm install
npm run dev
```

## Demo

- Live site: https://traveltrucks-campers-xi.vercel.app/
- Repository: https://github.com/Alina29051981/traveltrucks-campers

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

### Camper Details

- Image gallery (Swiper)
- Reviews with 5-star rating
- Booking form with success notification

### Loader

Loader is displayed during data fetching.

## Deployment

The project is deployed on Vercel.

## Author

Alina Kuchma

Junior Front-end Developer
