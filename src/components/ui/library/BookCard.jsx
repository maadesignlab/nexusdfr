"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import BookImage from "./BookImage";

function BookCard({ libro }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();

    const itemParaCarrito = {
      ...libro,
      bookId: libro.id,
    };

    addToCart(itemParaCarrito);
  };

  return (
    <article className="relative glass-card p-5 flex flex-col transition-all">

      {/* BADGE */}
      {libro.masVendido && (
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500 text-white z-10">
          Más vendido
        </span>
      )}

      {/* IMAGE */}
      <div
        onClick={() => router.push(`/library/${libro.id}`)}
        className="relative w-full aspect-[2/3] mt-6 mb-4 rounded-xl overflow-hidden cursor-pointer"
      >
        <BookImage
          src={libro.imagen}
          alt={libro.titulo}
          size="card"
        />
      </div>

      {/* TITLE */}
      <h3 className="min-h-[3rem] flex items-center font-semibold text-base line-clamp-2">
        {libro.titulo}
      </h3>

      {/* AUTHOR */}
      <p className="text-sm text-text-primary">
        {libro.autor}
      </p>

      {/* CATEGORY */}
      <p className="text-xs text-brand-700 mb-3">
        {libro.categoria}
      </p>

      {/* PRICE */}
      <p className="text-lg font-bold mt-auto mb-4">
        ${libro.precio?.toLocaleString()}
      </p>

      {/* BUTTON DETAIL */}
      <button
        onClick={() => router.push(`/library/${libro.id}`)}
        className="btn-primary w-full py-2 mt-3"
      >
        Ver detalle
      </button>

      {/* BUTTON CART */}
      <button
        onClick={handleAddToCart}
        className="btn-primary w-full py-2 mt-3"
      >
        Añadir al carrito
      </button>

    </article>
  );
}

export default BookCard;