import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import bikeImg from "figma:asset/9a32ac9020498d1b55a1b5981aff23866f3cdf8e.png";

const performanceData = [
  { id: "01", label: "Top Speed", value: "340", unit: "km/h" },
  { id: "02", label: "Launch", value: "1.9s", unit: "0–100" },
  { id: "03", label: "Range", value: "420", unit: "km" },
  { id: "04", label: "Peak Torque", value: "215", unit: "Nm" },
  { id: "05", label: "Motor Output", value: "220", unit: "kW" },
  { id: "06", label: "Curb Weight", value: "198", unit: "kg" },
];

export function PerformanceBento() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Section cross-fade
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0, 1, 1, 0]);

  // Image parallax — moves slower than the scroll, stays in background
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      id="performance"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden flex items-center"
      style={{ backgroundColor: "#F5F8FF" }}
    >
      {/* ── BACKGROUND: Motorcycle Image ── */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 z-0 flex items-center justify-end"
      >
        <img
          src={bikeImg}
          alt="AERO-G7 rear profile"
          className="h-full w-auto object-contain"
          style={{ maxWidth: "75%", transform: "translateX(5%)" }}
          draggable={false}
        />
      </motion.div>

      {/* ── GRADIENT: right-side mask so stats panel is clean ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(245,248,255,1) 0%, rgba(245,248,255,0.97) 32%, rgba(245,248,255,0.5) 55%, rgba(245,248,255,0.0) 80%)",
        }}
      />
      {/* Top + bottom edge fades */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{ height: "12%", background: "linear-gradient(to bottom, rgba(245,248,255,1), transparent)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{ height: "12%", background: "linear-gradient(to top, rgba(245,248,255,1), transparent)" }}
      />

      {/* ── CONTENT ── */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="relative z-20 w-full max-w-7xl px-10 md:px-20 py-20"
      >
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#0066FF",
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
          }}
          className="mb-4"
        >
          PERFORMANCE · DATA
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#1A1A1A",
            fontSize: "clamp(2.8rem, 5vw, 5rem)",
            lineHeight: 0.95,
          }}
        >
          Engineered
          <br />
          beyond limits.
        </motion.h2>

        {/* Stat grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px w-full max-w-lg"
          style={{ border: "1px solid rgba(26,26,26,0.07)", borderRadius: "1.25rem", overflow: "hidden" }}
        >
          {performanceData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col p-5"
              style={{
                backgroundColor: "rgba(245,248,255,0.92)",
                backdropFilter: "blur(8px)",
                borderRight: i % 3 !== 2 ? "1px solid rgba(26,26,26,0.07)" : "none",
                borderBottom: i < 3 ? "1px solid rgba(26,26,26,0.07)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  color: "#1A1A1A",
                  fontSize: "0.6rem",
                  opacity: 0.35,
                  letterSpacing: "0.14em",
                  marginBottom: "0.6rem",
                }}
              >
                {item.id}
              </span>
              <span
                style={{
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 800,
                  letterSpacing: "-0.025em",
                  color: "#1A1A1A",
                  fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
                  lineHeight: 1,
                }}
              >
                {item.value}
              </span>
              <div className="mt-1.5 flex items-center justify-between">
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    color: "#1A1A1A",
                    fontSize: "0.62rem",
                    opacity: 0.45,
                    letterSpacing: "0.06em",
                  }}
                >
                  {item.unit}
                </span>
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    color: "#0066FF",
                    fontSize: "0.6rem",
                    opacity: 0.6,
                    letterSpacing: "0.08em",
                  }}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blue accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 origin-left"
          style={{ height: "1px", backgroundColor: "#0066FF", opacity: 0.25, maxWidth: "200px" }}
        />
      </motion.div>
    </section>
  );
}
