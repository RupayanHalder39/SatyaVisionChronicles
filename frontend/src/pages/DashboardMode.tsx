import { useMemo, useState } from 'react';
import { useContent } from '@/hooks/useContent';
import { Section, Project, Achievement, Subsection } from '@/services/api';
import { Home, Award, FileText, Users, Zap, Building, Mail } from 'lucide-react';
import { getSectionByKind } from '@/utils/sectionHelpers';

const fallbackNav = [
  { label: 'Overview', icon: Home, key: 'overview' },
  { label: 'Infrastructure', icon: Building, key: 'infrastructure' },
  { label: 'Projects', icon: Zap, key: 'projects' },
  { label: 'Publications', icon: FileText, key: 'publications' },
  { label: 'Achievements', icon: Award, key: 'achievements' },
  { label: 'Contributors', icon: Users, key: 'contributors' },
  { label: 'Contact', icon: Mail, key: 'contact' },
];

export function DashboardMode() {
  const { navbar, sections, projects, achievements, contributors } = useContent();
  const navItems = useMemo(() => {
    if (navbar.length) {
      return navbar.map(item => ({
        label: item.label,
        key: item.route.replace('/', ''),
        icon: Home,
      }));
    }
    return fallbackNav;
  }, [navbar]);

  const [active, setActive] = useState(navItems[0]?.key || 'overview');

  return (
    <div className="flex min-h-screen gap-6 px-6 pb-16 pt-28">
      <aside className="hidden w-72 flex-shrink-0 rounded-[32px] bg-white/80 p-6 shadow-clay lg:block">
        <h2 className="text-lg font-semibold text-slate-900">SatyaVision Dashboard</h2>
        <p className="mt-1 text-sm text-slate-500">Structured view of the archive.</p>
        <nav className="mt-6 space-y-2">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                  active === item.key
                    ? 'bg-gradient-to-r from-[#6c9eff] to-[#a78bfa] text-white shadow-glow'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 space-y-8">
        <DashboardHeader active={active} />
        {active === 'overview' && <DashboardOverview sections={sections} />}
        {active === 'infrastructure' && <DashboardInfrastructure sections={sections} />}
        {active === 'projects' && <DashboardProjects projects={projects} />}
        {active === 'publications' && <DashboardPublications sections={sections} />}
        {active === 'achievements' && <DashboardAchievements achievements={achievements} />}
        {active === 'contributors' && <DashboardContributors count={contributors.length} />}
        {active === 'contact' && <DashboardContact sections={sections} />}
      </main>
    </div>
  );
}

function DashboardHeader({ active }: { active: string }) {
  return (
    <div className="rounded-[32px] bg-white/80 p-6 shadow-clay">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Dashboard Mode</p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">{active.replace('-', ' ')} overview</h1>
    </div>
  );
}

function SubTabs({ items }: { items: Subsection[] }) {
  const [active, setActive] = useState(items[0]?.id ?? null);
  if (!items.length) return null;

  const activeItem = items.find(item => item.id === active) || items[0];

  return (
    <div className="rounded-[28px] bg-white/70 p-4 shadow-clay">
      <div className="flex flex-wrap gap-2">
        {items.slice(0, 6).map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              active === item.id
                ? 'bg-gradient-to-r from-[#6c9eff] to-[#a78bfa] text-white'
                : 'bg-white text-slate-600'
            }`}
          >
            {item.title || 'Chapter'}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-slate-600">{activeItem.content}</p>
    </div>
  );
}

function DashboardOverview({ sections }: { sections: Section[] }) {
  const overview = getSectionByKind(sections, 'overview');
  const stats = [
    { number: sections.length.toString(), label: 'Sections' },
    { number: (overview?.subsections?.length || 0).toString(), label: 'Chapters' },
    { number: '100%', label: 'PDF-driven' },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-6">
        <div className="rounded-[32px] bg-white/80 p-6 shadow-clay">
          <h2 className="text-xl font-semibold text-slate-900">Narrative Overview</h2>
          <p className="mt-3 text-sm text-slate-600">{overview?.description || overview?.subsections?.[0]?.content || 'Overview narrative will appear after PDF ingestion.'}</p>
        </div>
        {overview?.subsections?.length ? <SubTabs items={overview.subsections} /> : null}
      </div>
      <div className="grid gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="rounded-[28px] bg-gradient-to-br from-[#6c9eff]/20 to-white p-5 shadow-clay">
            <p className="text-2xl font-bold text-slate-900">{stat.number}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardInfrastructure({ sections }: { sections: Section[] }) {
  const infra = getSectionByKind(sections, 'infrastructure');
  return (
    <div className="space-y-6 rounded-[32px] bg-white/80 p-6 shadow-clay">
      <h2 className="text-xl font-semibold text-slate-900">Infrastructure Highlights</h2>
      {infra?.subsections?.length ? <SubTabs items={infra.subsections} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {infra?.subsections?.slice(0, 6).map(item => (
          <div key={item.id} className="rounded-2xl bg-white p-4 shadow">
            <p className="text-sm font-semibold text-slate-800">{item.title || 'Infrastructure'}</p>
            <p className="mt-2 text-xs text-slate-600 line-clamp-4">{item.content}</p>
          </div>
        ))}
        {!infra?.subsections?.length && (
          <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow">Infrastructure details will appear after PDF ingestion.</div>
        )}
      </div>
    </div>
  );
}

function DashboardProjects({ projects }: { projects: Project[] }) {
  return (
    <div className="rounded-[32px] bg-white/80 p-6 shadow-clay">
      <h2 className="text-xl font-semibold text-slate-900">Projects</h2>
      <div className="mt-4 space-y-4">
        {projects.map(project => (
          <div key={project.id} className="rounded-2xl bg-white p-4 shadow">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-800">{project.title}</p>
              {project.status ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">{project.status}</span> : null}
            </div>
            <p className="mt-2 text-xs text-slate-600 line-clamp-3">{project.description || 'Project details seeded from PDF.'}</p>
          </div>
        ))}
        {!projects.length && (
          <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow">Projects will appear after PDF ingestion.</div>
        )}
      </div>
    </div>
  );
}

function DashboardPublications({ sections }: { sections: Section[] }) {
  const publications = getSectionByKind(sections, 'publications');
  return (
    <div className="rounded-[32px] bg-white/80 p-6 shadow-clay">
      <h2 className="text-xl font-semibold text-slate-900">Publications</h2>
      <div className="mt-4 space-y-3">
        {publications?.subsections?.slice(0, 8).map(item => (
          <div key={item.id} className="rounded-2xl bg-white p-4 text-xs text-slate-600 shadow">
            <p className="text-sm font-semibold text-slate-800">{item.title || 'Publication'}</p>
            <p className="mt-2 line-clamp-3">{item.content}</p>
          </div>
        ))}
        {!publications?.subsections?.length && (
          <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow">Publications will appear after PDF ingestion.</div>
        )}
      </div>
    </div>
  );
}

function DashboardAchievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <div className="rounded-[32px] bg-white/80 p-6 shadow-clay">
      <h2 className="text-xl font-semibold text-slate-900">Achievements</h2>
      <div className="mt-4 space-y-3">
        {achievements.map(item => (
          <div key={item.id} className="rounded-2xl bg-white p-4 shadow">
            <p className="text-sm font-semibold text-slate-800">{item.title}</p>
            <p className="mt-2 text-xs text-slate-600 line-clamp-3">{item.description || 'Achievement details seeded from PDF.'}</p>
          </div>
        ))}
        {!achievements.length && (
          <div className="rounded-2xl bg-white p-4 text-sm text-slate-600 shadow">Achievements will appear after PDF ingestion.</div>
        )}
      </div>
    </div>
  );
}

function DashboardContributors({ count }: { count: number }) {
  return (
    <div className="rounded-[32px] bg-white/80 p-6 shadow-clay">
      <h2 className="text-xl font-semibold text-slate-900">Contributors</h2>
      <p className="mt-2 text-sm text-slate-600">Total contributors captured: {count}</p>
    </div>
  );
}

function DashboardContact({ sections }: { sections: Section[] }) {
  const contact = getSectionByKind(sections, 'contact');
  return (
    <div className="rounded-[32px] bg-white/80 p-6 shadow-clay">
      <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
      <p className="mt-2 text-sm text-slate-600">{contact?.description || 'Contact details will appear after PDF ingestion.'}</p>
    </div>
  );
}
