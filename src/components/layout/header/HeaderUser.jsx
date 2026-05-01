"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";

function HeaderUser({
  accountRef,
  openAccount,
  setOpenAccount,
  user,
}) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setOpenAccount(false);
    router.push("/");
  };

  return (
    <div ref={accountRef} className="relative">

      {/* TRIGGER */}
      <button
        onClick={() => setOpenAccount(!openAccount)}
        className="
          flex items-center gap-2
          px-3 py-1.5
          rounded-md
          hover:bg-slate-100
          transition
        "
      >
        <div className="
          w-7 h-7
          rounded-full
          bg-brand-500 text-black
          flex items-center justify-center text-xs font-bold
        ">
          {user?.nombre?.charAt(0) || "U"}
        </div>

        <span className="text-sm font-medium">
          {user?.nombre}
        </span>
      </button>

      {/* DROPDOWN */}
      {openAccount && (
        <div className="
          absolute right-0 mt-3 w-48
          bg-white border border-border-default
          rounded-xl shadow-xl
          p-2
          z-50
        ">

          {/* HEADER USER */}
          <div className="px-3 py-2 border-b border-border-default">
            <p className="text-sm font-semibold truncate">
              {user?.nombre}
            </p>
            <p className="text-xs text-text-secondary truncate">
              {user?.correo}
            </p>
          </div>

          {/* MENU */}
          <div className="py-2 flex flex-col">

            <button
              onClick={() => {
                router.push("/account");
                setOpenAccount(false);
              }}
              className="
                flex items-center gap-2
                px-3 py-2
                text-sm
                hover:bg-slate-100
                rounded-md
                transition
              "
            >
              <User size={16} />
              Mi cuenta
            </button>

            <button
              onClick={handleLogout}
              className="
                flex items-center gap-2
                px-3 py-2
                text-sm
                text-red-500
                hover:bg-red-50
                rounded-md
                transition
              "
            >
              <LogOut size={16} />
              Cerrar sesión
            </button>

          </div>

        </div>
      )}
    </div>
  );
}

export default HeaderUser;