"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DashboardClient({
  totalLibros,
  espaciosDisponibles,
}) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10
        grid gap-6
        grid-cols-1 md:grid-cols-2 lg:grid-cols-4
        auto-rows-[minmax(180px,auto)]
      "
    >

      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="
          bg-slate-100 border rounded-2xl p-6 sm:p-8
          md:col-span-2 md:row-span-2
        "
      >
        <h1 className="text-3xl font-semibold mb-3">
          Bienvenido a Nexus
        </h1>

        <p className="mb-6">
          Gestiona tu lectura y espacios desde un solo lugar.
        </p>

        <div className="flex gap-8 flex-wrap">
          <Stat label="Libros" value={totalLibros} />
          <Stat label="Espacios libres" value={espaciosDisponibles} />
          <Stat label="Año fiscal" value="2026" />
        </div>
      </motion.section>

      {/* CARDS */}
      <Card
        delay={0.2}
        icon="📚"
        title="Librería"
        onClick={() => router.push("/library")}
      />

      <Card
        delay={0.3}
        icon="🏢"
        title="Coworking"
        onClick={() => router.push("/coworking")}
      />

      <Card
        delay={0.4}
        icon="👤"
        title="Mi cuenta"
        onClick={() => router.push("/account")}
      />

    </motion.div>
  );
}

/* COMPONENTES */

function Stat({ label, value }) {
  return (
    <div>
      <strong className="text-2xl">{value}</strong>
      <p className="text-sm text-text-primary">{label}</p>
    </div>
  );
}

function Card({ icon, title, onClick, delay }) {
  return (
    <motion.section
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className="
        bg-slate-100 border rounded-2xl p-6
        cursor-pointer
      "
    >
      <span className="text-3xl block mb-3">{icon}</span>
      <h2 className="text-xl font-semibold">{title}</h2>
    </motion.section>
  );
}