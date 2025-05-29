import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import SearchBar from './SearchBar';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function getCartCount() {
    if (typeof window === 'undefined') return 0;
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart).length : 0;
    } catch {
        return 0;
    }
}

const Header = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [hasMounted, setHasMounted] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setCartCount(getCartCount());
        setHasMounted(true);
        const handleStorage = (e) => {
            if (e.key === 'cart') setCartCount(getCartCount());
        };
        window.addEventListener('storage', handleStorage);
        // Check auth status
        const checkUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        checkUser();
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.replace('/auth');
    };

    useEffect(() => {
        setCartCount(getCartCount());
        setHasMounted(true);
        // Optionally, add a storage event listener to update cartCount if cart changes in another tab
        const handleStorage = (e) => {
            if (e.key === 'cart') setCartCount(getCartCount());
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="flex items-center">
                    <img src="/logo.jpg" alt="Logo" className="h-10" />
                    <h1 className="text-xl font-bold ml-2">Gawad Electronics</h1>
                </div>
                <div className="flex-1 mx-4 hidden md:flex">
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
                <nav className="hidden md:flex space-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/shop">Shop</Link>
                    <Link href="/mobiles">Mobiles</Link>
                    <Link href="/laptops">Laptops</Link>
                    <Link href="/tvs">TVs</Link>
                    <Link href="/orders">
                        <button className="focus:outline-none">My Orders</button>
                    </Link>
                    <Link href="/cart">
                        <button className="focus:outline-none relative">
                            Your Cart
                            {hasMounted && cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-green-400 text-green-900 font-pixel text-xs rounded-full px-2 py-0.5 border-2 border-green-700 shadow-pixel" aria-label={`Cart has ${cartCount} items`}>
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </Link>
                    {user && (
                        <button onClick={handleSignOut} className="ml-4 px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 focus:outline-none">
                            Sign Out
                        </button>
                    )}
                </nav>
                <div className="md:hidden">
                    <button onClick={toggleMobileMenu} className="focus:outline-none px-3 py-2 border rounded bg-blue-100">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <nav className="flex flex-col p-4 space-y-4">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/mobiles">Mobiles</Link>
                        <Link href="/laptops">Laptops</Link>
                        <Link href="/tvs">TVs</Link>
                        <Link href="/orders">My Orders</Link>
                        <Link href="/cart">
                            <span>Your Cart</span>
                            {hasMounted && cartCount > 0 && (
                                <span className="ml-2 bg-green-400 text-green-900 font-pixel text-xs rounded-full px-2 py-0.5 border-2 border-green-700 shadow-pixel" aria-label={`Cart has ${cartCount} items`}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        {user && (
                            <button onClick={handleSignOut} className="mt-4 px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-600 focus:outline-none">
                                Sign Out
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;