import { Link } from "react-router-dom";
import { Star, Plus, Minus } from "lucide-react";
import type { Product } from "../data/products";
import { formatPrice } from "../data/format";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }: { product: Product }) {
  const { cart, addToCart, updateQuantity } = useStore();
  const cartItem = cart.find((item) => item.product.id === product.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
      <Link to={`/product/${product.id}`} className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
              product.badge === "Sale"
                ? "bg-red-500 text-white"
                : product.badge === "Organic"
                ? "bg-brand-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </span>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-brand-600 transition">{product.name}</h3>
        </Link>
        <p className="text-xs text-gray-600 mt-0.5">{product.unit}</p>

        <div className="mt-auto pt-3 flex flex-col gap-2">
          <div>
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-1.5">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {cartItem ? (
            <div className="flex items-center justify-center gap-2 bg-brand-50 rounded-xl px-2 py-1.5">
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                className="w-8 h-8 rounded-lg bg-white border border-brand-200 flex items-center justify-center text-brand-600 hover:bg-brand-100 transition"
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold text-brand-700 w-6 text-center">{cartItem.quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white hover:bg-brand-700 transition"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white py-2 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1"
            >
              <Plus size={16} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
