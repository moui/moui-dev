type HeroData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
};

export default function Hero({ data }: Readonly<{ data: HeroData }>) {
  const subtitle = data.subtitle;
  const subtitleText = subtitle.endsWith(".") ? subtitle.slice(0, -1) : subtitle;
  const subtitleDot = subtitle.endsWith(".") ? "." : "";

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-3xl text-center relative z-10">
        <p className="text-accent text-sm mb-6 tracking-[0.3em] uppercase animate-fade-in-up">
          {data.eyebrow}
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground mb-4 animate-fade-in-up delay-100">
          {data.title}
        </h1>
        <h2 className="text-2xl md:text-4xl font-light text-muted mb-8 animate-fade-in-up delay-200">
          {subtitleText}
          {subtitleDot ? <span className="text-accent">{subtitleDot}</span> : null}
        </h2>
        <p className="text-muted text-base max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-300">
          {data.description}
        </p>
        <div className="flex gap-4 justify-center animate-fade-in-up delay-400">
          <a
            href={data.ctaPrimary.href}
            className="px-6 py-3 text-sm bg-accent text-black font-semibold hover:bg-accent-light transition-all duration-300 hover:shadow-lg hover:shadow-accent/25"
          >
            {data.ctaPrimary.label}
          </a>
          <a
            href={data.ctaSecondary.href}
            className="px-6 py-3 text-sm border border-border text-muted-bright font-medium hover:border-accent hover:text-accent transition-all duration-300"
          >
            {data.ctaSecondary.label}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-5 h-8 border border-border rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
