Act as a senior full-stack web developer and create a fully functional, production-ready NGO website for **Mariphil Foundation Inc.**, a Philippine non-profit organization supporting children and communities. 

🧠 STACK & TECH REQUIREMENTS
- Framework: Next.js (App Router, TypeScript)
- Styling: Tailwind CSS (with responsive, modern, clean NGO style — green #1EBD1E and white theme)
- ORM & DB: Prisma ORM via Neon DB (PostgreSQL)
- Forms: React Hook Form or Zod for validation
- State Management: React Context or Zustand (if needed)
- Auth: NextAuth.js (Admin login)
- Deployment: Vercel-ready
- Payments: Stripe (for donations)
- Image hosting: Cloudinary
- Email service: SendGrid (contact form + donation receipts)
- Hosting-ready `.env` configuration with all environment variables.

---

📂 SITE STRUCTURE / ROUTES

**Public Pages**
- `/` — Home  
  - Hero section (mission statement + Donate button)  
  - Impact stats (children helped, projects done, volunteers)  
  - Latest news (3 cards with images + links)  
  - Call to Action (Donate / Volunteer)

- `/about` — About Us  
  - Mission, Vision, History, Board Members, Partners.

- `/projects` — Projects  
  - Grid of projects with image, summary, status.
  - `/projects/[slug]` — project detail page (images, goals, results).

- `/news` — News & Updates  
  - Paginated list of news articles with image + excerpt.  
  - `/news/[slug]` — full article view.

- `/children-village` — Mariphil Children’s Village  
  - Overview, photos, staff, how it works, success stories.

- `/i-want-to-help` — Volunteer Page  
  - Volunteer sign-up form (store in DB, send email).

- `/donate` — Donation Page  
  - Stripe one-time & recurring donation form.  
  - Pre-set amounts (₱500, ₱1000, ₱2500, ₱5000) + custom.  
  - Option to dedicate donation + leave message.  
  - Confirmation page `/donation/thank-you`.

- `/contact` — Contact Page  
  - Contact form (name, email, message) → send via SendGrid + save in DB.  
  - Show foundation’s address, phone, and map.

---

**Admin Dashboard** (`/admin`)
- Login via NextAuth (role: admin, editor).
- Dashboard home: total donations, latest projects, news count.
- CRUD pages:
  - `/admin/news` — manage news (create/edit/delete).
  - `/admin/projects` — manage projects.
  - `/admin/donations` — view donations, export CSV.
  - `/admin/media` — upload images to Cloudinary.

---

🗄️ DATABASE SCHEMA (Prisma)
Include models:
- `User`: id, name, email, role, passwordHash
- `News`: id, title, slug, excerpt, content, coverImage, publishedAt
- `Project`: id, title, slug, summary, content, coverImage
- `Donation`: id, donorName, donorEmail, amount, currency, stripePaymentId, recurring, message
- `Volunteer`: id, name, email, phone, message
- `ContactMessage`: id, name, email, message
- `Media`: id, url, altText

Use MySQL types, timestamps, and relations where needed.

---

💻 FUNCTIONAL REQUIREMENTS
- Responsive layout (desktop, tablet, mobile)
- SEO meta tags for every page
- Accessible design (aria labels, alt text, good contrast)
- Image optimization (Next.js `<Image />`)
- Form validation with React Hook Form or Zod
- Protect all admin routes with NextAuth
- Donation webhook endpoint (`/api/webhooks/stripe`) to record payments
- Contact and volunteer forms store in DB and send email notifications
- Include loading, error, and empty states
- Pagination for news and projects
- Use reusable components for buttons, cards, layout, etc.

---

🎨 DESIGN STYLE
- Modern, minimal, clean NGO look.
- Main color: Green `#1EBD1E`, Secondary: White, Neutral gray for text.
- Use glassmorphism effects (blurred panels, soft shadows, rounded corners).
- Typography: Sans-serif (e.g., Inter or Poppins).
- Include hero images and section dividers with light gradients.
- Smooth hover transitions and subtle animations using Framer Motion.

---

🧩 DEPLOYMENT & CONFIG
- Include `.env.example` with:


- Include seed script (`prisma/seed.ts`) with sample data (1 project, 2 news posts).
- Ready to deploy on Vercel (with build script).

---

🧠 GOAL
Generate a **complete full-stack web application** with working database, authentication, donation system, admin dashboard, and responsive public pages — all styled with Tailwind.  
Code must be clean, modular, and production-ready, following modern best practices (ESLint, Prettier, environment variables, reusable components, layout templates).

Output the **full folder structure and example files** (especially pages, Prisma schema, Tailwind config, and main components). Include at least one example page (e.g., Home) fully coded.

