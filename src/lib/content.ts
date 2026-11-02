import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Locale = "en" | "es";

const CONTENT_DIR = path.join(process.cwd(), "content");

type MarkdownResult<T> = {
  data: T;
  content: string;
};

async function readMarkdown<T>(relativePath: string, locale: Locale): Promise<MarkdownResult<T>> {
  const fullPath = path.join(CONTENT_DIR, locale, relativePath);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  return { data: data as T, content };
}

function getOrder(data: unknown): number {
  const order = (data as { order?: number }).order;
  return typeof order === "number" ? order : Number.MAX_SAFE_INTEGER;
}

const MONTH_MAP: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Sept: 9, Oct: 10, Nov: 11, Dec: 12,
  // Spanish abbreviations
  Ene: 1, Febr: 2, Abr: 4, Mayo: 5, Ago: 8, Dic: 12,
};

function parseCertDate(date: string): number {
  const parts = date.trim().split(/\s+/);
  if (parts.length < 2) return 0;
  const month = MONTH_MAP[parts[0].replace(/\./, "")] ?? 0;
  const year = parseInt(parts[1], 10);
  return year * 100 + month;
}

export async function getSite(locale: Locale) {
  const { data } = await readMarkdown<SiteData>("site.md", locale);
  return data;
}

export async function getAbout(locale: Locale) {
  const { data, content } = await readMarkdown<AboutData>("about.md", locale);
  return { ...data, markdown: content };
}

export async function getExperience(locale: Locale) {
  const section = await readMarkdown<SectionData>("experience.md", locale);
  const items = await getCollection<ExperienceItem>("experience", locale);
  return { section: section.data, items };
}

export async function getProjects(locale: Locale) {
  const section = await readMarkdown<ProjectsSection>("projects.md", locale);
  const items = await getCollection<ProjectItem>("projects", locale);
  return { section: section.data, items };
}

export async function getSkills(locale: Locale) {
  const { data } = await readMarkdown<SkillsData>("skills.md", locale);
  return data;
}

export async function getCertifications(locale: Locale) {
  const section = await readMarkdown<SectionData>("certifications.md", locale);
  const items = await getCollection<CertificationItem>("certifications", locale);
  const sorted = [...items].sort((a, b) => parseCertDate(b.date) - parseCertDate(a.date));
  return { section: section.data, items: sorted };
}

export async function getContact(locale: Locale) {
  const { data, content } = await readMarkdown<ContactData>("contact.md", locale);
  return { ...data, markdown: content };
}

async function getCollection<T>(dir: string, locale: Locale): Promise<Array<T & { slug: string }>> {
  const fullDir = path.join(CONTENT_DIR, locale, dir);
  const entries = fs.readdirSync(fullDir);
  const files = entries.filter((name) => name.endsWith(".md"));
  const items = await Promise.all(
    files.map(async (name) => {
      const { data } = await readMarkdown<T>(path.join(dir, name), locale);
      const slug = name.replace(/\.md$/, "");
      return { data, slug };
    })
  );
  return items
    .toSorted((a, b) => getOrder(a.data) - getOrder(b.data))
    .map((item) => ({ ...item.data, slug: item.slug }));
}

export type SiteData = {
  name: string;
  brand: string;
  hero_eyebrow: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  cta_primary: { label: string; href: string };
  cta_secondary: { label: string; href: string };
  nav: Array<{ label: string; href: string }>;
  socials: Array<{ label: string; href: string; icon: string }>;
  footer_credit_label: string;
  footer_credit_name: string;
  footer_credit_url: string;
};

export type SectionData = {
  title: string;
  number: string;
};

export type AboutData = SectionData;

export type ExperienceItem = {
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  points: string[];
  order?: number;
  slug: string;
};

export type ProjectsSection = SectionData & {
  featured_label: string;
  other_label: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  featured?: boolean;
  order?: number;
  slug: string;
};

export type SkillsData = SectionData & {
  categories: Array<{ title: string; skills: string[] }>;
};

export type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  credentialId?: string;
  order?: number;
  slug: string;
};

export type ContactData = {
  eyebrow: string;
  title: string;
  email: string;
  cta_label: string;
  footer_note: string;
};

export type AllContent = {
  site: SiteData;
  about: AboutData & { markdown: string };
  experience: { section: SectionData; items: ExperienceItem[] };
  projects: { section: ProjectsSection; items: ProjectItem[] };
  skills: SkillsData;
  certifications: { section: SectionData; items: CertificationItem[] };
  contact: ContactData & { markdown: string };
};

export async function getAllContent(locale: Locale): Promise<AllContent> {
  const [site, about, experience, projects, skills, certifications, contact] =
    await Promise.all([
      getSite(locale),
      getAbout(locale),
      getExperience(locale),
      getProjects(locale),
      getSkills(locale),
      getCertifications(locale),
      getContact(locale),
    ]);
  return { site, about, experience, projects, skills, certifications, contact };
}
