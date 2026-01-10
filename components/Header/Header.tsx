import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoBox}>
          <Link href="/" className={styles.logoLink}>
            <svg className={styles.logo}>
              <use href="/sprite/sprite.svg#icon-logo" />
            </svg>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/catalog">Catalog</Link>
        </nav>
      </div>
    </header>
  );
}
