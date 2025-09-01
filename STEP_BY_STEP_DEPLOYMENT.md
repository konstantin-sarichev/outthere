# OutThere - Complete Step-by-Step Deployment Guide 🚀

## 📋 Overview
This guide will walk you through setting up Supabase (database) and Vercel (hosting) to deploy your OutThere app live on the internet.

**Total Time:** 15-20 minutes  
**Cost:** Free for both services  
**Result:** Live, functional social app with real database

---

## 🗄️ PART 1: Setup Supabase (Database)

### Step 1: Create Supabase Account

1. **Go to Supabase:**
   - Open browser and go to: https://supabase.com
   - Click the green **"Start your project"** button

2. **Sign Up:**
   - Click **"Sign up"**
   - Choose **"Continue with GitHub"** (recommended) OR
   - Use email/password option
   - Complete the signup process

### Step 2: Create Your Project

1. **Create New Project:**
   - After login, you'll see the dashboard
   - Click **"+ New project"** button

2. **Fill Project Details:**
   ```
   Organization: [Leave as default - usually your username]
   Name: outthere-production
   Database Password: [Create a strong password - SAVE THIS!]
   Region: [Choose closest to your users - e.g., "US East (N. Virginia)"]
   Pricing Plan: Free
   ```

3. **Create Project:**
   - Click **"Create new project"**
   - Wait 2-3 minutes for setup (grab a coffee! ☕)

### Step 3: Set Up Database Schema

1. **Open SQL Editor:**
   - In your project dashboard, click **"SQL Editor"** in left sidebar
   - Click **"+ New query"**

2. **Run Database Setup:**
   - Copy and paste this complete schema:

```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS vector;

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  age_range VARCHAR(50),
  pronouns VARCHAR(50),
  bio TEXT,
  neighborhood VARCHAR(255),
  radius_km INTEGER DEFAULT 10,
  photos TEXT[] DEFAULT '{}',
  socials JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User interests table
CREATE TABLE user_interests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tag VARCHAR(100) NOT NULL,
  embedding vector(1536),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Availability table
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  weekday INTEGER NOT NULL CHECK (weekday >= 0 AND weekday <= 6),
  start_minute INTEGER NOT NULL CHECK (start_minute >= 0 AND start_minute < 1440),
  end_minute INTEGER NOT NULL CHECK (end_minute >= 0 AND end_minute < 1440),
  recurrence VARCHAR(50) DEFAULT 'weekly',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Venues table
CREATE TABLE venues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  place_id VARCHAR(255),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  address TEXT,
  categories TEXT[] DEFAULT '{}',
  noise_level INTEGER CHECK (noise_level >= 1 AND noise_level <= 5),
  price_tier INTEGER CHECK (price_tier >= 1 AND price_tier <= 4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  venue_id UUID REFERENCES venues(id),
  start_ts TIMESTAMP WITH TIME ZONE NOT NULL,
  end_ts TIMESTAMP WITH TIME ZONE NOT NULL,
  capacity INTEGER DEFAULT 10,
  visibility VARCHAR(50) DEFAULT 'public',
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event attendees table
CREATE TABLE event_attendees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rsvp_status VARCHAR(50) DEFAULT 'pending',
  joined_ts TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  other_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score DECIMAL(3,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, other_user_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for user_interests table
CREATE POLICY "Users can manage own interests" ON user_interests FOR ALL USING (auth.uid() = user_id);

-- Create policies for availability table
CREATE POLICY "Users can manage own availability" ON availability FOR ALL USING (auth.uid() = user_id);

-- Create policies for venues table (public read)
CREATE POLICY "Anyone can view venues" ON venues FOR SELECT USING (true);

-- Create policies for events table
CREATE POLICY "Anyone can view public events" ON events FOR SELECT USING (visibility = 'public');
CREATE POLICY "Users can manage own events" ON events FOR ALL USING (auth.uid() = creator_id);

-- Create policies for event_attendees table
CREATE POLICY "Users can view event attendees" ON event_attendees FOR SELECT USING (true);
CREATE POLICY "Users can manage own attendance" ON event_attendees FOR ALL USING (auth.uid() = user_id);

-- Create policies for matches table
CREATE POLICY "Users can view own matches" ON matches FOR SELECT USING (auth.uid() = user_id OR auth.uid() = other_user_id);

-- Insert sample venues for NYC
INSERT INTO venues (name, lat, lng, address, categories, noise_level, price_tier) VALUES
('Brooklyn Roasting Company', 40.7831, -73.9712, '25 Jay St, Brooklyn, NY', ARRAY['coffee', 'casual'], 2, 2),
('The High Line', 40.7480, -74.0048, 'New York, NY', ARRAY['outdoor', 'walking'], 1, 1),
('Bryant Park', 40.7536, -73.9832, 'New York, NY', ARRAY['outdoor', 'events'], 2, 1),
('Housing Works Bookstore', 40.7288, -74.0021, '126 Crosby St, New York, NY', ARRAY['books', 'quiet'], 1, 2),
('Washington Square Park', 40.7308, -73.9973, 'New York, NY', ARRAY['outdoor', 'social'], 3, 1);
```

3. **Execute the Query:**
   - Click **"Run"** button (or press Ctrl+Enter)
   - You should see "Success. No rows returned" message
   - This means all tables were created successfully!

### Step 4: Get Your API Keys

1. **Go to Project Settings:**
   - Click **"Settings"** in left sidebar
   - Click **"API"**

2. **Copy These Values (Save them somewhere!):**
   ```
   Project URL: https://[your-project-id].supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (long string)
   service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (longer string)
   ```

3. **Configure Authentication:**
   - Go to **"Authentication"** → **"Settings"**
   - Set **"Site URL"** to: `https://your-app-name.vercel.app` (we'll get this from Vercel)
   - For now, you can use: `http://localhost:3000`
   - Make sure **"Enable email confirmations"** is ON

---

## 🚀 PART 2: Setup Vercel (Hosting)

### Step 1: Prepare Your Code

1. **Push to GitHub:**
   ```bash
   # In your project folder:
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

   **Don't have GitHub repo yet?**
   ```bash
   # Create repo on GitHub.com first, then:
   git remote add origin https://github.com/yourusername/outthere.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Create Vercel Account

1. **Go to Vercel:**
   - Open: https://vercel.com
   - Click **"Start Deploying"**

2. **Sign Up:**
   - Click **"Continue with GitHub"** (recommended)
   - Authorize Vercel to access your repositories

### Step 3: Deploy Your App

1. **Import Project:**
   - Click **"Add New..."** → **"Project"**
   - Find your **"outthere"** repository
   - Click **"Import"**

2. **Configure Project:**
   ```
   Project Name: outthere (or your preferred name)
   Framework Preset: Next.js (should auto-detect)
   Root Directory: ./ 
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Add Environment Variables:**
   - Click **"Environment Variables"**
   - Add these variables one by one:

   ```
   Name: NEXT_PUBLIC_SUPABASE_URL
   Value: [Your Supabase Project URL from Step 4 above]

   Name: NEXT_PUBLIC_SUPABASE_ANON_KEY  
   Value: [Your Supabase anon key from Step 4 above]

   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: [Your Supabase service_role key from Step 4 above]

   Name: NEXT_PUBLIC_APP_URL
   Value: https://your-project-name.vercel.app
   ```

4. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build and deployment
   - You'll see "🎉 Your project has been deployed!"

### Step 4: Get Your Live URL

1. **Copy Your App URL:**
   - After successful deployment, you'll see something like:
   - `https://outthere-abc123.vercel.app`
   - This is your live app URL!

2. **Update Supabase Site URL:**
   - Go back to your Supabase project
   - Settings → Authentication → Settings
   - Update **"Site URL"** to your Vercel URL
   - Click **"Save"**

---

## 🧪 PART 3: Test Your Live App

### Step 1: Test Basic Functionality

1. **Visit Your Live App:**
   - Go to your Vercel URL
   - You should see the OutThere landing page

2. **Test User Registration:**
   - Click **"Get Started"**
   - Fill out the signup form
   - Complete all 5 steps
   - Click **"Complete Setup"**

3. **Check Email Verification:**
   - Check your email for Supabase verification
   - Click the verification link
   - Should redirect back to your app

4. **Test Login:**
   - Try logging out and back in
   - Navigate between pages
   - Edit your profile

### Step 2: Verify Database Connection

1. **Check Supabase Dashboard:**
   - Go to your Supabase project
   - Click **"Table Editor"** → **"users"**
   - You should see your user data!

2. **Test Data Persistence:**
   - Edit your profile on the live app
   - Refresh the page
   - Changes should persist

---

## 🔧 PART 4: Configure Custom Domain (Optional)

### Step 1: Buy a Domain
- Use Namecheap, GoDaddy, or any domain registrar
- Example: `yourawesomeapp.com`

### Step 2: Add to Vercel
1. **In Vercel Dashboard:**
   - Go to your project
   - Click **"Settings"** → **"Domains"**
   - Add your custom domain

2. **Update DNS:**
   - Follow Vercel's instructions to point your domain to Vercel
   - Usually involves adding CNAME or A records

3. **Update Environment Variables:**
   - Change `NEXT_PUBLIC_APP_URL` to your custom domain
   - Redeploy

---

## 🚨 Troubleshooting Common Issues

### Issue: "Failed to fetch" errors
**Solution:**
```bash
# Check environment variables in Vercel
# Make sure all Supabase keys are correct
# No trailing slashes in URLs
```

### Issue: Email verification not working
**Solution:**
```bash
# In Supabase: Authentication → Settings
# Make sure "Site URL" matches your Vercel URL exactly
# Check "Enable email confirmations" is ON
```

### Issue: Build fails on Vercel
**Solution:**
```bash
# Check build logs in Vercel dashboard
# Usually missing environment variables
# Or TypeScript errors (run `npm run build` locally first)
```

### Issue: Database connection errors
**Solution:**
```bash
# Verify Supabase keys in Vercel environment variables
# Check Supabase project is "Active" (not paused)
# Verify RLS policies are set up correctly
```

---

## 🎉 You're Live!

**Congratulations!** Your OutThere app is now live on the internet with:

✅ **Real user authentication**  
✅ **Database storage**  
✅ **Professional hosting**  
✅ **Automatic deployments**  
✅ **SSL certificates**  
✅ **Global CDN**  

### Next Steps:
1. **Share your app** with friends to test
2. **Monitor usage** in Supabase and Vercel dashboards
3. **Add custom domain** (optional)
4. **Set up analytics** (optional)
5. **Scale as needed** (both services have generous free tiers)

### Important URLs to Bookmark:
- **Your Live App:** `https://your-app.vercel.app`
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard

---

## 📊 Monitoring Your App

### Vercel Analytics:
- Go to your project → Analytics
- See page views, performance, errors

### Supabase Monitoring:
- Database → Logs (see queries)
- Authentication → Users (manage users)
- API → Logs (see API calls)

---

**Your social connection platform is now live and ready to help people meet amazing friends!** 🌟

Need help? Check the error logs in both Vercel and Supabase dashboards for debugging.
