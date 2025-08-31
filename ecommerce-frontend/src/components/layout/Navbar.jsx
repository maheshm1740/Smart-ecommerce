"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  TagIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";
import { useCart } from "../../contexts/CartContext";

const categories = ["All", "Electronics", "Clothing", "Shoes", "Books"];
const priceRanges = ["All", "0 - 500", "500 - 1000", "1000 - 5000", "5000+"];

export default function Navbar() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedPrice, setSelectedPrice] = useState(priceRanges[0]);
  const { cart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
    <div className="container flex items-center justify-between gap-6 p-4 mx-auto">

      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 cursor-pointer">
        ShopEase
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/Home"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          Home
        </Link>
        <Link
          to="/orders"
          className="font-medium text-gray-700 hover:text-blue-600"
        >
          Orders
        </Link>
      </div>

      {/* Middle Controls */}
      <div className="flex items-center gap-6">
        {/* Category Selector */}
        <div className="flex items-center gap-2">
          <TagIcon className="w-5 h-5 text-gray-600" />
          <p className="text-sm italic">Category</p>
          <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="relative">
              <Listbox.Button className="flex items-center gap-1 px-3 py-2 text-sm border rounded-lg">
                {selectedCategory}
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 w-40 mt-1 bg-white rounded-lg shadow-lg">
                {categories.map((cat) => (
                  <Listbox.Option
                    key={cat}
                    value={cat}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {cat}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Price Selector */}
        <div className="flex items-center gap-2">
          <CurrencyDollarIcon className="w-5 h-5 text-gray-600" />
          <p className="text-sm italic">Price</p>
          <Listbox value={selectedPrice} onChange={setSelectedPrice}>
            <div className="relative">
              <Listbox.Button className="flex items-center gap-1 px-3 py-2 text-sm border rounded-lg">
                {selectedPrice}
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 w-40 mt-1 bg-white rounded-lg shadow-lg">
                {priceRanges.map((price) => (
                  <Listbox.Option
                    key={price}
                    value={price}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {price}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        {/* Search Bar */}
        <div className="flex items-center px-3 py-2 border rounded-lg w-72 bg-gray-50">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 ml-2 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Cart Button */}
      <Link
        to="/cart"
        className="relative flex items-center gap-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
      >
        <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
        <span>Cart</span>
        {cart.totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {cart.totalItems}
          </span>
        )}
      </Link>
    </div>
  </nav>
  );
}
