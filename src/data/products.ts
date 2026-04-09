export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  unit: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  nutrition: { calories: number; protein: string; fat: string; carbs: string };
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

export const CURRENCY = "₹";

export const categories: Category[] = [
  { id: "fruits", name: "Fruits & Vegetables", icon: "🍎", color: "bg-red-50 text-red-700", count: 86 },
  { id: "dairy", name: "Dairy & Eggs", icon: "🥛", color: "bg-blue-50 text-blue-700", count: 42 },
  { id: "meat", name: "Meat & Seafood", icon: "🥩", color: "bg-pink-50 text-pink-700", count: 35 },
  { id: "bakery", name: "Bakery", icon: "🍞", color: "bg-amber-50 text-amber-700", count: 28 },
  { id: "beverages", name: "Beverages", icon: "🥤", color: "bg-purple-50 text-purple-700", count: 54 },
  { id: "snacks", name: "Snacks", icon: "🍿", color: "bg-yellow-50 text-yellow-700", count: 67 },
  { id: "frozen", name: "Frozen Foods", icon: "🧊", color: "bg-cyan-50 text-cyan-700", count: 31 },
  { id: "pantry", name: "Pantry Staples", icon: "🫙", color: "bg-orange-50 text-orange-700", count: 73 },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Organic Bananas",
    price: 49,
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    category: "fruits",
    unit: "1 dozen",
    rating: 4.8,
    reviews: 2341,
    badge: "Organic",
    description: "Sweet and perfectly ripe organic bananas sourced from sustainable farms in Kerala. Rich in potassium and natural energy.",
    nutrition: { calories: 105, protein: "1.3g", fat: "0.4g", carbs: "27g" },
    inStock: true,
  },
  {
    id: "2",
    name: "Fresh Strawberries",
    price: 199,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
    category: "fruits",
    unit: "250 g",
    rating: 4.7,
    reviews: 1892,
    badge: "Sale",
    description: "Juicy, hand-picked strawberries from Mahabaleshwar. Perfect for smoothies, desserts, or snacking.",
    nutrition: { calories: 49, protein: "1g", fat: "0.5g", carbs: "12g" },
    inStock: true,
  },
  {
    id: "3",
    name: "Alphonso Mango",
    price: 349,
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
    category: "fruits",
    unit: "1 kg",
    rating: 4.9,
    reviews: 5102,
    badge: "Seasonal",
    description: "Premium Alphonso mangoes from Ratnagiri. The king of mangoes — sweet, aromatic, and irresistibly creamy.",
    nutrition: { calories: 60, protein: "0.8g", fat: "0.4g", carbs: "15g" },
    inStock: true,
  },
  {
    id: "4",
    name: "Baby Spinach (Palak)",
    price: 45,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    category: "fruits",
    unit: "250 g",
    rating: 4.5,
    reviews: 876,
    badge: "Organic",
    description: "Tender organic baby spinach leaves, triple-washed and ready to cook. Great for palak paneer and smoothies.",
    nutrition: { calories: 7, protein: "0.9g", fat: "0.1g", carbs: "1.1g" },
    inStock: true,
  },
  {
    id: "5",
    name: "Amul Taaza Milk",
    price: 68,
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    category: "dairy",
    unit: "1 litre",
    rating: 4.9,
    reviews: 4521,
    description: "Farm-fresh toned milk from Amul. Rich, creamy, and packed with essential nutrients for the whole family.",
    nutrition: { calories: 120, protein: "6g", fat: "6g", carbs: "10g" },
    inStock: true,
  },
  {
    id: "6",
    name: "Farm Fresh Eggs",
    price: 99,
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    category: "dairy",
    unit: "12 pcs",
    rating: 4.8,
    reviews: 3211,
    badge: "Free Range",
    description: "Grade A large eggs from free-range country hens. Rich golden yolks with superior taste and nutrition.",
    nutrition: { calories: 70, protein: "6g", fat: "5g", carbs: "0g" },
    inStock: true,
  },
  {
    id: "7",
    name: "Epigamia Greek Yogurt",
    price: 89,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    category: "dairy",
    unit: "400 g",
    rating: 4.7,
    reviews: 2145,
    description: "Thick and creamy plain Greek yogurt. High in protein, perfect for breakfast or as a cooking ingredient.",
    nutrition: { calories: 100, protein: "17g", fat: "0.7g", carbs: "6g" },
    inStock: true,
  },
  {
    id: "8",
    name: "Amul Cheese Block",
    price: 265,
    image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=400&fit=crop",
    category: "dairy",
    unit: "400 g",
    rating: 4.6,
    reviews: 1567,
    description: "Processed cheese block, perfect for sandwiches, parathas, and grilled cheese. Trusted Amul quality.",
    nutrition: { calories: 110, protein: "7g", fat: "9g", carbs: "1g" },
    inStock: true,
  },
  {
    id: "9",
    name: "Fresh Rohu Fish",
    price: 349,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=400&h=400&fit=crop",
    category: "meat",
    unit: "500 g",
    rating: 4.8,
    reviews: 987,
    badge: "Sale",
    description: "Fresh Rohu fish fillet, cleaned and cut. Rich in omega-3 fatty acids. Sourced daily from local markets.",
    nutrition: { calories: 208, protein: "20g", fat: "13g", carbs: "0g" },
    inStock: true,
  },
  {
    id: "10",
    name: "Chicken Breast Boneless",
    price: 299,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&h=400&fit=crop",
    category: "meat",
    unit: "500 g",
    rating: 4.7,
    reviews: 2876,
    description: "Boneless, skinless chicken breast. Antibiotic-free and hormone-free. Perfect for tikka, curry, or grilling.",
    nutrition: { calories: 165, protein: "31g", fat: "3.6g", carbs: "0g" },
    inStock: true,
  },
  {
    id: "11",
    name: "Multigrain Bread",
    price: 55,
    image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&h=400&fit=crop",
    category: "bakery",
    unit: "loaf",
    rating: 4.8,
    reviews: 1654,
    badge: "Fresh Daily",
    description: "Wholesome multigrain bread baked fresh daily. Packed with seeds and whole grains for a healthy start.",
    nutrition: { calories: 120, protein: "4g", fat: "0.5g", carbs: "24g" },
    inStock: true,
  },
  {
    id: "12",
    name: "Butter Croissants",
    price: 199,
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop",
    category: "bakery",
    unit: "4 pack",
    rating: 4.9,
    reviews: 2103,
    badge: "Fresh Daily",
    description: "Buttery, flaky croissants made with real butter. Baked fresh every morning at our in-house bakery.",
    nutrition: { calories: 231, protein: "5g", fat: "12g", carbs: "26g" },
    inStock: true,
  },
  {
    id: "13",
    name: "Real Fruit Orange Juice",
    price: 120,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
    category: "beverages",
    unit: "1 litre",
    rating: 4.6,
    reviews: 1432,
    description: "100% pure cold-pressed orange juice. No added sugar, no preservatives. Just fresh Nagpur oranges.",
    nutrition: { calories: 110, protein: "2g", fat: "0g", carbs: "26g" },
    inStock: true,
  },
  {
    id: "14",
    name: "Paper Boat Aamras",
    price: 149,
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=400&fit=crop",
    category: "beverages",
    unit: "6 pack",
    rating: 4.5,
    reviews: 3654,
    description: "Traditional Aamras mango drink by Paper Boat. Nostalgic taste of summer in every sip.",
    nutrition: { calories: 90, protein: "0g", fat: "0g", carbs: "22g" },
    inStock: true,
  },
  {
    id: "15",
    name: "Premium Dry Fruits Mix",
    price: 499,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop",
    category: "snacks",
    unit: "500 g",
    rating: 4.7,
    reviews: 2187,
    badge: "Sale",
    description: "Premium blend of almonds, cashews, pistachios, and raisins. Lightly salted for the perfect crunch.",
    nutrition: { calories: 170, protein: "5g", fat: "15g", carbs: "7g" },
    inStock: true,
  },
  {
    id: "16",
    name: "Cadbury Dark Chocolate 70%",
    price: 159,
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=400&fit=crop",
    category: "snacks",
    unit: "80 g",
    rating: 4.8,
    reviews: 1876,
    description: "Rich 70% cacao dark chocolate from Cadbury Bournville. Smooth, intense, and irresistible.",
    nutrition: { calories: 170, protein: "2g", fat: "12g", carbs: "13g" },
    inStock: true,
  },
  {
    id: "17",
    name: "Frozen Paneer Tikka",
    price: 275,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=400&fit=crop",
    category: "frozen",
    unit: "300 g",
    rating: 4.4,
    reviews: 1243,
    description: "Ready-to-cook frozen paneer tikka marinated with authentic Indian spices. Just grill and serve.",
    nutrition: { calories: 220, protein: "14g", fat: "16g", carbs: "8g" },
    inStock: true,
  },
  {
    id: "18",
    name: "Fortune Sunflower Oil",
    price: 189,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop",
    category: "pantry",
    unit: "1 litre",
    rating: 4.9,
    reviews: 3456,
    badge: "Best Seller",
    description: "Refined sunflower oil, light and heart-healthy. Perfect for everyday Indian cooking and frying.",
    nutrition: { calories: 120, protein: "0g", fat: "14g", carbs: "0g" },
    inStock: true,
  },
  {
    id: "19",
    name: "India Gate Basmati Rice",
    price: 399,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    category: "pantry",
    unit: "5 kg",
    rating: 4.8,
    reviews: 4987,
    badge: "Best Seller",
    description: "Premium aged basmati rice. Extra-long grains with a rich aroma. Perfect for biryani, pulao, and everyday meals.",
    nutrition: { calories: 130, protein: "2.7g", fat: "0.3g", carbs: "28g" },
    inStock: true,
  },
  {
    id: "20",
    name: "Fresh Pomegranate",
    price: 179,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop",
    category: "fruits",
    unit: "1 kg",
    rating: 4.7,
    reviews: 1654,
    badge: "Sale",
    description: "Ruby-red pomegranates from Solapur. Bursting with sweet-tangy flavour and packed with antioxidants.",
    nutrition: { calories: 83, protein: "1.7g", fat: "1.2g", carbs: "19g" },
    inStock: true,
  },
];

// Fake API calls with realistic delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts(categoryId?: string): Promise<Product[]> {
  await delay(300 + Math.random() * 400);
  if (categoryId) {
    return products.filter((p) => p.category === categoryId);
  }
  return products;
}

export async function fetchProduct(id: string): Promise<Product | undefined> {
  await delay(200 + Math.random() * 300);
  return products.find((p) => p.id === id);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(250 + Math.random() * 350);
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

export async function processPayment(_paymentData: {
  cardNumber: string;
  expiry: string;
  cvv: string;
  name: string;
}): Promise<{ success: boolean; orderId: string; message: string }> {
  await delay(1500 + Math.random() * 1000);
  return {
    success: true,
    orderId: `FC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    message: "Payment processed successfully",
  };
}
