import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Logo size={32} />
              <span className="text-white font-bold text-lg">FreshCart</span>
            </div>
            <p className="text-sm text-gray-400">
              Your neighbourhood grocery store, now online. Fresh produce delivered to your doorstep across India.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
              <li><Link to="/products?category=fruits" className="hover:text-white transition">Fruits & Vegetables</Link></li>
              <li><Link to="/products?category=dairy" className="hover:text-white transition">Dairy & Eggs</Link></li>
              <li><Link to="/products?category=meat" className="hover:text-white transition">Meat & Seafood</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Track Order</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Returns</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Contact Us</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-white transition cursor-pointer">About Us</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Careers</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-white transition cursor-pointer">Terms of Service</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 FreshCart India Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
            <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="Mastercard" className="h-8" />
            <img src="https://img.icons8.com/color/48/rupay.png" alt="RuPay" className="h-8" />
            <img src="https://img.icons8.com/color/48/bhim-upi.png" alt="UPI" className="h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
}
