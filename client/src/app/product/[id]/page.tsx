"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext"; // Import Cart Context
import { Button } from "@/app/component";

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export default function ProductDetail() {
  const router = useRouter();
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://krb0s4z1gb.execute-api.us-east-1.amazonaws.com/dev/api/v1/products/${id}`);
        const resObject = await res.json();
        console.log("resObject",resObject)
        setProduct(resObject.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="relative">
        <Image src={product.image} alt={product.title} width={500} height={500} className="w-full rounded-lg w-50 h-96" />
      </div>

      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-2 text-yellow-500 mt-2">⭐ {product.rating.rate} ({product.rating.count} Review)</div>

        <div className="flex items-center gap-2 mt-4">
          <span className="text-2xl font-bold">₹ {product.price}</span>
          <span className="text-gray-400 line-through">{product.price}</span>
        </div>

        <p className="text-gray-600 mt-4">{product.description}</p>

        <div className="mt-6 flex gap-4">
          <button onClick={() => addToCart({ ...product, quantity: 1 })} className="border px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-100">
            🛒 Add to Cart
          </button>
          <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-800">
            🏷️ Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
