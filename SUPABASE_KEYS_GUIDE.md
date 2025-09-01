# 🔑 Supabase Keys & URLs - Exactly Where to Find Them

## 🤔 What Are These Keys?

### 1. **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
- **What it is:** Your database's web address
- **Example:** `https://abcdefghijk.supabase.co`
- **Used for:** Connecting your app to your specific Supabase database

### 2. **Anon/Public Key** (NEXT_PUBLIC_SUPABASE_ANON_KEY)
- **What it is:** Public key for client-side operations (safe to expose)
- **Example:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...` (very long string)
- **Used for:** User authentication, public data access

### 3. **Service Role Key** (SUPABASE_SERVICE_ROLE_KEY)
- **What it is:** Admin key for server-side operations (keep secret!)
- **Example:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...` (even longer string)
- **Used for:** Admin operations, bypassing security rules

---

## 📍 **Step-by-Step: Finding Your Keys**

### Step 1: Go to Your Supabase Project

1. **Open:** https://supabase.com
2. **Sign in** to your account
3. **Click on your project** (the one you created for OutThere)

### Step 2: Navigate to API Settings

1. **In the left sidebar, click "Settings"**
2. **Click "API"** (under Settings)

### Step 3: Copy Your Values

You'll see a page with several sections. Here's exactly what to copy:

```
📋 COPY THESE VALUES:

1. PROJECT URL:
   Section: "Project Configuration"
   Label: "Project URL"
   Value: https://[your-unique-id].supabase.co
   
2. ANON PUBLIC KEY:
   Section: "Project API Keys"  
   Label: "anon public"
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (long string)
   
3. SERVICE ROLE KEY:
   Section: "Project API Keys"
   Label: "service_role"  
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (longer string)
   ⚠️ WARNING: Keep this secret! Don't share publicly.
```

---

## 🛠️ **How to Use These in Your App**

### For Local Development (.env.local):

```env
# Copy these exact values from your Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=https://your-unique-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-service-role-key

# Local development URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### For Vercel Deployment:

In your Vercel dashboard, add these as Environment Variables:

```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://your-unique-id.supabase.co

Name: NEXT_PUBLIC_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-anon-key

Name: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your-service-role-key

Name: NEXT_PUBLIC_APP_URL
Value: https://your-app-name.vercel.app
```

---

## 🔍 **Visual Guide: Screenshot Locations**

**When you're on the Supabase API page, you'll see:**

```
Project Configuration
├── Project URL: https://abcdefghijk.supabase.co  ← COPY THIS

Project API Keys  
├── anon public: eyJhbGciOiJIUzI1NiIs...        ← COPY THIS
└── service_role: eyJhbGciOiJIUzI1NiIs...       ← COPY THIS (KEEP SECRET!)
```

---

## ❓ **Still Can't Find Them?**

### Double-Check You're in the Right Place:

1. **Make sure you're in YOUR project** (not someone else's)
   - The project name should match what you created
   - URL should be: `https://supabase.com/dashboard/project/[your-project-id]`

2. **Look for these exact sections on the API page:**
   - "Project Configuration" 
   - "Project API Keys"

3. **The keys are long strings starting with:**
   - Project URL: `https://`
   - Both keys: `eyJhbGciOiJIUzI1NiIs`

### If You Still Don't See API Settings:

1. **Check if your project finished setting up:**
   - Sometimes it takes 2-3 minutes after creation
   - Look for "Setting up project..." message

2. **Try refreshing the page**

3. **Make sure you're logged into the correct account**

---

## 🧪 **Quick Test: Are Your Keys Working?**

### Test Locally:

1. **Create/update your .env.local file:**
   ```bash
   # In your OutThere project folder
   touch .env.local
   ```

2. **Add your keys to .env.local**

3. **Test the connection:**
   ```bash
   npm run dev
   ```

4. **Go to:** http://localhost:3000/signup

5. **Try to create an account:**
   - If it works → Keys are correct! 🎉
   - If you get errors → Double-check the keys

---

## 🚨 **Common Mistakes**

### ❌ **Wrong Values:**
```env
# DON'T use these - they're just examples!
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here  ❌
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here         ❌
```

### ✅ **Correct Values:**
```env
# USE your actual values from Supabase dashboard
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co           ✅
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... ✅
```

### ❌ **Common Issues:**
- Trailing slash in URL: `https://abc.supabase.co/` ❌
- Missing `https://`: `abc.supabase.co` ❌  
- Copying incomplete keys (they're very long!) ❌

### ✅ **Correct Format:**
- Clean URL: `https://abc.supabase.co` ✅
- Complete keys (usually 500+ characters) ✅

---

## 🎯 **Next Steps**

Once you have these three values:

1. **For local testing:** Add to `.env.local` and run `npm run dev`
2. **For deployment:** Add to Vercel Environment Variables
3. **Test signup/login:** Create a test account to verify everything works

---

## 💡 **Pro Tip**

Save these keys in a secure note app or password manager! You'll need them for:
- Local development
- Vercel deployment  
- Any future configuration

**Your keys are unique to your project and won't change unless you regenerate them.**
