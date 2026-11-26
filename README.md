# Cognify — AI-Powered Campus Item Finder

> Smart campus lost-and-found intelligence built for **JECRC University, Jaipur** by **Team The Retrivers**.

![React](https://img.shields.io/badge/React-18-33B8C8?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-0b4757?style=flat-square&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Postgres_%26_Realtime-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![Zapier AI](https://img.shields.io/badge/Zapier_AI-Automation-FF4A00?style=flat-square&logo=zapier&logoColor=white)
![WebGL](https://img.shields.io/badge/WebGL2-Custom_Shaders-F8C12C?style=flat-square)

---

## Team & Credits

- **Team Name:** The Retrivers
- **Institution:** JECRC University, Jaipur
- **Help Desk:** `sukrit.26bcon2770@jecrcu.edu.in`

| Member | Role | Email | GitHub |
| :--- | :--- | :--- | :--- |
| **Sukrit Shobhan** | Executed & Developed | `sukrit.26bcon2770@jecrcu.edu.in` | [@sukritshobhan-ai](https://github.com/sukritshobhan-ai) |
| **Tanishq Sharma** | Idea & Concept | `tanishq.26bcon2758@jecrcu.edu.in` | — |
| **Piyush Kumar** | Presented By | `piyush.26bcon2554@jecrcu.edu.in` | [@PiyushKumar-gtk](https://github.com/PiyushKumar-gtk) |

- **Project Built With:** Antigravity
- **Automation:** Zapier AI & Google Forms
- **Backend & Realtime:** Supabase
- **UI Credits:** 21st.dev & Uiverse.io (`kennyotsu/witty-deer-12`, MIT License)

---

## Table of Contents

1. [Project Idea & Problem Statement](#1-project-idea--problem-statement)
2. [Design Philosophy & UI Theme](#2-design-philosophy--ui-theme)
3. [System Architecture & Automation Pipeline](#3-system-architecture--automation-pipeline)
4. [How Every Feature Works](#4-how-every-feature-works)
5. [Project Structure](#5-project-structure)
6. [Running Locally](#6-running-locally)
7. [Supabase Database Setup](#7-supabase-database-setup)

---

## 1. Project Idea & Problem Statement

On a busy university campus, lost-and-found reporting is usually fragmented across chat groups, notice boards, and manual security desks. Reports lack structured metadata, item photos are hard to browse, sensitive items (wallets, ID cards, personal electronics) risk false claims, and owners often miss matching Found reports.

**Cognify** solves this end to end:

1. **Zero-Friction Reporting (Google Forms + Zapier AI):** Students and staff submit Lost or Found reports via Google Forms; Zapier cleans text fields, extracts Google Drive photo `FILE_ID`s, and inserts structured rows into **Supabase**.
2. **Real-Time Campus Radar & Semantic AI Matching:** The web portal automatically scans active Lost and Found reports, pairing items across device concepts, brands, color families, campus zones, and marks even when phrasing differs (e.g. pairing a Lost *"grey laptop"* in the *Cafeteria* with a Found *"Asus"* in the *Cafeteria*).
3. **Finder-Verified Ownership & Secure Handover:** Claim answers are never auto-approved on the client. Every claim is routed to the person who reported the Found item; once approved, Cognify generates a **4-digit Handover PIN** and unlocks the **Secure Handover Chat**.
4. **Private Per-User Vaults:** Every user can sign up and log in with a username or email to view only their own Lost reports, Found reports, incoming claim answers to verify, and submitted claims.

---

## 2. Design Philosophy & UI Theme

Cognify uses an **"Aqua Radar & Signal Gold"** visual system combining WebGL2 shaders, frosted glassmorphism, and 3D hover micro-interactions:

### Color Palette
- **Canvas & Surfaces:** Clean white (`#FFFFFF`), ice cyan dot-grid backdrops (`.hero-dot-grid` using `#9CE5EC`), and frosted translucent panels (`bg-white/85 backdrop-blur-xl`).
- **Primary Deep Ink & Teal (`#0b4757` / `#33B8C8`):** High-contrast deep teal headings and vibrant cyan active pills, radar rings, and Found status badges.
- **Ice Cyan (`#9CE5EC`):** Hairline card borders and soft tinted badges.
- **Signal Gold (`#F8C12C`):** Lost badges, `Claim Item` / ownership CTAs, match progress arcs, and highlight pills.
- **Dark Multi-Column Footer (`#212121`):** Full-width dark structured credentials footer organizing team roles, contacts, GitHub links, help desk info, and tech stack badges.

### Typography
- **Headings:** `Plus Jakarta Sans` (`font-display`)
- **UI & Body:** `Inter` (`font-sans`)
- **IDs, PINs & Telemetry:** `JetBrains Mono` (`font-mono-id`)

### Custom Interactive UI Elements
- **`AnimatedShaderHero` & `LiveOrb` (`21st.dev`):** Full-width WebGL2 GLSL shader backdrop paired with an interactive WebGL `LiveOrb` mascot whose eyes track the user's cursor across the Hero, AI Match Center, Login Vault, and Personal Dashboard.
- **`AquariumPrompt`:** Interactive aquarium-themed live search bar with animated pixel-art fish and rising bubbles triggered as you type and search.
- **`LiquidMetalButton`:** WebGL liquid-metal 3D buttons preserved for the primary **I Lost Something** and **I Found Something** Google Form triggers.
- **Liquid Glass Buttons (`.liquid-glass-btn` / `.tactile-btn`):** Adapted from `components/ui/liquid-glass-button.tsx` using a shared SVG `<filter id="container-glass">` (`feTurbulence` + `feDisplacementMap` + `feGaussianBlur`), specular highlight gradients, and layered inset/outer rim shadows across navigation pills, filter chips, and action buttons.
- **3D Hover-Tracking Item Cards (`UiverseItemCard`):** Adapted from Uiverse.io (`kennyotsu/witty-deer-12`, MIT License) in Cognify's cyan/teal/gold palette using a pure-CSS 5x5 tracker grid (`perspective: 800px`) for smooth 3D `rotateX`/`rotateY` tilt and ambient gradient glow (`::before`) while keeping card action buttons clickable at `z-index: 250`.

---

## 3. System Architecture & Automation Pipeline

```text
[Google Forms: Lost & Found]
          │
          ▼
[Zapier: Formatter & Run JavaScript]
   ├── Extracts Google Drive FILE_ID -> thumbnail URL
   ├── Maps reporter_email, zone, category, secret_question, marks
   └── POST https://<project>.supabase.co/rest/v1/items
          │
          ▼
[Supabase PostgreSQL + Realtime]
   ├── public.items    (Lost, Found & Reunited items + privacy flags)
   ├── public.profiles (username, email, full_name, role)
   └── public.claims   (claimant answers, status, handover_pin)
          │
          ▼ (15s REST polling + postgres_changes Realtime)
[Cognify Frontend (index.html)]
   ├── Locator Home, Aquarium Search & Uiverse 3D Item Feed
   ├── Semantic AI Match Center (live Lost ↔ Found pairing)
   ├── Finder-Verified Verify Ownership Modal & Handover Chat
   └── Private Per-User Vault & Role-Gated Admin Moderation
```

### Google Drive Photo Resolution (`getImageCandidates` & `ItemImage`)
Drive URLs are parsed for their `FILE_ID` and loaded with `referrerPolicy="no-referrer"` across ordered CDN candidates (`lh3.googleusercontent.com/d/<fid>=w800`, `drive.google.com/thumbnail?id=<fid>&sz=w800`, and original URL). If a remote image fails or loads with `naturalWidth === 0`, `ItemImage` cleanly falls back to a styled category icon card.

---

## 4. How Every Feature Works

### A. Locator Home & Public Item Feed
- Live search via `AquariumPrompt`, Campus Zone chips (`Central Library`, `Cafeteria`, `Main Academic Block`, `Sports Complex`, `Hostel Gate`), Status pills (`All`, `Lost`, `Found`, `Reunited`), and Category dropdown.
- `cleanZapierSpot` normalizes concatenated Zapier spot strings (e.g. `Electronicscafeteria` -> `Cafeteria`).
- Sensitive Found items blur photos and mask marks (`Privacy Protected`) until approved verification unlocks them.

### B. Semantic AI Match Center (`computeMatch` & `enrichedMatches`)
`enrichedMatches` compares every active `Lost` item against every active `Found` item:
- **Placeholder Filtering (`MATCH_STOPWORDS`):** Ignores defaults (`unspecified`, `unbranded`, `sample`, etc.) and splits concatenated category/zone text.
- **Object Concept Grouping (`OBJECT_CONCEPTS`):** Maps brands and synonyms across 12 device/object families (e.g. `asus`/`macbook`/`dell`/`laptop` -> `Laptop / Notebook`; `sony`/`airpods`/`wh1000` -> `Headphones / Audio`; `iphone`/`samsung` -> `Phone / Smartphone`), awarding **+38 pts** on matching concepts and **-26 pts** on mismatched object families.
- **Multi-Signal Weighted Confidence (0–98%):** Object Concept (`+38`), Zone & Pickup Spot (`+22 / +4`), Category (`+14`), Brand (`+14`), Color Family (`COLOR_GROUPS`, `+10`), and direct/fuzzy Levenshtein-1 token matching (`tokensFuzzyEqual`, up to `+18`).
- **Confidence Filters & Telemetry:** Supports `High (70%+)`, `Likely (50%+)`, `All Pairs`, and `Rescan Live`, showing `CircularScore`, `RecoveryProgressBar`, matched attribute pills, and live claim state.

### C. Finder-Verified Ownership & Handover PINs
1. **Claim Submission:** Clicking **Claim Item** opens the **Verify Ownership** modal where the claimant enters **Your Name**, **Your Email**, and **Your Answer**, inserting a `pending` row into `public.claims`.
2. **Finder Review (`Verify Claims`):** Inside the logged-in vault, the finder who reported the item reviews submitted answers and clicks **Approve & Generate PIN** (generates a 4-digit `handover_pin`, sets `claims.status = 'approved'`, and unlocks `items.privacy_unlocked = true`) or **Reject Claim**.
3. **Pickup & Completion (`My Claims` + `Secure Handover`):** Both claimant and finder can open the **Secure Handover** drawer to view the 4-digit PIN, chat, and mark the item **Reunited** (`status = 'Reunited'` synced back to Supabase).

### D. Private User Accounts & Admin Moderation
- **Split Liquid-Glass Login Vault:** Sign up or log in using username or email with client-side SHA-256 credential hashing, `public.profiles` sync, and local session persistence (works cleanly on `localhost` without email-confirmation redirect blocks).
- **Per-User Dashboard:** `Items I Lost`, `Items I Found`, `Verify Claims`, and `My Claims` filter items and claims strictly to the signed-in user.
- **Admin Moderation (`role === 'admin'`):** Global KPI summary (`Active Items`, `Pending Matches`, `Verified Returns`, `Flagged`) with **Approve**, **Flag**, and **Reunite** controls.

---

## 5. Project Structure

```text
nexora-campus-finder/
├── index.html                        # Complete runnable React 18 + Tailwind + WebGL app
├── serve.ps1                         # Local PowerShell static server (http://localhost:4173)
├── README.md                         # Project documentation
├── package.json                      # Dependency manifest for Next/TypeScript components
├── tsconfig.json                     # TypeScript configuration
├── components.json                   # shadcn/ui configuration
├── lib/
│   └── utils.ts                      # Tailwind class merge helper (cn)
├── styles/
│   └── globals.css                   # Theme tokens and base styles
└── components/ui/                    # Modular React/TSX UI components
    ├── animated-shader-hero.tsx
    ├── aquarium-prompt.tsx
    ├── demo.tsx
    ├── liquid-glass-button.tsx
    ├── liquid-metal-button.tsx
    ├── live-orb.tsx
    └── text-scroll-animation.tsx
```

---

## 6. Running Locally

Start the local server from the project root in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Then open **`http://localhost:4173`** in your browser.

---

## 7. Supabase Database Setup

Run the following SQL in **Supabase -> SQL Editor** to provision `public.items`, `public.profiles`, `public.claims`, row-level security policies, and Realtime:

```sql
create table if not exists public.items (
  id text primary key,
  status text not null check (status in ('Lost', 'Found', 'Reunited')),
  title text not null,
  category text not null default 'Electronics',
  brand text default 'Unspecified',
  color text default 'Unspecified',
  marks text default '',
  zone text not null default 'Central Library',
  spot text default 'Campus Zone',
  reporter text default 'Student',
  reporter_email text default '',
  is_sensitive boolean default false,
  privacy_unlocked boolean default true,
  secret_question text default '',
  secret_answer text default '',
  is_flagged boolean default false,
  image_url text default '',
  created_at timestamptz default now()
);

alter table public.items enable row level security;

drop policy if exists "Allow public read items" on public.items;
create policy "Allow public read items" on public.items for select using (true);

drop policy if exists "Allow public insert items" on public.items;
create policy "Allow public insert items" on public.items for insert with check (true);

drop policy if exists "Allow public update items" on public.items;
create policy "Allow public update items" on public.items for update using (true) with check (true);

create table if not exists public.profiles (
  id uuid primary key,
  username text unique not null,
  email text not null,
  full_name text default '',
  role text default 'student',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Allow public read profiles" on public.profiles;
create policy "Allow public read profiles" on public.profiles for select using (true);

drop policy if exists "Allow insert own profile" on public.profiles;
create policy "Allow insert own profile" on public.profiles for insert with check (true);

drop policy if exists "Allow update own profile" on public.profiles;
create policy "Allow update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create table if not exists public.claims (
  id text primary key,
  item_id text not null,
  item_display_id text,
  item_title text,
  item_zone text,
  finder_email text default '',
  claimant_name text not null,
  claimant_email text not null,
  answer text not null,
  status text default 'pending',
  handover_pin text,
  reviewer_note text,
  created_at timestamptz default now()
);

alter table public.claims enable row level security;

drop policy if exists "Allow public read claims" on public.claims;
create policy "Allow public read claims" on public.claims for select using (true);

drop policy if exists "Allow public insert claims" on public.claims;
create policy "Allow public insert claims" on public.claims for insert with check (true);

drop policy if exists "Allow public update claims" on public.claims;
create policy "Allow public update claims" on public.claims for update using (true) with check (true);

do $$
begin
  alter publication supabase_realtime add table public.items;
exception when duplicate_object then null;
end $$;

do $$
begin
  alter publication supabase_realtime add table public.claims;
exception when duplicate_object then null;
end $$;
```

> Note: Keep your Supabase `sb_secret_...` key only inside your server-side/Zapier configuration (`Code by Zapier`), never inside client-side files committed to a public repository.
