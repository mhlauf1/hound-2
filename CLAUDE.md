# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hound Around Resort website — a Next.js 16 + Sanity Studio v5 monorepo built from the `sanity-template-nextjs-clean` starter. Two npm workspaces: `frontend/` (Next.js app) and `studio/` (Sanity CMS).

**Sanity project config** lives in `studio/sanity.cli.ts` and `studio/.env` (project ID + dataset). Frontend mirrors these in `frontend/.env.local`.

## Commands

```bash
# Start both dev servers (Next.js :3000, Studio :3333)
npm run dev

# Start individually
npm run dev:next
npm run dev:studio

# Lint (frontend only)
npm run lint
npm run lint --workspace=frontend   # equivalent

# Fix lint issues
npm run lint:fix --workspace=frontend

# Type check all workspaces
npm run type-check

# Format with Prettier
npm run format

# Regenerate TypeScript types from Sanity schema
npm run sanity:typegen --workspace=studio

# Install a package to a specific workspace
npm install <pkg> --workspace=frontend
npm install <pkg> --workspace=studio

# Deploy studio
npm run deploy --workspace=studio
```

## Architecture

### Monorepo Layout

- **`frontend/`** — Next.js 16 (App Router, React 19, Tailwind CSS v4). Pages live in `frontend/app/`. Components in `frontend/app/components/`.
- **`studio/`** — Sanity Studio v5. Schema definitions in `studio/src/schemaTypes/` (documents, objects, singletons subdirectories). Studio structure config in `studio/src/structure/`.

### Type Generation Pipeline

Schema changes flow: `studio/src/schemaTypes/**` → `sanity schema extract` → `sanity.schema.json` (root) → `sanity typegen generate` → `studio/sanity.types.ts` + `frontend/sanity.types.ts`. This runs automatically on `npm run dev` via `predev` hooks. Run manually with `npm run sanity:typegen --workspace=studio`.

### Page Builder Pattern

The core content model is a **page builder**: the `page` document type has a `pageBuilder` field (array of block types). Each block type needs:

1. **Sanity schema** — Object type in `studio/src/schemaTypes/objects/`, registered in `studio/src/schemaTypes/index.ts`
2. **GROQ query** — Block-specific projections added to `getPageQuery` in `frontend/sanity/lib/queries.ts` (dereference links/references here)
3. **React component** — In `frontend/app/components/`, registered in the `Blocks` map in `BlockRenderer.tsx`

`BlockRenderer.tsx` maps `_type` strings to React components and wraps each in a `data-sanity` attribute for visual editing. `PageBuilder.tsx` iterates the array and delegates to `BlockRenderer`.

### Link System

Links are polymorphic (`link.ts`): `linkType` field selects between `href` (external URL), `page` (reference to page doc), or `post` (reference to post doc). GROQ queries dereference page/post links to slug strings via the `linkReference` fragment in `queries.ts`. `ResolvedLink.tsx` renders the appropriate `<a>` or `<Link>`.

### Visual Editing

Sanity Presentation Tool is configured in `studio/sanity.config.ts` to preview at `http://localhost:3000`. Draft mode endpoints at `frontend/app/api/draft-mode/`. The `dataAttr()` utility from `frontend/sanity/lib/utils.ts` marks editable regions. Live Content API (`next-sanity/live`) provides real-time updates.

## Design Spec

`SPEC.md` contains the full design specification: brand colors (cream `#F5F0E3`, soft blue `#8BABE5`, dark brown `#341D04`), typography (Libre Caslon Text serif, Geist sans-serif), component specs for 13 sections, Sanity schema definitions, animation specs, and responsive breakpoints. Design reference screenshots are in `docs/design/`.

## Key Patterns

- **Tailwind v4** uses `@theme` blocks in `frontend/app/globals.css` for custom properties, not the traditional `theme.extend` in config
- **Sanity schemas** use `defineType`, `defineField`, `defineArrayMember` from `sanity`
- **GROQ queries** use `defineQuery` from `next-sanity` for type inference
- All block components receive `{ block, index, pageId, pageType }` props (see `BlockProps` type in `BlockRenderer.tsx`)
- Studio singleton pattern: `settings` document has a fixed ID (`siteSettings`) and is filtered from the default document list in `studio/src/structure/index.ts`
