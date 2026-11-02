# moui.dev

Source code for [moui.dev](https://moui.dev), the personal portfolio and resume site of Mauricio Barrera, a full-stack developer working on GIS (ArcGIS) solutions, cloud deployments and team leadership.

The site is a single page with About, Experience, Projects, Skills, Certifications and Contact sections, available in English and Spanish with a light/dark theme toggle. All copy lives in Markdown files, so updating the site means editing content rather than components.

## Stack

- [Next.js](https://nextjs.org/) 16 (App Router) with `output: "export"`, producing a fully static site
- React 19 and TypeScript
- Tailwind CSS 4
- Markdown content parsed with `gray-matter` and rendered with `react-markdown`, `remark-gfm` and `rehype-sanitize`
- ESLint (`eslint-config-next`)
- AWS Amplify Hosting for builds and deployment

## Project structure

```text
content/
  README.md          Field schemas for every content file
  en/                English content
  es/                Spanish content (same files as en/)
public/              Static assets (About section photos: img_1/2/3.webp)
src/
  app/               Layout, page, global styles and favicon (icon.svg)
  components/        One component per section (Hero, About, Projects, ...)
  context/           Locale and theme providers (persisted in localStorage)
  lib/content.ts     Reads and sorts the Markdown content at build time
amplify.yml          AWS Amplify build specification
```

## Content

Both locales are read at build time and embedded in the page; the language toggle switches between them in the browser. Every file must exist in **both** `content/en/` and `content/es/`.

| File / folder | Contents |
| --- | --- |
| `site.md` | Name, hero text, navigation, social links, footer credit |
| `about.md` | About section heading and Markdown body |
| `experience.md`, `experience/*.md` | Section heading and one file per role |
| `projects.md`, `projects/*.md` | Section labels and one file per project (`featured: true` for the top list) |
| `skills.md` | Skill categories |
| `certifications.md`, `certifications/*.md` | Section heading and one file per certification (sorted by date, newest first) |
| `contact.md` | Contact section text and email |

See [`content/README.md`](content/README.md) for the frontmatter fields of each file. Links are optional: a project without a `github` URL, a role without an `http(s)` `companyUrl` and a certification without an `http(s)` `credentialUrl` are shown as plain cards or text instead of links.

The About section shows `public/img_1.webp`, `img_2.webp` and `img_3.webp` (square, about 1800 px); if a file is missing, an emoji placeholder is shown. Strip location and camera metadata from photos before committing them.

## Running locally

Requires Node.js 20.9 or newer and npm.

```bash
npm ci
npm run dev      # http://localhost:3000
```

## Checks and build

```bash
npm run lint
npm run build    # static site written to out/
```

There is no automated test suite; `lint` and `build` (which includes the TypeScript check) are the checks. To preview the production build, serve `out/` with any static file server, for example `npx serve out`.

## Deployment

The site is hosted on AWS Amplify Hosting, which builds from this repository. [`amplify.yml`](amplify.yml) runs `npm ci` and `npm run build`, then publishes the `out/` directory; `node_modules` and `.next/cache` are cached between builds. No environment variables or secrets are required.

## License

The source code is released under the [MIT License](LICENSE).

The MIT License does **not** cover the personal content of the site: the text in `content/` (biography, experience, project descriptions, certifications) and the images in `public/` (including the photos) remain © Mauricio Barrera, all rights reserved. If you reuse the code, replace that content with your own.
