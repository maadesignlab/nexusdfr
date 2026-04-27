"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { House } from "lucide-react";

function Login() {
  const router = useRouter();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setTouched(true);
    setError("");

    // 🔥 validación básica
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    try {
      await login(email.trim(), password);

      // ✅ evita volver al login
      router.replace("/dashboard");

    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <section className="min-h-dvh flex items-center justify-center px-4">

      <div className="
        relative w-full max-w-md
        bg-slate-100 border border-border-light
        shadow-card rounded-3xl
        p-8 sm:p-10
      ">

        {/* HOME */}
        <button
          onClick={() => router.replace("/")}
          className="btn-primary flex items-center gap-2"
        >
          <House size={18} />
          Home
        </button>

        {/* LOGO */}
        <div className="flex justify-center my-8">
          <img src="/img/nexus.svg" alt="Nexus" className="w-36" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-brand mb-8">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Usuario"
              className="input w-full text-sm"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Contraseña"
              className="input w-full text-sm"
              required
            />
          </div>

          {/* ERROR */}
          {(error || (touched && (!email || !password))) && (
            <p className="text-sm text-error text-center">
              {error || "Completa todos los campos"}
            </p>
          )}

          {/* DEMO */}
          <div className="
            flex flex-col gap-1 mt-4 p-4
            bg-brand-100 border border-border-light
            rounded-lg text-xs
          ">
            <p className="font-medium">Credenciales de acceso:</p>
            <p><strong>Usuario:</strong> miguel@gmail.com</p>
            <p><strong>Contraseña:</strong> 12345678</p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              btn-primary w-full mt-6
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Autenticando..." : "Entrar"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Login;