"use client";

import React from "react";
import styles from "./Filters.module.css";
import { CamperFilters } from "@/types/camper";

interface SpriteIconProps {
  id: string;
  className?: string;
  fill?: string;
  stroke?: string;
}

function SpriteIcon({ id, className, fill, stroke }: SpriteIconProps) {
  return (
    <svg
      className={className}
      fill={fill || "currentColor"}
      stroke={stroke || "currentColor"}
    >
      <use xlinkHref={`/sprite/sprite.svg#${id}`} />
    </svg>
  );
}

interface FiltersProps {
  filters: CamperFilters;
  onChange: (filters: CamperFilters) => void;
  onSearch: (filters: CamperFilters) => void;
}

export default function Filters({ filters, onChange, onSearch }: FiltersProps) {
  
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, location: e.target.value });
  };

  const toggleFilter = (key: keyof CamperFilters) => {
    onChange({ ...filters, [key]: !filters[key] });
  };

  const equipmentIcons: Record<
    "AC" | "Automatic" | "kitchen" | "TV" | "bathroom",
    string
  > = {
    AC: "icon-wind-1",
    Automatic: "icon-diagram-2",
    kitchen: "icon-cup-hot-1",
    TV: "icon-tv-1",
    bathroom: "icon-ph_shower",
  };

  const equipmentKeys: ("AC" | "Automatic" | "kitchen" | "TV" | "bathroom")[] = [
    "AC",
    "Automatic",
    "kitchen",
    "TV",
    "bathroom",
  ];

    const equipmentLabels: Record<string, string> = {
    AC: "AC",
    Automatic: "Automatic",
    kitchen: "Kitchen",
    TV: "TV",
    bathroom: "Bathroom",
  };

  const setVehicleType = (type: CamperFilters["form"]) => {
    onChange({ ...filters, form: type });
  };

  const vehicleTypes = [
    { label: "Van", value: "panelTruck", icon: "icon-bi_grid-1x2-1" },
    { label: "Fully Integrated", value: "fullyIntegrated", icon: "icon-bi_grid-1" },
    { label: "Alcove", value: "alcove", icon: "icon-bi_grid-3x3-gap-2" },
  ] as const;

  return (
    <aside className={styles.filters}>
      {/* Location */}
      <div className={styles.block}>
        <span className={styles.title}>Location</span>
        <div className={styles.inputWrapper}>
          <svg className={styles.locationIcon}>
            <use xlinkHref="/sprite/sprite.svg#icon-Map-1" />
          </svg>
          <input
            type="text"
            placeholder="City"
            value={filters.location || ""}
            onChange={handleLocationChange}
            className={styles.input}
          />
        </div>
      </div>

            <span className={styles.title}>Filters</span>
      <div className={styles.block}>
        <p className={styles.label}>Vehicle equipment</p>
        <div className={styles.line}></div>
        <div className={styles.equipment}>
          {equipmentKeys.map((key) => (
            <button
              key={key}
              type="button"
              className={`${styles.equipmentItem} ${
                filters[key] ? styles.active : ""
              }`}
              onClick={() => toggleFilter(key)}
            >
              <SpriteIcon
                id={equipmentIcons[key]}
                className={styles.icon}
                stroke={filters[key] ? "#0A74DA" : "#666"}
              />
              {equipmentLabels[key]}
            </button>
          ))}
        </div>
      </div>

            <div className={styles.block}>
        <p className={styles.label}>Vehicle type</p>
        <div className={styles.line}></div>
        <div className={styles.types}>
          {vehicleTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              className={`${styles.typeItem} ${
                filters.form === type.value ? styles.active : ""
              }`}
              onClick={() => setVehicleType(type.value)}
            >
              <svg className={styles.icon}>
                <use xlinkHref={`/sprite/sprite.svg#${type.icon}`} />
              </svg>
              {type.label}
            </button>
          ))}
        </div>
      </div>

           <button
        type="button"
        className={styles.searchBtn}
        onClick={() => onSearch(filters)}
      >
        Search
      </button>
    </aside>
  );
}
