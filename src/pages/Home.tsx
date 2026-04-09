import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, Clock, Leaf } from "lucide-react";
import { categories, products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

function useCountdown() {
  const getSecondsUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return Math.floor((midnight.getTime() - now.getTime()) / 1000);
  };

  const [seconds, setSeconds] = useState(getSecondsUntilMidnight);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s <= 0 ? getSecondsUntilMidnight() : s - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function Home() {
  const dealProducts = products.filter((p) => p.originalPrice);
  const popularProducts = products.filter((p) => p.rating >= 4.7).slice(0, 4);
  const countdown = useCountdown();

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-600 via-brand-700 to-emerald-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🥑</div>
          <div className="absolute top-20 right-20 text-7xl">🍇</div>
          <div className="absolute bottom-10 left-1/3 text-9xl">🥕</div>
          <div className="absolute bottom-20 right-10 text-6xl">🍊</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Free delivery on your first order
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Fresh Groceries<br />
              Delivered in <span className="text-yellow-300">30 min</span>
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              Shop from thousands of fresh products. From farm to your doorstep with guaranteed freshness.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="bg-white text-brand-700 hover:bg-gray-100 px-8 py-3.5 rounded-xl font-bold text-lg transition flex items-center gap-2"
              >
                Shop Now <ArrowRight size={20} />
              </Link>
              <button className="border-2 border-white/40 text-white hover:bg-white/10 px-8 py-3.5 rounded-xl font-bold text-lg transition">
                View Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Truck size={24} />, title: "Free Delivery", desc: "On orders over ₹499" },
              { icon: <Clock size={24} />, title: "30-Min Express", desc: "Lightning-fast delivery" },
              { icon: <Shield size={24} />, title: "Freshness Guarantee", desc: "Or your money back" },
              { icon: <Leaf size={24} />, title: "Organic Selection", desc: "500+ organic products" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <Link to="/products" className="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className={`${cat.color} rounded-2xl p-4 text-center hover:shadow-md transition-all hover:-translate-y-1`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="font-semibold text-sm">{cat.name}</p>
              <p className="text-xs opacity-70 mt-0.5">{cat.count} items</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Deals */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Today's Deals</h2>
            <p className="text-gray-600 text-sm">Grab them before they're gone!</p>
          </div>
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-bold tabular-nums">
            Ends in {countdown}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Popular Products */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Right Now</h2>
            <Link to="/products" className="text-brand-600 hover:text-brand-700 font-medium text-sm flex items-center gap-1">
              See All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-brand-600 to-emerald-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Get ₹100 Off Your First Order</h2>
          <p className="text-white/90 mb-6 max-w-md mx-auto">
            Subscribe to our newsletter and get exclusive deals delivered to your inbox.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-bold transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
