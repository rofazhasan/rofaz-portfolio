import React from 'react';
import { Experience } from './components/canvas/Experience';
import { HUD } from './components/ui/HUD';
import { ProjectModal } from './components/ui/ProjectModal';
import { ResumeModal } from './components/ui/ResumeModal';
import { FastTravelModal } from './components/ui/FastTravelModal';
import { BossBattleOverlay } from './components/ui/BossBattleOverlay';
import { BookModal } from './components/ui/BookModal';
import { ResearchModal } from './components/ui/ResearchModal';
import { InventoryModal } from './components/ui/InventoryModal';
import { SettingsModal } from './components/ui/SettingsModal';
import { AchievementsModal } from './components/ui/AchievementsModal';
import { NPCDialogueModal } from './components/ui/NPCDialogueModal';
import { DebugPanel } from './components/ui/DebugPanel';

export const App: React.FC = () => {
  return (
    <main className="relative h-screen w-screen overflow-hidden bg-slate-950">
      {/* 3D Open-World Canvas */}
      <Experience />

      {/* 2D Apple Vision Pro Style HUD & Touch Controls */}
      <HUD />

      {/* Developer Engine Debug Panel */}
      <DebugPanel />

      {/* Interactive Overlay Modals */}
      <ProjectModal />
      <ResumeModal />
      <FastTravelModal />
      <BossBattleOverlay />
      <BookModal />
      <ResearchModal />
      <InventoryModal />
      <SettingsModal />
      <AchievementsModal />
      <NPCDialogueModal />
    </main>
  );
};

export default App;
