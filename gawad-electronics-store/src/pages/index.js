import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import HeroSection from '../components/HeroSection';
import TrendingGrid from '../components/TrendingGrid';
import AboutSection from '../components/AboutSection';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import products from '../data/products';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return null;
  if (!user) {
    router.replace('/auth');
    return null;
  }

  return (
    <>
      <Head>
        <title>Gawad Electronics Store</title>
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
      </Head>
      <Header />
      {/* Mobile search bar below header */}
      <div className="flex md:hidden px-4 py-2 bg-white shadow">
        <div className="w-full">
          <SearchBar
            onSearch={(query) => {
              if (query && query.trim() !== '') {
                router.push(`/shop?search=${encodeURIComponent(query)}`);
              } else {
                router.push('/shop');
              }
            }}
          />
        </div>
      </div>
      <HeroSection />
      <TrendingGrid products={products} />
      <AboutSection />
      <ContactForm />
      <Footer />
      <ScrollToTopButton />
    </>
  );
}