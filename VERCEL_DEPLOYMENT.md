# Deploying Mariphil Website to Vercel

This guide will walk you through deploying the Mariphil Foundation website to Vercel.

## Prerequisites

Before you begin, ensure you have:

- A [Vercel account](https://vercel.com/signup)
- A [GitHub](https://github.com) account (recommended for automatic deployments)
- A [Neon](https://neon.tech) PostgreSQL database (or other PostgreSQL provider)
- [Stripe](https://stripe.com) account for payment processing
- [SendGrid](https://sendgrid.com) account for email functionality
- [Cloudinary](https://cloudinary.com) account for media storage

## Step 1: Prepare Your Project

### 1.1 Push to GitHub (Recommended)

1. Create a new repository on GitHub
2. Push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/mariphil-website.git
git push -u origin main
```

## Step 2: Set Up Database

### 2.1 Neon PostgreSQL Setup

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project or use existing one
3. Copy the connection string (it should look like):
   ```
   postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
4. Keep this URL for the environment variables setup

### 2.2 Run Database Migrations

Before deploying, ensure your database schema is set up:

```bash
npx prisma migrate deploy
npx prisma db seed
```

## Step 3: Deploy to Vercel

### 3.1 Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Choose your GitHub repository
5. Click **"Import"**

### 3.2 Configure Project Settings

Vercel will automatically detect your Next.js application. Configure the following:

- **Framework Preset**: Next.js
- **Root Directory**: `./` (leave as default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

## Step 4: Configure Environment Variables

Click on **"Environment Variables"** and add the following:

### Database
```
DATABASE_URL = postgresql://user:password@host/database?sslmode=require
```

### NextAuth
```
NEXTAUTH_URL = https://your-domain.vercel.app
NEXTAUTH_SECRET = <generate-using-openssl-rand-base64-32>
```

**To generate NEXTAUTH_SECRET**, run locally:
```bash
openssl rand -base64 32
```

### Stripe
```
STRIPE_PUBLIC_KEY = pk_live_... (or pk_test_... for testing)
STRIPE_SECRET_KEY = sk_live_... (or sk_test_... for testing)
STRIPE_WEBHOOK_SECRET = whsec_...
```

### SendGrid
```
SENDGRID_API_KEY = SG.xxxxx...
SENDGRID_FROM_EMAIL = noreply@yourdomain.com
```

### Cloudinary
```
CLOUDINARY_CLOUD_NAME = your-cloud-name
CLOUDINARY_API_KEY = your-api-key
CLOUDINARY_API_SECRET = your-api-secret
```

### Admin
```
ADMIN_EMAIL = admin@yourdomain.com
```

### Important Notes:
- Add these variables to **Production**, **Preview**, and **Development** environments
- Use production keys for production environment
- Use test/development keys for preview and development environments

## Step 5: Deploy

1. After configuring environment variables, click **"Deploy"**
2. Vercel will build and deploy your application
3. Wait for the deployment to complete (usually 2-5 minutes)

## Step 6: Post-Deployment Configuration

### 6.1 Set Up Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **Webhooks**
3. Click **"Add endpoint"**
4. Enter your webhook URL:
   ```
   https://your-domain.vercel.app/api/webhooks/stripe
   ```
5. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
6. Copy the **Signing Secret** (starts with `whsec_`)
7. Add this to your Vercel environment variables as `STRIPE_WEBHOOK_SECRET`
8. Redeploy your application

### 6.2 Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Update `NEXTAUTH_URL` environment variable to your custom domain

### 6.3 Run Database Migrations on Production

After first deployment, you may need to ensure migrations are applied:

1. Install Vercel CLI locally:
   ```bash
   npm i -g vercel
   ```

2. Link your project:
   ```bash
   vercel link
   ```

3. Pull environment variables:
   ```bash
   vercel env pull
   ```

4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

## Step 7: Verify Deployment

### 7.1 Test Core Functionality

Visit your deployed site and verify:

- ✅ Homepage loads correctly
- ✅ All pages are accessible
- ✅ Images load properly
- ✅ Contact form works
- ✅ Donation form works
- ✅ Stripe payment flow completes
- ✅ Email notifications are sent

### 7.2 Check Vercel Logs

Monitor your deployment in Vercel Dashboard:
- Go to your project → **"Deployments"**
- Click on the latest deployment
- Check **"Functions"** tab for any errors
- Review **"Logs"** for runtime issues

## Continuous Deployment

Once set up, Vercel will automatically deploy:

- **Production**: When you push to the `main` branch
- **Preview**: When you create a pull request

## Troubleshooting

### Build Failures

**Issue**: Build fails with TypeScript errors
```bash
# Solution: Fix TypeScript errors locally first
npm run build
```

**Issue**: Missing dependencies
```bash
# Solution: Ensure all dependencies are in package.json
npm install
```

### Database Connection Issues

**Issue**: `Can't reach database server`
- Verify `DATABASE_URL` is correct
- Ensure database allows connections from Vercel IPs
- Check database is not sleeping (Neon free tier)

### Environment Variables Not Working

**Issue**: Environment variables not found
- Redeploy after adding new environment variables
- Verify variable names match exactly (case-sensitive)
- Check variables are added to correct environment

### Stripe Webhook Issues

**Issue**: Webhook events not received
- Verify webhook URL is correct
- Check `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard
- Ensure endpoint is listening to correct events
- Check Vercel function logs for errors

### Email Not Sending

**Issue**: SendGrid emails not delivered
- Verify `SENDGRID_API_KEY` is valid
- Check `SENDGRID_FROM_EMAIL` is verified in SendGrid
- Review Vercel function logs for SendGrid errors

## Performance Optimization

### 1. Enable Edge Runtime (Optional)

For specific API routes, consider using Edge Runtime for better performance:

```typescript
// app/api/some-route/route.ts
export const runtime = 'edge';
```

### 2. Image Optimization

Next.js automatically optimizes images. Ensure you're using the `<Image>` component from `next/image`.

### 3. Database Connection Pooling

Vercel Serverless Functions benefit from connection pooling. Your Neon connection string should include `?pgbouncer=true` or use Prisma's connection pooling.

## Monitoring and Maintenance

### Vercel Analytics

Enable Vercel Analytics for insights:
1. Go to your project in Vercel Dashboard
2. Navigate to **"Analytics"** tab
3. Enable Web Analytics

### Database Backups

1. Set up automatic backups in Neon Console
2. Regularly export production data
3. Test restore procedures

### Security Updates

```bash
# Regularly update dependencies
npm update
npm audit fix
```

## Support

For issues specific to:
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Prisma**: [Prisma Documentation](https://www.prisma.io/docs)
- **Neon**: [Neon Documentation](https://neon.tech/docs)

## Additional Resources

- [Vercel + Next.js Guide](https://vercel.com/docs/frameworks/nextjs)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Next.js Environment Variables](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

---

**Note**: Remember to never commit `.env` files to version control. Always use environment variables in Vercel for sensitive data.