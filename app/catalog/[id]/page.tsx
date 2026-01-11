"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCampersStore } from "@/store/campersStore";

import Gallery from "@/components/Gallery/Gallery";
import Features from "@/components/Features/Features";
import Reviews from "@/components/ReviewsList/ReviewsList";
import { BookingForm } from "@/components/BookingForm/BookingForm";

import styles from "./DetailsPage.module.css";

interface SpriteIconProps {
  id: string;
  className?: string;
  fill?: string;
}

function SpriteIcon({ id, className, fill }: SpriteIconProps) {
  return (
    <svg className={className} fill={fill || "currentColor"}>
      <use xlinkHref={`/sprite/sprite.svg#${id}`} />
    </svg>
  );
}

export default function DetailsPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState<"features" | "reviews">("features");

  const { selectedCamper, fetchCamperById, isLoading, error } =
  useCampersStore();

  useEffect(() => {
    if (params?.id) {
     fetchCamperById(String(params.id));

    }
  }, [params?.id, fetchCamperById]);

  if (isLoading) return <p className={styles.message}>Loading...</p>;
  if (error) return <p className={styles.message}>{error}</p>;
  if (!selectedCamper)
    return <p className={styles.message}>Camper not found</p>;

  const camper = selectedCamper;

  const averageRating =
    camper.reviews?.length > 0
      ? camper.reviews.reduce((sum, r) => sum + r.reviewer_rating, 0) /
        camper.reviews.length
      : 0;

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>{camper.name}</h1>

            <div className={styles.ratingLocation}>
    
        <div className={styles.rating}>
          <SpriteIcon
            id="icon-star"
            className={styles.starIcon}
                      />

          <span className={styles.ratingValue}>
            {averageRating.toFixed(1)}
          </span>

          <span className={styles.reviews}>
            ({camper.reviews?.length || 0} Reviews)
          </span>
        </div>

        <div className={styles.locationBlock}>
            <SpriteIcon id="icon-Map-1" className={styles.locationIcon} />
            <span className={styles.locationText}>{camper.location}</span>
          </div>
        </div>
   
      <p className={styles.price}>€{camper.price.toFixed(2)}</p>

     <Gallery 
  gallery={(camper.gallery ?? []).map(img =>
    typeof img === "string" ? { original: img } : { original: img.original, thumb: img.url }
  )}
/>

      <p className={styles.description}>{camper.description}</p>

      <div className={styles.detailsLayout}>
        <div className={styles.leftColumn}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "features" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "reviews" ? styles.activeTab : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "features" && (
    <div className={styles.featuresWrapper}><Features camper={camper} showVehicleDetails={false}/> </div>)}
            {activeTab === "reviews" && (
    <div className={styles.reviewsWrapper}>
              <Reviews reviews={camper.reviews || []} /></div>
            )}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
