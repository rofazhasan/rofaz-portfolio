import React, { useState } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Target } from 'lucide-react';

export const QuestTracker: React.FC = () => {
  const completedObjectives = useGameStore((s) => s.completedObjectives);
  const unlockedAchievements = useGameStore((s) => s.unlockedAchievements);
  const [isExpanded, setIsExpanded] = useState(true);

  const missions = [
    { id: 'welcome_campus', title: 'Welcome to Rafiu University', xp: 50 },
    { id: 'library_explored', title: 'Read Biography Books in Library', xp: 150 },
    { id: 'project_inspected', title: 'Inspect Physical Project Exhibitions', xp: 200 },
    { id: 'ai_lab_visited', title: 'Explore AI & Innovation Lab', xp: 150 },
    { id: 'standing_ovation', title: 'Trigger Applause in Auditorium', xp: 200 },
    { id: 'boss_defeated', title: 'Defeat NullPointer Debug Monster', xp: 500 },
  ];

  return (
    <div className="glass-panel pointer-events-auto rounded-2xl p-3 shadow-xl transition-all max-w-xs">
      {/* Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex cursor-pointer items-center justify-between gap-2 text-xs font-bold text-white"
      >
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-blue-400" />
          <span>Campus Missions ({completedObjectives.length + unlockedAchievements.length} / {missions.length})</span>
        </div>
        {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
      </div>

      {/* Checklist Body */}
      {isExpanded && (
        <div className="mt-3 space-y-2 border-t border-slate-800/80 pt-2.5">
          {missions.map((mission) => {
            const isDone =
              completedObjectives.includes(mission.id) ||
              unlockedAchievements.includes(mission.id);

            return (
              <div key={mission.id} className="flex items-start gap-2 text-xs">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
                )}
                <div className={isDone ? 'text-slate-400 line-through' : 'text-slate-200'}>
                  <span>{mission.title}</span>
                  <span className="ml-1 text-[10px] text-amber-400">(+{mission.xp} XP)</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
