# Reddit Clone

A Reddit-style discussion app built with Next.js. Instead of subreddits, posts are organized with **tags**. Users can sign up, publish posts, comment in nested threads, and vote on both posts and comments.

## Features

- **Authentication** through [Neon Auth](https://neon.tech/docs/guides/neon-auth), with sign-in and sign-up pages at `/auth/[pathname]`
- **Posts** with a title, body, and up to five tags (defaults to `webdev` if none are given)
- **Nested comments** with replies at any depth
- **Voting** on posts and comments; clicking the same arrow again removes your vote
- **Feed sorting**: Hot, New, and Top
- **Filtering** by tag, plus **search** across post titles and bodies
- **Settings page** to change your username (3 to 20 characters: lowercase letters, numbers, and underscores)
- **Loading states** and skeletons for the feed, post pages, and comments
- **Seed scripts** with demo users, posts, threaded comments, and votes

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router, Server Actions), React 19, TypeScript |
| Database | PostgreSQL on [Neon](https://neon.tech) |
| ORM | Prisma 7 with the `@prisma/adapter-pg` driver adapter |
| Auth | Neon Auth (`@neondatabase/auth`) |
| UI | Tailwind CSS 4, shadcn/ui, Base UI, Lucide icons |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A Neon project with Postgres and Neon Auth enabled (a free Postgres database can also be created with `npx create-db`)

### Installation

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=require
NEON_AUTH_BASE_URL=https://<your-neon-auth-endpoint>
NEON_AUTH_COOKIE_SECRET=replace-with-a-long-random-string
```

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon Postgres connection string, used by Prisma and the app |
| `NEON_AUTH_BASE_URL` | Auth endpoint shown in your Neon project's Auth settings |
| `NEON_AUTH_COOKIE_SECRET` | Secret used to sign session cookies. Generate one with `openssl rand -base64 32`. |

### Set up the database

```bash
npm run db:push
```

This pushes the Prisma schema to your database and generates the Prisma client into `lib/generated/prisma`.

### (Optional) Seed demo data

```bash
npm run db:seed
```

### Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Generate the Prisma client and create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the code with ESLint |
| `npm run db:push` | Push the schema to the database and regenerate the client |
| `npm run db:seed` | Seed tags, demo posts, comments, and votes |
| `npm run db:seed-cv` | Same seed content as `db:seed` (the two scripts are currently identical) |

### Seed options

| Variable | Effect |
| --- | --- |
| `SEED_EXTRA=N` | Adds N procedurally generated posts after the curated ones (default `0`) |
| `SEED_FORCE=1` | **Destructive.** Deletes all posts, comments, and votes before re-seeding |

Example:

```bash
SEED_EXTRA=25 npm run db:seed
```

Seeded content uses fake author IDs starting with `seed_`, so it shows up as placeholder usernames.

## Data Model

Defined in `prisma/schema.prisma`:

- **UserProfile**: `id` (matches the Neon Auth user), unique `username`
- **Post**: title, body, author, timestamps
- **Tag** and **PostTag**: many-to-many link between posts and tags, with a display label and color
- **Comment**: belongs to a post, with an optional `parentId` for replies
- **Vote**: one row per user and target, with `targetType` (`post` or `comment`) and a value of `1` or `-1`

A profile is created automatically the first time a signed-in user loads the app.

## Project Structure

```
reddit-clone/
├── app/
│   ├── (core)/                       # Main layout with sidebars
│   │   ├── post/
│   │   │   └── [id]/
│   │   │       ├── loading.tsx
│   │   │       └── page.tsx          # Post and comments
│   │   ├── settings/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── submit/
│   │   │   ├── loading.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx                  # Feed
│   ├── api/
│   │   └── auth/
│   │       └── [...path]/
│   │           └── route.ts          # Neon Auth route handler
│   ├── auth/
│   │   └── [pathname]/
│   │       └── page.tsx              # Sign-in and sign-up views
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── feed/                         # Post cards, vote buttons, sort tabs
│   │   ├── feed-sort-tabs.tsx
│   │   ├── post-card.tsx
│   │   └── vote-buttons.tsx
│   ├── layout/                       # Navbar, sidebars, search, trending
│   │   ├── join-cta-card.tsx
│   │   ├── left-sidebar.tsx
│   │   ├── left-tags.tsx
│   │   ├── navbar.tsx
│   │   ├── right-trending.tsx
│   │   └── search-bar.tsx
│   ├── post/                         # Comments, composer, post form
│   │   ├── comment-composer.tsx
│   │   ├── comment-node.tsx
│   │   ├── comment-thread.tsx
│   │   ├── comments-section.tsx
│   │   ├── comments-skeleton.tsx
│   │   └── submit-post-form.tsx
│   ├── settings/
│   │   └── settings-form.tsx
│   └── ui/                           # shadcn/ui primitives
├── lib/
│   ├── actions/                      # Server actions
│   │   ├── comments.ts
│   │   ├── posts.ts
│   │   └── user.ts
│   ├── db/
│   │   ├── queries.ts
│   │   └── user-profile.ts
│   ├── auth.ts                       # Neon Auth setup
│   ├── prisma.ts                     # Prisma client
│   ├── comment-tree.ts               # Builds nested comment trees
│   ├── trending.ts
│   ├── format.ts
│   ├── types.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma                 # Database schema
├── providers/
│   └── neon-auth-ui-provider.tsx
├── scripts/
│   ├── seed.ts
│   └── seed-with-comments-and-votes.ts
├── prisma.config.ts
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Notes and Limitations

- The **Hot** score is `votes + 2 × comments`, with no time decay. **Top** sorts by votes. The feed loads the 50 most recent matching posts and sorts them in memory.
- The **Trending** sidebar shows static placeholder data from `lib/trending.ts`.

## Deployment

Deploy to [Vercel](https://vercel.com) and add the three environment variables in the project settings. The `build` script runs `prisma generate` automatically. Run `npm run db:push` against your production database before the first deploy.
