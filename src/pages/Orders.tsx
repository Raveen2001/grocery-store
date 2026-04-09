import { Link } from "react-router-dom";
import { Package, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../data/format";

export default function Orders() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package size={40} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">When you place an order, it will appear here.</p>
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-sm transition">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-sm font-semibold text-gray-900">{order.id}</p>
                <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
                })}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                order.status === "confirmed" ? "bg-brand-50 text-brand-700" :
                order.status === "shipped" ? "bg-blue-50 text-blue-700" :
                order.status === "delivered" ? "bg-gray-100 text-gray-700" :
                "bg-yellow-50 text-yellow-700"
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-3">
              {order.items.slice(0, 4).map(({ product }) => (
                <img key={product.id} src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
              ))}
              {order.items.length > 4 && (
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-500 font-semibold">
                  +{order.items.length - 4}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900">{formatPrice(order.total)}</span>
              <span className="text-sm text-gray-500">{order.items.length} item{order.items.length > 1 ? "s" : ""}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
