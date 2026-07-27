import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type WeatherType = 'sunny' | 'golden_hour' | 'night' | 'rain' | 'snow' | 'fog';
export type PlayerState = 'idle' | 'walking' | 'running' | 'jumping' | 'crouching' | 'waving' | 'celebrating' | 'thinking';

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  techStack: string[];
  features: string[];
  metrics?: string;
  githubUrl?: string;
  liveUrl?: string;
  videoPlaceholder?: string;
  caseStudy?: string;
  awards?: string[];
  modelType: 'robot' | 'drone' | 'server' | 'chip' | 'web';
}

export interface InventoryItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface NPCData {
  id: string;
  name: string;
  title: string;
  avatar: string;
  dialogue: string[];
  questReward?: { id: string; name: string; icon: string; description: string; xp: number };
}

export interface GameState {
  // Player & Movement
  playerPos: [number, number, number];
  playerRotation: number;
  playerState: PlayerState;
  isGrounded: boolean;
  inVehicle: boolean;
  teleportTarget: [number, number, number] | null;
  
  // World & Environment
  activeZone: string;
  neighborZones: string[];
  timeOfDay: number; // 0 to 24
  weather: WeatherType;
  graphicsQuality: 'ultra' | 'high' | 'medium' | 'low' | 'auto';
  showDebugPanel: boolean;
  perfMetrics: {
    fps: number;
    frameTime: number;
    drawCalls: number;
    triangles: number;
    geometries: number;
    textures: number;
    activeZone: string;
    visibleObjects: number;
    physicsBodies: number;
  };
  
  // Interactive Modals & Dialogue
  activeModal: 'project' | 'resume' | 'research' | 'fasttravel' | 'boss' | 'book' | 'arcade' | 'controls' | 'inventory' | 'settings' | 'achievements' | 'npc_dialogue' | null;
  selectedProject: ProjectData | null;
  activeBookId: string | null;
  activeNPC: NPCData | null;
  
  // Audio Controls
  audioMuted: boolean;
  bgmVolume: number;
  sfxVolume: number;
  
  // Gamification & Exploration Progress
  xp: number;
  coins: number;
  completionPercentage: number;
  unlockedAchievements: string[];
  completedObjectives: string[];
  inventory: InventoryItem[];
  toast: { title: string; desc: string; type?: 'achievement' | 'quest' | 'info' } | null;
  
  // Actions
  setPlayerPos: (pos: [number, number, number]) => void;
  setPlayerRotation: (rot: number) => void;
  setPlayerState: (state: PlayerState) => void;
  setIsGrounded: (grounded: boolean) => void;
  setInVehicle: (inVehicle: boolean) => void;
  teleportTo: (pos: [number, number, number]) => void;
  clearTeleport: () => void;
  
  setActiveZone: (zone: string) => void;
  setNeighborZones: (neighbors: string[]) => void;
  setTimeOfDay: (time: number) => void;
  setWeather: (weather: WeatherType) => void;
  setGraphicsQuality: (quality: 'ultra' | 'high' | 'medium' | 'low' | 'auto') => void;
  toggleDebugPanel: () => void;
  setPerfMetrics: (metrics: Partial<GameState['perfMetrics']>) => void;
  
  openProjectModal: (project: ProjectData) => void;
  openNPCModal: (npc: NPCData) => void;
  openModal: (modal: GameState['activeModal'], data?: any) => void;
  closeModal: () => void;
  
  toggleAudioMute: () => void;
  setBgmVolume: (vol: number) => void;
  setSfxVolume: (vol: number) => void;
  
  addCoin: (amount?: number) => void;
  addInventoryItem: (item: InventoryItem) => void;
  unlockAchievement: (id: string, title: string, description: string, xpReward: number) => void;
  completeObjective: (id: string) => void;
  showToast: (title: string, desc: string, type?: 'achievement' | 'quest' | 'info') => void;
  clearToast: () => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Player Initial
      playerPos: [0, 1, 35],
      playerRotation: 0,
      playerState: 'idle',
      isGrounded: true,
      inVehicle: false,
      teleportTarget: null,
      
      // World Initial
      activeZone: 'Zone 01: Main Gate',
      neighborZones: ['Zone 02: Library', 'Zone 05: Park', 'Zone 08: Dormitory'],
      timeOfDay: 14, // 2:00 PM
      weather: 'sunny',
      graphicsQuality: 'high',
      showDebugPanel: false,
      perfMetrics: {
        fps: 60,
        frameTime: 16.6,
        drawCalls: 0,
        triangles: 0,
        geometries: 0,
        textures: 0,
        activeZone: 'Zone 01: Main Gate',
        visibleObjects: 0,
        physicsBodies: 0,
      },
      
      // Modals
      activeModal: null,
      selectedProject: null,
      activeBookId: null,
      activeNPC: null,
      
      // Audio Settings
      audioMuted: false,
      bgmVolume: 0.5,
      sfxVolume: 0.7,
      
      // Gamification State
      xp: 150,
      coins: 10,
      completionPercentage: 15,
      unlockedAchievements: ['welcome_campus'],
      completedObjectives: ['explore_gate'],
      inventory: [
        { id: 'coin_1', name: 'Innovation Token', icon: '🪙', description: 'Earned by exploring campus landmarks' },
        { id: 'key_1', name: 'Campus ID Pass', icon: '🪪', description: 'Grants full access to research labs & sky observatory' },
      ],
      toast: null,
      
      // State Setter Implementations
      setPlayerPos: (playerPos) => set({ playerPos }),
      setPlayerRotation: (playerRotation) => set({ playerRotation }),
      setPlayerState: (playerState) => set({ playerState }),
      setIsGrounded: (isGrounded) => set({ isGrounded }),
      setInVehicle: (inVehicle) => set({ inVehicle }),
      teleportTo: (pos) => set({ teleportTarget: pos }),
      clearTeleport: () => set({ teleportTarget: null }),
      
      setActiveZone: (activeZone) => {
        if (get().activeZone !== activeZone) {
          set({ activeZone });
          get().showToast('Entered Location', activeZone, 'info');
        }
      },
      setNeighborZones: (neighborZones) => set({ neighborZones }),
      setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
      setWeather: (weather) => set({ weather }),
      setGraphicsQuality: (graphicsQuality) => set({ graphicsQuality }),
      toggleDebugPanel: () => set((s) => ({ showDebugPanel: !s.showDebugPanel })),
      setPerfMetrics: (metrics) => set((s) => ({ perfMetrics: { ...s.perfMetrics, ...metrics } })),
      
      openProjectModal: (selectedProject) => set({ activeModal: 'project', selectedProject }),
      openNPCModal: (activeNPC) => set({ activeModal: 'npc_dialogue', activeNPC }),
      openModal: (activeModal, data = null) => set({ activeModal, selectedProject: data }),
      closeModal: () => set({ activeModal: null, selectedProject: null, activeBookId: null, activeNPC: null }),
      
      toggleAudioMute: () => set((state) => ({ audioMuted: !state.audioMuted })),
      setBgmVolume: (bgmVolume) => set({ bgmVolume }),
      setSfxVolume: (sfxVolume) => set({ sfxVolume }),
      
      addCoin: (amount = 1) => set((s) => ({ coins: s.coins + amount })),
      addInventoryItem: (item) => {
        const { inventory } = get();
        if (!inventory.some((i) => i.id === item.id)) {
          set({ inventory: [...inventory, item] });
        }
      },

      unlockAchievement: (id, title, description, xpReward) => {
        const { unlockedAchievements, xp, completionPercentage } = get();
        if (!unlockedAchievements.includes(id)) {
          const newXp = xp + xpReward;
          const newCompletion = Math.min(100, Math.round(completionPercentage + 4.5));
          set({
            unlockedAchievements: [...unlockedAchievements, id],
            xp: newXp,
            completionPercentage: newCompletion,
            toast: {
              title: `🏆 Achievement Unlocked: ${title}`,
              desc: `${description} (+${xpReward} XP)`,
              type: 'achievement',
            },
          });
        }
      },
      
      completeObjective: (id) => {
        const { completedObjectives } = get();
        if (!completedObjectives.includes(id)) {
          set({ completedObjectives: [...completedObjectives, id] });
        }
      },
      
      showToast: (title, desc, type = 'info') => set({ toast: { title, desc, type } }),
      clearToast: () => set({ toast: null }),
    }),
    {
      name: 'rafiu-university-game-storage',
      partialize: (state) => ({
        xp: state.xp,
        coins: state.coins,
        completionPercentage: state.completionPercentage,
        unlockedAchievements: state.unlockedAchievements,
        completedObjectives: state.completedObjectives,
        inventory: state.inventory,
        audioMuted: state.audioMuted,
        bgmVolume: state.bgmVolume,
        sfxVolume: state.sfxVolume,
        graphicsQuality: state.graphicsQuality,
      }),
    }
  )
);
