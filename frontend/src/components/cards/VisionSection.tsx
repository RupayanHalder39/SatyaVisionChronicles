import { Section } from '@/services/api';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getSectionByKind, getSectionContent } from '@/utils/sectionHelpers';

export function VisionSection({ sections }: { sections: Section[] }) {
  const visionSection = getSectionByKind(sections, 'vision') || getSectionByKind(sections, 'overview');
  const content = getSectionContent(visionSection);

  return (
    <div className="rounded-[40px] bg-white/70 p-10 shadow-clay">
      <SectionHeader title={content.title || 'Vision & Mission'} subtitle="Transforming research into lived experiences." />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] p-6 text-white shadow-glow">
          <h3 className="text-2xl font-semibold">Vision</h3>
          <p className="mt-4 text-sm text-white/80">{content.description || 'Crafted from the IEDC research archive.'}</p>
        </div>
        <div className="space-y-4">
          {content.subsections.slice(0, 3).map(subsection => (
            <div key={subsection.id} className="rounded-3xl bg-white/80 p-5 shadow-clay">
              <p className="text-sm font-semibold text-slate-700">{subsection.title || 'Chapter'}</p>
              <p className="mt-2 text-sm text-slate-600 line-clamp-4">{subsection.content}</p>
            </div>
          ))}
          {!content.subsections.length && (
            <div className="rounded-3xl bg-white/80 p-5 text-sm text-slate-600 shadow-clay">
              Vision content will appear once the PDF ingestion is complete.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
