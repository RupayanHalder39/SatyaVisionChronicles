import { Contributor } from '@/services/api';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Avatar } from '@/components/common/Avatar';
import { resolveImageUrl } from '@/utils/image';

export function TeamOrbitSection({ contributors }: { contributors: Contributor[] }) {
  const main = contributors[0];
  const orbiting = contributors.slice(1, 7);

  return (
    <div className="rounded-[40px] bg-white/70 p-10 shadow-clay">
      <SectionHeader title="Team Orbit" subtitle="People powering the journey." />
      <div className="mt-12 flex flex-col items-center justify-center gap-10 lg:flex-row">
        <div className="relative flex h-[320px] w-[320px] items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-dashed border-slate-200" />
          {main ? (
            <div className="z-10 text-center">
              <Avatar name={main.name} imageUrl={resolveImageUrl(main.images[0]?.file_path)} size={96} />
              <p className="mt-4 text-lg font-semibold text-slate-800">{main.name}</p>
              <p className="text-sm text-slate-500">{main.role || 'Lead Contributor'}</p>
            </div>
          ) : (
            <div className="rounded-3xl bg-white/80 p-6 text-sm text-slate-600 shadow-clay">
              Contributors appear after PDF ingestion.
            </div>
          )}
          {orbiting.map((member, index) => {
            const angle = (index / orbiting.length) * Math.PI * 2;
            const radius = 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div
                key={member.id}
                className="absolute flex flex-col items-center"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <Avatar name={member.name} imageUrl={resolveImageUrl(member.images[0]?.file_path)} size={64} />
                <p className="mt-2 text-xs text-slate-600">{member.name}</p>
              </div>
            );
          })}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {contributors.slice(0, 4).map(member => (
            <div key={member.id} className="rounded-3xl bg-white/80 p-4 shadow-clay">
              <p className="text-sm font-semibold text-slate-800">{member.name}</p>
              <p className="text-xs text-slate-500">{member.role || 'Contributor'}</p>
              <p className="mt-2 text-xs text-slate-600 line-clamp-3">{member.bio || 'Bio captured from the PDF archive.'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
