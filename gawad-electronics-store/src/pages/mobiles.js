import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import products from '../data/products';

const Mobiles = () => {
    const mobileProducts = products.filter(product => product.category === 'Mobiles');

    return (
        <div>
            <Header />
            <main className="container mx-auto px-4">
                <h1 className="text-2xl font-bold my-8">Mobiles</h1>
                <ProductGrid products={mobileProducts} />
            </main>
            <Footer />
        </div>
    );
};

export default Mobiles;