import {
  LayoutDashboard, Package, PlusSquare, BadgeDollarSign,
  ReceiptText, Landmark, ScanLine, X, Menu, LogOut, Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const links = [
  { to: "/",             label: "Dashboard",  icon: LayoutDashboard },
  { to: "/scanner",      label: "Escanear",   icon: ScanLine        },
  { to: "/products",     label: "Stock",      icon: Package         },
  { to: "/sold-products",label: "Vendidos",   icon: BadgeDollarSign },
  { to: "/sales",        label: "Ventas",     icon: ReceiptText     },
  { to: "/exchange",     label: "Cotización", icon: Landmark        },
  { to: "/products/new", label: "Nuevo",      icon: PlusSquare      },
  { to: "/users",        label: "Usuarios",   icon: Users           },
];

const bottomLinks = links.slice(0, 5);

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const NavItems = ({ onNavigate }) => (
    <nav className="flex-1 flex flex-col">
      <div className="space-y-0.5 flex-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-base-text text-base-bg font-medium"
                  : "text-base-muted hover:bg-base-subtle hover:text-base-text"
              }`
            }
          >
            <Icon size={17} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      <div className="pt-4 mt-4 border-t border-base-border">
        <div className="px-3 py-2 mb-1">
          <p className="text-xs font-medium text-base-text truncate">{user?.name}</p>
          <p className="text-xs text-base-muted capitalize">{user?.role}</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-base-muted hover:bg-red-500/10 hover:text-red-400 w-full transition-all"
        >
          <LogOut size={17} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </nav>
  );

  const BrandMark = ({ size = "md" }) => {
    const s = size === "sm" ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-xs";
    const t = size === "sm" ? "text-sm" : "text-base";
    return (
      <div className="flex items-center gap-2.5">
        <div className={`${s} rounded-xl bg-base-text text-base-bg font-bold grid place-items-center flex-shrink-0`}>
          V
        </div>
        <span className={`${t} font-semibold text-base-text tracking-tight`}>Velto</span>
      </div>
    );
  };

  return (
    <>
      {/* ── DESKTOP sidebar ── */}
      <aside className="hidden md:flex w-64 bg-base-card border-r border-base-border min-h-screen p-4 flex-col">
        <div className="mb-6 px-2 pt-2">
          <BrandMark />
          <p className="text-xs text-base-muted mt-1 pl-10">Sistema de gestión</p>
        </div>
        <NavItems />
      </aside>

      {/* ── MOBILE top bar ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-base-card/90 backdrop-blur-xl border-b border-base-border px-4 py-3 flex items-center justify-between">
        <BrandMark size="sm" />
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-xl text-base-muted hover:bg-base-subtle transition"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── MOBILE drawer ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 bg-base-card border-r border-base-border h-full p-4 flex flex-col z-10">
            <div className="flex items-center justify-between mb-6 px-2 pt-2">
              <BrandMark />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-base-muted hover:bg-base-subtle transition"
              >
                <X size={18} />
              </button>
            </div>
            <NavItems onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* ── MOBILE bottom navbar ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-base-card/90 backdrop-blur-xl border-t border-base-border flex items-center justify-around px-2 py-2">
        {bottomLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition text-xs ${
                isActive ? "text-base-text font-medium" : "text-base-muted hover:text-base-text"
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
        <button
          onClick={() => setMobileOpen(true)}
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-base-muted hover:text-base-text transition text-xs"
        >
          <Menu size={20} />
          <span>Más</span>
        </button>
      </nav>
    </>
  );
}
