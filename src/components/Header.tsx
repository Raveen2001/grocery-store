import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, MapPin, ChevronDown } from "lucide-react";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../data/format";
import Logo from "./Logo";
import { useState } from "react";

export default function Header() {
  const { cartCount, cartTotal, isAuthenticated, user, login, logout } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-brand-700 text-white text-sm py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <MapPin size={14} />
            <span>Delivering to <strong>Mumbai 400001</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>Free delivery on orders over ₹499</span>
            <span>|</span>
            <span>Same-day delivery available</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo size={40} />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 leading-none">FreshCart</h1>
              <p className="text-xs text-gray-600">Fresh & Fast Delivery</p>
            </div>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for groceries, brands, and more..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
            </div>
          </form>

          {/* User */}
          <div className="relative">
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  login({ name: "Rahul Sharma", email: "rahul@example.com" });
                } else {
                  setShowUserMenu(!showUserMenu);
                }
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-brand-600 transition"
            >
              <User size={22} />
              <div className="hidden md:block text-left">
                <p className="text-xs text-gray-600">{isAuthenticated ? `Hello, ${user?.name}` : "Sign In"}</p>
                <p className="text-sm font-semibold flex items-center gap-0.5">
                  Account <ChevronDown size={14} />
                </p>
              </div>
            </button>
            {showUserMenu && isAuthenticated && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <Link
                  to="/orders"
                  onClick={() => setShowUserMenu(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => { logout(); setShowUserMenu(false); }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-xl transition relative"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-xs opacity-80">Cart</p>
              <p className="text-sm font-bold">{formatPrice(cartTotal)}</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
