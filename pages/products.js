import Head from 'next/head';
import Image from 'next/image'; // We'll keep Image for the background header, but not for product cards yet
import styles from '../styles/Products.module.css';

export default function Products() {
  // We'll create an array of empty objects to render the 'PRODUCT' cards
  // The number here can be adjusted based on how many empty cards you want to display initially
  const placeholderProducts = Array(12).fill({}); // Creates 12 empty product cards

  return (
    <div className={styles.container}>
      <Head>
        <title>Products | NEUVER</title>
        <meta name="description" content="Search and discover NEUVER's collection." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        {/* The background image for the header is set via CSS */}
        <h1 className={styles.logo}>NEUVER</h1>
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchBar}>
            <input type="text" placeholder="SEARCH BAR" />
          </div>
          <button className={styles.filtersButton}>FILTERS</button>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.productsGrid}>
          {placeholderProducts.map((_, index) => (
            <div key={index} className={styles.productCard}>
              <p className={styles.productPlaceholderText}>PRODUCT</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
