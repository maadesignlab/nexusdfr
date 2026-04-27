"use client";

function CoworkingModal({ space, onClose, onStartBooking }) {
  if (!space) return null;

  const horariosHoy = ["12:00h", "13:00h", "17:00h"];

  const ocupados = space.horariosOcupados || [];

  const normalize = (h) => h.replace("h", "");

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl p-6 md:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl opacity-70 hover:opacity-100"
        >
          ×
        </button>

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold">
            {space.nombre}
          </h2>
        </div>

        {/* INFO */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <InfoItem label="Tipo" value={space.tipo} />
          <InfoItem label="Capacidad" value={`${space.capacidad} personas`} />
          <InfoItem label="Ubicación" value={space.ubicacion} />
        </div>

        {/* HORARIOS */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">
            Horarios disponibles hoy
          </h3>

          <div className="space-y-2">
            {horariosHoy.map((hora) => {
              const isAvailable = !ocupados.includes(normalize(hora));

              return (
                <button
                  key={hora}
                  disabled={!isAvailable}
                  onClick={() => onStartBooking(hora)}
                  className={`
                    w-full flex justify-between items-center
                    px-4 py-3 rounded-lg border transition
                    ${
                      isAvailable
                        ? "hover:border-black hover:shadow-sm"
                        : "opacity-50 cursor-not-allowed line-through"
                    }
                  `}
                >
                  <span className="font-medium">{hora}</span>
                  <span className="text-sm font-semibold">
                    {isAvailable ? "Reservar" : "Ocupado"}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onStartBooking(null)}
            className="btn-primary w-full py-3 mt-4"
          >
            Elegir otra fecha
          </button>
        </div>
      </div>
    </div>
  );
}

/* SUBCOMPONENTE */
function InfoItem({ label, value }) {
  return (
    <div className="flex justify-between border rounded-lg px-4 py-3">
      <span className="text-text-secondary">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default CoworkingModal;