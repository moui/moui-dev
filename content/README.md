# Content Schema

All site copy lives in this folder. Edit Markdown files to update the site.

## Files
- `site.md`: global hero, nav, socials, footer credit.
- `about.md`: about section copy.
- `experience.md` + `experience/*.md`: experience section + items.
- `projects.md` + `projects/*.md`: projects section + items.
- `skills.md`: skill categories.
- `certifications.md` + `certifications/*.md`: certifications section + items.
- `contact.md`: contact section copy.

## Common Fields
- `number`: section number label (e.g. `"01."`).
- `title`: section title text.
- `order`: sort order for items (lower comes first).

## Item Schemas

### `experience/*.md`
```yaml
title: "Role Title"
company: "Company Name"
companyUrl: "https://example.com"
period: "2024 - Present"
order: 1
points:
  - "Bullet one"
  - "Bullet two"
```

### `projects/*.md`
```yaml
title: "Project Name"
description: "One-sentence summary."
tech:
  - "TypeScript"
  - "React"
github: "https://github.com/user/repo"
live: "https://project.site" # optional
featured: true
order: 1
```

### `certifications/*.md`
```yaml
title: "Certification"
issuer: "Issuer"
date: "2024"
credentialUrl: "https://verify.link"
order: 1
```

### `skills.md`
```yaml
title: "skills"
number: "04."
categories:
  - title: "frontend"
    skills: ["React", "TypeScript"]
```

### `contact.md`
```yaml
eyebrow: "06. what's next?"
title: "get_in_touch()"
email: "you@example.com"
cta_label: "send_message()"
footer_note: "" # optional, empty string hides it
```
