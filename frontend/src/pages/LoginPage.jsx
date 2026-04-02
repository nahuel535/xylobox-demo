import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();
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
      await login("demo@xylobox.store", "demo");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-bg text-base-text flex items-center justify-center p-6">
      <div className="bg-base-card border border-base-border rounded-3xl p-8 w-full max-w-sm shadow-elevated">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Xylo" className="w-16 h-16 rounded-2xl mb-4 shadow-soft" />
          <h1 className="text-2xl font-semibold text-base-text tracking-tight">Xylo</h1>
          <p className="text-base-muted text-sm mt-1">Sistema interno</p>
        </div>

        {/* Demo access pill */}
        <div className="mb-5 bg-xylo-500/8 border border-xylo-500/20 rounded-2xl p-4">
          <p className="text-xs font-semibold text-xylo-400 uppercase tracking-widest mb-1">Modo Demo</p>
          <p className="text-sm text-base-muted mb-3">Explorá el sistema con datos simulados.</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full bg-xylo-500 hover:bg-xylo-600 disabled:opacity-60 transition text-white rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm"
          >
            {loading ? "Ingresando..." : "Ingresar al demo →"}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-base-border" />
          <span className="text-xs text-base-muted">o ingresá con tu cuenta</span>
          <div className="flex-1 h-px bg-base-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="text-sm text-base-muted mb-2">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-base-subtle border border-base-border rounded-xl px-4 py-3 text-base-text outline-none focus:ring-2 focus:ring-xylo-500/20 focus:border-xylo-500 transition"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <p className="text-sm text-base-muted mb-2">Contraseña</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-base-subtle border border-base-border rounded-xl px-4 py-3 text-base-text outline-none focus:ring-2 focus:ring-xylo-500/20 focus:border-xylo-500 transition"
              placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-base-subtle hover:bg-base-border disabled:opacity-60 transition text-base-text rounded-xl px-4 py-3 font-medium shadow-sm"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
