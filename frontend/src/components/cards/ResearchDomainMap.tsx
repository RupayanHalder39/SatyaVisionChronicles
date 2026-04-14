import { ResearchDomain } from '@/services/api';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Brain, Cpu, Globe, TrendingUp } from 'lucide-react';

const icons = [Brain, Cpu, Globe, TrendingUp];

export function ResearchDomainMap({ domains }: { domains: ResearchDomain[] }) {
  return (
    <div className="rounded-[40px] bg-white/70 p-10 shadow-clay">
      <SectionHeader title="Research Domain Map" subtitle="Explore the constellation of innovation areas." />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {domains.map((domain, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div
              key={domain.id}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-white/40 p-6 shadow-clay transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] opacity-30 blur-2xl" />
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] text-white shadow-glow">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{domain.name}</h3>
                  <p className="text-sm text-slate-500">Importance {domain.importance}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 line-clamp-4">{domain.description || 'Domain insights seeded from the PDF archive.'}</p>
            </div>
          );
        })}
        {!domains.length && (
          <div className="rounded-3xl bg-white/80 p-6 text-sm text-slate-600 shadow-clay">
            Research domains will appear once the PDF ingestion completes.
          </div>
        )}
      </div>
    </div>
  );
}
