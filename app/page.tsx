import type { Metadata } from "next";
import Link from "next/link";
import styles from "./Home.module.css";

export const metadata: Metadata = {
  title: "Home | TravelTrucks",
  description: "Find your perfect camper for the best trip with TravelTrucks.",
};


export default function HomePage() {
  return (
    <main className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Campers of your dreams</h1>
        <p>
          You can find everything you want in our catalog
        </p>

        <Link href="/catalog" className={styles.button}>
          View Now
        </Link>
      </div>
    </main>
  );
}
