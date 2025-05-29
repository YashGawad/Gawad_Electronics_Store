// Run this script with: node gawad-electronics-store/scripts/seedProducts.js
// Make sure you have @supabase/supabase-js installed and .env.local set up with your Supabase keys

const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const products = require(path.join(__dirname, '../src/data/products.js')).default;
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function seedProducts() {
  for (let product of products) {
    // Remove id if present (Supabase will auto-generate UUID)
    const { id, ...data } = product;
    const { error } = await supabase.from('products').insert([data]);
    if (error) {
      console.error(`Failed to add ${product.name}:`, error.message);
    } else {
      console.log(`Added: ${product.name}`);
    }
  }
  console.log('Seeding complete!');
  process.exit(0);
}

seedProducts();
