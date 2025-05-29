const products = [
  // Mobiles
  {
    id: 1,
    name: "Samsung Galaxy S25 Ultra",
    category: "Mobiles",
    image: "/Samsung-Galaxy-S25-Ultra-1-1.webp",
    price: 139999, // ₹1,39,999 (official Samsung India, Flipkart)
    description: "6.9\" Dynamic AMOLED 2X, Snapdragon 8 Elite, 200MP quad camera, 5000mAh, S Pen, IP68, Android 15, Titanium frame, 7 years updates."
  },
  {
    id: 2,
    name: "Google Pixel 9 Pro XL",
    category: "Mobiles",
    image: "/Google-Pixel-9-Pro-XL-2.webp",
    price: 119999, // ₹1,19,999 (expected, based on Pixel 8 Pro XL launch)
    description: "6.8\" Super Actua OLED, Tensor G4, 50+48+48MP cameras, 5060mAh, Gemini AI, Android 14, 7 years updates, IP68."
  },
  {
    id: 3,
    name: "OnePlus 13R",
    category: "Mobiles",
    image: "/OnePlus-13R-1-2.webp",
    price: 39999, // ₹39,999 (official OnePlus India)
    description: "6.78\" AMOLED 120Hz, Snapdragon 8 Gen 3, 50+50+8MP cameras, 6000mAh, OxygenOS 15, IP65, 4 years updates."
  },
  {
    id: 4,
    name: "Vivo X200 Pro",
    category: "Mobiles",
    image: "/Vivo-X200-Pro-3.webp",
    price: 89999, // ₹89,999 (expected, based on X100 Pro launch)
    description: "6.78\" AMOLED, Dimensity 9400, 50+50+50MP cameras, 5400mAh, Android 14, 120W fast charging."
  },
  {
    id: 5,
    name: "iQOO 13",
    category: "Mobiles",
    image: "/iQOO-13-1-1.webp",
    price: 59999, // ₹59,999 (expected, based on iQOO 12 launch)
    description: "6.78\" AMOLED, Snapdragon 8 Gen 3, 50+50+64MP cameras, 5000mAh, 120W charging, Android 14."
  },
  {
    id: 6,
    name: "Samsung Galaxy Z Fold 6",
    category: "Mobiles",
    image: "/Samsung-Galaxy-Z-Fold-6-2.webp",
    price: 164999, // ₹1,64,999 (expected, based on Z Fold 5 launch)
    description: "7.6\" Foldable AMOLED, Snapdragon 8 Gen 3, 50+12+10MP cameras, 4400mAh, Android 14, S Pen support."
  },
  {
    id: 7,
    name: "Redmi Note 14 Pro 5G",
    category: "Mobiles",
    image: "/REDMI-Note-14-Pro-5G-1-1.webp",
    price: 22999, // ₹22,999 (expected, based on Note 13 Pro 5G launch)
    description: "6.67\" AMOLED 120Hz, Snapdragon 7s Gen 2, 200MP camera, 5100mAh, Android 14."
  },
  {
    id: 8,
    name: "Motorola Edge 50 Pro",
    category: "Mobiles",
    image: "/Motorola edge 50pro.jpg",
    price: 31999, // ₹31,999 (official Motorola India)
    description: "6.7\" pOLED 144Hz, Snapdragon 7 Gen 3, 50+13+10MP cameras, 4500mAh, 125W charging, Android 14."
  },

  // Laptops
  {
    id: 12,
    name: "Apple MacBook Air 13-inch (M4)",
    category: "Laptops",
    image: "/Apple MacBook Air 13-inch (M4).webp",
    price: 1099.99,
    description: "13.6\" Liquid Retina, Apple M4 chip, 16GB RAM, 256GB SSD, macOS Sonoma, 18-hour battery."
  },
  {
    id: 13,
    name: "Asus Zenbook 14 OLED",
    category: "Laptops",
    image: "/Asus zenbook 14 oled.jpg",
    price: 899.99,
    description: "14\" 2.8K OLED, Intel Core Ultra 7, 16GB RAM, 1TB SSD, Windows 11, 18-hour battery."
  },
  {
    id: 14,
    name: "Razer Blade 16",
    category: "Laptops",
    image: "/Razer Blade 16.webp",
    price: 2999.99,
    description: "16\" QHD+ 240Hz, Intel Core i9-14900HX, RTX 4090, 32GB RAM, 2TB SSD, Windows 11."
  },
  {
    id: 15,
    name: "Apple MacBook Air 13-inch (M3)",
    category: "Laptops",
    image: "/Apple MacBook Air 13-inch (M3).webp",
    price: 999.99,
    description: "13.6\" Liquid Retina, Apple M3 chip, 8GB RAM, 256GB SSD, macOS Sonoma, 18-hour battery."
  },
  {
    id: 16,
    name: "Microsoft Surface Laptop",
    category: "Laptops",
    image: "/Microsoft Surface Laptop.webp",
    price: 1299.99,
    description: "13.5\" PixelSense, Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11."
  },
  {
    id: 17,
    name: "Dell XPS 17 (9730)",
    category: "Laptops",
    image: "/Dell XPS 17 (9730).webp",
    price: 2499.99,
    description: "17\" UHD+ Touch, Intel Core i9-13900H, RTX 4080, 32GB RAM, 1TB SSD, Windows 11."
  },
  {
    id: 18,
    name: "Dell XPS 13 (9350, Intel Core Ultra 2nd Gen)",
    category: "Laptops",
    image: "/Dell XPS 13 (9350, Intel Core Ultra 2nd Gen).webp",
    price: 1199.99,
    description: "13.4\" FHD+, Intel Core Ultra 7, 16GB RAM, 512GB SSD, Windows 11."
  },
  {
    id: 19,
    name: "Lenovo IdeaPad Duet 5 OLED Chromebook",
    category: "Laptops",
    image: "/Lenovo IdeaPad Duet 5 OLED Chromebook.webp",
    price: 499.99,
    description: "13.3\" OLED, Snapdragon 7c Gen 2, 8GB RAM, 128GB SSD, Chrome OS."
  },
  {
    id: 20,
    name: "Acer Chromebook Plus 515",
    category: "Laptops",
    image: "/Acer Chromebook Plus 515.webp",
    price: 399.99,
    description: "15.6\" FHD, Intel Core i3-N305, 8GB RAM, 128GB SSD, Chrome OS."
  },

  // TVs
  {
    id: 23,
    name: "Sony 65\" BRAVIA 2 4K Ultra HD Smart LED Google TV",
    category: "TVs",
    image: "/Sony 164 cm (65 inches) BRAVIA 2 4K Ultra HD Smart LED Google TV.avif",
    price: 1499.99,
    description: "65\" 4K Ultra HD, Google TV, Dolby Vision/Atmos, XR Cognitive Processor, HDMI 2.1, Smart features."
  },
  {
    id: 24,
    name: "Samsung 50\" 4K Ultra HD Smart Neo QLED TV",
    category: "TVs",
    image: "/Samsung 125 cm (50 inches) 4K Ultra HD Smart Neo QLED TV.avif",
    price: 1199.99,
    description: "50\" 4K Neo QLED, Quantum HDR, Tizen OS, Alexa/Google Assistant, 120Hz, HDMI 2.1."
  },
  {
    id: 25,
    name: "Vu 55\" Vibe Series QLED 4K Google TV",
    category: "TVs",
    image: "/Vu 139cm (55 inches) Vibe Series QLED 4K Google TV.avif",
    price: 899.99,
    description: "55\" 4K QLED, Google TV, Dolby Vision/Atmos, 120Hz, HDR10+, Smart remote."
  },
  {
    id: 26,
    name: "Xiaomi 50\" X Pro 4K Dolby Vision IQ Series Smart Google TV",
    category: "TVs",
    image: "/Xiaomi 125 cm (50 inches) X Pro 4K Dolby Vision IQ Series Smart Google TV.avif",
    price: 699.99,
    description: "50\" 4K Dolby Vision IQ, Google TV, HDR10+, 30W speakers, HDMI 2.1."
  },
  {
    id: 27,
    name: "TOSHIBA 50\" C350NP Series 4K Ultra HD Smart LED Google TV",
    category: "TVs",
    image: "/TOSHIBA 126 cm (50 inches) C350NP Series 4K Ultra HD Smart LED Google TV.avif",
    price: 649.99,
    description: "50\" 4K Ultra HD, Google TV, Dolby Vision, HDR10, 24W speakers, HDMI 2.1."
  },
  {
    id: 28,
    name: "Panasonic 55\" 4K Ultra HD Smart LED Google TV",
    category: "TVs",
    image: "/Panasonic 139 cm (55 inches) 4K Ultra HD Smart LED Google TV.avif",
    price: 799.99,
    description: "55\" 4K Ultra HD, Google TV, Dolby Vision, HDR10+, 20W speakers, HDMI 2.1."
  },
  {
    id: 29,
    name: "ONIDA 55\" Nexg Series 4K Ultra HD LED Smart Google TV",
    category: "TVs",
    image: "/ONIDA 139 cm (55 inches) Nexg Series 4K Ultra HD LED Smart Google TV.avif",
    price: 749.99,
    description: "55\" 4K Ultra HD, Google TV, HDR10, 24W speakers, HDMI 2.1."
  },
  {
    id: 30,
    name: "Hisense 43\" E68N Series 4K Ultra HD Smart Google QLED TV",
    category: "TVs",
    image: "/Hisense 108 cm (43 inches) E68N Series 4K Ultra HD Smart Google QLED TV.avif",
    price: 599.99,
    description: "43\" 4K QLED, Google TV, Dolby Vision, HDR10+, 24W speakers, HDMI 2.1."
  },
  {
    id: 31,
    name: "LG 32\" HD Ready Smart LED TV",
    category: "TVs",
    image: "/LG 80 cm (32 inches) HD Ready Smart LED TV.avif",
    price: 299.99,
    description: "32\" HD Ready, WebOS, Active HDR, 10W speakers, HDMI."
  },
  {
    id: 32,
    name: "Acer 32\" V Pro Series HD Ready Smart QLED Google TV",
    category: "TVs",
    image: "/Acer 80 cm (32 inches) V Pro Series HD Ready Smart QLED Google TV.avif",
    price: 349.99,
    description: "32\" HD Ready QLED, Google TV, HDR10, 24W speakers, HDMI."
  },
];

export default products;