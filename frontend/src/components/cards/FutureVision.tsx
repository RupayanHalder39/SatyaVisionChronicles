import { Section } from '@/services/api';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getSectionByKind } from '@/utils/sectionHelpers';
import { Target } from 'lucide-react';

export function FutureVision({ sections }: { sections: Section[] }) {
  const future = getSectionByKind(sections, 'future') || getSectionByKind(sections, 'collaborations');
  const items = future?.subsections.slice(0, 4) || [];

  return (
    <div className="rounded-[40px] bg-gradient-to-br from-[#6c9eff]/20 via-white to-[#f472b6]/10 p-10 shadow-clay">
      <SectionHeader title="Future Vision" subtitle="Where the journey is headed." />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map(item => (
          <div key={item.id} className="rounded-3xl bg-white/80 p-5 shadow-clay">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] text-white shadow-glow">
                <Target size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.title || 'Roadmap'}</p>
                <p className="text-xs text-slate-500">Future plans</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 line-clamp-4">{item.content}</p>
          </div>
        ))}
        {!items.length && (
          <div className="rounded-3xl bg-white/80 p-5 text-sm text-slate-600 shadow-clay">
            Future-facing notes will appear after PDF processing.
          </div>
        )}
      </div>
    </div>
  );
}
