import React from "react";
import styles from "./Gallery.module.css"; 

interface GalleryProps {
  gallery: { thumb?: string; original?: string }[];
}

export default function Gallery({ gallery }: GalleryProps) {
  if (!gallery || gallery.length === 0) {
    return <img src="/images/placeholder.png" alt="No images" className={styles.image} />;
  }

  return (
    <div className={styles.gallery}>
      {gallery.map((img, index) => {
        const src = img.original || img.thumb || "/images/placeholder.png";
        return (
          <img
            key={index}
            src={src}
            alt={`Camper image ${index + 1}`}
            className={styles.image}
            loading="lazy"
          />
        );
      })}
    </div>
  );
}
