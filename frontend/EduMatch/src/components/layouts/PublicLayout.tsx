import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export function PublicLayout() {
  return (
    <div className="bg-background text-on-background min-h-screen selection:bg-primary selection:text-on-primary">
      <Navbar />
      <main className="pt-16 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}
