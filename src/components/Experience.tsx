type ExperienceItem = {
  title: string;
  company: string;
  companyUrl: string;
  period: string;
  points: string[];
  slug: string;
};

type ExperienceProps = {
  title: string;
  number: string;
  items: ExperienceItem[];
};

export default function Experience({ title, number, items }: Readonly<ExperienceProps>) {
  return (
    <section id="experience" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-4 animate-fade-in-up">
          <span className="text-accent text-sm">{number}</span>
          <span className="text-foreground">{title}</span>
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="mt-12 space-y-0">
          {items.map((exp, i) => (
            <div key={exp.slug} className="relative pl-6 pb-10 last:pb-0 group animate-fade-in-up" style={{ animationDelay: `${0.15 * (i + 1)}s` }}>
              {/* Timeline */}
              <div className="absolute left-0 top-3 bottom-0 w-px bg-border group-last:bg-transparent" />
              <div className="absolute left-0 top-3 w-1.5 h-1.5 -translate-x-[2px] bg-accent" />

              <div className="border border-border p-5 hover:border-accent/30 transition-all duration-500 group-hover:bg-card/50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    {exp.title}{" "}
                    {exp.companyUrl.startsWith("http") ? (
                      <a
                        href={exp.companyUrl}
                        className="text-accent hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @ {exp.company}
                      </a>
                    ) : (
                      <span className="text-accent">@ {exp.company}</span>
                    )}
                  </h3>
                  <span className="text-xs text-muted mt-1 sm:mt-0">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {exp.points.map((point, j) => (
                    <li
                      key={`${exp.slug}-${j}-${point}`}
                      className="text-muted text-xs leading-relaxed flex gap-2"
                    >
                      <span className="text-accent mt-0.5">→</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
