import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import PageMotionShell from "../ui/PageMotionShell.jsx";
import AuroraField from "../ui/AuroraField.jsx";

export default function MainLayout({ onLogout }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-zinc-950">
      <AuroraField />

      <div className="app-shell-reveal relative z-10 pt-[76px]">
        <Header onLogout={onLogout} />
        <main className="relative">
          <div className="mx-auto max-w-[1680px] px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
            <PageMotionShell>
              <Outlet />
            </PageMotionShell>
          </div>
        </main>
      </div>
    </div>
  );
}
