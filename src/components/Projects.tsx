type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  slug: string;
};

type ProjectsProps = {
  title: string;
  number: string;
  featuredLabel: string;
  otherLabel: string;
  featured: ProjectItem[];
  others: ProjectItem[];
};

export default function Projects({
  title,
  number,
  featuredLabel,
  otherLabel,
  featured,
  others,
}: Readonly<ProjectsProps>) {
  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-4 animate-fade-in-up">
          <span className="text-accent text-sm">{number}</span>
          <span className="text-foreground">{title}</span>
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        {/* Featured projects */}
        <div className="mt-12 space-y-6">
          {featured.map((project, i) => (
            <div
              key={project.slug}
              className="border border-border p-6 hover:border-accent/30 transition-all duration-500 group animate-fade-in-up"
              style={{ animationDelay: `${0.15 * (i + 1)}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-accent text-xs">▸ {featuredLabel}</span>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] text-muted border border-border px-2 py-0.5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 md:mt-1">
                  {project.github ? (
                  <a
                    href={project.github}
                    className="text-muted hover:text-accent transition-colors duration-300"
                    aria-label="GitHub"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  ) : null}
                  {project.live ? (
                    <a
                      href={project.live}
                    className="text-muted hover:text-accent transition-colors duration-300"
                      aria-label="Live"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        <div className="mt-16">
          <h3 className="text-xs uppercase tracking-widest text-muted text-center mb-8">
            {otherLabel}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {others.map((project) => {
              const Card = project.github ? "a" : "div";
              return (
              <Card
                key={project.slug}
                href={project.github || undefined}
                className="border border-border/50 p-5 hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-accent text-lg">⌘</span>
                  {project.github ? (
                  <svg
                    className="w-4 h-4 text-muted group-hover:text-accent transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  ) : null}
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-muted text-xs leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
