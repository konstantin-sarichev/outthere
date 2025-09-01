#!/bin/bash

# OutThere MVP Setup Script
echo "🚀 Setting up OutThere MVP..."

# Check if Homebrew is installed, if not install it
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

# Install Node.js using Homebrew
echo "📦 Installing Node.js..."
brew install node

# Verify installation
echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install project dependencies
echo "📦 Installing project dependencies..."
npm install

# Create .env.local from example if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local from example..."
    cp .env.local.example .env.local
    echo "⚠️  Please update .env.local with your Supabase credentials"
fi

echo "🎉 Setup complete! To get started:"
echo "1. Update your .env.local file with Supabase credentials"
echo "2. Set up your Supabase database with the schema in supabase/schema.sql"
echo "3. Run 'npm run dev' to start the development server"
echo ""
echo "📚 See README.md for detailed setup instructions" 