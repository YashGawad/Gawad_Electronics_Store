import { useState, useRef, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

import ScrollToTopButton from '../components/ScrollToTopButton';

const categories = [
  { name: 'Mobiles', anchor: 'mobiles' },
  { name: 'Laptops', anchor: 'laptops' },
  { name: 'TVs', anchor: 'tvs' },
];

function getCart() {
  if (typeof window === 'undefined') return [];
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

function setCart(cart) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cart', JSON.stringify(cart));
}

import { useRouter } from 'next/router';

const Shop = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [cart, setCartState] = useState(getCart());
  const [expanded, setExpanded] = useState({ Mobiles: false, Laptops: false, TVs: false });
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const sectionRefs = useRef({});
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) setError('Failed to fetch products.');
      else setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Update search state when URL changes
  useEffect(() => {
    if (typeof router.query.search === 'string') {
      setSearch(router.query.search);
    } else {
      setSearch('');
    }
  }, [router.query.search]);

  const handleSearch = (query) => {
    setSearch(query);
    if (!query) {
      // Remove search from URL
      const { search, ...rest } = router.query;
      router.push({ pathname: '/shop', query: rest }, undefined, { shallow: true });
    } else {
      router.push({ pathname: '/shop', query: { ...router.query, search: query } }, undefined, { shallow: true });
    }
  };

  const handleAddToCart = (product) => {
    const newCart = [...cart, product];
    setCartState(newCart);
    setCart(newCart);
    setToast(`${product.name} added to cart!`);
    setTimeout(() => setToast(''), 2000);
  };
  const handleToggleExpand = (category) => setExpanded(prev => ({ ...prev, [category]: !prev[category] }));
  const handleBuyNow = (product) => {
    setToast(`Proceeding to buy ${product.name}`);
    setTimeout(() => setToast(''), 2000);
    // Here you could redirect to checkout or payment page
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.description ? p.description.toLowerCase().includes(search.toLowerCase()) : false)
  );

  const handleCategoryNav = (anchor) => {
    const section = sectionRefs.current[anchor];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 min-h-screen flex flex-col relative overflow-x-hidden">
      <Header />
      {/* Mobile search bar below header */}
      <div className="flex md:hidden px-4 py-2 bg-white shadow">
        <div className="w-full">
          <SearchBar
            onSearch={handleSearch}
          />
        </div>
      </div>
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex space-x-2 mb-4 md:mb-0">
            {categories.map(cat => (
              <button
                key={cat.anchor}
                onClick={() => handleCategoryNav(cat.anchor)}
                className="px-4 py-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-900 font-pixel border-2 border-green-200 shadow-pixel transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                {cat.name}
              </button>
            ))}
          </div>
          
        </div>
        <div className="grid gap-12">
          {categories.map(cat => {
            const catProducts = filteredProducts.filter(p => p.category === cat.name);
            const isExpanded = expanded[cat.name];
            const productsToShow = isExpanded ? catProducts : catProducts.slice(0, 4);
            return (
              <section
                key={cat.anchor}
                id={cat.anchor}
                ref={el => (sectionRefs.current[cat.anchor] = el)}
                className="scroll-mt-24 animate-fadein"
              >
                <h2 className="text-2xl font-pixel text-blue-900 mb-4 border-b-4 border-blue-200 inline-block bg-blue-100 px-4 py-2 rounded-t-lg shadow-pixel animate-fadein-slow">{cat.name}</h2>
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-white border-4 border-sand-200 rounded-lg shadow-pixel flex flex-col items-center p-4 animate-pulse h-64" />
                    ))}
                  </div>
                ) : (
                  <ProductGrid
                    products={productsToShow.map(p => ({
                      ...p,
                      onAddToCart: () => handleAddToCart(p),
                      onBuyNow: () => handleBuyNow(p),
                    }))}
                  />
                )}
                {catProducts.length > 4 && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-pixel px-6 py-2 rounded shadow-pixel border-2 border-blue-200 transition-all duration-200 hover:scale-105"
                      onClick={() => handleToggleExpand(cat.name)}
                    >
                      {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                )}
              </section>
            );
          })}
        </div>
        {/* Floating Cart Button for Mobile */}
        <button
          className="fixed bottom-6 right-6 z-50 bg-green-400 hover:bg-green-500 text-green-900 font-pixel rounded-full shadow-pixel border-2 border-green-700 w-16 h-16 flex items-center justify-center text-xl transition-all duration-200 hover:scale-110 md:hidden"
          onClick={() => handleCategoryNav('cart')}
          aria-label="Go to cart"
        >
          🛒
          {hasMounted && cart.length > 0 && (
            <span className="absolute top-2 right-2 bg-white text-green-900 font-pixel text-xs rounded-full px-2 py-0.5 border-2 border-green-700 shadow-pixel">
              {cart.length}
            </span>
          )}
        </button>
        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-400 text-green-900 font-pixel px-6 py-3 rounded shadow-pixel border-2 border-green-700 z-50 animate-fadein-slow">
            {toast}
          </div>
        )}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Shop;