# OutThere - Local Testing Guide 🧪

## 🚀 Quick Start - Test Locally in 5 Minutes

### Step 1: Set Up Supabase (Free Cloud Database)

1. **Create Free Supabase Account:**
   ```bash
   # Go to https://supabase.com
   # Click "Start your project"
   # Sign up with GitHub/Google
   ```

2. **Create New Project:**
   ```bash
   # In Supabase dashboard:
   # Click "New project"
   # Name: "outthere-test" (or any name)
   # Password: Create a strong password
   # Region: Choose closest to you
   # Click "Create new project"
   ```

3. **Get Your Credentials:**
   ```bash
   # In your new project dashboard:
   # Go to Settings > API
   # Copy these values:
   # - Project URL (looks like: https://abcdefg.supabase.co)
   # - anon/public key (starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
   # - service_role key (longer key, also starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
   ```

### Step 2: Configure Environment Variables

1. **Create Local Environment File:**
   ```bash
   # Copy the example file
   cp .env.local.example .env.local
   ```

2. **Edit .env.local with your Supabase credentials:**
   ```env
   # Replace with your actual Supabase values
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

   # Local development
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Optional for now
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
   RESEND_API_KEY=
   NEXT_PUBLIC_POSTHOG_KEY=
   ```

### Step 3: Set Up Database Schema

1. **Open Supabase SQL Editor:**
   ```bash
   # In your Supabase project:
   # Go to SQL Editor
   # Click "New query"
   ```

2. **Run the Database Schema:**
   ```sql
   -- Copy the entire contents of supabase/schema.sql
   -- Paste into SQL Editor
   -- Click "Run" (or press Ctrl+Enter)
   ```

   Or copy this essential setup:
   ```sql
   -- Enable extensions
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

   -- Enable Row Level Security
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
   ALTER TABLE availability ENABLE ROW LEVEL SECURITY;

   -- Create policies for users table
   CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
   CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
   CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

   -- Create policies for user_interests table
   CREATE POLICY "Users can manage own interests" ON user_interests FOR ALL USING (auth.uid() = user_id);

   -- Create policies for availability table
   CREATE POLICY "Users can manage own availability" ON availability FOR ALL USING (auth.uid() = user_id);
   ```

### Step 4: Install Dependencies & Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Open in Browser:**
   ```bash
   # Navigate to: http://localhost:3000
   ```

## 🧪 Test Key Features

### Test 1: User Registration Flow
1. **Go to Signup:** http://localhost:3000/signup
2. **Complete Registration:**
   - Fill in name, email, password
   - Choose age range and neighborhood
   - Select at least 3 interests
   - Set availability times
   - Complete signup

3. **Check Email:**
   - Look for Supabase verification email
   - Click verification link

4. **Expected Result:**
   - Redirected to dashboard
   - Profile shows your information
   - Toast notification confirms success

### Test 2: Login/Logout Flow
1. **Logout:** Click logout button in header
2. **Login:** Go to http://localhost:3000/login
3. **Use credentials** from registration
4. **Expected Result:**
   - Successful login
   - Redirected to dashboard
   - User info displays correctly

### Test 3: Profile Management
1. **Go to Profile:** http://localhost:3000/profile
2. **Edit Profile:**
   - Click "Edit Profile"
   - Change bio, interests, availability
   - Save changes
3. **Expected Result:**
   - Changes persist after page refresh
   - Toast notification confirms save

### Test 4: Navigation & Pages
1. **Test all menu items:**
   - Dashboard: http://localhost:3000/dashboard
   - Events: http://localhost:3000/events
   - Calendar: http://localhost:3000/calendar
   - Profile: http://localhost:3000/profile

2. **Expected Result:**
   - All pages load without errors
   - Navigation highlights current page
   - User data displays consistently

## 🔍 Verify Database Integration

### Check Supabase Database
1. **Go to Supabase Dashboard:**
   - Table Editor > users
   - Should see your user record

2. **Check User Interests:**
   - Table Editor > user_interests
   - Should see your selected interests

3. **Check Availability:**
   - Table Editor > availability
   - Should see your time slots

## 🐛 Common Issues & Solutions

### Issue: "Failed to fetch" errors
**Solution:**
```bash
# Check environment variables
cat .env.local

# Make sure URLs don't have trailing slashes
# Correct: https://abcdefg.supabase.co
# Wrong: https://abcdefg.supabase.co/
```

### Issue: "Network error" on signup
**Solution:**
```bash
# Check Supabase project status
# Go to Supabase dashboard > Settings > General
# Make sure project is "Active" (not paused)

# Verify RLS policies are set up
# Go to Authentication > Policies
# Should see policies for users, user_interests, availability tables
```

### Issue: Email verification not working
**Solution:**
```bash
# In Supabase dashboard:
# Go to Authentication > Settings
# Check "Enable email confirmations" is ON
# Check "Site URL" is set to http://localhost:3000
```

### Issue: TypeScript errors
**Solution:**
```bash
# Run type check
npm run build

# Common fixes already applied:
# - UserProfile interface updated
# - Optional properties handled
# - Type assertions added where needed
```

### Issue: Build fails with "Invalid URL"
**Solution:**
```bash
# This happens when environment variables have placeholder values
# Make sure .env.local has real Supabase URLs, not placeholders

# Check your .env.local file:
grep SUPABASE_URL .env.local
# Should show real URL, not "your_supabase_project_url_here"
```

## 📊 Test Data You Can Use

### Sample Interests to Select:
- ☕ Coffee
- 🏃 Running  
- 📚 Reading
- 🎲 Board Games
- 🎨 Art
- 🎵 Music

### Sample Neighborhoods (NYC):
- Williamsburg
- Park Slope
- Astoria
- Lower East Side
- Chelsea

### Sample Availability:
- Monday: Evening
- Tuesday: Evening
- Saturday: Morning, Afternoon
- Sunday: Afternoon

## 🎯 What Should Work After Testing

✅ **User can register with email verification**
✅ **User can login/logout securely**
✅ **Profile creation and editing works**
✅ **Data persists in Supabase database**
✅ **All pages load and navigate properly**
✅ **Form validation shows helpful errors**
✅ **Toast notifications provide feedback**
✅ **Responsive design works on mobile**

## 🚀 Ready for Production?

If all tests pass, you're ready to deploy! The same code that works locally will work in production.

**Next Steps:**
1. **Deploy to Vercel** (follow LIVE_DEPLOYMENT_GUIDE.md)
2. **Update environment variables** in Vercel dashboard
3. **Test production deployment**
4. **Set up custom domain** (optional)

## 💡 Pro Tips

**For Faster Testing:**
```bash
# Keep browser dev tools open
# Check Console for any JavaScript errors
# Check Network tab for failed API calls

# Use different browsers to test
# Chrome (main testing)
# Safari (webkit testing)
# Mobile view (responsive design)
```

**Database Inspection:**
```bash
# Supabase has great built-in tools:
# - Table Editor (view/edit data)
# - SQL Editor (run custom queries)  
# - Authentication (manage users)
# - Logs (debug issues)
```

**Performance Testing:**
```bash
# Test with slow network:
# Chrome DevTools > Network > Slow 3G
# Verify loading states work properly
```

---

🎉 **You're ready to test!** Follow these steps and your OutThere platform will be running locally with full functionality. All the production features work exactly the same locally as they will in production.
