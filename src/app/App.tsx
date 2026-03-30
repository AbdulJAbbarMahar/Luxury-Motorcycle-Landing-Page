import { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { PerformanceBento } from "./components/PerformanceBento";
import { EngineeringMacro } from "./components/EngineeringMacro";
import { CTASection } from "./components/CTASection";
import { Navigation } from "./components/Navigation";
import { WaitlistModal } from "./components/WaitlistModal";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full overflow-x-hidden" style={{ backgroundColor: "#F5F8FF" }}>
      {/* Fixed nav — always on top */}
      <Navigation onOpenModal={() => setModalOpen(true)} />

      {/* Page sections */}
      <HeroSection />
      <PerformanceBento />
      <EngineeringMacro />
      <CTASection onOpenModal={() => setModalOpen(true)} />

      {/* Waitlist modal */}
      <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
