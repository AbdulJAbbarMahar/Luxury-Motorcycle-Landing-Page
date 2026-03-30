import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import bikeImg from "figma:asset/5e8a19438fb3c49384d8904e81d4b4a531b5bc09.png";

interface CTASectionProps {
  onOpenModal: () => void;
}

export function CTASection({ onOpenModal }: CTASectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0, 0.12, 0.12, 0]);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#F5F8FF" }}
    >
      {/* ── GHOST BACKGROUND: very faint bike silhouette ── */}
      <motion.div
        style={{ y: imageY, opacity: imageOpacity }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <img
          src={bikeImg}
          alt=""
          aria-hidden
          className="w-full h-full object-contain"
          style={{ filter: "grayscale(1)" }}
          draggable={false}
        />
      </motion.div>

      {/* ── CONTENT ── */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="relative z-20 text-center max-w-4xl px-8"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#0066FF",
            fontSize: "0.68rem",
            letterSpacing: "0.22em",
            marginBottom: "1.5rem",
          }}
        >
          LIMITED PRODUCTION · 777 UNITS
        </motion.p>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#1A1A1A",
            fontSize: "clamp(3.5rem, 9vw, 9rem)",
            lineHeight: 0.9,
            marginBottom: "1.5rem",
          }}
        >
          THE FUTURE
          <br />
          <span style={{ color: "#0066FF" }}>IS FINITE.</span>
        </motion.h2>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Geist Mono', monospace",
            color: "#1A1A1A",
            fontSize: "0.8rem",
            opacity: 0.45,
            letterSpacing: "0.05em",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Hand-assembled in London. Delivered 2026.<br />
          Your position is secured with a fully refundable deposit.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenModal}
          className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-white cursor-pointer"
          style={{
            backgroundColor: "#0066FF",
            fontFamily: "'Geist Mono', monospace",
            fontSize: "0.75rem",
            letterSpacing: "0.18em",
            boxShadow: "0 8px 32px rgba(0, 102, 255, 0.35), 0 2px 8px rgba(0,0,0,0.1)",
            border: "none",
          }}
        >
          JOIN THE WAITLIST
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 flex justify-center items-center gap-10 flex-wrap"
        >
          {[
            { label: "Production", value: "2026" },
            { label: "Units", value: "777" },
            { label: "Starting", value: "£145K" },
            { label: "Origin", value: "London" },
          ].map((item, i) => (
            <div key={item.label} className="flex items-center gap-10">
              <div className="text-center">
                <div
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "#1A1A1A",
                    fontSize: "1.5rem",
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    color: "#1A1A1A",
                    fontSize: "0.6rem",
                    opacity: 0.35,
                    letterSpacing: "0.12em",
                    marginTop: "0.3rem",
                  }}
                >
                  {item.label}
                </div>
              </div>
              {i < 3 && (
                <div style={{ width: "1px", height: "28px", backgroundColor: "rgba(26,26,26,0.1)" }} />
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Corner accent */}
      <div
        className="absolute bottom-10 left-10 md:left-20 z-20 hidden md:block"
        style={{
          fontFamily: "'Geist Mono', monospace",
          color: "#1A1A1A",
          fontSize: "0.6rem",
          opacity: 0.2,
          letterSpacing: "0.15em",
        }}
      >
        © 2026 AERO MOTORSPORT LTD
      </div>
    </section>
  );
}
