import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreditCard, Lock, Truck } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { processPayment } from "../data/products";
import { formatPrice } from "../data/format";

export default function Checkout() {
  const { cart, cartTotal, clearCart, addOrder, isAuthenticated, login } = useStore();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [step, setStep] = useState<"info" | "payment">("info");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    deliverySlot: "today-2pm",
  });

  const deliveryFee = cartTotal >= 499 ? 0 : 49;
  const tax = Math.round(cartTotal * 0.05);
  const total = cartTotal + deliveryFee + tax;

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 16);
    return v.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 2) return v.slice(0, 2) + "/" + v.slice(2);
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === "info") {
      if (!isAuthenticated) {
        login({ name: `${form.firstName} ${form.lastName}`, email: form.email });
      }
      setStep("payment");
      return;
    }

    setProcessing(true);
    try {
      const result = await processPayment({
        cardNumber: form.cardNumber,
        expiry: form.expiry,
        cvv: form.cvv,
        name: form.cardName,
      });

      if (result.success) {
        addOrder({
          id: result.orderId,
          items: [...cart],
          total,
          date: new Date().toISOString(),
          status: "confirmed",
          address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
        });
        clearCart();
        navigate(`/order-confirmation/${result.orderId}`);
      }
    } catch {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Nothing to checkout</h2>
        <Link to="/products" className="text-brand-600 hover:underline">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Steps */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {["Delivery Info", "Payment"].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              (i === 0 && step === "info") || (i === 1 && step === "payment")
                ? "bg-brand-600 text-white"
                : i === 0 && step === "payment"
                ? "bg-brand-100 text-brand-700"
                : "bg-gray-100 text-gray-500"
            }`}>
              {i === 0 && step === "payment" ? "✓" : i + 1}
            </div>
            <span className={`text-sm font-medium ${
              (i === 0 && step === "info") || (i === 1 && step === "payment") ? "text-gray-900" : "text-gray-500"
            }`}>{label}</span>
            {i === 0 && <div className="w-12 h-0.5 bg-gray-200 mx-2" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {step === "info" ? (
            <>
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck size={20} className="text-brand-600" /> Delivery Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      required
                      value={form.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Rahul"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      required
                      value={form.lastName}
                      onChange={(e) => updateField("lastName", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="rahul@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      required
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="42, MG Road, Andheri West"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      required
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        required
                        value={form.state}
                        onChange={(e) => updateField("state", e.target.value)}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PIN Code</label>
                      <input
                        required
                        value={form.pincode}
                        onChange={(e) => updateField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="400058"
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery time */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-4">Delivery Time</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: "today-2pm", label: "Today", time: "2:00 PM - 4:00 PM", tag: "Express" },
                    { value: "today-6pm", label: "Today", time: "6:00 PM - 8:00 PM" },
                    { value: "tomorrow-10am", label: "Tomorrow", time: "10:00 AM - 12:00 PM" },
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot.value}
                      onClick={() => updateField("deliverySlot", slot.value)}
                      className={`p-3 rounded-xl border-2 text-left transition ${
                        form.deliverySlot === slot.value
                          ? "border-brand-600 bg-brand-50"
                          : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <p className="font-semibold text-sm text-gray-900">
                        {slot.label}
                        {slot.tag && (
                          <span className="ml-2 text-xs bg-brand-600 text-white px-2 py-0.5 rounded-full">{slot.tag}</span>
                        )}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">{slot.time}</p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-xl font-bold text-lg transition"
              >
                Continue to Payment
              </button>
            </>
          ) : (
            <>
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-brand-600" /> Payment Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      required
                      value={form.cardNumber}
                      onChange={(e) => updateField("cardNumber", formatCardNumber(e.target.value))}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input
                      required
                      value={form.cardName}
                      onChange={(e) => updateField("cardName", e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="Rahul Sharma"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                      <input
                        required
                        value={form.expiry}
                        onChange={(e) => updateField("expiry", formatExpiry(e.target.value))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="12/28"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        required
                        value={form.cvv}
                        onChange={(e) => updateField("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="123"
                        maxLength={4}
                        type="password"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                  <Lock size={14} />
                  <span>Your payment information is encrypted and secure (RBI compliant)</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("info")}
                  className="px-6 py-3.5 rounded-xl font-bold border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white py-3.5 rounded-xl font-bold text-lg transition flex items-center justify-center gap-2"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock size={18} /> Pay {formatPrice(total)}
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </form>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-28">
            <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-xs text-gray-600">Qty: {quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatPrice(product.price * quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
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
              <div className="border-t border-gray-100 pt-2 flex justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-xl text-gray-900">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
