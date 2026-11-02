type SkillCategory = {
  title: string;
  skills: string[];
};

type SkillsProps = {
  title: string;
  number: string;
  categories: SkillCategory[];
};

export default function Skills({ title, number, categories }: Readonly<SkillsProps>) {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-4 animate-fade-in-up">
          <span className="text-accent text-sm">{number}</span>
          <span className="text-foreground">{title}</span>
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 gap-10">
          {categories.map((category, i) => (
            <div key={category.title} className="space-y-3 animate-fade-in-up" style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
              <h3 className="text-xs uppercase tracking-widest text-accent">
                {`// ${category.title}`}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs border border-border text-muted-bright hover:border-accent/40 hover:text-accent transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
