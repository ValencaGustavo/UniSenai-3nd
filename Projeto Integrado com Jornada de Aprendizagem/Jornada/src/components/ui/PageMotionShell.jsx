import { useLocation } from "react-router-dom";

export default function PageMotionShell({ children }) {
  const { pathname } = useLocation();

  return (
    <div className="page-motion-shell relative">
      <div key={pathname} className="page-motion-content page-soft-enter relative z-[1]">
        {children}
      </div>
    </div>
  );
}
