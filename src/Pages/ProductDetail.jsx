import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product topilmadi");
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading product...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <button
          onClick={() => navigate("/products")}
          className="mt-5 rounded-lg bg-black px-5 py-2 text-white"
        >
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <button
        onClick={() => navigate("/products")}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-black"
      >
        ← Back to products
      </button>

      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
        {/* Product image */}
        <div className="flex items-center justify-center rounded-2xl bg-gray-100 p-6 md:p-10">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-64 w-full object-contain md:h-96"
          />
        </div>

        {/* Product information */}
        <div className="flex flex-col">
          <span className="mb-3 w-fit rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold tracking-tight md:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="text-yellow-500">★</span>
            <span className="font-medium">{product.rating}</span>
            <span className="text-gray-400">|</span>
            <span className="text-sm text-gray-500">{product.brand}</span>
          </div>

          <p className="mt-6 leading-7 text-gray-600">{product.description}</p>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">Price</p>
            <p className="mt-1 text-3xl font-bold">${product.price}</p>
          </div>

          <button className="mt-6 w-full rounded-xl bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800 active:scale-[0.98]">
            Add to Cart
          </button>

          <div className="mt-6 space-y-2 text-sm text-gray-500">
            <p>✓ Quality product</p>
            <p>✓ Secure shopping</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
