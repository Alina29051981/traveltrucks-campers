import { api } from "./api";
import { Camper, CamperFilters } from "@/types/camper";

export async function fetchCampers(
  filters: CamperFilters,
  page = 1,
  limit = 4
): Promise<Camper[]> {
  const params: any = {
    page,
    limit,
  };

  if (filters.location) params.location = filters.location;
  if (filters.vehicleType) params.vehicleType = filters.vehicleType;
  if (filters.AC) params.AC = true;
    if (filters.bathroom) params.bathroom = true;
  if (filters.kitchen) params.kitchen = true;
  if (filters.TV) params.TV = true;

  const { data } = await api.get("/campers", { params });

  return data.items ?? data;
}
