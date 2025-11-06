import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Products.module.css';
import { useEffect, useState } from 'react'; // Import hooks

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products'); // Call our API route
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        setError(e);
        console.error("Failed to fetch products:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return (
      <div className={styles.container}>
        <Head><title>Products | NEUVER</title></Head>
        <header className={styles.header}>
            <h1 className={styles.logo}>NEUVER</h1>
            <div className={styles.searchFilterContainer}>
            <div className={styles.searchBar}>
                <input type="text" placeholder="SEARCH BAR" />
            </div>
            <button className={styles.filtersButton}>FILTERS</button>
            </div>
        </header>
        <main className={styles.mainContent}>
            <p>Loading products...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Head><title>Products | NEUVER</title></Head>
        <header className={styles.header}>
            <h1 className={styles.logo}>NEUVER</h1>
            <div className={styles.searchFilterContainer}>
            <div className={styles.searchBar}>
                <input type="text" placeholder="SEARCH BAR" />
            </div>
            <button className={styles.filtersButton}>FILTERS</button>
            </div>
        </header>
        <main className={styles.mainContent}>
            <p>Error loading products: {error.message}</p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Products | NEUVER</title>
        <meta name="description" content="Search and discover NEUVER's collection." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
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
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.product_id} className={styles.productCard}>
                {/* No image for now, as per your request */}
                <h3 className={styles.productName}>{product.product_name}</h3>
                <p className={styles.productDetail}>Price: ₹{product.price}</p>
                <p className={styles.productDetail}>Brand: {product.brand_name}</p>
                <p className={styles.productDetail}>Category: {product.category_name}</p>
                {/* Add more details as needed */}
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
