"use client";

import { useLocale } from "@/context/LocaleContext";
import type { AllContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

type PageContentProps = {
  en: AllContent;
  es: AllContent;
};

export default function PageContent({ en, es }: Readonly<PageContentProps>) {
  const { locale } = useLocale();
  const d = locale === "es" ? es : en;

  const featuredProjects = d.projects.items.filter((p) => p.featured);
  const otherProjects = d.projects.items.filter((p) => !p.featured);
  const contactSocials = d.site.socials.filter((s) => s.icon !== "email");

  return (
    <>
      <Navbar brand={d.site.brand} navLinks={d.site.nav} />
      <main>
        <Hero
          data={{
            eyebrow: d.site.hero_eyebrow,
            title: d.site.hero_title,
            subtitle: d.site.hero_subtitle,
            description: d.site.hero_description,
            ctaPrimary: d.site.cta_primary,
            ctaSecondary: d.site.cta_secondary,
          }}
        />
        <About
          title={d.about.title}
          number={d.about.number}
          markdown={d.about.markdown}
        />
        <Experience
          title={d.experience.section.title}
          number={d.experience.section.number}
          items={d.experience.items}
        />
        <Projects
          title={d.projects.section.title}
          number={d.projects.section.number}
          featuredLabel={d.projects.section.featured_label}
          otherLabel={d.projects.section.other_label}
          featured={featuredProjects}
          others={otherProjects}
        />
        <Skills
          title={d.skills.title}
          number={d.skills.number}
          categories={d.skills.categories}
        />
        <Certifications
          title={d.certifications.section.title}
          number={d.certifications.section.number}
          items={d.certifications.items}
        />
        <Contact
          eyebrow={d.contact.eyebrow}
          title={d.contact.title}
          markdown={d.contact.markdown}
          email={d.contact.email}
          ctaLabel={d.contact.cta_label}
          socials={contactSocials}
          footerNote={d.contact.footer_note}
        />
      </main>
      <Footer
        socials={d.site.socials}
        creditLabel={d.site.footer_credit_label}
        creditName={d.site.footer_credit_name}
        creditUrl={d.site.footer_credit_url}
      />
    </>
  );
}
