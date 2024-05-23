"use client";

import { useCartStore } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { currecyFormat } from "../../../../../utils/currencyFormat";
import { useRouter } from "next/navigation";

export const ProductsInCart = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  if (productsInCart.length === 0) {
    router.replace("/empty");
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <span className="">
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">
              {currecyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
