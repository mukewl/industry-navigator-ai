import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4">
      <div className="glass-panel-strong rounded-xl px-12 py-14 text-center shadow-apple">
        <h1 className="mb-3 font-display text-4xl font-semibold tracking-tight text-foreground">404</h1>
        <p className="mb-8 text-[1.0625rem] leading-[1.47] text-muted-foreground">Oops! Page not found</p>
        <a
          href="/"
          className="inline-flex h-11 items-center rounded-lg bg-primary px-[15px] text-[0.9375rem] font-normal text-primary-foreground shadow-apple-sm transition-[filter] hover:brightness-105"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
