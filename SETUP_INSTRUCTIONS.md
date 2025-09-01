# OutThere MVP - Setup Instructions

## Quick Start

### Prerequisites Check
First, check if you have Node.js installed:
```bash
node --version
npm --version
```

If you don't see version numbers, you need to install Node.js first.

### 1. Install Node.js

#### Option A: Using the Setup Script (Recommended)
```bash
./setup.sh
```

#### Option B: Manual Installation
**macOS (using Homebrew):**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

**macOS/Windows/Linux (using Node.js installer):**
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version
3. Run the installer

**Using Node Version Manager (nvm):**
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.bashrc

# Install latest LTS Node.js
nvm install --lts
nvm use --lts
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Supabase Database Setup

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run the Database Schema:**
   - In your Supabase dashboard, go to SQL Editor
   - Copy and paste the contents of `supabase/schema.sql`
   - Run the script

3. **Enable Vector Extension:**
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure Overview

```
OutThere/
├── app/                    # Next.js 14 App Router
│   ├── api/               # Backend API routes
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Main app dashboard
│   ├── events/            # Event pages
│   ├── calendar/          # Availability calendar
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities and config
│   ├── supabase.ts       # Database client
│   └── utils.ts          # Helper functions
├── supabase/             # Database schema
├── public/               # Static assets
└── package.json          # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Key Features Implemented

### ✅ Core MVP Features
- **Landing Page:** Hero section with clear value proposition
- **Authentication:** Login/signup flows (ready for Supabase Auth)
- **Dashboard:** Event recommendations and buddy suggestions
- **Events:** Browse, filter, and create events
- **Calendar:** Visual availability setting interface
- **Database Schema:** Complete PostgreSQL schema with relationships
- **API Routes:** Authentication, events, and matching endpoints
- **Responsive Design:** Mobile-first with Tailwind CSS

### 🔄 Mock Data Included
The app includes realistic mock data for:
- Sample events (coffee meetups, board games, running club, etc.)
- User profiles and matches
- Brooklyn/NYC venues
- Interest tags and categories

### 🎨 UI/UX Features
- Modern, clean design with shadcn/ui components
- Interactive calendar grid for availability
- Event cards with RSVP functionality
- Filtering and search capabilities
- Match scoring display
- Responsive navigation

## Next Steps for Production

1. **Complete Authentication Integration**
   - Connect signup/login forms to Supabase Auth
   - Add session management
   - Implement profile creation flow

2. **Real Data Integration**
   - Replace mock data with API calls
   - Implement real-time updates
   - Add form validation and error handling

3. **Advanced Features**
   - Photo upload functionality
   - Real-time messaging
   - Push notifications
   - Google Calendar sync

4. **Deployment**
   - Deploy to Vercel
   - Set up production environment
   - Configure domain and SSL

## Troubleshooting

### Common Issues

**Error: "Cannot find module 'next'"**
- Run `npm install` to install dependencies

**Supabase Connection Issues**
- Check your `.env.local` file has correct credentials
- Verify your Supabase project is active
- Ensure the database schema is properly set up

**Port Already in Use**
- Change the port: `npm run dev -- -p 3001`
- Or kill the process using port 3000

**TypeScript Errors**
- The project includes proper TypeScript configuration
- Run `npm run build` to check for type errors

## Support

For questions or issues:
1. Check the main README.md for detailed documentation
2. Review the troubleshooting section above
3. Open an issue on GitHub

---

**Happy coding! 🚀** Let's get people out there and connecting! 