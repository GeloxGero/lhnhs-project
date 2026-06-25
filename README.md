# LHNHS JHS — Annual Procurement Plan System

A web-based procurement planning and expense management system for **La Huerta National High School Junior High School**, covering the Annual Procurement Plan (APP) for 2026.

---

## Overview

This system allows school administrators and staff to manage and track procurement items aligned with Key Result Areas (KRAs). Each expense item is tied to a specific AR code, account title, performance indicator, and resource type — enabling transparent budget planning and procurement tracking.

---

## Features

- **AR Code Viewer** — View detailed information per AR code including KRA, account title, purpose, performance indicator, resource type, quantity, and estimated cost
- **Annual Procurement Plan Table** — Itemized list of procurement items with description, specification, unit of measure, quantity, price, and total
- **Receipt / Image Viewer** — View and verify attached receipt images per procurement line item via a modal
- **Expense Seeding** — Dev utility to seed expense items for testing
- **Total Procurement Summary** — Auto-calculated total procurement amount per AR code

---

## Tech Stack

| Layer      | Technology                                                                |
| ---------- | ------------------------------------------------------------------------- |
| Runtime    | [Bun](https://bun.sh/) ≥ 1.x, Node ≥ 22.12                                |
| Framework  | [Astro](https://astro.build/) 6 + React 19 islands                        |
| Styling    | Tailwind CSS v4 + DaisyUI v5 + shadcn/ui                                  |
| Backend    | [Hono](https://hono.dev/) on Cloudflare Workers                           |
| Database   | PostgreSQL via [Drizzle ORM](https://orm.drizzle.team/)                   |
| DB Hosting | [Neon](https://neon.tech/) (staging) · Local PostgreSQL / DBeaver (local) |
| Storage    | Cloudinary (image uploads)                                                |
| Deploy     | [Cloudflare Workers](https://workers.cloudflare.com/) via Wrangler        |
| Charts     | Chart.js + react-chartjs-2                                                |
| Export     | xlsx                                                                      |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) ≥ 1.x
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (installed via dependencies)
- A Cloudflare account
- A [Neon](https://neon.tech/) account for staging
- Local PostgreSQL instance (e.g. via [DBeaver](https://dbeaver.io/))

### Installation

```bash
git clone https://github.com/GeloxGero/lhnhs-project.git
cd lhnhs-project
bun install
```

### Development

Runs the Astro client and Cloudflare Worker concurrently:

```bash
bun run dev
```

- Client → [http://localhost:4321](http://localhost:4321)
- Worker → [http://localhost:8787](http://localhost:8787)

---

## Database

### Generate migrations

```bash
bun run db:generate
```

### Apply migrations locally

Targets your local PostgreSQL instance configured in `drizzle.local.config.ts`:

```bash
bun run db:migrate:local
```

### Apply migrations to staging

Targets the remote Neon PostgreSQL database:

```bash
bun run db:migrate:staging
```

---

## Deployment

### Staging

```bash
bun run deploy:staging
```

### Production

```bash
bun run deploy:prod
```

### Dry runs (build only, no upload)

```bash
bun run dryrun:staging
bun run dryrun:prod
```

---

## Project Structure

```
/
├── src/
│   ├── components/
│   │   └── ImageViewerModal.tsx     # Modal for viewing and verifying receipt images
│   ├── pages/
│   │   └── ARCodePage.tsx           # Main AR code detail page
│   └── lib/
│       └── types.ts                 # Shared TypeScript types
├── drizzle.local.config.ts          # Drizzle config for local PostgreSQL
├── wrangler.toml                    # Cloudflare Workers config
└── package.json
```

---

## API Endpoints

| Method | Endpoint                                                        | Description                                       |
| ------ | --------------------------------------------------------------- | ------------------------------------------------- |
| GET    | `/api/protected/expense_summary/ar_get_expenses`                | Fetch expense items by AR code                    |
| GET    | `/api/protected/general_expenditure/ar_get_general_expenditure` | Fetch general expenditure info by AR code         |
| POST   | `/api/protected/expense_summary/ar_code_seed`                   | Seed expense items for a given AR code (dev only) |

---

## Usage

Navigate to an AR code detail page via:

```
/?code=<AR_CODE>
```

For example: `/?code=195`

---

## License

For internal use by LHNHS JHS only.
