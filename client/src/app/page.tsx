"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "./component";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://krb0s4z1gb.execute-api.us-east-1.amazonaws.com/dev/api/v1/products");
        const resObject = await res.json();
        setProducts(resObject.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest Products</h2>
        <button className="bg-black text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 hover:bg-gray-800">
          View All →
        </button>
      </div>

      {/* Product Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product:any) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>
    </div>
  );
}
