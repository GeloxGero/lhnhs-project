# LHNHS JHS — Annual Procurement Plan System

A web-based procurement planning and expense management system for **Luis Hervias National High School Junior High School**, covering the Annual Procurement Plan (APP) for 2026.

---

## Overview

This system allows school administrators and staff to manage and track procurement items aligned with Key Result Areas (KRAs). Each expense item is tied to a specific AR code, account title, performance indicator, and resource type — enabling transparent budget planning and procurement tracking.

---

## Features

- **AR Code Viewer** — View detailed information per AR code including KRA, account title, purpose, performance indicator, resource type, quantity, and estimated cost
- **Annual Procurement Plan Table** — Itemized list of procurement items with description, specification, unit of measure, quantity, price, and total
- **Receipt / Image Attachment** — View and verify attached receipt images per procurement line item
- **Expense Seeding** — Dev utility to seed expense items for testing
- **Total Procurement Summary** — Auto-calculated total procurement amount per AR code

---

## Tech Stack

- **Framework:** React (with TypeScript)
- **Styling:** Tailwind CSS + DaisyUI
- **Routing / API:** Next.js API routes
- **Database:** Drizzle ORM (inferred from project structure)

---

## Project Structure

```
/
├── app/
├── components/
│   └── ImageViewerModal.tsx       # Modal for viewing and verifying receipt images
├── pages/
│   └── ARCodePage.tsx             # Main AR code detail page
├── api/
│   └── protected/
│       ├── expense_summary/       # Expense item endpoints
│       └── general_expenditure/   # General expenditure endpoints
└── lib/
    └── types.ts                   # Shared TypeScript types
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Package manager: `npm`, `yarn`, or `pnpm`

### Installation

```bash
git clone https://github.com/GeloxGero/lhnhs-project.git
cd lhnhs-project
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

---

## Usage

Navigate to an AR code page via:

```
/?code=<AR_CODE>
```

For example: `/?code=195`

This loads the procurement details for that specific AR code, including all line items and their associated receipt attachments.

---

## API Endpoints

| Method | Endpoint                                                        | Description                                       |
| ------ | --------------------------------------------------------------- | ------------------------------------------------- |
| GET    | `/api/protected/expense_summary/ar_get_expenses`                | Fetch expense items by AR code                    |
| GET    | `/api/protected/general_expenditure/ar_get_general_expenditure` | Fetch general expenditure info by AR code         |
| POST   | `/api/protected/expense_summary/ar_code_seed`                   | Seed expense items for a given AR code (dev only) |

---

## Contributing

This is an internal school system. For changes, open a pull request with a clear description of what was modified and why.

---

## License

For internal use by LHNHS JHS only.
