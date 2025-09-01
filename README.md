# OutThere - Social Connection Platform

A modern web application that helps people "get out there" by turning shared interests and free time into real-world meetups. Built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

### 🎯 Core Features
- **Smart Matching**: AI-powered compatibility matching based on interests, location, and availability
- **Event Discovery**: Browse and join curated local events with interactive filters
- **Interactive Map**: Visual event discovery with location-based browsing (Google Maps integration ready)
- **Personal Calendar**: Set your availability for automatic event suggestions
- **Real-time Messaging**: Connect with other members through secure messaging
- **Safety & Trust**: Verified profiles, reporting system, and community guidelines

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern gradient layouts with glassmorphism effects
- **Responsive**: Fully responsive design for desktop, tablet, and mobile
- **Smooth Animations**: Subtle animations and hover effects for better user experience
- **Dark Mode Ready**: Built with dark mode support in mind
- **Accessibility**: Focus management and screen reader support

### 🛡️ Safety Features
- Profile verification system
- Event reporting and moderation
- Secure messaging system
- Privacy-first location sharing
- Community guidelines enforcement

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- (Optional) Supabase account for backend services
- (Optional) Google Maps API key for map functionality

### Installation

1. **Clone and navigate to the project:**
   ```bash
   git clone <your-repo-url>
   cd OutThere
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables (optional):**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your Supabase credentials to `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
OutThere/
├── app/                    # Next.js 14 App Router
│   ├── globals.css        # Global styles with animations
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── dashboard/         # User dashboard
│   ├── events/            # Events discovery and management
│   ├── calendar/          # Availability calendar
│   ├── profile/           # User profile management
│   ├── signup/            # User registration
│   ├── login/             # User authentication
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/                # shadcn/ui components
│   ├── Header.tsx         # Navigation header
│   ├── MapView.tsx        # Interactive map component
│   └── GoogleMapsLoader.tsx # Maps API loader
├── lib/                   # Utility functions
│   ├── utils.ts           # Common utilities
│   ├── supabase.ts        # Database client
│   └── constants.ts       # App constants
└── supabase/             # Database schema and migrations
```

## 🎨 UI Components

The app uses a modern design system built on:
- **shadcn/ui**: High-quality, accessible component library
- **Tailwind CSS**: Utility-first CSS framework with custom animations
- **Lucide React**: Beautiful, customizable icons
- **Radix UI**: Unstyled, accessible UI primitives

### Key Components
- **Header**: Responsive navigation with current page highlighting
- **MapView**: Interactive event map with fallback UI
- **Event Cards**: Rich event information with RSVP functionality
- **User Profiles**: Avatar system with match scoring
- **Filter System**: Advanced filtering for events and matches

## 🗄️ Database Schema

The app uses PostgreSQL with the following key tables:
- `users` - User profiles and preferences
- `events` - Event information and details
- `user_interests` - Interest tags and categories
- `availability` - User calendar and free time
- `matches` - Compatibility scoring between users
- `venues` - Location data for events

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Features Implemented

#### Landing Page
- Hero section with gradient backgrounds
- Feature highlights with icons and stats
- Testimonials section
- Call-to-action sections
- Modern footer with links

#### Dashboard
- Personalized greeting and stats
- Weekly event recommendations
- Buddy match suggestions with scoring
- Quick action cards
- Activity progress indicators

#### Events Page
- Advanced search and filtering
- List and map view toggle
- Rich event cards with details
- Interactive filters (category, price, time)
- Responsive grid layout

#### Profile System
- Comprehensive user profiles
- Interest selection and management
- Availability calendar
- Privacy settings
- Social links integration

## 🔗 API Integration

### Supabase Setup (Optional)
1. Create a Supabase project
2. Run the SQL schema from `supabase/schema.sql`
3. Add your credentials to `.env.local`
4. Enable Row Level Security (RLS) policies

### Google Maps Setup (Optional)
1. Get a Google Maps API key
2. Enable Maps JavaScript API and Places API
3. Add the key to `.env.local`
4. The app will automatically load the map functionality

## 📱 Mobile Support

The app is fully responsive with:
- Mobile-first design approach
- Touch-friendly interface elements
- Optimized layouts for small screens
- Progressive Web App (PWA) ready

## 🔒 Security Features

- Input validation and sanitization
- Rate limiting on API endpoints
- Secure authentication flow
- Data encryption in transit
- Privacy-focused design

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with automatic CI/CD

### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- AWS Amplify

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core UI/UX implementation
- ✅ Event discovery and filtering
- ✅ User profiles and matching
- ✅ Responsive design
- ✅ Map interface (fallback)

### Phase 2 (Next)
- 🔄 Google Maps full integration
- 🔄 Real-time messaging
- 🔄 Push notifications
- 🔄 Advanced matching algorithm
- 🔄 Event creation workflow

### Phase 3 (Future)
- 📅 Mobile app development
- 📅 Group management features
- 📅 Premium subscription tiers
- 📅 Analytics and insights
- 📅 Multi-city expansion

## 🐛 Troubleshooting

### Common Issues

1. **npm command not found**
   ```bash
   # Install Node.js from nodejs.org or use homebrew:
   brew install node
   ```

2. **Dependencies installation fails**
   ```bash
   # Clear npm cache and reinstall:
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Map not loading**
   - Ensure Google Maps API key is set in `.env.local`
   - Check that Maps JavaScript API is enabled
   - The app will show a fallback UI without the API key

4. **Database connection issues**
   - Verify Supabase URL and key in `.env.local`
   - Check that RLS policies are properly configured
   - The app works with mock data if no database is connected

### Getting Help
- Create an issue on GitHub
- Check the documentation
- Join our community Discord (coming soon)

## 📄 License

MIT License - see LICENSE.md for details

## 🤝 Contributing

We welcome contributions! Please see CONTRIBUTING.md for guidelines.

---

**Made with ❤️ in Brooklyn** 

Transform your free time into meaningful connections with OutThere. 