"use client";

import React from "react";
import styles from "./Filters.module.css";
import { FiltersState, VehicleType } from "@/types/filters";

interface SpriteIconProps {
  id: string;
  className?: string;
  fill?: string;
  stroke?: string;
}

// Компонент для SVG-спрайту
function SpriteIcon({ id, className, fill, stroke }: SpriteIconProps) {
  return (
    <svg className={className} fill={fill || "currentColor"} stroke={stroke || "currentColor"}>
      <use xlinkHref={`/sprite/sprite.svg#${id}`} />
    </svg>
  );
}

interface FiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onSearch: (filters: FiltersState) => void;
}

export default function Filters({ filters, onChange, onSearch }: FiltersProps) {
  // Локація
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, location: e.target.value });
  };

  // Тогл булевих фільтрів
  const toggleFilter = (key: keyof Omit<FiltersState, "location" | "vehicleType">) => {
    onChange({ ...filters, [key]: !filters[key] });
  };

  // Вибір типу транспортного засобу
  const setVehicleType = (type: VehicleType) => {
    onChange({ ...filters, vehicleType: type });
  };

  // Відповідність іконок для обладнання
  const equipmentIcons: Record<keyof Omit<FiltersState, "location" | "vehicleType">, string> = {
    AC: "icon-wind-1",
    bathroom: "icon-ph_shower",
    kitchen: "icon-cup-hot-1",
    TV: "icon-tv-1",
  };

  const equipmentKeys: (keyof Omit<FiltersState, "location" | "vehicleType">)[] = [
    "AC",
    "bathroom",
    "kitchen",
    "TV",
  ];

  return (
    <aside className={styles.filters}>
      {/* Location */}
      <div className={styles.block}>
        <p className={styles.label}>Location</p>
        <div className={styles.inputWrapper}>
          <svg className={styles.locationIcon}>
            <use xlinkHref="/sprite/sprite.svg#icon-Map-1" />
          </svg>
          <input
            type="text"
            placeholder="City"
            value={filters.location}
            onChange={handleLocationChange}
            className={styles.input}
          />
        </div>
      </div>

      {/* Vehicle Equipment */}
      <div className={styles.block}>
        <p className={styles.label}>Vehicle equipment</p>
        <div className={styles.equipment}>
          {equipmentKeys.map((key) => (
            <button
              key={key}
              type="button"
              className={`${styles.equipmentItem} ${filters[key] ? styles.active : ""}`}
              onClick={() => toggleFilter(key)}
            >
              <SpriteIcon
                id={equipmentIcons[key]}
                className={styles.icon}
                stroke={filters[key] ? "#0A74DA" : "#666"}
              />
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Vehicle Type */}
      <div className={styles.block}>
        <p className={styles.label}>Vehicle type</p>
        <div className={styles.types}>
          {[
            { label: "Panel truck", value: "panelTruck", icon: "icon-bi_grid-1x2-1" },
            { label: "Fully Integrated", value: "fullyIntegrated", icon: "icon-bi_grid-1" },
            { label: "Alcove", value: "alcove", icon: "icon-bi_grid-3x3-gap-2" },
          ].map((type) => (
            <button
              key={type.value}
              type="button"
              className={`${styles.typeItem} ${filters.vehicleType === type.value ? styles.active : ""}`}
              onClick={() => setVehicleType(type.value as VehicleType)}
            >
              <svg className={styles.icon}>
                <use xlinkHref={`/sprite/sprite.svg#${type.icon}`} />
              </svg>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button type="button" className={styles.searchBtn} onClick={() => onSearch(filters)}>
        Search
      </button>
    </aside>
  );
}
