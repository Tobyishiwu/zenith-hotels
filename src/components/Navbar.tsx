import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const mainLinks = [
  { label: "Home", path: "/" },
  { label: "Rooms & Suites", path: "/rooms" },
];

const exploreLinks = [
  { label: "Dining", path: "/dining" },
  { label: "Spa", path: "/spa" },
  { label: "Gym", path: "/gym" },
  { label: "Swimming Pool", path: "/pool" },
  { label: "Meetings & Events", path: "/events" },
  { label: "Wedding Venue", path: "/wedding" },
  { label: "Gallery", path: "/gallery" },
  { label: "Offers", path: "/offers" },
];

const endLinks = [
  { label: "About", path: "/about" },
  { label: "Blog", path: "/blog" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileExploreOpen, setIsMobileExploreOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-primary/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="font-heading text-2xl text-primary tracking-wide">
          Zenith Hotels
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {mainLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => `font-body text-sm tracking-wide transition-colors ${isActive ? "text-accent" : "text-primary hover:text-accent"}`}>
              {link.label}
            </NavLink>
          ))}

          <div className="relative" onMouseEnter={() => setIsExploreOpen(true)} onMouseLeave={() => setIsExploreOpen(false)}>
            <button className="font-body text-sm tracking-wide text-primary hover:text-accent transition-colors flex items-center gap-1">
              Explore <ChevronDown size={14} />
            </button>

            {isExploreOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                <div className="bg-white rounded-xl shadow-xl p-4 grid grid-cols-2 gap-1 w-72">
                  {exploreLinks.map((link) => (
                    <NavLink key={link.path} to={link.path} className={({ isActive }) => `font-body text-sm px-3 py-2.5 rounded-lg transition-colors ${isActive ? "text-accent bg-accent/10" : "text-primary hover:bg-primary/5"}`}>
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {endLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => `font-body text-sm tracking-wide transition-colors ${isActive ? "text-accent" : "text-primary hover:text-accent"}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/rooms" className="hidden lg:inline-block bg-accent text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-primary transition-colors">
          Book Now
        </Link>

        <button className="lg:hidden text-primary" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <nav className="lg:hidden flex flex-col gap-1 px-6 pb-6">
          {mainLinks.map((link) => (
            <NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `font-body py-3 border-b border-primary/10 ${isActive ? "text-accent" : "text-primary"}`}>
              {link.label}
            </NavLink>
          ))}

          <button onClick={() => setIsMobileExploreOpen(!isMobileExploreOpen)} className="font-body py-3 border-b border-primary/10 text-primary flex items-center justify-between">
            Explore <ChevronDown size={16} className={isMobileExploreOpen ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
          {isMobileExploreOpen && (
            <div className="pl-4 flex flex-col">
              {exploreLinks.map((link) => (
                <NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `font-body py-2.5 text-sm ${isActive ? "text-accent" : "text-primary/70"}`}>
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}

          {endLinks.map((link) => (
            <NavLink key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={({ isActive }) => `font-body py-3 border-b border-primary/10 ${isActive ? "text-accent" : "text-primary"}`}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
