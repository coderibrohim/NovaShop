import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import CartContext from "../Context/CartContext";
import React, { useEffect, useState, useContext } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const { addToCart } = useContext(CartContext);
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("https://dummyjson.com/products?limit=0").then((res) => {
        if (!res.ok) throw new Error("Products API xatolik");
        return res.json();
      }),
      fetch("https://dummyjson.com/products/categories").then((res) => {
        if (!res.ok) throw new Error("Categories API xatolik");
        return res.json();
      }),
    ])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData.products);
        setCategories(categoriesData);
      })
      .catch(() => setError("Xatolik yuz berdi"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-blue-600"></span>
          <p className="text-sm text-gray-500">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-80 items-center justify-center">
        <p className="rounded-xl bg-red-50 px-6 py-4 text-red-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return <p className="py-20 text-center text-gray-500">No Data</p>;
  }

  const productsFilter = products.filter((e) => {
    return (
      e.title.toLowerCase().includes(search.toLowerCase()) &&
      (!selectedCategory || e.category === selectedCategory)
    );
  });

  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = productsFilter.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const totalPages = Math.ceil(productsFilter.length / productsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const middlePages = pages.filter((page) => {
    return (
      page >= currentPage - 1 &&
      page <= currentPage + 1 &&
      page > 1 &&
      page < totalPages
    );
  });

  const visiblePages =
    totalPages <= 5
      ? pages
      : currentPage === 1
      ? [1, 2, 3, "...", totalPages]
      : currentPage === totalPages
      ? [1, "...", totalPages - 2, totalPages - 1, totalPages]
      : [1, "...", ...middlePages, "...", totalPages];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Our Products
        </h1>
        <p className="mt-2 text-gray-500">Discover products you'll love.</p>
      </div>

      {/* Search and filters */}
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:flex-row md:items-center">
        <input
          type="text"
          onChange={(e) => {
            setSearch(e.target.value), setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:flex-1"
          placeholder="Search products..."
        />

        <select
          onChange={(e) => {
            setSelectedCategory(e.target.value), setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 md:w-56"
        >
          <option value="">All categories</option>
          {categories.map((items) => {
            return (
              <option key={items.slug} value={items.slug}>
                {items.name}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => {
            setProductsPerPage(Number(e.target.value)), setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-blue-500 md:w-40"
        >
          <option value="12">12 products</option>
          <option value="24">24 products</option>
          <option value="48">48 products</option>
        </select>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productsFilter.length === 0 ? (
          <p className="col-span-full py-20 text-center text-lg text-gray-500">
            No products found
          </p>
        ) : (
          currentProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group h-full"
            >
              <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-52 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={product.thumbnail}
                    alt="Product image"
                    className="h-full w-full object-contain p-4 transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex flex-1 flex-col">
                  <span className="mb-2 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                    {product.category}
                  </span>

                  <h2 className="line-clamp-2 min-h-14 text-lg font-semibold text-gray-800 transition group-hover:text-blue-600">
                    {product.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <h5 className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </h5>

                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="rounded-xl bg-black px-4 text-white transition hover:bg-gray-800"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:justify-between">
        <Button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          className="w-full rounded-xl sm:w-auto"
        >
          ← Previous
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="mr-2 text-sm text-gray-500">
            {currentPage} / {totalPages}
          </span>

          {visiblePages.map((e, index) => {
            return e === "..." ? (
              <span key={index} className="px-2 text-gray-400">
                {e}
              </span>
            ) : (
              <Button
                key={index}
                className={
                  currentPage === e
                    ? "rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    : "rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
                onClick={() => {
                  setCurrentPage(e);
                }}
              >
                {e}
              </Button>
            );
          })}
        </div>

        <Button
          disabled={currentPage === totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          className="w-full rounded-xl sm:w-auto"
        >
          Next →
        </Button>
      </div>
    </div>
  );
};

export default Products;
