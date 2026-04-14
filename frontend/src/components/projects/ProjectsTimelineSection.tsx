import { Project } from '@/services/api';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Rocket } from 'lucide-react';

export function ProjectsTimelineSection({ projects }: { projects: Project[] }) {
  return (
    <div className="rounded-[40px] bg-white/70 p-10 shadow-clay">
      <SectionHeader title="Projects Timeline" subtitle="Milestones and experiments from the archive." />
      <div className="mt-10 space-y-6">
        {projects.map((project, index) => (
          <div key={project.id} className="relative rounded-3xl bg-white/80 p-6 shadow-clay">
            <div className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] text-white shadow-glow">
              <Rocket size={18} />
            </div>
            <div className="pl-16">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-800">{project.title}</h3>
                {project.status ? (
                  <span className="rounded-full bg-gradient-to-r from-[#6c9eff] to-[#a78bfa] px-3 py-1 text-xs text-white">
                    {project.status}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{project.description || 'Description extracted from the PDF archive.'}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(project.tech_stack || []).slice(0, 4).map(stack => (
                  <span key={stack} className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 shadow">
                    {stack}
                  </span>
                ))}
                {!project.tech_stack?.length && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-500 shadow">PDF-sourced</span>
                )}
              </div>
            </div>
            <div className="absolute right-6 top-6 text-xs text-slate-400">#{index + 1}</div>
          </div>
        ))}
        {!projects.length && (
          <div className="rounded-3xl bg-white/80 p-6 text-sm text-slate-600 shadow-clay">
            Projects will appear after seeding the database from the PDF.
          </div>
        )}
      </div>
    </div>
  );
}
