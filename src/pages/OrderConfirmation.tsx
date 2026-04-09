import { Link, useParams } from "react-router-dom";
import { CheckCircle, Package, Truck, MapPin, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../data/format";

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h2>
        <Link to="/" className="text-brand-600 hover:underline">Go home</Link>
      </div>
    );
  }

  const steps = [
    { icon: <CheckCircle size={20} />, label: "Order Confirmed", time: "Just now", active: true },
    { icon: <Package size={20} />, label: "Packing Items", time: "~5 min", active: false },
    { icon: <Truck size={20} />, label: "Out for Delivery", time: "~20 min", active: false },
    { icon: <MapPin size={20} />, label: "Delivered", time: "~30 min", active: false },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 text-center">
      {/* Success animation */}
      <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
        <CheckCircle size={40} className="text-brand-600" />
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-1">Thank you for your purchase</p>
      <p className="text-sm text-gray-500 mb-8">
        Order ID: <span className="font-mono font-semibold text-gray-700">{order.id}</span>
      </p>

      {/* Tracker */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8">
        <h2 className="font-bold text-gray-900 mb-6 text-left">Delivery Tracker</h2>
        <div className="flex items-center justify-between">
          {steps.map((step, i) => (
            <div key={step.label} className="flex-1 flex flex-col items-center relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step.active ? "bg-brand-600 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {step.icon}
              </div>
              <p className={`text-xs font-medium ${step.active ? "text-brand-600" : "text-gray-500"}`}>{step.label}</p>
              <p className="text-xs text-gray-500">{step.time}</p>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-[55%] w-[90%] h-0.5 ${step.active ? "bg-brand-200" : "bg-gray-100"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Order details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-left">
        <h2 className="font-bold text-gray-900 mb-4">Order Details</h2>
        <div className="space-y-3 mb-4">
          {order.items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-lg" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">Qty: {quantity}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">{formatPrice(product.price * quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-3">
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total Paid</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Delivery address */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 text-left">
        <h2 className="font-bold text-gray-900 mb-2">Delivery Address</h2>
        <p className="text-gray-600 text-sm">{order.address}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/orders"
          className="px-6 py-3 border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition"
        >
          View All Orders
        </Link>
        <Link
          to="/products"
          className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
        >
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
