import { api } from "./api";
import { Camper, CamperFilters } from "@/types/camper";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const campersCache = new Map<string, Camper[]>();

const ongoingRequests = new Map<string, Promise<Camper[]>>();

function buildParams(filters: CamperFilters, page: number, limit: number) {
  const params: Record<string, any> = { page, limit };

    if (filters.location?.trim()) {
    params.location = `Ukraine, ${filters.location.trim()}`;
  }

    if (filters.form) {
    params.form = filters.form;
  }

  if (filters.AC) params.AC = true;
  if (filters.kitchen) params.kitchen = true;
  if (filters.bathroom) params.bathroom = true;
  if (filters.TV) params.TV = true;
  if (filters.radio) params.radio = true;
  if (filters.refrigerator) params.refrigerator = true;
  if (filters.microwave) params.microwave = true;
  if (filters.gas) params.gas = true;
  if (filters.water) params.water = true;

  return params;
}

export async function fetchCampers(
  filters: CamperFilters,
  page = 1,
  limit = 4,
  retries = 3
): Promise<Camper[]> {

  const params = buildParams(filters, page, limit);
  const cacheKey = JSON.stringify(params);

    if (campersCache.has(cacheKey)) {
    return campersCache.get(cacheKey)!;
  }

   if (ongoingRequests.has(cacheKey)) {
    return ongoingRequests.get(cacheKey)!;
  }

    const requestPromise = (async (): Promise<Camper[]> => {
    try {
      await delay(600);

      const { data } = await api.get("/campers", { params });

      const campers: Camper[] = Array.isArray(data?.items) ? data.items : [];

      campersCache.set(cacheKey, campers);
      return campers;

    } catch (err: any) {

      if (err.response?.status === 429 && retries > 0) {
        await delay(1500);
        return fetchCampers(filters, page, limit, retries - 1);
      }

      console.error("fetchCampers error:", err);
      return [];

    } finally {
      ongoingRequests.delete(cacheKey);
    }
  })();

  ongoingRequests.set(cacheKey, requestPromise);
  return requestPromise;
}

export function clearCampersCache() {
  campersCache.clear();
}
