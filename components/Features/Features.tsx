import { Camper } from "@/types/camper";
import styles from "./Features.module.css";

interface CamperFeaturesProps {
  features: string[];
  camper: Camper;
}

interface SpriteIconProps {
  id: string; 
  className?: string;
}

function SpriteIcon({ id, className }: SpriteIconProps) {
  return (
    <svg className={className}>
      <use xlinkHref={`/sprite/sprite.svg#${id}`} />
    </svg>
  );
}

export default function Features({ features, camper }: CamperFeaturesProps) {
  return (
    <div>
      <h2 className={styles.sectionTitle}>Vehicle details</h2>

      <div className={styles.vehicleFeatures}>
        {camper.AC && (
          <div className={styles.featureItem}>
            <SpriteIcon id="icon-wind-1" className={styles.icon} />
            AC
          </div>
        )}
        {camper.kitchen && (
          <div className={styles.featureItem}>
            <SpriteIcon id="icon-cup-hot-1" className={styles.icon} />
            Kitchen
          </div>
        )}
        {camper.bathroom && (
          <div className={styles.featureItem}>
            <SpriteIcon id="icon-ph_shower" className={styles.icon} />
            Bathroom
          </div>
        )}
        {camper.TV && (
          <div className={styles.featureItem}>
            <SpriteIcon id="icon-tv-1" className={styles.icon} />
            TV
          </div>
        )}
      </div>

      {/* Інші технічні параметри */}
      <div className={styles.specs}>
        <p>Form: {camper.form}</p>
        <p>Length: {camper.length}</p>
        <p>Width: {camper.width}</p>
        <p>Height: {camper.height}</p>
        <p>Tank: {camper.tank}</p>
        <p>Consumption: {camper.consumption}</p>
      </div>

      {/* Features list */}
      <h3 className={styles.sectionTitle}>Features</h3>
      <ul className={styles.featuresList}>
        {features.map((f, i) => (
          <li key={i} className={styles.featureText}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
