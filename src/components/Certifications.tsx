type CertificationItem = {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  slug: string;
};

type CertificationsProps = {
  title: string;
  number: string;
  items: CertificationItem[];
};

export default function Certifications({ title, number, items }: Readonly<CertificationsProps>) {
  return (
    <section id="certifications" className="py-28 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-4 animate-fade-in-up">
          <span className="text-accent text-sm">{number}</span>
          <span className="text-foreground">{title}</span>
          <span className="h-px bg-border flex-1 ml-4" />
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {items.map((cert) => {
            const isExternal = cert.credentialUrl.startsWith("http");
            const Card = isExternal ? "a" : "div";
            return (
              <Card
                key={cert.slug}
                href={isExternal ? cert.credentialUrl : undefined}
                className="border border-border p-5 hover:border-accent/30 transition-all duration-300 group"
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <span className="text-xs text-muted">{cert.date}</span>
                </div>
                <p className="text-xs text-muted">{cert.issuer}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
