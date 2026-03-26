#!/bin/bash
# BBG Website Setup Script
# Run this from the bbg-website directory: bash setup.sh

echo "🏟️  Setting up Baseball Generations Website..."

# Load nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Ensure Node.js 20 is available
echo "📦 Checking Node.js..."
if ! command -v node &> /dev/null; then
  echo "Installing Node.js 20..."
  nvm install 20
  nvm use 20
fi

echo "Node $(node -v)"
echo "npm $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create placeholder images
echo "🖼️  Creating placeholder assets..."
mkdir -p public/images/{founders,players,shop,events,sponsors}
mkdir -p public/videos

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Fill in .env.local with your API keys (Supabase, Stripe, etc.)"
echo "  2. Run 'npm run dev' to start the development server"
echo "  3. Open http://localhost:3000"
echo ""
echo "For Supabase:"
echo "  - Create a new project at https://supabase.com"
echo "  - Run the SQL in supabase/schema.sql in the SQL Editor"
echo "  - Copy the URL and anon key to .env.local"
echo ""
echo "⚾ Baseball Generations — From South LA to the Big Leagues"
