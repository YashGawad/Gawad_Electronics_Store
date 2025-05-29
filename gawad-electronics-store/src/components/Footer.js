import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <h5 className="text-lg font-bold">Quick Links</h5>
                    <ul className="flex justify-center space-x-4">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/shop" className="hover:underline">Shop</a></li>
                        <li><a href="/mobiles" className="hover:underline">Mobiles</a></li>
                        <li><a href="/laptops" className="hover:underline">Laptops</a></li>
                        <li><a href="/tvs" className="hover:underline">TVs</a></li>
                    </ul>
                </div>
                <div className="mb-4">
                    <h5 className="text-lg font-bold">Follow Us</h5>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="hover:underline">Facebook</a>
                        <a href="#" className="hover:underline">Twitter</a>
                        <a href="#" className="hover:underline">Instagram</a>
                    </div>
                </div>
                <div>
                    <p className="text-sm">© {new Date().getFullYear()} Gawad Electronics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;