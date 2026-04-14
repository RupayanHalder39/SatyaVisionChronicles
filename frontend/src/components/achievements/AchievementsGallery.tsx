import { Achievement } from '@/services/api';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Trophy } from 'lucide-react';

export function AchievementsGallery({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="rounded-[40px] bg-white/70 p-10 shadow-clay">
      <SectionHeader title="Achievements Gallery" subtitle="Unlocking milestones and awards." />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {achievements.map(achievement => (
          <div key={achievement.id} className="rounded-3xl bg-gradient-to-br from-[#fef3c7] to-white p-6 shadow-clay">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#facc15] to-[#f472b6] text-white shadow-glow">
                <Trophy size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">{achievement.title}</h3>
                <p className="text-xs text-slate-500">{achievement.category || 'Achievement'}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 line-clamp-4">{achievement.description || 'Achievement summary captured from the archive.'}</p>
            {achievement.badge ? (
              <span className="mt-4 inline-block rounded-full bg-white px-3 py-1 text-xs text-slate-600 shadow">{achievement.badge}</span>
            ) : null}
          </div>
        ))}
        {!achievements.length && (
          <div className="rounded-3xl bg-white/80 p-6 text-sm text-slate-600 shadow-clay">
            Achievements will appear after PDF ingestion.
          </div>
        )}
      </div>
    </div>
  );
}
