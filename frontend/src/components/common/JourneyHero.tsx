import { ArrowRight, Sparkles } from 'lucide-react';
import { Section } from '@/services/api';
import { getSectionByKind } from '@/utils/sectionHelpers';

const fallbackTitle = 'Building the Future with AI, Innovation & Exploration';
const fallbackSubtitle = 'A living archive of research, projects, and community achievements that shape the SatyaVision journey.';

export function JourneyHero({ sections, loading }: { sections: Section[]; loading: boolean }) {
  const overview = getSectionByKind(sections, 'overview') || getSectionByKind(sections, 'vision');
  const title = overview?.title || fallbackTitle;
  const description = overview?.description || overview?.subsections?.[0]?.content || fallbackSubtitle;

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-clay">
            <Sparkles size={16} className="text-purple-500" />
            Premium Research Journey
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            {loading ? 'Loading vision...' : title}
          </h1>
          <p className="mt-6 text-lg text-slate-600">
            {loading ? 'Fetching narrative from the IEDC archive.' : description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6c9eff] to-[#a78bfa] px-6 py-3 text-white shadow-glow transition-transform duration-300 hover:-translate-y-0.5">
              Explore Journey
              <ArrowRight size={18} />
            </button>
            <button className="rounded-full border border-white/60 bg-white/70 px-6 py-3 text-slate-700 shadow-clay">
              View Research Map
            </button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 text-sm text-slate-600 md:grid-cols-3">
            <div className="rounded-3xl bg-white/60 p-4 shadow-clay">
              <p className="text-xl font-bold text-slate-900">{sections.length || 0}+</p>
              <p>Documented Sections</p>
            </div>
            <div className="rounded-3xl bg-white/60 p-4 shadow-clay">
              <p className="text-xl font-bold text-slate-900">{overview?.subsections?.length || 0}+</p>
              <p>Story Chapters</p>
            </div>
            <div className="rounded-3xl bg-white/60 p-4 shadow-clay">
              <p className="text-xl font-bold text-slate-900">{new Date().getFullYear()}</p>
              <p>Living Archive</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-[36px] bg-gradient-to-br from-white/60 to-white/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[36px] bg-white/70 p-6 shadow-clay">
            <div className="grid gap-6">
              <div className="rounded-3xl bg-gradient-to-br from-[#6c9eff] to-[#a78bfa] p-6 text-white shadow-glow">
                <p className="text-sm uppercase tracking-[0.3em] text-white/70">Highlight</p>
                <h3 className="mt-3 text-2xl font-bold">Innovation in Motion</h3>
                <p className="mt-3 text-sm text-white/80">Curated research domains, projects, and achievements from the PDF archive.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/80 p-4 shadow-clay">
                  <p className="text-sm text-slate-500">Journey Mode</p>
                  <p className="text-lg font-semibold text-slate-800">Storytelling</p>
                </div>
                <div className="rounded-3xl bg-white/80 p-4 shadow-clay">
                  <p className="text-sm text-slate-500">Dashboard Mode</p>
                  <p className="text-lg font-semibold text-slate-800">Operations</p>
                </div>
              </div>
              <div className="rounded-3xl bg-gradient-to-br from-[#facc15] to-[#f472b6] p-5 text-white shadow-glow">
                <p className="text-sm uppercase tracking-[0.3em] text-white/80">Next</p>
                <p className="mt-2 text-lg font-semibold">Scroll to explore the SatyaVision story.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
