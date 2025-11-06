import Head from 'next/head';
import Image from 'next/image'; // Keep Image for header background
import styles from '../styles/Products.module.css';
import { useEffect, useState, useCallback } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // States for filters
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Hardcoded filter options (in a real app, fetch these from DB)
  const genders = ['men', 'women', 'unisex']; // Example genders
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White', 'Purple', 'Yellow']; // Example colors
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36']; // Example sizes

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('search', searchTerm);
      if (selectedGender) queryParams.append('gender', selectedGender);
      if (selectedColor) queryParams.append('color', selectedColor);
      if (selectedSize) queryParams.append('size', selectedSize);
      if (minPrice) queryParams.append('minPrice', minPrice);
      if (maxPrice) queryParams.append('maxPrice', maxPrice);

      const response = await fetch(`/api/products?${queryParams.toString()}`);
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
  }, [searchTerm, selectedGender, selectedColor, selectedSize, minPrice, maxPrice]); // Dependencies for useCallback

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProducts(); // Call fetchProducts without arguments, it uses state
    }, 500);

    return () => {
      clearTimeout(handler); // Clear timeout if searchTerm changes before 500ms
    };
  }, [searchTerm, fetchProducts]); // Re-run effect when searchTerm or fetchProducts changes

  // Trigger fetch when any filter state changes (except searchTerm, handled by its own useEffect)
  useEffect(() => {
    // Avoid initial double-fetch with searchTerm's useEffect, and only run when a filter *actually* changes
    // This check is a simplification; a more robust solution might track initial load vs filter changes
    if (!loading && (selectedGender || selectedColor || selectedSize || minPrice || maxPrice)) {
       fetchProducts();
    } else if (!loading && !searchTerm && !selectedGender && !selectedColor && !selectedSize && !minPrice && !maxPrice) {
       // Also fetch if all filters are cleared and it's not the initial load
       fetchProducts();
    }
  }, [selectedGender, selectedColor, selectedSize, minPrice, maxPrice]); // Dependencies for filters


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };
  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };
  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };
  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGender('');
    setSelectedColor('');
    setSelectedSize('');
    setMinPrice('');
    setMaxPrice('');
    // The state changes will trigger the useEffect, which in turn calls fetchProducts
  };


  if (loading) {
    return (
      <div className={styles.container}>
        <Head><title>Products | NEUVER</title></Head>
        <header className={styles.header}>
            <h1 className={styles.logo}>NEUVER</h1>
            <div className={styles.searchFilterContainer}>
                <input type="text" placeholder="SEARCH BAR" value={searchTerm} onChange={handleSearchChange} />
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
                <input type="text" placeholder="SEARCH BAR" value={searchTerm} onChange={handleSearchChange} />
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
            <input
              type="text"
              placeholder="SEARCH BAR"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {/* Filters dropdown/modal trigger - currently, the panel is always visible */}
          <button className={styles.filtersButton}>FILTERS</button>
        </div>
      </header>

      <main className={styles.mainContent}>
        {/* Filters Panel - Visible by default for now, can be toggleable later */}
        <div className={styles.filtersPanel}>
          <h2>Refine Your Search</h2>
          <div className={styles.filterGroup}>
            <label htmlFor="gender-select">Gender</label>
            <select id="gender-select" value={selectedGender} onChange={handleGenderChange}>
              <option value="">All</option>
              {genders.map(gender => (
                <option key={gender} value={gender}>{gender}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="color-select">Color</label>
            <select id="color-select" value={selectedColor} onChange={handleColorChange}>
              <option value="">All</option>
              {colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label htmlFor="size-select">Size</label>
            <select id="size-select" value={selectedSize} onChange={handleSizeChange}>
              <option value="">All</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label>Price Range (₹)</label>
            <div className={styles.priceInputs}>
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={handleMinPriceChange}
                className={styles.priceInput}
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className={styles.priceInput}
              />
            </div>
          </div>
          <button className={styles.clearFiltersButton} onClick={handleClearFilters}>
            Clear Filters
          </button>
        </div>

        <div className={styles.productsGrid}>
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.product_id} className={styles.productCard}>
                <h3 className={styles.productName}>{product.product_name}</h3>
                <p className={styles.productDetail}>Price: ₹{product.price}</p>
                <p className={styles.productDetail}>Brand: {product.brand_name}</p>
                <p className={styles.productDetail}>Category: {product.category_name}</p>
                <p className={styles.productDetail}>Gender: {product.gender_type}</p>
                <p className={styles.productDetail}>Color: {product.color_name}</p>
                <p className={styles.productDetail}>Size: {product.size_label}</p>
                {product.stock === 0 ? (
                  <p className={styles.outOfStock}>Out of Stock</p>
                ) : (
                  <p className={styles.inStock}>In Stock ({product.stock})</p>
                )}
              </div>
            ))
          ) : (
            <p className={styles.noProductsMessage}>No products found matching your criteria.</p>
          )}
        </div>
      </main>
    </div>
  );
}
