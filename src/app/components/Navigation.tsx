import { motion, useScroll, useTransform } from "motion/react";

interface NavigationProps {
  onOpenModal: () => void;
}

export function Navigation({ onOpenModal }: NavigationProps) {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.92]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100] px-10 md:px-20 py-6 flex justify-between items-center"
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {/* Animated frosted background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: bgOpacity,
          backgroundColor: "#F5F8FF",
          borderBottom: "1px solid rgba(26,26,26,0.08)",
        }}
      />

      {/* Logo */}
      <button
        onClick={() => scrollTo("hero")}
        className="relative z-10 cursor-pointer"
        style={{ background: "none", border: "none" }}
      >
        <span
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "#1A1A1A",
            fontSize: "1.1rem",
          }}
        >
          AERO
        </span>
      </button>

      {/* Nav links + reserve button */}
      <div className="relative z-10 flex items-center gap-10">
        {[
          { label: "Technology", target: "performance" },
          { label: "Specs", target: "engineering" },
        ].map(({ label, target }) => (
          <button
            key={label}
            onClick={() => scrollTo(target)}
            className="hover:opacity-40 transition-opacity duration-300 cursor-pointer"
            style={{
              fontFamily: "'Geist Mono', monospace",
              color: "#1A1A1A",
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              background: "none",
              border: "none",
            }}
          >
            {label}
          </button>
        ))}
        <button
          onClick={onOpenModal}
          className="px-6 py-2.5 rounded-full text-white transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "#0066FF",
            fontFamily: "'Geist Mono', monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            border: "none",
          }}
        >
          RESERVE
        </button>
      </div>
    </motion.nav>
  );
}
