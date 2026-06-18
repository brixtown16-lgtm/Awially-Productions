# Studio - Premium Media Production Platform

A full-stack Next.js 14 SaaS platform for cinematic media production studios. Built with TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready to integrate)
- **Email**: Resend
- **Media**: Cloudinary
- **Form Validation**: React Hook Form + Zod

## Features

- 🎬 **Homepage** - Cinematic hero section with smooth animations
- 🎯 **Portfolio** - Dynamic media grid with category filtering
- 📅 **Booking System** - Form with validation, email confirmation via Resend
- 👨‍💼 **Admin Dashboard** - Protected project upload and management
- 📱 **Responsive Design** - Mobile-first, fully responsive
- ✨ **Premium UI** - Dark cinematic theme, Apple/Netflix-inspired

## Project Structure

```
studio-site/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── portfolio/page.tsx
│   ├── book/page.tsx
│   ├── admin/page.tsx
│   └── api/
│       ├── bookings/route.ts
│       └── upload/route.ts
├── components/
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── PortfolioGrid.tsx
│   ├── BookingForm.tsx
│   └── UploadForm.tsx
├── lib/
│   ├── supabase.ts
│   ├── resend.ts
│   └── cloudinary.ts
└── public/
```

## Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

**Required Environment Variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_KEY` - Supabase service role key (for API routes)
- `RESEND_API_KEY` - Resend API key for emails
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### 3. Supabase Setup

Create these tables in your Supabase project:

**projects table:**
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

**bookings table:**
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  budget TEXT,
  date TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Pages

- `/` - Homepage with hero section
- `/portfolio` - Portfolio grid with category filtering
- `/book` - Booking form
- `/admin` - Admin dashboard (demo key: `studio-admin-2024`)

## API Routes

- `POST /api/bookings` - Submit booking request
- `POST /api/upload` - Upload new project
- `GET /api/upload` - Fetch all projects

## Admin Access

The admin panel uses a simple key-based access for demo purposes:
- Key: `studio-admin-2024`

For production, implement proper authentication using Supabase Auth.

## Build & Deployment

```bash
npm run build
npm start
```

Deploy to Vercel:
```bash
vercel
```

## Customization

### Colors
Edit `tailwind.config.ts` to modify the dark theme and color palette.

### Content
Update homepage content in `app/page.tsx` and component text as needed.

### Services
Modify the services list in `components/BookingForm.tsx` and `app/portfolio/page.tsx`.

## Notes

- The portfolio page uses sample data; connect to Supabase API for live data
- Cloudinary upload widget integration ready in admin panel
- Email confirmations via Resend (configure sender email in `.env.local`)
- All forms include validation with React Hook Form + Zod

## License

Proprietary - Studio 2024
