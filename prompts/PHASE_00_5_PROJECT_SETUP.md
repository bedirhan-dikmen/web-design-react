# PHASE 00.5 — PROJECT FOUNDATION

You are working inside a brand-new project directory:

`kerinti_design_v3`

This is intentionally a clean rebuild of the Kerinti Soft website.

There is no previous application implementation that needs to be preserved.

However, this repository already contains important design material and project instructions.

## Existing protected directories/files

The following already exist and MUST NOT be deleted, renamed, overwritten, or moved unless explicitly instructed:

- `/reference`
- `/static_design`
- `/docs`
- `/prompts`
- `/.claude`
- `/CLAUDE.md`
- `/AGENTS.md`
- `/START_HERE.md`

Read the repository instructions before doing anything.

Load the Kerinti visual-quality skill.

---

# GOAL

Create the technical foundation for the new Kerinti website.

Do NOT implement the homepage design yet.

Do NOT recreate the reference screenshots.

Do NOT build the hero yet.

Do NOT add animations yet.

Do NOT create placeholder visual compositions.

This phase is infrastructure only.

---

# REQUIRED STACK

Use:

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- ESLint

Use the currently compatible stable versions available in the environment.

Do not add unnecessary dependencies.

Do not install animation libraries yet.

Do not install a large UI component library.

We will build the site's visual system ourselves.

---

# IMPORTANT PROJECT PRINCIPLE

This website will contain:

- high-resolution raster artwork,
- product UI screenshots,
- responsive compositions,
- SVG/vector branding,
- later animation and scroll-driven storytelling.

The project architecture must therefore prioritize:

1. visual fidelity,
2. responsive image handling,
3. predictable asset sizing,
4. component isolation,
5. maintainability,
6. performance.

---

# TASK 1 — INITIALIZE THE APPLICATION

Initialize the Next.js application in the CURRENT project.

Do not create another nested project such as:

`kerinti_design_v3/kerinti_design_v3`

and do not create:

`kerinti_design_v3/my-app`

The application must live at the current repository root.

Preserve all existing design/docs folders.

If normal scaffolding cannot safely initialize into a non-empty folder,
manually create the required Next.js project files instead of deleting
existing content.

---

# TASK 2 — CREATE APPLICATION STRUCTURE

Establish a clean structure similar to:

app/
components/
components/layout/
components/home/
components/ui/
lib/
public/
public/brand/
public/images/
public/images/hero/
public/images/product/
public/images/sectors/

Do not move all source assets into `/public` automatically.

First understand the purpose of `/static_design`.

Production assets may later be copied or optimized deliberately.

The source artwork must remain preserved.

---

# TASK 3 — BASE APPLICATION

Create only a minimal working application.

The homepage should temporarily contain something simple such as:

Kerinti Soft
Design system initialized.

No attempt should be made to reproduce the final homepage yet.

The purpose is only to prove that:

- Next.js runs,
- TypeScript works,
- Tailwind works,
- fonts/styles load correctly,
- the repository structure is valid.

---

# TASK 4 — GLOBAL CSS FOUNDATION

Prepare a minimal CSS foundation.

Include:

- box-sizing normalization,
- body margin reset,
- sensible image defaults,
- responsive root behavior,
- overflow-x protection only if justified,
- font smoothing.

Do NOT add arbitrary visual styling yet.

Do NOT create the final brand design yet.

---

# TASK 5 — ASSET SAFETY

Implement a clear separation between:

REFERENCE MATERIAL
`/reference`

SOURCE PRODUCTION ARTWORK
`/static_design`

WEB-DELIVERY ASSETS
`/public`

Important:

Production components must never import screenshots directly from
`/reference`.

Do not copy reference screenshots into `/public`.

Do not use them as temporary website backgrounds.

---

# TASK 6 — IMAGE ARCHITECTURE PREPARATION

Prepare the project so later phases can use:

- Next.js Image where appropriate,
- `<picture>` when art direction is required,
- SVG for logos/icons,
- CSS background layers only when semantically appropriate.

Do NOT prematurely convert every image.

Do NOT upscale any image.

Do NOT recompress source assets destructively.

---

# TASK 7 — CREATE ASSET MANIFEST

Create:

`docs/ASSET_MANIFEST.md`

Record the production candidate assets currently found inside:

`/static_design`

For each include:

- filename,
- natural dimensions,
- intended role,
- source/master status,
- recommended web usage,
- safe scaling notes.

Also note that `/reference` assets are reference-only.

Do not modify the source files.

---

# TASK 8 — VERIFY

Run:

- install,
- lint,
- type checking if configured,
- production build.

Resolve foundation-level errors.

Do not start implementing page sections.

---

# EXPECTED RESULT

At the end of this phase:

- the project runs,
- the project builds,
- the file structure is clean,
- existing source/reference material is preserved,
- asset responsibilities are documented,
- no final page design has been implemented.

---

# REPORT

Return:

### Project initialization

### Versions and stack

### Files created

### Files modified

### Existing files preserved

### Asset architecture

### Asset manifest status

### Validation results

### Warnings / blockers

Finish with:

`PHASE 00.5 COMPLETE — FOUNDATION ONLY`