import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setSubmitted(false), 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[200] cursor-pointer"
            style={{ backgroundColor: "rgba(26, 26, 26, 0.6)", backdropFilter: "blur(8px)" }}
            onClick={handleClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[201] flex items-center justify-center px-6 pointer-events-none"
          >
            <div
              className="relative w-full max-w-lg pointer-events-auto rounded-3xl overflow-hidden"
              style={{
                backgroundColor: "#F5F8FF",
                border: "1px solid rgba(0, 102, 255, 0.12)",
                boxShadow: "0 40px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.8)",
              }}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                style={{ backgroundColor: "rgba(26,26,26,0.08)" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              <div className="p-10">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Header */}
                      <div className="mb-10">
                        <p
                          className="text-xs tracking-widest mb-3 opacity-50"
                          style={{ fontFamily: "'Geist Mono', monospace", color: "#1A1A1A", letterSpacing: "0.15em" }}
                        >
                          PRODUCTION 2026 · 777 UNITS
                        </p>
                        <h2
                          style={{
                            fontFamily: "'Bricolage Grotesque', sans-serif",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "#1A1A1A",
                            fontSize: "2.5rem",
                            lineHeight: 1,
                          }}
                        >
                          Reserve Your
                          <br />
                          <span style={{ color: "#0066FF" }}>AERO-G7</span>
                        </h2>
                        <p
                          className="mt-4 opacity-50"
                          style={{ fontFamily: "'Geist Mono', monospace", color: "#1A1A1A", fontSize: "0.8rem", lineHeight: 1.6 }}
                        >
                          Secure your position among the 777.<br />Fully refundable reservation deposit of £5,000.
                        </p>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {[
                          { id: "name", label: "FULL NAME", type: "text", placeholder: "James Anderson" },
                          { id: "email", label: "EMAIL ADDRESS", type: "email", placeholder: "james@example.com" },
                          { id: "phone", label: "PHONE", type: "tel", placeholder: "+44 7700 000000" },
                        ].map(({ id, label, type, placeholder }) => (
                          <div key={id}>
                            <label
                              htmlFor={id}
                              className="block text-xs mb-2 opacity-40"
                              style={{ fontFamily: "'Geist Mono', monospace", color: "#1A1A1A", letterSpacing: "0.1em" }}
                            >
                              {label}
                            </label>
                            <input
                              id={id}
                              type={type}
                              placeholder={placeholder}
                              value={form[id as keyof typeof form]}
                              onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                              required={id !== "phone"}
                              className="w-full px-4 py-3.5 rounded-xl outline-none transition-all duration-200 placeholder-opacity-30"
                              style={{
                                backgroundColor: "rgba(26,26,26,0.05)",
                                border: "1px solid rgba(26,26,26,0.1)",
                                fontFamily: "'Geist Mono', monospace",
                                color: "#1A1A1A",
                                fontSize: "0.875rem",
                              }}
                              onFocus={(e) => {
                                e.target.style.border = "1px solid rgba(0,102,255,0.4)";
                                e.target.style.backgroundColor = "rgba(0,102,255,0.03)";
                              }}
                              onBlur={(e) => {
                                e.target.style.border = "1px solid rgba(26,26,26,0.1)";
                                e.target.style.backgroundColor = "rgba(26,26,26,0.05)";
                              }}
                            />
                          </div>
                        ))}

                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="mt-2 w-full py-4 rounded-full text-white text-xs tracking-widest transition-shadow duration-300 hover:shadow-lg"
                          style={{
                            backgroundColor: "#0066FF",
                            fontFamily: "'Geist Mono', monospace",
                            letterSpacing: "0.15em",
                            boxShadow: "0 4px 20px rgba(0,102,255,0.3)",
                          }}
                        >
                          SECURE MY POSITION →
                        </motion.button>

                        <p
                          className="text-center opacity-30 mt-2"
                          style={{ fontFamily: "'Geist Mono', monospace", color: "#1A1A1A", fontSize: "0.7rem", letterSpacing: "0.05em" }}
                        >
                          Fully refundable · No commitment required
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8"
                        style={{ backgroundColor: "rgba(0,102,255,0.1)" }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12L10 17L19 8" stroke="#0066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                      <h3
                        className="mb-4"
                        style={{
                          fontFamily: "'Bricolage Grotesque', sans-serif",
                          fontWeight: 800,
                          letterSpacing: "-0.02em",
                          color: "#1A1A1A",
                          fontSize: "2rem",
                          lineHeight: 1.1,
                        }}
                      >
                        You're on the list.
                      </h3>
                      <p
                        className="opacity-50 mb-10"
                        style={{ fontFamily: "'Geist Mono', monospace", color: "#1A1A1A", fontSize: "0.8rem", lineHeight: 1.7 }}
                      >
                        We'll be in touch with your reservation<br />confirmation within 24 hours.
                      </p>
                      <div
                        className="inline-flex items-center gap-3 px-6 py-3 rounded-full"
                        style={{ backgroundColor: "rgba(0,102,255,0.08)", border: "1px solid rgba(0,102,255,0.15)" }}
                      >
                        <span
                          style={{ fontFamily: "'Geist Mono', monospace", color: "#0066FF", fontSize: "0.75rem", letterSpacing: "0.1em" }}
                        >
                          PRODUCTION · 2026 · LONDON
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
