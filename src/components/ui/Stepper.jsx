"use client";

export default function Stepper({
  step = 1,
  onChange,
  clickable = true,
  steps = ["Seleccionar", "Datos", "Confirmar"], // 🔥 dinámico
}) {
  return (
    <div className="flex items-center justify-center w-full">

      {steps.map((label, i) => {
        const num = i + 1;
        const isActive = step === num;
        const isCompleted = step > num;

        return (
          <div key={num} className="flex items-center">

            {/* CÍRCULO */}
            <div
              onClick={() => clickable && onChange?.(num)}
              className={`
                w-9 h-9 flex items-center justify-center rounded-full font-bold text-sm
                transition-all
                ${clickable ? "cursor-pointer" : "cursor-default"}

                ${
                  isCompleted
                    ? "bg-brand-700 text-white"
                    : isActive
                      ? "bg-brand-500 text-white scale-110"
                      : "bg-border-default text-text-secondary"
                }
              `}
            >
              {isCompleted ? "✓" : num}
            </div>

            {/* LABEL */}
            <div className="hidden sm:block ml-2 mr-4 text-sm">
              <span
                className={`
                  ${
                    isActive
                      ? "font-semibold text-text"
                      : "text-text-secondary"
                  }
                `}
              >
                {label}
              </span>
            </div>

            {/* LINEA */}
            {i < steps.length - 1 && (
              <div
                className={`
                  h-[2px] w-10 sm:w-16 md:w-20
                  transition-colors
                  ${
                    isCompleted
                      ? "bg-brand-700"
                      : "bg-border-light"
                  }
                `}
              />
            )}
          </div>
        );
      })}

    </div>
  );
}