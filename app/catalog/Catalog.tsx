"use client";

import { useState, useCallback } from "react";
import styles from "./CatalogPage.module.css";
import CamperCard from "@/components/CamperCard/CamperCard";
import Filters from "@/components/Filters/Filters";
import { Camper } from "@/types/camper";
import { FiltersState } from "@/types/filters";
import { fetchCampers } from "@/services/campersApi";

interface CatalogPageProps {
  initialCampers: Camper[];
  initialFilters: FiltersState;
}

export default function CatalogPage({ initialCampers, initialFilters }: CatalogPageProps) {
  const [campers, setCampers] = useState<Camper[]>(initialCampers);
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialCampers.length > 0);

  // Використовуємо useCallback, щоб не створювати нову функцію на кожен ререндер
  const loadCampers = useCallback(async (filtersToUse: FiltersState, pageToLoad = 1, append = false) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCampers(filtersToUse, pageToLoad, 4);
      if (append) setCampers(prev => [...prev, ...data]);
      else setCampers(data);

      setHasMore(data.length === 4); // якщо менше 4 — більше сторінок немає
    } catch {
      setError("Не вдалося завантажити кемпери");
      setCampers([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Запуск запиту лише при натисканні кнопки Search
  const handleSearch = () => {
    setPage(1);
    loadCampers(filters, 1, false);
  };

  // Load more — лише при натисканні
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCampers(filters, nextPage, true);
  };

  return (
    <main className={styles.container}>
      <h1>Каталог кемперів</h1>

      <Filters
        filters={filters}
        onChange={setFilters}   // зміни фільтру відображаються локально
        onSearch={handleSearch} // запит йде лише тут
      />

      {loading && <p>Завантаження кемперів...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && campers.length > 0 && (
        <div className={styles.cards}>
          {campers.map(camper => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
        </div>
      )}

      {!loading && campers.length === 0 && !error && <p>Кемпери не знайдені.</p>}

      {!loading && hasMore && campers.length > 0 && (
        <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </main>
  );
}
