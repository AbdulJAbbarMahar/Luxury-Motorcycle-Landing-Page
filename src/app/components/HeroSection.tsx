import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import bikeImg from "figma:asset/5e8a19438fb3c49384d8904e81d4b4a531b5bc09.png";

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Content fades and slides up as user scrolls away
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-12%"]);

  // Image parallax — moves slower than the page, creating depth
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full flex items-end justify-start overflow-hidden"
      style={{ backgroundColor: "#F5F8FF" }}
    >
      {/* ── BACKGROUND LAYER: Motorcycle Image with Parallax ── */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0 flex items-center justify-center"
      >
        {/*
          The image has a natural white/light studio background that
          blends with our #F5F8FF page. We position it to fill the
          full section and apply parallax — content sits on top (z-20+).
        */}
        <img
          src={bikeImg}
          alt="AERO-G7 side profile"
          className="w-full h-full object-contain object-center"
          style={{ transform: "scale(1.05) translateX(8%)" }}
          draggable={false}
        />
      </motion.div>

      {/* ── GRADIENT: left vignette so text is legible ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, rgba(245,248,255,0.98) 0%, rgba(245,248,255,0.7) 38%, rgba(245,248,255,0.0) 65%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{
          height: "28%",
          background: "linear-gradient(to top, rgba(245,248,255,1) 0%, rgba(245,248,255,0) 100%)",
        }}
      />

      {/* ── CONTENT: text sits in front of everything ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 w-full max-w-7xl px-10 md:px-20 pb-24 pt-32"
      >
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 opacity-50"
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#1A1A1A",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
          }}
        >
          ELECTRIC HYPERCRAFT &mdash; 2026
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#1A1A1A",
            fontSize: "clamp(5rem, 11vw, 10rem)",
            lineHeight: 0.92,
          }}
        >
          AERO
          <br />
          <span style={{ color: "#0066FF" }}>G7</span>
        </motion.h1>

        {/* Tagline row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center gap-8 flex-wrap"
        >
          {[
            { val: "340", unit: "km/h" },
            { val: "1.9s", unit: "0→100" },
            { val: "420", unit: "km range" },
          ].map(({ val, unit }, i) => (
            <div key={i} className="flex items-baseline gap-1.5">
              <span
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#1A1A1A",
                  fontSize: "1.6rem",
                }}
              >
                {val}
              </span>
              <span
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  color: "#1A1A1A",
                  fontSize: "0.72rem",
                  opacity: 0.45,
                  letterSpacing: "0.06em",
                }}
              >
                {unit}
              </span>
              {i < 2 && (
                <span className="ml-6" style={{ color: "rgba(26,26,26,0.15)", fontSize: "1rem" }}>
                  /
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── SCROLL INDICATOR ── */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 right-10 md:right-20 z-20 flex items-center gap-3"
      >
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#1A1A1A",
            fontSize: "0.65rem",
            opacity: 0.35,
            letterSpacing: "0.18em",
          }}
        >
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 relative overflow-hidden"
          style={{ backgroundColor: "rgba(26,26,26,0.15)" }}
        >
          <motion.div
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2"
            style={{ backgroundColor: "#0066FF" }}
          />
        </motion.div>
      </motion.div>

      {/* ── UNIT COUNTER ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute top-1/2 right-10 md:right-20 -translate-y-1/2 z-20 hidden md:flex flex-col items-end gap-1"
      >
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#0066FF",
            fontSize: "2.4rem",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          777
        </span>
        <span
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#1A1A1A",
            fontSize: "0.62rem",
            opacity: 0.35,
            letterSpacing: "0.12em",
          }}
        >
          UNITS · GLOBAL
        </span>
      </motion.div>
    </section>
  );
}
