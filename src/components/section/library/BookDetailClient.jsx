"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

function BookDetailClient({ book }) {
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);

  if (!book) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </main>
    );
  }

  const handleAddToCart = () => {
    addToCart(
      {
        ...book,
        bookId: book.id,
      },
      cantidad
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-5 py-8">

      <div className="grid md:grid-cols-[300px_1fr] gap-10">

        {/* IMAGE */}
        <img
          src={`/${book.imagen}`}
          alt={book.titulo}
          className="rounded-lg"
        />

        {/* INFO */}
        <section>

          <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-xs">
            {book.categoria}
          </span>

          <h1 className="text-4xl font-bold mt-4">
            {book.titulo}
          </h1>

          <p className="text-lg mt-2">
            {book.autor}
          </p>

          <p className="text-3xl font-bold mt-4">
            ${book.precio?.toLocaleString()}
          </p>

          <p className="mt-6">
            {book.sinopsis}
          </p>

          {/* CART */}
          <div className="flex gap-4 mt-8">

            <div className="flex border rounded">
              <button onClick={() => setCantidad(c => Math.max(1, c - 1))}>-</button>
              <span className="px-4">{cantidad}</span>
              <button onClick={() => setCantidad(c => c + 1)}>+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded"
            >
              Añadir
            </button>

          </div>

        </section>
      </div>
    </main>
  );
}

export default BookDetailClient;