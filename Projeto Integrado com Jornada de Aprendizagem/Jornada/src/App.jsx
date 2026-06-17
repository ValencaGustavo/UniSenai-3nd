import { lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const MainLayout = lazy(() => import("./components/layout/MainLayout.jsx"));
const Freight = lazy(() => import("./pages/Freight.jsx"));
const Import = lazy(() => import("./pages/Import.jsx"));
const Clients = lazy(() => import("./pages/Clients.jsx"));
const Reports = lazy(() => import("./pages/Reports.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

function AppLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f5f7fb] text-zinc-950">
      <div className="rounded-[8px] border border-white/80 bg-white/88 px-4 py-3 text-center shadow-[0_22px_60px_-42px_rgb(15_23_42_/_0.85)] backdrop-blur-xl">
        <span className="mx-auto block h-[3px] w-16 rounded-full bg-hazard-tape-thin" />
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          carregando FastAriam
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => window.sessionStorage.getItem("fastariam-auth") === "true"
  );

  function handleLogin() {
    window.sessionStorage.setItem("fastariam-auth", "true");
    setAuthenticated(true);
  }

  function handleLogout() {
    window.sessionStorage.removeItem("fastariam-auth");
    setAuthenticated(false);
  }

  if (!authenticated) {
    return (
      <Suspense fallback={<AppLoader />}>
        <Login onLogin={handleLogin} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route element={<MainLayout onLogout={handleLogout} />}>
          <Route path="/" element={<Navigate to="/importacao" replace />} />
          <Route path="/dashboard" element={<Navigate to="/importacao" replace />} />
          <Route path="/pedidos" element={<Navigate to="/importacao" replace />} />
          <Route path="/frete" element={<Freight />} />
          <Route path="/planejamento" element={<Navigate to="/frete" replace />} />
          <Route path="/importacao" element={<Import />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="*" element={<Navigate to="/importacao" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
