import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation, MapPin } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { audioManager } from '@/audio/AudioManager';

export const FastTravelModal: React.FC = () => {
  const activeModal = useGameStore((s) => s.activeModal);
  const closeModal = useGameStore((s) => s.closeModal);
  const teleportTo = useGameStore((s) => s.teleportTo);
  const setActiveZone = useGameStore((s) => s.setActiveZone);
  const unlockAchievement = useGameStore((s) => s.unlockAchievement);

  if (activeModal !== 'fasttravel') return null;

  const campusLocations: { name: string; pos: [number, number, number]; desc: string }[] = [
    { name: 'Main Gate', pos: [0, 1.5, 35], desc: 'Welcome Gate & Registration Archway' },
    { name: 'Administration HQ', pos: [0, 1.5, 25], desc: 'University Governance & Seal Dome' },
    { name: 'Library & Biography', pos: [-25, 1.5, -15], desc: 'Rafiu Biography, Books & Skill Matrix' },
    { name: 'AI Neural Lab', pos: [35, 1.5, -20], desc: 'Deep Learning & Neural Network Core' },
    { name: 'Innovation Lab', pos: [35, 1.5, 10], desc: 'Prototyping & Emerging Tech Incubator' },
    { name: 'Cyber Security Vault', pos: [-45, 1.5, 10], desc: 'Zero-Trust Telemetry & Firewall Fortress' },
    { name: 'Robotics Assembly', pos: [35, 1.5, 25], desc: 'Autonomous Edge AI & Computer Vision Bay' },
    { name: 'Dormitory Quarter', pos: [-35, 1.5, 35], desc: 'Student Living & Personal Lounge' },
    { name: 'Central Park', pos: [-20, 1.5, 0], desc: 'Botanical Park, Gazebo & Benches' },
    { name: 'Centennial Bridge', pos: [0, 1.5, -55], desc: 'Suspension Bridge over Campus Lake' },
    { name: 'Campus Cafe', pos: [20, 1.5, 0], desc: 'Coffee Lounge & Informal Chat Station' },
    { name: 'Tech History Museum', pos: [-35, 1.5, -45], desc: 'Computing Artifacts & Historical Exhibits' },
    { name: 'Art & Design Gallery', pos: [35, 1.5, -45], desc: 'Spatial UI & Dynamic Holographic Artwork' },
    { name: 'Clock Tower Square', pos: [0, 1.5, 0], desc: 'Campus Crossroads Monumental Clock Tower' },
    { name: 'Food Court Plaza', pos: [25, 1.5, 45], desc: 'Al Fresco Dining & Food Plaza' },
    { name: 'Grand Auditorium Stage', pos: [-35, 1.5, 10], desc: 'Awards, Hall of Fame & Applause' },
    { name: 'Football Stadium', pos: [55, 1.5, -60], desc: 'University Sports Field & Stadium' },
    { name: 'EV Parking Grid', pos: [-55, 1.5, 55], desc: 'Autonomous Electric Vehicle Charger Grid' },
    { name: 'Centennial Lake', pos: [0, 1.5, -75], desc: 'Scenic Lake Water Reflection Area' },
    { name: 'Sky Observatory', pos: [0, 1.5, -95], desc: 'Giant Telescope Dome for Cosmic Research' },
    { name: 'Startup Incubator', pos: [-20, 1.5, 35], desc: 'Venture Pitch Decks & Founder Hub' },
    { name: 'Secret AI Cave', pos: [-50, 1.5, -80], desc: 'Underground Secret Debug Lab & Boss Portal' },
  ];

  const handleTeleport = (loc: typeof campusLocations[0]) => {
    audioManager.playHologram();
    teleportTo(loc.pos);
    setActiveZone(loc.name);
    unlockAchievement('fast_traveler', 'Master Navigator', 'Teleported to a campus landmark', 150);
    closeModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="glass-panel relative w-full max-w-3xl overflow-hidden rounded-3xl p-6 md:p-8 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="fast-travel-title"
        >
          <button
            onClick={closeModal}
            aria-label="Close Fast Travel"
            className="absolute right-6 top-6 rounded-2xl bg-white/10 p-2 text-slate-400 hover:bg-white/20 hover:text-white transition-all"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/30 text-blue-400 border border-blue-500/30">
              <Navigation className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white" id="fast-travel-title">
                Campus Fast Travel Teleport System
              </h2>
              <p className="text-xs text-slate-400">Instant warp access to all 22 University Landmarks</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto pr-1">
            {campusLocations.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => handleTeleport(loc)}
                className="glass-button flex items-start gap-3 rounded-2xl p-3 text-left transition-all hover:border-blue-400/50"
              >
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-white">{loc.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-snug mt-0.5">{loc.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
