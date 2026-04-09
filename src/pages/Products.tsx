import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, LayoutList } from "lucide-react";
import { fetchProducts, searchProducts, categories, type Product } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");

  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");
  const activeCategory = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    setLoading(true);
    const load = search ? searchProducts(search) : fetchProducts(categoryId || undefined);
    load.then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryId, search]);

  const sorted = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price;
      case "price-high": return b.price - a.price;
      case "rating": return b.rating - a.rating;
      default: return b.reviews - a.reviews;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <span className="hover:text-brand-600 cursor-pointer">Home</span>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">
          {search ? `Search: "${search}"` : activeCategory?.name || "All Products"}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <SlidersHorizontal size={18} /> Categories
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setSearchParams({})}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  !categoryId ? "bg-brand-50 text-brand-700 font-semibold" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                All Products
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setSearchParams({ category: cat.id })}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                    categoryId === cat.id
                      ? "bg-brand-50 text-brand-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{cat.icon}</span> {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Products */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500 text-sm">
              <span className="font-semibold text-gray-900">{products.length}</span> products found
            </p>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 ${view === "grid" ? "bg-brand-50 text-brand-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 ${view === "list" ? "bg-brand-50 text-brand-600" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="flex justify-between">
                      <div className="h-5 bg-gray-200 rounded w-16" />
                      <div className="h-9 bg-gray-200 rounded w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-3"}>
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
