"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

function CartPage() {
  const { cart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + Number(item.precio || 0) * Number(item.cantidad || 0),
    0
  );

  // 🔥 EMPTY STATE
  if (!cart.length) {
    return (
      <section className="min-h-dvh flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-semibold text-text-secondary mb-6">
          Tu carrito está vacío
        </h2>

        <Link
          href="/library"
          className="underline font-semibold hover:text-brand transition"
        >
          Explorar librería
        </Link>
      </section>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh">

      <main className="flex-1 max-w-4xl mx-auto px-5 py-8">
        <h1 className="text-3xl font-bold mb-8 border-b border-border-default pb-4">
          Carrito
        </h1>

        <ul className="space-y-6">
          {cart.map((item) => {
            const precio = Number(item.precio || 0);
            const cantidad = Number(item.cantidad || 0);
            const subtotal = precio * cantidad;

            const etiqueta =
              item.tipo === "cafeteria" ? "☕ Cafetería" : "📚 Libro";

            return (
              <li
                key={item.bookId}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-6"
              >
                {/* INFO */}
                <div className="flex gap-5 flex-1">
                  <img
                    src={
                      item.imagen?.startsWith("http")
                        ? item.imagen
                        : `/${item.imagen}`
                    }
                    alt={item.titulo}
                    className="w-20 h-28 object-cover rounded-md"
                  />

                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-xs text-slate-500">
                      {etiqueta}
                    </span>

                    <strong className="text-lg">
                      {item.titulo}
                    </strong>

                    <span className="text-sm">
                      {item.autor}
                    </span>

                    <strong className="text-brand">
                      ${precio.toLocaleString()}
                    </strong>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.bookId)}
                    className="w-8 h-8 border rounded-md font-bold hover:bg-brand hover:text-white"
                  >
                    -
                  </button>

                  <span className="font-bold w-6 text-center">
                    {cantidad}
                  </span>

                  <button
                    onClick={() => increaseQty(item.bookId)}
                    className="w-8 h-8 border rounded-md font-bold hover:bg-brand hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* SUBTOTAL */}
                <span className="font-bold text-lg md:w-32 text-right">
                  ${subtotal.toLocaleString()}
                </span>
              </li>
            );
          })}
        </ul>
      </main>

      {/* 🔥 STICKY TOTAL */}
      <div className="sticky bottom-0 w-full bg-brand-100 border-t shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">

          <div>
            <span className="font-bold block">TOTAL:</span>
            <span className="text-xl font-extrabold">
              ${total.toLocaleString()}
            </span>
          </div>

          <Link
            href="/checkout"
            className="btn-primary rounded-md font-semibold hover:shadow-lg"
          >
            Finalizar compra
          </Link>
        </div>
      </div>

    </div>
  );
}

export default CartPage;