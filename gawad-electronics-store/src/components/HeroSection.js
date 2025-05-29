import React from 'react';

const HeroSection = () => {
    return (
        <div className="relative bg-blue-100">
            <img src="/placeholder.png" alt="Hero Banner" className="w-full h-96 object-cover" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
                <h1 className="text-4xl font-bold mb-4">Welcome to Gawad Electronics</h1>
                <p className="mb-6">Your one-stop shop for the latest in electronics.</p>
                <a href="/shop" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                    Shop Electronics
                </a>
            </div>
        </div>
    );
};

export default HeroSection;