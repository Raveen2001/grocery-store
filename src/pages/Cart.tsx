import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../data/format";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();

  const deliveryFee = cartTotal >= 499 ? 0 : 49;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + deliveryFee + tax;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items yet.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-xl font-bold transition"
        >
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Shopping Cart <span className="text-gray-500 font-normal text-lg">({cart.length} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4 hover:shadow-sm transition"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-xl shrink-0"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-brand-600 transition truncate">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-600">{product.unit}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{formatPrice(product.price * quantity)}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-28">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

            {/* Promo */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Tag size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Promo code"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition">
                Apply
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span className={`font-semibold ${deliveryFee === 0 ? "text-brand-600" : ""}`}>
                  {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST (5%)</span>
                <span className="font-semibold">{formatPrice(tax)}</span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-brand-600 bg-brand-50 p-2 rounded-lg">
                  Add {formatPrice(499 - cartTotal)} more for free delivery!
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-gray-900">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-brand-600 hover:bg-brand-700 text-white text-center py-3.5 rounded-xl font-bold mt-6 transition"
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/products"
              className="block w-full text-center text-brand-600 hover:text-brand-700 text-sm font-medium mt-3"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
