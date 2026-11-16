import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  ShoppingBag,
  Star,
} from "lucide-react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://dummyjson.com/products?limit=8"),
          fetch("https://dummyjson.com/products/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error("Ma'lumotlarni olishda xatolik");
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData.products);
        setCategories(categoriesData.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getHomeData();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <span className="mb-5 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Welcome to NovaShop
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Discover Your
              <span className="block text-blue-600">Perfect Style</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              Explore our collection of quality products. Find everything you
              need in one place and enjoy a simple shopping experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                className="h-12 rounded-xl bg-blue-600 px-7 text-base hover:bg-blue-700"
              >
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-12 rounded-xl px-7 text-base"
              >
                <Link to="/products">Explore Products</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">1000+</h3>
                <p className="text-sm text-gray-500">Products</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">100%</h3>
                <p className="text-sm text-gray-500">Quality</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                <p className="text-sm text-gray-500">Support</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-blue-200/50 blur-3xl sm:h-96 sm:w-96" />
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
              alt="NovaShop collection"
              className="relative h-[350px] w-full rounded-3xl object-cover shadow-2xl sm:h-[450px]"
            />
            <div className="absolute bottom-6 left-2 rounded-2xl bg-white p-4 shadow-xl sm:-left-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Best Collection</p>
                  <p className="text-sm text-gray-500">Explore our products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {[
          {
            icon: Truck,
            title: "Free Shipping",
            description: "Free shipping on all orders",
          },
          {
            icon: ShieldCheck,
            title: "Secure Payment",
            description: "Your payment is always secure",
          },
          {
            icon: Headphones,
            title: "24/7 Support",
            description: "We are here to help you",
          },
          {
            icon: RotateCcw,
            title: "Easy Returns",
            description: "Simple and easy return process",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 rounded-2xl border border-gray-100 p-5"
          >
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <item.icon size={25} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-semibold text-blue-600">Categories</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 sm:flex"
          >
            View All <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/products`}
              className="group rounded-2xl border border-gray-100 bg-gray-50 p-5 text-center transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm transition group-hover:bg-blue-600 group-hover:text-white">
                <ShoppingBag size={25} />
              </div>
              <h3 className="text-sm font-semibold capitalize text-gray-800">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="font-semibold text-blue-600">Our Products</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="mt-2 text-gray-500">
                Discover our popular products
              </p>
            </div>

            <Link
              to="/products"
              className="hidden items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 sm:flex"
            >
              View All <ArrowRight size={18} />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="py-16 text-center text-gray-500">
              Products not found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-5">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-medium capitalize text-gray-400">
                      {product.category}
                    </p>

                    <h3 className="mt-2 line-clamp-1 font-bold text-gray-900">
                      {product.title}
                    </h3>

                    <div className="mt-3 flex items-center gap-1 text-amber-500">
                      <Star size={15} fill="currentColor" />
                      <span className="text-sm font-semibold text-gray-700">
                        {product.rating}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xl font-extrabold text-blue-600">
                        ${product.price}
                      </span>
                      <span className="rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition group-hover:bg-blue-600 group-hover:text-white">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild className="rounded-xl bg-blue-600">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center text-white sm:px-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/10" />

          <div className="relative">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              Special Collection
            </span>
            <h2 className="mt-6 text-3xl font-extrabold sm:text-4xl">
              Find Something You'll Love
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-blue-100">
              Explore our complete collection and discover products that make
              your everyday life better.
            </p>
            <Button
              asChild
              className="mt-8 h-12 rounded-xl bg-white px-8 font-bold text-blue-600 hover:bg-blue-50"
            >
              <Link to="/products">
                Explore Now <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
