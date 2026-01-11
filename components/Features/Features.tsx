import { Camper } from "@/types/camper";
import styles from "./Features.module.css";

interface Props {
  camper: Camper;
  showVehicleDetails?: boolean; 
}

interface Feature {
  id: string;
  name: string;
  available?: boolean;
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

export default function Features({ camper, showVehicleDetails = true }: Props) {
  const featuresList: Feature[] = [
    { id: "icon-wind-1", name: "AC", available: camper.AC },
    { id: "icon-cup-hot-1", name: "Kitchen", available: camper.kitchen },
    { id: "icon-ph_shower", name: "Bathroom", available: camper.bathroom },
    { id: "icon-tv-1", name: "TV", available: camper.TV },
    { id: "icon-ui-radios", name: "Radio", available: camper.radio },
    { id: "icon-solar_fridge-outline", name: "Refrigerator", available: camper.refrigerator },
    { id: "icon-lucide_microwave", name: "Microwave", available: camper.microwave },
    { id: "icon-hugeicons_gas-stove", name: "Gas", available: camper.gas },
    { id: "icon-ion_water-outline", name: "Water", available: camper.water },
  ];

  return (
    <div className={styles.container}>
     
      {showVehicleDetails && (
        <h2 className={styles.sectionTitle}>Vehicle details</h2>
      )}

      <div className={styles.featuresWrapper}>
        {featuresList
          .filter(f => f.available)
          .map(f => (
            <div key={f.id} className={styles.featureItem}>
              <SpriteIcon id={f.id} className={styles.featureIcon} />
              {f.name}
            </div>
          ))}
      </div>

      <h3 className={styles.sectionTitle}>Vehicle details</h3>
      <hr className={styles.sectionLine} />
     <div className={styles.specs}>
  {camper.form && (
    <div className={styles.specRow}>
      <span className={styles.specLabel}>Form</span>
      <span className={styles.specValue}>{camper.form}</span>
    </div>
  )}

  {camper.length && (
    <div className={styles.specRow}>
      <span className={styles.specLabel}>Length</span>
      <span className={styles.specValue}>{camper.length}</span>
    </div>
  )}

  {camper.width && (
    <div className={styles.specRow}>
      <span className={styles.specLabel}>Width</span>
      <span className={styles.specValue}>{camper.width}</span>
    </div>
  )}

  {camper.height && (
    <div className={styles.specRow}>
      <span className={styles.specLabel}>Height</span>
      <span className={styles.specValue}>{camper.height}</span>
    </div>
  )}

  {camper.tank && (
    <div className={styles.specRow}>
      <span className={styles.specLabel}>Tank</span>
      <span className={styles.specValue}>{camper.tank}</span>
    </div>
  )}

  {camper.consumption && (
    <div className={styles.specRow}>
      <span className={styles.specLabel}>Consumption</span>
      <span className={styles.specValue}>{camper.consumption}</span>
    </div>
  )}
</div>

    </div>
  );
}
