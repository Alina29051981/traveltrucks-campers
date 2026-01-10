import styles from "./Gallery.module.css";

interface CamperGalleryProps {
  gallery: { original: string; thumbnail?: string }[];
}

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  return (
    <div className={styles.gallery}>
      {gallery.map((img, index) => (
        <img key={index} src={img.original} alt={`Gallery ${index}`} className={styles.image} />
      ))}
    </div>
  );
}
