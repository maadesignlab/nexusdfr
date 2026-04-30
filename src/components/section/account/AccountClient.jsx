"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { storeService } from "@/services/storeService";

// ==========================================
// COMPONENTES STUB
// ==========================================
function AccountSidebar({ onTabChange, activeTab }) {
  const tabs = [
    { id: "perfil", label: "Perfil" },
    { id: "historial-compras", label: "Historial Compras" },
    { id: "historial-reservas", label: "Historial Reservas" },
    { id: "preferencias", label: "Preferencias" },
  ];
  return (
    <div className="flex flex-col gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`text-left px-4 py-2 rounded-md transition-colors ${
            activeTab === tab.id 
              ? "bg-brand-100 font-bold text-brand-900" 
              : "hover:bg-slate-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function HistoryItem({ compra }) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 p-5 border border-border-light rounded-xl sm:items-center bg-white shadow-sm hover:shadow-md transition">
      <img 
        src={compra.imagen || "https://placehold.net/120x180"} 
        alt={compra.titulo} 
        className="w-24 h-36 object-cover rounded-md border border-slate-100" 
      />
      
      <div className="flex-1 space-y-1">
        <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded-full mb-1 uppercase tracking-wider">
          Completado
        </div>
        <h3 className="text-xl font-bold text-slate-900">{compra.titulo || "Libro Desconocido"}</h3>
        <p className="text-sm font-semibold text-amber-600">Orden #{compra.purchaseId || compra.id || "000"}</p>
        <div className="pt-2">
          <p className="text-xs text-slate-500">Precio total</p>
          <p className="text-lg font-bold text-slate-900">
            ${compra.precio ? Number(compra.precio).toLocaleString("es-CO") : "0"}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:items-end justify-between self-stretch py-1 gap-4 sm:gap-0">
        <span className="text-sm text-slate-600 font-medium">{compra.fecha || "9 feb 2025"}</span>
        <button className="px-5 py-2 bg-slate-900 text-white font-medium rounded-full text-sm hover:bg-slate-800 transition shadow-sm mt-auto">
          Ver detalles
        </button>
      </div>
    </div>
  );
}

export default function AccountClient() {
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState("historial-compras");

  useEffect(() => {
    const loadPurchases = async () => {
      if (!user?.id) return;
      setLoading(true);
      try {
        const compras = await storeService.getPurchases(user.id);
        setPurchases(compras);
      } catch (error) {
        console.error("Error al cargar compras:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPurchases();
  }, [user]);

  const userProfile = {
    nombre: user?.nombre || "Usuario Nexus",
    email: user?.correo || user?.email || "usuario@nexus.com.co",
    rol: user?.rol || "Miembro",
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "perfil":
        return (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-8 border-b border-border-default text-center md:text-left">
              <img src="https://placehold.net/avatar-4.svg" alt="Avatar" className="w-24 h-24 rounded-full object-cover ring-2 ring-brand-500" />
              <div>
                <h1 className="text-2xl font-semibold text-text-primary">{userProfile.nombre}</h1>
                <span className="inline-block mt-2 px-4 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-900 border border-brand-200">
                  {userProfile.rol}
                </span>
                <p className="mt-2 text-text-primary">{userProfile.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-bg-fill border border-border-light rounded-xl p-6">
                <h4 className="text-xs uppercase text-text-primary/50 mb-2">Libro en préstamo</h4>
                <p className="font-semibold text-text-primary">Próximamente disponible</p>
                <p className="text-xs text-text-secondary mt-1">Sistema de préstamos en desarrollo</p>
              </div>
              <div className="bg-bg-fill border border-border-light rounded-xl p-6">
                <h4 className="text-xs uppercase text-text-primary/50 mb-2">Próximo coworking</h4>
                <p className="font-semibold text-text-primary">Próximamente disponible</p>
                <p className="text-xs text-text-secondary mt-1">Sistema de reservas en desarrollo</p>
              </div>
            </div>
          </div>
        );

      case "historial-compras":
        return (
          <div className="space-y-6">
            {loading ? (
              <p className="text-text-secondary">Cargando compras...</p>
            ) : purchases && purchases.length > 0 ? (
              purchases.map((compra) => (
                <HistoryItem key={compra.purchaseId || compra.id} compra={compra} />
              ))
            ) : (
              <div className="text-text-secondary">Aún no tienes compras registradas.</div>
            )}
          </div>
        );

      case "historial-reservas":
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-brand-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Historial de Reservas</h3>
              <p className="text-text-secondary mb-6">Aquí podrás ver todas tus reservas.</p>
              <div className="bg-bg-fill border border-border-light rounded-xl p-6 max-w-md mx-auto">
                <p className="text-sm text-text-primary/70">Funcionalidad próximamente disponible.</p>
              </div>
            </div>
          </div>
        );

      case "preferencias":
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-6">Preferencias de Cuenta</h3>
              <div className="space-y-6">
                <div className="bg-bg-fill border border-border-light rounded-xl p-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-4">Notificaciones</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">Recordatorios de préstamos</span>
                      <input type="checkbox" defaultChecked className="rounded border-border-light" />
                    </label>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition">
                    Guardar Preferencias
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-text-secondary">Sección en construcción.</div>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] max-w-6xl mx-auto w-full px-4 md:px-6 py-8 gap-6 flex-1">
      <aside className="border border-border-light rounded-2xl shadow-md p-4 md:p-6 h-fit">
        <AccountSidebar onTabChange={setActiveTab} activeTab={activeTab} />
      </aside>
      <main className="border border-border-light rounded-2xl shadow-card p-6 md:p-8">
        {renderTabContent()}
      </main>
    </div>
  );
}
