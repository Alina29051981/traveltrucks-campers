import { Camper } from "@/types/camper";
import styles from "./Specs.module.css";

interface CamperSpecsProps {
  camper: Camper;
}

export default function CamperSpecs({ camper }: CamperSpecsProps) {
  return (
    <div className={styles.specs}>
      <div className={styles.row}><span>Form:</span> <span>{camper.form}</span></div>
      <div className={styles.row}><span>Length:</span> <span>{camper.length}</span></div>
      <div className={styles.row}><span>Width:</span> <span>{camper.width}</span></div>
      <div className={styles.row}><span>Height:</span> <span>{camper.height}</span></div>
      <div className={styles.row}><span>Tank:</span> <span>{camper.tank}</span></div>
      <div className={styles.row}><span>Consumption:</span> <span>{camper.consumption}</span></div>
      {camper.transmission && <div className={styles.row}><span>Transmission:</span> <span>{camper.transmission}</span></div>}
      {camper.engine && <div className={styles.row}><span>Engine:</span> <span>{camper.engine}</span></div>}
      <div className={styles.row}><span>AC:</span> <span>{camper.AC ? "Yes" : "No"}</span></div>
      <div className={styles.row}><span>Bathroom:</span> <span>{camper.bathroom ? "Yes" : "No"}</span></div>
      <div className={styles.row}><span>Kitchen:</span> <span>{camper.kitchen ? "Yes" : "No"}</span></div>
      <div className={styles.row}><span>TV:</span> <span>{camper.TV ? "Yes" : "No"}</span></div>
    </div>
  );
}
