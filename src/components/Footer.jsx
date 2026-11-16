import React from "react";
import { Link } from "react-router-dom";
import {
  Store,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Globe,
  Camera,
  MessageCircle,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <Link to="/" className="mb-5 flex items-center gap-2">
              <div className="rounded-xl bg-blue-600 p-2 text-white">
                <Store size={23} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Nova<span className="text-blue-500">Shop</span>
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Your favorite online shopping destination. Discover quality
              products and enjoy a simple shopping experience with NovaShop.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: Globe, url: "https://facebook.com" },
                { icon: Camera, url: "https://instagram.com" },
                { icon: MessageCircle, url: "https://twitter.com" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-800 text-gray-300 transition hover:bg-blue-600 hover:text-white"
                >
                  <item.icon size={19} />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="transition hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="transition hover:text-blue-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="transition hover:text-blue-400">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">
              Customer Service
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#faq" className="transition hover:text-blue-400">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#shipping" className="transition hover:text-blue-400">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#returns" className="transition hover:text-blue-400">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#privacy" className="transition hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-6 text-lg font-bold text-white">Contact Us</h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-blue-500" size={19} />
                <span className="text-gray-400">Online Shopping Store</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-blue-500" size={19} />
                <a
                  href="mailto:support@novashop.com"
                  className="transition hover:text-blue-400"
                >
                  support@novashop.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-blue-500" size={19} />
                <a
                  href="tel:+998900000000"
                  className="transition hover:text-blue-400"
                >
                  +998 90 000 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="flex flex-col justify-between gap-6 border-y border-gray-800 py-8 md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Stay Updated</h3>
            <p className="mt-2 text-sm text-gray-400">
              Subscribe to get updates about our latest products.
            </p>
          </div>

          <a
            href="mailto:support@novashop.com"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Contact Us <ArrowRight size={17} />
          </a>
        </div>

        {/* BOTTOM FOOTER */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-center text-sm text-gray-500 sm:flex-row">
          <p>
            © <span className=" text-accent">Ibrohim</span> {new Date().getFullYear()} NovaShop. All
            rights reserved.
          </p>
          <p>
            Made with <span className="text-red-500"></span> for a better
            shopping experience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
