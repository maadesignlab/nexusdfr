"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Stepper from "@/components/ui/Stepper";
import { useLoader } from "@/hooks/useLoader";

function BookingFlow({ space, onClose, selectedHour }) {

  const router = useRouter();

  const [step, setStep] = useState(selectedHour ? 2 : 1);

  const [bookingData, setBookingData] = useState({
    hora: selectedHour ? selectedHour.replace("h", "") : "",
    celular: "",
    notas: "",
  });

  const ocupados = space.horariosOcupados || [];

  const horarios = [
    "08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00",
  ];

  const { isLoading, startLoading, stopLoading } = useLoader(false);

  const update = (key, value) => {
    setBookingData((prev) => ({ ...prev, [key]: value }));
  };

  const handleConfirm = async () => {
    startLoading();

    try {
      await new Promise((res) => setTimeout(res, 1200));

      // 🔥 aquí conectarías backend

      onClose();
      router.push("/dashboard");

    } finally {
      stopLoading();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50">
          <p className="text-white">Procesando reserva...</p>
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-2xl p-6 md:p-8 space-y-6"
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl opacity-70 hover:opacity-100"
        >
          ×
        </button>

        <h2 className="text-xl font-bold">
          Reserva en {space.nombre}
        </h2>

        <Stepper step={step} clickable={false} />

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {horarios.map((h) => {
                const ocupado = ocupados.includes(h);
                const active = bookingData.hora === h;

                return (
                  <button
                    key={h}
                    disabled={ocupado}
                    onClick={() => update("hora", h)}
                    className={`
                      py-2 rounded-lg text-sm border transition
                      ${
                        active
                          ? "bg-black text-white"
                          : ocupado
                            ? "opacity-40 cursor-not-allowed line-through"
                            : "hover:bg-slate-100"
                      }
                    `}
                  >
                    {h}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button onClick={onClose} className="btn-secondary flex-1">
                Cancelar
              </button>

              <button
                disabled={!bookingData.hora}
                onClick={() => setStep(2)}
                className="btn-primary flex-1 disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">

            <p className="text-sm">
              Hora: <strong>{bookingData.hora}</strong>
            </p>

            <input
              type="tel"
              placeholder="Celular"
              value={bookingData.celular}
              onChange={(e) => update("celular", e.target.value)}
              className="input w-full"
            />

            <textarea
              placeholder="Notas (opcional)"
              value={bookingData.notas}
              onChange={(e) => update("notas", e.target.value)}
              className="input w-full"
            />

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                Atrás
              </button>

              <button
                disabled={!bookingData.celular}
                onClick={() => setStep(3)}
                className="btn-primary flex-1"
              >
                Revisar
              </button>
            </div>

          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">

            <div className="card space-y-2 text-sm">
              <p><strong>Espacio:</strong> {space.nombre}</p>
              <p><strong>Hora:</strong> {bookingData.hora}</p>
              <p><strong>Celular:</strong> {bookingData.celular}</p>
              <p><strong>Notas:</strong> {bookingData.notas || "—"}</p>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                Atrás
              </button>

              <button onClick={handleConfirm} className="btn-primary flex-1">
                Confirmar
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default BookingFlow;