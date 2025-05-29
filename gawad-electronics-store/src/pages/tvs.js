import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products';

const TVsPage = () => {
    const tvs = products.filter(product => product.category === 'TVs');

    return (
        <div>
            <Header />
            <main className="container mx-auto px-4">
                <h1 className="text-3xl font-bold my-8">Shop TVs</h1>
                <ProductGrid products={tvs} />
            </main>
            <Footer />
        </div>
    );
};

export default TVsPage;