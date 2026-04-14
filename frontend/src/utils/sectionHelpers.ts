import { Section } from '@/services/api';

export function getSectionByKind(sections: Section[], kind: string) {
  return sections.find(section => section.kind === kind) || null;
}

export function getSectionContent(section: Section | null) {
  if (!section) return { title: '', description: '', subsections: [] as Section['subsections'] };
  return {
    title: section.title,
    description: section.description || '',
    subsections: section.subsections || [],
  };
}
