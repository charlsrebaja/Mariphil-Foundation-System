# Mariphil Foundation Inc. Website

A full-stack NGO website built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Stripe.

## 🚀 Features

### Public Pages
- ✅ **Home Page** - Hero section, impact stats, latest news, and CTAs
- ✅ **About Page** - Mission, vision, history, board members, and partners
- ✅ **Projects** - Listing and detail pages for ongoing and completed projects
- ✅ **News & Updates** - Blog-style news articles with pagination support
- ✅ **Children's Village** - Information about the residential care facility
- ✅ **Volunteer Page** - Sign-up form for volunteers with database storage
- ✅ **Donation Page** - Stripe-integrated donation system (one-time and recurring)
- ✅ **Contact Page** - Contact form with location information

### Technical Features
- ✅ Fully responsive design with Tailwind CSS
- ✅ SEO optimized with meta tags
- ✅ Prisma ORM with PostgreSQL database
- ✅ Stripe payment integration
- ✅ SendGrid email notifications
- ✅ Server-side rendering with Next.js 15 App ~Router
- ✅ TypeScript for type safety
- ✅ Form validation with React Hook Form
- ✅ Glassmorphism UI effects

### Admin Features (To Be Implemented)~
- ⏳ NextAuth.js authentication
- ⏳ Admin dashboard
- ⏳ News management (CRUD)
- ⏳ Project management (CRUD)
- ⏳ Donation tracking and export
- ⏳ Media upload with Cloudinary

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Neon DB account)
- Stripe account
- SendGrid account
- Cloudinary account (for admin media upload)

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd mariphil-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add the following:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Stripe
STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# SendGrid
SENDGRID_API_KEY="SG...."
SENDGRID_FROM_EMAIL="noreply@mariphilfoundation.org"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin
ADMIN_EMAIL="admin@mariphilfoundation.org"
```

4. **Initialize the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Seed the database** (optional)
```bash
npx prisma db seed
```

This will create:
- 1 admin user (email: admin@mariphilfoundation.org, password: admin123)
- 1 sample project
- 2 sample news articles

## 🚀 Running the Project

### Development Mode
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
mariphil-website/
├── app/                          # Next.js 15 App Router
│   ├── about/                   # About page
│   ├── api/                     # API routes
│   │   ├── contact/            # Contact form handler
│   │   ├── donations/          # Stripe checkout
│   │   ├── volunteer/          # Volunteer form handler
│   │   └── webhooks/           # Stripe webhooks
│   ├── children-village/       # Children's village page
│   ├── contact/                # Contact page
│   ├── donate/                 # Donation page
│   ├── donation/               # Thank you page
│   ├── i-want-to-help/         # Volunteer page
│   ├── news/                   # News listing and detail
│   ├── projects/               # Projects listing and detail
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── forms/                  # Form components
│   │   ├── ContactForm.tsx
│   │   ├── DonationForm.tsx
│   │   └── VolunteerForm.tsx
│   └── layout/                 # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/                         # Utility functions
│   ├── email.ts                # SendGrid integration
│   └── prisma.ts               # Prisma client
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed script
├── .env.example                # Environment variables template
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🗄️ Database Schema

The application uses the following models:

- **User** - Admin users for authentication
- **News** - News articles and updates
- **Project** - Foundation projects
- **Donation** - Donation records from Stripe
- **Volunteer** - Volunteer applications
- **ContactMessage** - Contact form submissions
- **Media** - Uploaded media files

## 💳 Stripe Integration

### Testing Donations

Use these test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

Any future expiry date and any 3-digit CVC will work.

### Webhook Setup

1. Install Stripe CLI: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)
2. Forward webhooks to local server:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
3. Copy the webhook signing secret to `.env` as `STRIPE_WEBHOOK_SECRET`

## 📧 Email Configuration

SendGrid is used for sending emails. Make sure to:
1. Verify your sender email in SendGrid
2. Add the API key to `.env`
3. Update `SENDGRID_FROM_EMAIL` with your verified email

## 🎨 Design System

- **Primary Color**: Green (#1EBD1E)
- **Secondary Color**: White
- **Font**: Inter (via Google Fonts)
- **UI Style**: Clean, modern NGO design with glassmorphism effects

## 📝 TODO

### High Priority
- [ ] Implement NextAuth.js authentication
- [ ] Build admin dashboard layout
- [ ] Create news management CRUD
- [ ] Create project management CRUD
- [ ] Implement donation tracking and CSV export
- [ ] Add Cloudinary media upload

### Medium Priority
- [ ] Add loading states to all forms
- [ ] Implement error boundaries
- [ ] Add pagination to news and projects
- [ ] Create 404 and error pages
- [ ] Add Google Maps integration to contact page

### Low Priority
- [ ] Add Framer Motion animations
- [ ] Implement search functionality
- [ ] Add social media sharing
- [ ] Create newsletter signup
- [ ] Add multilingual support (Tagalog/English)

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database

Use [Neon](https://neon.tech) for PostgreSQL hosting (free tier available).

### Stripe Webhooks in Production

Update your Stripe webhook endpoint to:
```
https://your-domain.com/api/webhooks/stripe
```

## 🤝 Contributing

This is a project for Mariphil Foundation Inc. For contributions, please contact the development team.

## 📄 License

Copyright © 2024 Mariphil Foundation Inc. All rights reserved.

## 📞 Support

For technical support, contact: dev@mariphilfoundation.org