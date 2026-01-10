import type { Metadata } from "next";
import CatalogPage from "./Catalog";
import { fetchCampers } from "@/services/campersApi";
import { FiltersState } from "@/types/filters";

export const metadata: Metadata = {
  title: "Catalog | TravelTrucks",
  description: "Browse our camper catalog",
};

interface PageProps {
  searchParams?: FiltersState; // параметри з URL
}

export default async function Page({ searchParams }: PageProps) {
  // якщо searchParams немає, використовуємо дефолт
  const filters: FiltersState = searchParams || {
    location: "",
    vehicleType: "",
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
  };

  // первинний fetch на сервері (SSR)
  const initialCampers = await fetchCampers(filters, 1, 4); // пагінація: 1 сторінка, 4 елементи

  return (
    <CatalogPage
      initialCampers={initialCampers}
      initialFilters={filters}
    />
  );
}

