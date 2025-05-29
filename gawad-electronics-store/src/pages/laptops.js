import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products';

const Laptops = () => {
    const laptopProducts = products.filter(product => product.category === 'Laptops');

    return (
        <div>
            <Header />
            <main className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Laptops</h1>
                <ProductGrid products={laptopProducts} />
            </main>
            <Footer />
        </div>
    );
};

export default Laptops;