import { Section, Image } from '@/services/api';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getSectionByKind } from '@/utils/sectionHelpers';
import { resolveImageUrl } from '@/utils/image';
import { Cpu } from 'lucide-react';

export function InfrastructureShowcase({ sections, gallery }: { sections: Section[]; gallery: Image[] }) {
  const infra = getSectionByKind(sections, 'infrastructure');
  const highlights = infra?.subsections.slice(0, 4) || [];
  const images = gallery.slice(0, 4);

  return (
    <div className="rounded-[40px] bg-white/70 p-10 shadow-clay">
      <SectionHeader title="Infrastructure Showcase" subtitle="Labs, tools, and platforms powering research." />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {highlights.map(item => (
            <div key={item.id} className="rounded-3xl bg-white/80 p-5 shadow-clay">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] text-white shadow-glow">
                  <Cpu size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.title || 'Infrastructure'}</p>
                  <p className="text-xs text-slate-500">PDF sourced</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 line-clamp-3">{item.content}</p>
            </div>
          ))}
          {!highlights.length && (
            <div className="rounded-3xl bg-white/80 p-5 text-sm text-slate-600 shadow-clay">
              Infrastructure details will appear once the PDF is processed.
            </div>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {images.map(image => {
            const url = resolveImageUrl(image.file_path || undefined);
            return (
              <div key={image.id} className="overflow-hidden rounded-3xl bg-white/80 shadow-clay">
                {url ? (
                  <img src={url} alt={image.caption || 'Gallery'} className="h-40 w-full object-cover" />
                ) : (
                  <div className="flex h-40 items-center justify-center bg-gradient-to-br from-[#e0f2fe] to-[#fef3c7] text-sm text-slate-500">
                    Image from PDF
                  </div>
                )}
                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-800">{image.caption || 'Infrastructure asset'}</p>
                  <p className="text-xs text-slate-500">Page {image.source_page ?? '-'}</p>
                </div>
              </div>
            );
          })}
          {!images.length && (
            <div className="rounded-3xl bg-white/80 p-5 text-sm text-slate-600 shadow-clay">
              Gallery assets will load after extraction.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
