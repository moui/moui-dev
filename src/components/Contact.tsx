import Markdown from "@/components/Markdown";

type SocialLink = { label: string; href: string };

type ContactProps = {
  eyebrow: string;
  title: string;
  markdown: string;
  email: string;
  ctaLabel: string;
  socials: SocialLink[];
  footerNote: string;
};

export default function Contact({
  eyebrow,
  title,
  markdown,
  email,
  ctaLabel,
  socials,
  footerNote,
}: Readonly<ContactProps>) {
  return (
    <section id="contact" className="py-28 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-accent text-sm mb-4 tracking-widest uppercase animate-fade-in-up">
          {eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 animate-fade-in-up delay-100">
          {title}
        </h2>
        <Markdown
          content={markdown}
          className="text-muted text-sm leading-relaxed mb-10 animate-fade-in-up delay-200 md-content"
        />
        <a
          href={`mailto:${email}`}
          className="inline-block px-8 py-3 text-sm bg-accent text-black font-semibold hover:bg-accent-light transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 animate-fade-in-up delay-300"
        >
          {ctaLabel}
        </a>

        {/* Social links */}
        <div className="flex justify-center gap-8 mt-16 animate-fade-in-up delay-400">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-accent transition-colors duration-300 uppercase tracking-widest"
            >
              {s.label}
            </a>
          ))}
        </div>

        {footerNote ? (
          <p className="text-muted/40 text-[10px] mt-16 tracking-widest uppercase">
            {footerNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
