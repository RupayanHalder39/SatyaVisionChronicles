const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export type Pagination = {
  total: number;
  limit: number;
  offset: number;
};

export type Image = {
  id: number;
  file_path?: string | null;
  caption?: string | null;
  kind?: string | null;
  source_page?: number | null;
  order_index: number;
};

export type Subsection = {
  id: number;
  title?: string | null;
  content?: string | null;
  order_index: number;
};

export type Section = {
  id: number;
  title: string;
  description?: string | null;
  kind: string;
  order_index: number;
  page_start?: number | null;
  page_end?: number | null;
  subsections: Subsection[];
  images: Image[];
};

export type ResearchDomain = {
  id: number;
  name: string;
  description?: string | null;
  importance: number;
  order_index: number;
  images: Image[];
};

export type Contributor = {
  id: number;
  name: string;
  role?: string | null;
  bio?: string | null;
  affiliation?: string | null;
  email?: string | null;
  order_index: number;
  images: Image[];
};

export type Project = {
  id: number;
  title: string;
  description?: string | null;
  status?: string | null;
  tech_stack?: string[] | null;
  impact?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  order_index: number;
  contributors: Contributor[];
  research_domains: ResearchDomain[];
  images: Image[];
};

export type Achievement = {
  id: number;
  title: string;
  description?: string | null;
  category?: string | null;
  badge?: string | null;
  date?: string | null;
  order_index: number;
  images: Image[];
};

export type NavbarItem = {
  id: number;
  label: string;
  route: string;
  icon?: string | null;
  order_index: number;
};

export type ListResponse<T> = {
  items: T[];
  pagination: Pagination;
};

export const api = {
  getNavbar: () => request<ListResponse<NavbarItem>>('/navbar'),
  getSections: (kind?: string) =>
    request<ListResponse<Section>>(kind ? `/overview?kind=${encodeURIComponent(kind)}` : '/overview'),
  getResearchDomains: () => request<ListResponse<ResearchDomain>>('/research/domains'),
  getProjects: () => request<ListResponse<Project>>('/projects'),
  getContributors: () => request<ListResponse<Contributor>>('/contributors'),
  getAchievements: () => request<ListResponse<Achievement>>('/achievements'),
  getGallery: () => request<ListResponse<Image>>('/gallery'),
};
