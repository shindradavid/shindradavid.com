# shindradavid.com

Personal portfolio website for Shindra David, a web developer based in Uganda. The site showcases work experience, projects/portfolio, and a technical blog.

## Technology Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) (^2.21.5) with [Svelte 5](https://svelte.dev/) (^5.34.7)
- **Language**: TypeScript (^5.8.3)
- **Build Tool**: Vite (^5.4.19)
- **Adapter**: `@sveltejs/adapter-node` (^4.0.1) for Node.js deployment
- **Styling**: SCSS/Sass (^1.89.2)
- **Content Processing**: mdsvex (^0.11.2) for Markdown rendering
- **Package Manager**: pnpm (10.9.0)

## Project Structure

```
├── src/
│   ├── lib/
│   │   ├── actions/          # Svelte actions (click outside, scroll animations)
│   │   ├── components/       # Reusable Svelte components (SEO, ThemeSwitcher, Cards)
│   │   ├── icons/            # SVG icon components
│   │   ├── server/           # Server-side only code
│   │   │   └── markdown/     # Markdown parsing utilities and plugins
│   │   ├── config.ts         # Site configuration (paths, URLs, defaults)
│   │   ├── state.svelte.ts   # Svelte 5 runes-based state management (theme)
│   │   ├── types.ts          # TypeScript type definitions
│   │   └── utils/            # Client-side utilities
│   ├── routes/               # SvelteKit file-based routing
│   │   ├── blog/             # Blog listing and post pages
│   │   ├── my-work/          # Portfolio/project showcase
│   │   ├── work-experience/  # Work experience entries
│   │   ├── about-me/         # About page
│   │   ├── lets-connect/     # Contact page
│   │   ├── rss.xml/          # RSS feed endpoint
│   │   ├── sitemap.xml/      # Sitemap endpoint
│   │   ├── +layout.svelte    # Root layout (header, footer, nav)
│   │   └── +page.svelte      # Home page
│   ├── styles/               # Global SCSS stylesheets
│   ├── app.html              # HTML template
│   ├── app.d.ts              # TypeScript declarations
│   ├── hooks.server.ts       # Server hooks (theme cookie handling)
│   └── index.test.ts         # Unit test example
├── content/                  # Markdown content source files
│   ├── posts/                # Blog posts (.md files)
│   ├── my-work/              # Project portfolio entries
│   └── work-experience/      # Work experience entries
├── static/                   # Static assets (favicons, images, fonts)
├── tests/                    # Playwright integration tests
├── package.json
├── svelte.config.js          # Svelte configuration
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── mdsvex.config.js          # mdsvex Markdown configuration
├── playwright.config.ts      # Playwright test configuration
├── .eslintrc.cjs             # ESLint configuration
└── .prettierrc               # Prettier configuration
```

## Build and Development Commands

```bash
# Install dependencies
pnpm install

# Development server (runs on http://0.0.0.0:8003)
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Start production server (requires build first)
pnpm start
# Note: start script sets HOST=127.0.0.1 PORT=8000 ORIGIN=https://shindradavid.com

# Type checking
pnpm check
pnpm check:watch

# Linting and formatting
pnpm lint      # Check formatting and lint
pnpm format    # Auto-fix formatting
```

## Testing

The project uses a dual testing strategy:

```bash
# Run all tests
pnpm test

# Unit tests (Vitest)
pnpm test:unit
# - Configured in vite.config.ts
# - Test files: src/**/*.{test,spec}.{js,ts}

# Integration tests (Playwright)
pnpm test:integration
# - Configuration: playwright.config.ts
# - Test directory: tests/
# - Test match: **/*.test.{js,ts}
# - Auto-builds and previews before running
```

## Content Management

Content is stored as Markdown files in the `/content` directory with YAML frontmatter:

### Blog Posts (`/content/posts/`)
```yaml
---
title: Post Title
description: Brief description
thumbnailUrl: /images/posts/slug/thumbnail.png
publishedOn: 2025-03-30
tags:
  - javascript
  - tutorial
---
```

### Projects (`/content/my-work/`)
```yaml
---
id: 1
title: Project Name
description: Project description
category: software | design
technologies: ["Svelte", "Node.js"]
gallery: ["/images/..."]
image: /images/.../cover.png
link: https://...
client: Client Name
thumbnailUrl: /images/...
liveUrl: https://... (optional)
publishedOn: 2025-01-15
isPublished: true
---
```

### Work Experience (`/content/work-experience/`)
```yaml
---
id: 1
order: "01"
duration: "Jan 2023 - Present"
title: Job Title
company: Company Name
description: Description
technologies: ["React", "TypeScript"]
link: https://...
images:
  - src: /images/...
    caption: Description
---
```

## Markdown Processing

The site uses a custom Markdown processing pipeline (`src/lib/server/markdown/utils/parseMarkdown.ts`):

1. **gray-matter** - Extracts YAML frontmatter
2. **remark-gfm** - GitHub Flavored Markdown
3. **remark-parse** - Parses Markdown
4. **remark-rehype** - Converts to HTML
5. **@shikijs/rehype** - Syntax highlighting with Shiki (github-dark-dimmed theme)
6. **rehype-slug** - Adds IDs to headings
7. **rehype-autolink-headings** - Adds anchor links to headings
8. **rehypeCopyCode** - Custom plugin for code copy functionality

Custom shortcode syntax for code blocks:
```markdown
{% icon "javascript" file "filename.js" %}
```

## Theming

The site supports three themes: `dark`, `light`, and `system`.

- Theme is stored in a cookie (`theme`) with 14-day expiration
- Server hook (`hooks.server.ts`) reads cookie and injects `data-theme` attribute
- Client-side state management in `src/lib/state.svelte.ts` using Svelte 5 runes
- Theme CSS variables defined in `src/styles/_theme.scss`

## Code Style Guidelines

### ESLint Configuration
- Extends: `eslint:recommended`, `@typescript-eslint/recommended`, `plugin:svelte/recommended`, `prettier`
- Parser: `@typescript-eslint/parser`
- Special handling for `.svelte` files with `svelte-eslint-parser`

### Prettier Configuration
- Uses tabs for indentation
- Single quotes
- No trailing commas
- Print width: 100
- `prettier-plugin-svelte` for Svelte files

### General Conventions
- TypeScript strict mode enabled
- Prefer `$lib/` alias for imports from `src/lib/`
- Use Svelte 5 runes syntax (`$state`, `$props`, `$derived`)
- Use Sass `@use` instead of `@import` for styles

## Deployment

The project uses `@sveltejs/adapter-node` for deployment:

- Build output: `build/` directory
- Production start command sets:
  - `HOST=localhost`
  - `PORT=5000`
  - `ORIGIN=https://shindradavid.iconiksoftware.com`

## RSS and Sitemap

- **RSS Feed**: `/rss.xml` - Generated from blog posts
- **Sitemap**: `/sitemap.xml` - Auto-generated for SEO

## Important Files

| File | Purpose |
|------|---------|
| `src/lib/config.ts` | Site URLs, content paths, default theme |
| `src/lib/types.ts` | TypeScript interfaces for content |
| `src/hooks.server.ts` | Theme cookie handling on server |
| `src/lib/state.svelte.ts` | Client-side theme state |
| `mdsvex.config.js` | Markdown processing configuration |

## Notes for AI Agents

- This is a **Svelte 5** project - use runes syntax (`$state`, `$props`, etc.)
- Content is file-based Markdown in `/content` - no CMS or database
- Server-side rendering is used for content pages (`+page.server.ts`)
- The `entries` export in `+page.server.ts` files enables prerendering for dynamic routes
- Icons use Remix Icon classes (e.g., `ri-menu-line`, `ri-svelte-fill`)
- Images are optimized using `@sveltejs/enhanced-img`

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
