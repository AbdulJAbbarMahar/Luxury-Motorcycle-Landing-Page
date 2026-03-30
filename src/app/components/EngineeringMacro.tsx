import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import detailImg from "figma:asset/dba2c60f3d9b00ac4e5bcab3cf480d938adf71bb.png";

const callouts = [
  {
    id: 1,
    title: "Neural Damping",
    subtitle: "Adaptive Suspension System",
    spec: "0.001s response",
    position: { top: "14%", left: "6%" },
    anchor: { top: "36%", left: "28%" },
  },
  {
    id: 2,
    title: "Axial-Flux Hub",
    subtitle: "Concentric Direct Drive",
    spec: "215 Nm peak",
    position: { bottom: "16%", right: "8%" },
    anchor: { bottom: "30%", right: "22%" },
  },
];

export function EngineeringMacro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      id="engineering"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#0a0a0f" }}
    >
      {/* ── BACKGROUND: Close-up detail image with parallax ── */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0 z-0"
      >
        <img
          src={detailImg}
          alt="AERO-G7 engineering detail"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.88 }}
          draggable={false}
        />
      </motion.div>

      {/* ── DARK GRADIENT OVERLAYS: make text readable ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.3) 50%, rgba(10,10,15,0.7) 100%)",
        }}
      />
      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 z-10 pointer-events-none"
        style={{ height: "18%", background: "linear-gradient(to bottom, rgba(10,10,15,0.9), transparent)" }}
      />
      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{ height: "20%", background: "linear-gradient(to top, rgba(10,10,15,0.9), transparent)" }}
      />

      {/* ── CONTENT ── */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="relative z-20 w-full h-full flex flex-col justify-between px-10 md:px-20 py-14"
      >
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            style={{
              fontFamily: "'Geist Mono', monospace",
              color: "#0066FF",
              fontSize: "0.68rem",
              letterSpacing: "0.22em",
            }}
          >
            ENGINEERING · MACRO
          </p>
        </motion.div>

        {/* Bottom heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#F5F8FF",
              fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
              lineHeight: 0.93,
            }}
          >
            Precision at
            <br />
            <span style={{ color: "#0066FF" }}>every atom.</span>
          </h2>
          <p
            className="mt-5 max-w-sm opacity-45"
            style={{
              fontFamily: "'Geist Mono', monospace",
              color: "#F5F8FF",
              fontSize: "0.78rem",
              lineHeight: 1.7,
              letterSpacing: "0.04em",
            }}
          >
            Aerospace-grade carbon fibre monocoque. Hand-laminated in London. Tolerances measured in microns.
          </p>
        </motion.div>
      </motion.div>

      {/* ── CALLOUT ANNOTATIONS ── */}
      {callouts.map((callout, index) => (
        <Callout key={callout.id} callout={callout} delay={index * 0.25} />
      ))}
    </section>
  );
}

function Callout({
  callout,
  delay,
}: {
  callout: {
    id: number;
    title: string;
    subtitle: string;
    spec: string;
    position: Record<string, string>;
    anchor: Record<string, string>;
  };
  delay: number;
}) {
  return (
    <>
      {/* Pulsing anchor dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-30"
        style={callout.anchor}
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-5 h-5 rounded-full"
            style={{ backgroundColor: "#0066FF" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full border-2 relative z-10"
            style={{ borderColor: "#0066FF", backgroundColor: "#F5F8FF" }}
          />
        </div>
      </motion.div>

      {/* Text callout card */}
      <motion.div
        initial={{ opacity: 0, y: callout.position.top ? 12 : -12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-30 min-w-[220px]"
        style={callout.position}
      >
        <div
          className="px-5 py-4 rounded-2xl"
          style={{
            backgroundColor: "rgba(10,10,15,0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(0, 102, 255, 0.25)",
          }}
        >
          <div
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#F5F8FF",
              fontSize: "1.2rem",
              lineHeight: 1.1,
            }}
          >
            {callout.title}
          </div>
          <div
            className="mt-1"
            style={{
              fontFamily: "'Geist Mono', monospace",
              color: "#0066FF",
              fontSize: "0.68rem",
              letterSpacing: "0.06em",
            }}
          >
            {callout.subtitle}
          </div>
          <div
            className="mt-2 pt-2"
            style={{
              borderTop: "1px solid rgba(0,102,255,0.2)",
              fontFamily: "'Geist Mono', monospace",
              color: "#F5F8FF",
              fontSize: "0.65rem",
              opacity: 0.45,
              letterSpacing: "0.1em",
            }}
          >
            {callout.spec}
          </div>
        </div>
      </motion.div>
    </>
  );
}
