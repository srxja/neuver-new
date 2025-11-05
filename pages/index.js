import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link'; // Import Link for navigation
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NEUVER - Made For Comfort</title>
        <meta name="description" content="Explore NEUVER's newest collection of comfortable fashion." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Background image is handled by CSS for better overlay control */}
        <div className={styles.navbar}>
          <h2 className={styles.logo}>NEUVER</h2>
          <div className={styles.searchBarPlaceholder}>SEARCH BAR</div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>MADE FOR<br />COMFORT</h1>
          <p className={styles.heroSubtitle}>Explore our newest collection now</p>
          <Link href="/products" passHref>
            <button className={styles.shopNowButton}>SHOP NOW</button>
          </Link>
        </div>
      </section>

      {/* Product Highlight Section 1 (Work Jacket) */}
      <section className={styles.productHighlightSection}>
        <div className={styles.productHighlightCard}>
          <div className={styles.productHighlightImageWrapper}>
            {/* Image component for responsive images */}
            <Image
              src="/images/work-jacket.jpg"
              alt="The Work Jacket"
              layout="fill"
              objectFit="cover"
              className={styles.productHighlightImage}
            />
          </div>
          <div className={styles.productHighlightInfo}>
            <h3 className={styles.productHighlightTitle}>THE WORK JACKET</h3>
            <p className={styles.productHighlightDescription}>100% cotton, made baggy for comfort</p>
          </div>
        </div>

        <div className={styles.productHighlightEmptyCard}>
          {/* This empty card acts as a visual spacer/layout element based on the design */}
        </div>
      </section>

      {/* Product Highlight Section 2 (Linen Coords) */}
      <section className={styles.productHighlightSection}>
        <div className={styles.productHighlightEmptyCard}>
          {/* This empty card acts as a visual spacer/layout element based on the design */}
        </div>
        <div className={styles.productHighlightCard}>
          <div className={styles.productHighlightImageWrapper}>
            <Image
              src="/images/linen-coords.jpg"
              alt="Linen Coords"
              layout="fill"
              objectFit="cover"
              className={styles.productHighlightImage}
            />
          </div>
          <div className={styles.productHighlightInfo}>
            <h3 className={styles.productHighlightTitle}>LINEN COORDS</h3>
            <p className={styles.productHighlightDescription}>A cool linen blend in pastel shades</p>
          </div>
        </div>
      </section>

      {/* Product Highlight Section 3 (Corporate Cool) */}
      <section className={styles.productHighlightSection}>
        <div className={styles.productHighlightCard}>
          <div className={styles.productHighlightImageWrapper}>
            <Image
              src="/images/corporate-cool.jpg"
              alt="Corporate Cool"
              layout="fill"
              objectFit="cover"
              className={styles.productHighlightImage}
            />
          </div>
          <div className={styles.productHighlightInfo}>
            <h3 className={styles.productHighlightTitle}>CORPORATE COOL</h3>
            <p className={styles.productHighlightDescription}>100% silk, 100% office-ready</p>
          </div>
        </div>

        <div className={styles.productHighlightEmptyCard}>
          {/* This empty card acts as a visual spacer/layout element based on the design */}
        </div>
      </section>

      {/* Free Shipping Banner */}
      <section className={styles.freeShippingBanner}>
        <h2 className={styles.bannerTitle}>FREE SHIPPING ON YOUR<br />FIRST ORDER</h2>
        <Link href="/products" passHref>
          <button className={styles.shopNowButton}>SHOP NOW</button>
        </Link>
      </section>

      {/* Footer - You might want to add a proper footer later */}
      <footer className={styles.footer}>
        {/* Placeholder for footer content */}
      </footer>
    </div>
  );
}
