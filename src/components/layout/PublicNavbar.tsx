import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/layout/Logo";

export function PublicNavbar() {
  // const location = useLocation(); // Not needed if links are gone

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/20 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group mr-auto">
            <Logo className="h-24 -my-2" />
          </Link>

          {/* Right side options removed as per request */}
        </div>
      </div>
    </header>
  );
}