import { Section } from '@/services/api';
import { SectionHeader } from '@/components/common/SectionHeader';
import { getSectionByKind } from '@/utils/sectionHelpers';
import { Mail } from 'lucide-react';

export function ContactSection({ sections }: { sections: Section[] }) {
  const contact = getSectionByKind(sections, 'contact');
  const items = contact?.subsections.slice(0, 3) || [];

  return (
    <div className="rounded-[40px] bg-white/70 p-10 shadow-clay">
      <SectionHeader title="Contact" subtitle="Connect with the SatyaVision team." />
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] p-6 text-white shadow-glow">
          <Mail size={20} />
          <h3 className="mt-4 text-xl font-semibold">Reach out</h3>
          <p className="mt-3 text-sm text-white/80">{contact?.description || 'Contact details will be available once the PDF is ingested.'}</p>
        </div>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="rounded-3xl bg-white/80 p-4 shadow-clay">
              <p className="text-sm font-semibold text-slate-800">{item.title || 'Contact detail'}</p>
              <p className="mt-2 text-sm text-slate-600">{item.content}</p>
            </div>
          ))}
          {!items.length && (
            <div className="rounded-3xl bg-white/80 p-4 text-sm text-slate-600 shadow-clay">
              Contact details will load after PDF processing.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
