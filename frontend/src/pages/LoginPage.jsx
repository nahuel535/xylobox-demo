import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.detail || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin() {
    setLoading(true);
    setError("");
    try {
      await login("demo@velto.app", "demo");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-bg text-base-text flex items-center justify-center p-6">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-base-text text-base-bg font-bold text-2xl grid place-items-center mb-5 shadow-elevated">
            V
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Velto</h1>
          <p className="text-base-muted text-sm mt-1">Sistema de gestión comercial</p>
        </div>

        {/* Demo card */}
        <div className="bg-base-card border border-base-border rounded-3xl p-6 mb-4 shadow-elevated">

          <div className="mb-4">
            <p className="text-xs font-semibold text-base-text uppercase tracking-widest mb-1">Demo</p>
            <p className="text-sm text-base-muted leading-relaxed">
              Explorá el sistema completo con datos reales simulados.
              Este es un ejemplo basado en <span className="text-base-text font-medium">XYLO</span> — cada instalación de Velto es 100% personalizada a tu marca.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-base-text hover:opacity-90 disabled:opacity-50 transition text-base-bg rounded-xl px-4 py-3 text-sm font-semibold"
          >
            {loading ? "Ingresando..." : "Ingresar al demo →"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-base-border" />
          <span className="text-xs text-base-muted">o ingresá con tu cuenta</span>
          <div className="flex-1 h-px bg-base-border" />
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-base-card border border-base-border rounded-xl px-4 py-3 text-base-text placeholder:text-base-muted outline-none focus:ring-1 focus:ring-base-text/30 focus:border-base-text/40 transition text-sm"
            placeholder="tu@email.com"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-base-card border border-base-border rounded-xl px-4 py-3 text-base-text placeholder:text-base-muted outline-none focus:ring-1 focus:ring-base-text/30 focus:border-base-text/40 transition text-sm"
            placeholder="••••••••"
          />
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-base-subtle hover:bg-base-border disabled:opacity-50 transition text-base-text rounded-xl px-4 py-3 text-sm font-medium"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
