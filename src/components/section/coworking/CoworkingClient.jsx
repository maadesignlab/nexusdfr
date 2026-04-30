"use client";

import { useState, useMemo } from "react";
import CoworkingModal from "@/components/ui/coworking/CoworkingModal";
import CoworkingSiteCard from "@/components/ui/coworking/CoworkingSiteCard";
import BookingFlow from "@/components/ui/coworking/CoworkingModalBooking";
import { motion, AnimatePresence } from "framer-motion";

function CoworkingClient({ spaces = [] }) {

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");

  const closeModal = () => {
    setSelectedSpace(null);
    setIsBooking(false);
  };

  // 🔥 FILTRADO + STATS + AGRUPACIÓN (todo en uno)
  const { grouped, stats } = useMemo(() => {

    const filtered =
      estadoFiltro === "Todos"
        ? spaces
        : spaces.filter(s =>
            estadoFiltro === "Disponible" ? !s.ocupado : s.ocupado
          );

    const grouped = filtered.reduce((acc, space) => {
      const key = space.ubicacion || "otros";
      if (!acc[key]) acc[key] = [];
      acc[key].push(space);
      return acc;
    }, {});

    const stats = spaces.reduce(
      (acc, s) => {
        acc.total++;
        s.ocupado ? acc.ocupados++ : acc.disponibles++;
        return acc;
      },
      { total: 0, disponibles: 0, ocupados: 0 }
    );

    return { grouped, stats };

  }, [spaces, estadoFiltro]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      {/* HEADER */}
      <div className="mb-6 space-y-6">
        <h1 className="text-3xl font-bold">
          Espacios de Coworking
        </h1>

        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Espacios totales" value={stats.total} />
          <StatCard title="Disponibles" value={stats.disponibles} />
          <StatCard title="Ocupados" value={stats.ocupados} />
        </div>

        {/* FILTROS */}
        <div className="flex gap-4">
          {["Todos", "Disponible", "Ocupado"].map((estado) => (
            <button
              key={estado}
              onClick={() => setEstadoFiltro(estado)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition
                ${estadoFiltro === estado 
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 hover:bg-slate-200"}
              `}
            >
              {estado}
            </button>
          ))}
        </div>
      </div>

      {/* 🔥 RENDER DINÁMICO POR PISO */}
      {Object.entries(grouped).reverse().map(([piso, spaces]) => (
        <Section key={piso} title={piso}>
          <Grid spaces={spaces} onClick={setSelectedSpace} />
        </Section>
      ))}

      {/* MODAL */}
      {selectedSpace &&
        (!isBooking ? (
          <CoworkingModal
            space={selectedSpace}
            onClose={closeModal}
            onStartBooking={() => setIsBooking(true)}
          />
        ) : (
          <BookingFlow
            space={selectedSpace}
            onClose={closeModal}
          />
        ))}
    </main>
  );
}

/* ================= COMPONENTES ================= */

function Grid({ spaces, onClick }) {
  return (
    <AnimatePresence>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {spaces.map((space) => (
          <motion.div
            key={space.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CoworkingSiteCard
              space={space}
              onClick={() => onClick(space)}
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}

function Section({ title, children }) {
  return (
    <div className="card p-6 space-y-6 mb-6">
      <h3 className="text-xl font-semibold capitalize">{title}</h3>
      {children}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="flex justify-between items-center gap-4 rounded-3xl border border-slate-200 border-black rounded-3xl px-6 py-5 shadow-sm transition hover:shadow-md">
      <span className="text-sm font-medium text-slate-700">{title}</span>
      <span className="text-xl font-bold text-slate-950">{value}</span>
    </div>
  );
}

export default CoworkingClient;