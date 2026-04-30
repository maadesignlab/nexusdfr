function CoworkingSiteCard({ space, onClick }) {
  if (!space) return null;

  const estaOcupado = space.ocupado;

  return (
    <article
      onClick={onClick}
      className="relative bg-white border border-slate-200 rounded-[1.75rem] p-6 flex flex-col gap-5 cursor-pointer transition-all duration-200 hover:shadow-lg group"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold text-slate-950">
          {space.nombre}
        </h3>

        <span className="text-xs text-slate-500 capitalize">
          {space.ubicacion}
        </span>
      </div>

      {/* TIPO */}
           <span className="
        text-xs font-medium
        px-3 py-1 rounded-full w-fit
        bg-brand-100 text-brand-700
      ">
            {space.tipo}
          </span>

      {/* INFO */}
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <span>👥</span>
        <span>{space.capacidad} personas</span>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-slate-200" />

      <span className={`inline-flex items-center text-sm font-semibold px-4 py-2 rounded-full ${estaOcupado ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"}`}>
        {estaOcupado ? "Ocupado" : "Disponible"}
      </span>
    </article>
  );
}

export default CoworkingSiteCard;