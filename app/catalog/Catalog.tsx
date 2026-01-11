"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./CatalogPage.module.css";
import CamperCard from "@/components/CamperCard/CamperCard";
import Filters from "@/components/Filters/Filters";
import { CamperFilters } from "@/types/camper";
import { fetchCampers } from "@/services/campersApi";

const LIMIT = 4;

const initialFilters: CamperFilters = {
  location: "",
  form: undefined,
  AC: false,
  bathroom: false,
  kitchen: false,
  TV: false,
};

export default function CatalogPage() {
  const [campers, setCampers] = useState<any[]>([]);
  const [filters, setFilters] = useState<CamperFilters>(initialFilters);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cardsRef = useRef<HTMLDivElement>(null); 

  const loadCampers = async (
    filtersToUse: CamperFilters,
    pageToLoad: number,
    append = false
  ) => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchCampers(filtersToUse, pageToLoad, LIMIT);
      setCampers((prev) => (append ? [...prev, ...data] : data));
      setHasMore(data.length === LIMIT);

      
      if (append && cardsRef.current) {
        setTimeout(() => {
          cardsRef.current?.lastElementChild?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
    } catch (e: any) {
      console.error(e);
      setError("Не вдалося завантажити кемпери");
      if (!append) setCampers([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampers(filters, 1, false);
  }, []);

  const handleSearch = (newFilters: CamperFilters) => {
    setFilters(newFilters);
    setPage(1);
    loadCampers(newFilters, 1, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadCampers(filters, nextPage, true);
  };

  return (
    <main className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.filtersWrapper}>
          <Filters filters={filters} onChange={setFilters} onSearch={handleSearch} />
        </div>

        <div className={styles.cards} ref={cardsRef}>
          {loading && <p>Loading campers...</p>}
          {error && <p className={styles.error}>{error}</p>}

          {!loading && campers.length > 0 &&
            campers.map((camper) => <CamperCard key={camper.id} camper={camper} />)
          }

          {!loading && campers.length === 0 && !error && <p>Nothing found.</p>}

          {!loading && hasMore && campers.length > 0 && (
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
