import { useEffect, useState } from 'react';
import { api, Section, ResearchDomain, Project, Contributor, Achievement, NavbarItem, Image } from '@/services/api';

export type ContentState = {
  navbar: NavbarItem[];
  sections: Section[];
  researchDomains: ResearchDomain[];
  projects: Project[];
  contributors: Contributor[];
  achievements: Achievement[];
  gallery: Image[];
  loading: boolean;
  error?: string;
};

export function useContent(kind?: string) {
  const [state, setState] = useState<ContentState>({
    navbar: [],
    sections: [],
    researchDomains: [],
    projects: [],
    contributors: [],
    achievements: [],
    gallery: [],
    loading: true,
  });

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const [navbar, sections, researchDomains, projects, contributors, achievements, gallery] = await Promise.all([
          api.getNavbar(),
          api.getSections(kind),
          api.getResearchDomains(),
          api.getProjects(),
          api.getContributors(),
          api.getAchievements(),
          api.getGallery(),
        ]);

        if (!mounted) return;
        setState({
          navbar: navbar.items,
          sections: sections.items,
          researchDomains: researchDomains.items,
          projects: projects.items,
          contributors: contributors.items,
          achievements: achievements.items,
          gallery: gallery.items,
          loading: false,
        });
      } catch (error) {
        if (!mounted) return;
        setState(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to load content',
        }));
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [kind]);

  return state;
}
