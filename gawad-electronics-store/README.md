# Gawad Electronics Store

Welcome to the Gawad Electronics Store project! This is a modern, responsive electronics store website built with Next.js and styled using Tailwind CSS. The site is designed to provide a seamless shopping experience for users looking to purchase electronics.

## Features

- **Responsive Design**: The website is fully responsive and mobile-friendly, ensuring a great user experience on all devices.
- **Sticky Navbar**: A sticky, responsive navbar that includes navigation links and dropdowns for "My Orders" and "Your Cart".
- **Hero Section**: A large banner with a call-to-action and featured image to attract users.
- **Product Sections**: Dedicated sections for Mobiles, Laptops, and TVs, each displaying a grid of products with images and links to shop pages.
- **About Section**: A brief description of the store’s mission.
- **Contact Form**: A contact form that allows users to send messages directly to the store.
- **Scroll to Top Button**: A button that appears on scroll, allowing users to quickly return to the top of the page.
- **Search Functionality**: A search bar that supports fuzzy search for product categories.

## Project Structure

```
gawad-electronics-store
├── public
│   └── placeholder.png
├── src
│   ├── components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── HeroSection.js
│   │   ├── ProductGrid.js
│   │   ├── AboutSection.js
│   │   ├── ContactForm.js
│   │   ├── ScrollToTopButton.js
│   │   └── SearchBar.js
│   ├── data
│   │   └── products.js
│   ├── pages
│   │   ├── _app.js
│   │   ├── index.js
│   │   ├── shop.js
│   │   ├── mobiles.js
│   │   ├── laptops.js
│   │   ├── tvs.js
│   │   ├── orders.js
│   │   └── cart.js
│   └── styles
│       └── globals.css
├── .gitignore
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Getting Started

To get started with the Gawad Electronics Store project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/gawad-electronics-store.git
   cd gawad-electronics-store
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Navigate to `http://localhost:3000` to view the website.

## Technologies Used

- **Next.js**: A React framework for building server-side rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React**: A JavaScript library for building user interfaces.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.