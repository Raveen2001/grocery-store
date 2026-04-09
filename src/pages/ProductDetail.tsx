import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Minus, Plus, ShoppingCart, Truck, RotateCcw, Shield, Heart } from "lucide-react";
import { fetchProduct, products, type Product } from "../data/products";
import { formatPrice } from "../data/format";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "reviews">("description");
  const { addToCart, updateQuantity, cart } = useStore();

  const cartItem = cart.find((item) => item.product.id === id);

  useEffect(() => {
    setLoading(true);
    fetchProduct(id!).then((data) => {
      setProduct(data || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="h-96 bg-gray-200 rounded-2xl" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
        <Link to="/products" className="text-brand-600 hover:underline">Back to products</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  // Fake reviews
  const fakeReviews = [
    { name: "Priya M.", rating: 5, date: "2 days ago", text: "Absolutely fresh and delicious! Will definitely order again." },
    { name: "Amit R.", rating: 4, date: "1 week ago", text: "Great quality for the price. Delivery was super fast too." },
    { name: "Sneha L.", rating: 5, date: "2 weeks ago", text: "Best quality I've found online. The freshness is unmatched." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-brand-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[400px] object-cover rounded-2xl"
          />
          {product.badge && (
            <span className={`absolute top-4 left-4 text-sm font-semibold px-3 py-1.5 rounded-full ${
              product.badge === "Sale" ? "bg-red-500 text-white" : product.badge === "Organic" ? "bg-brand-500 text-white" : "bg-amber-500 text-white"
            }`}>
              {product.badge}
            </span>
          )}
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition shadow-sm">
            <Heart size={20} className="text-gray-500 hover:text-red-500 transition" />
          </button>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"} />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.unit}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          {cartItem ? (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex-1 bg-brand-50 text-brand-700 py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                {cartItem.quantity} in cart &middot; {formatPrice(product.price * cartItem.quantity)}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
            </div>
          )}

          {/* Shipping info */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
            {[
              { icon: <Truck size={18} />, text: "Free delivery on orders over ₹499" },
              { icon: <RotateCcw size={18} />, text: "Free returns within 24 hours" },
              { icon: <Shield size={18} />, text: "100% freshness guaranteed" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-brand-600">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex border-b border-gray-200 mb-6">
          {(["description", "nutrition", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition border-b-2 ${
                activeTab === tab
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <p className="text-gray-600 leading-relaxed max-w-2xl">{product.description}</p>
        )}
        {activeTab === "nutrition" && (
          <div className="grid grid-cols-4 gap-4 max-w-lg">
            {Object.entries(product.nutrition).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-500 capitalize mt-1">{key}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "reviews" && (
          <div className="space-y-4 max-w-2xl">
            {fakeReviews.map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {review.name[0]}
                    </div>
                    <span className="font-semibold text-gray-900 text-sm">{review.name}</span>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <p className="text-sm text-gray-600">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
