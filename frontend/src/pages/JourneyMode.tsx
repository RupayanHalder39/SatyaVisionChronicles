import { useEffect } from 'react';
import { useContent } from '@/hooks/useContent';
import { JourneyHero } from '@/components/common/JourneyHero';
import { VisionSection } from '@/components/cards/VisionSection';
import { ResearchDomainMap } from '@/components/cards/ResearchDomainMap';
import { TeamOrbitSection } from '@/components/contributors/TeamOrbitSection';
import { ProjectsTimelineSection } from '@/components/projects/ProjectsTimelineSection';
import { AchievementsGallery } from '@/components/achievements/AchievementsGallery';
import { InfrastructureShowcase } from '@/components/cards/InfrastructureShowcase';
import { PublicationsImpact } from '@/components/cards/PublicationsImpact';
import { FutureVision } from '@/components/cards/FutureVision';
import { ContactSection } from '@/components/common/ContactSection';

export function JourneyMode() {
  const { sections, researchDomains, contributors, projects, achievements, gallery, loading, error } = useContent();

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.scroll-reveal');
      reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-20 top-20 h-96 w-96 animate-float rounded-full bg-gradient-to-br from-blue-300/30 to-purple-300/30 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-[500px] w-[500px] animate-[float_10s_ease-in-out_infinite_2s] rounded-full bg-gradient-to-br from-cyan-300/30 to-pink-300/30 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 animate-[float_12s_ease-in-out_infinite_4s] rounded-full bg-gradient-to-br from-yellow-300/20 to-orange-300/20 blur-3xl" />
      </div>

      <div className="relative z-10">
        <JourneyHero sections={sections} loading={loading} />

        {error ? (
          <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white/70 p-8 text-center shadow-clay">
            <p className="text-slate-600">{error}</p>
          </div>
        ) : null}

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <VisionSection sections={sections} />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <ResearchDomainMap domains={researchDomains} />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <TeamOrbitSection contributors={contributors} />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <ProjectsTimelineSection projects={projects} />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <AchievementsGallery achievements={achievements} />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <InfrastructureShowcase sections={sections} gallery={gallery} />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <PublicationsImpact sections={sections} />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <FutureVision sections={sections} />
          </div>
        </section>

        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl scroll-reveal">
            <ContactSection sections={sections} />
          </div>
        </section>
      </div>
    </div>
  );
}
