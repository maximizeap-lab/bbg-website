-- ============================================================
-- Baseball Generations (BBG) — Full Database Schema
-- Supabase PostgreSQL
-- ============================================================

-- Players table
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  position TEXT,
  graduation_year INTEGER,
  hometown TEXT,
  school TEXT,
  current_team TEXT,
  status TEXT CHECK (status IN ('active', 'committed', 'pro', 'alumni')) DEFAULT 'active',
  jersey_number TEXT,
  bio TEXT,
  bbg_journey TEXT,
  quote TEXT,
  instagram_handle TEXT,
  draft_info TEXT,
  achievements TEXT[] DEFAULT '{}',
  photo_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_players_status ON players(status);
CREATE INDEX idx_players_graduation_year ON players(graduation_year);
CREATE INDEX idx_players_slug ON players(slug);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  location_name TEXT,
  location_address TEXT,
  location_lat DECIMAL,
  location_lng DECIMAL,
  price_cents INTEGER DEFAULT 0,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('upcoming', 'past', 'cancelled')) DEFAULT 'upcoming',
  hero_image_url TEXT,
  gallery_urls TEXT[] DEFAULT '{}',
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_slug ON events(slug);

-- Registrations table
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES players(id) ON DELETE SET NULL,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  parent_name TEXT,
  parent_email TEXT,
  parent_phone TEXT,
  school TEXT,
  graduation_year INTEGER,
  position TEXT,
  bats TEXT,
  throws TEXT,
  height TEXT,
  weight TEXT,
  date_of_birth DATE,
  gpa DECIMAL,
  travel_team TEXT,
  years_playing INTEGER,
  attended_bbg_before BOOLEAN DEFAULT false,
  heard_about TEXT,
  highlight_url TEXT,
  instagram_handle TEXT,
  scholarship_requested BOOLEAN DEFAULT false,
  scholarship_note TEXT,
  payment_status TEXT CHECK (payment_status IN ('paid', 'pending', 'scholarship', 'free')) DEFAULT 'pending',
  stripe_payment_intent_id TEXT,
  amount_paid_cents INTEGER,
  checked_in BOOLEAN DEFAULT false,
  registered_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_registrations_event ON registrations(event_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_payment ON registrations(payment_status);

-- Donations table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_first_name TEXT,
  donor_last_name TEXT,
  donor_email TEXT NOT NULL,
  donor_phone TEXT,
  amount_cents INTEGER NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  stripe_payment_intent_id TEXT,
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  in_honor_of TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  covered_fees BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('succeeded', 'pending', 'failed')) DEFAULT 'pending',
  donated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_email ON donations(donor_email);
CREATE INDEX idx_donations_date ON donations(donated_at);

-- Instagram cache table
CREATE TABLE instagram_cache (
  id TEXT PRIMARY KEY,
  media_url TEXT NOT NULL,
  caption TEXT,
  permalink TEXT,
  media_type TEXT,
  timestamp TIMESTAMPTZ,
  like_count INTEGER DEFAULT 0,
  cached_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  is_read BOOLEAN DEFAULT false
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE instagram_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for players and events
CREATE POLICY "Players are viewable by everyone" ON players
  FOR SELECT USING (true);

CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

-- Public can insert registrations, donations, newsletter signups, contact forms
CREATE POLICY "Anyone can register" ON registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can donate" ON donations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Instagram cache readable by everyone
CREATE POLICY "Instagram cache is public" ON instagram_cache
  FOR SELECT USING (true);

-- Service role (admin) has full access via service_role key (bypasses RLS)

-- ============================================================
-- Functions
-- ============================================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER players_updated_at
  BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Increment registered_count on new registration
CREATE OR REPLACE FUNCTION increment_registration_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.event_id IS NOT NULL THEN
    UPDATE events SET registered_count = registered_count + 1
    WHERE id = NEW.event_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_new_registration
  AFTER INSERT ON registrations
  FOR EACH ROW EXECUTE FUNCTION increment_registration_count();

-- ============================================================
-- Seed Data
-- ============================================================

INSERT INTO events (slug, name, description, event_date, location_name, location_address, location_lat, location_lng, status, is_free, price_cents) VALUES
  ('bbg-6th-all-star-game-2024', 'BBG 6th All-Star Game', 'The biggest showcase of young talent in South LA. Top players from across the country compete at Blair Field in Long Beach.', '2024-11-10T13:00:00-08:00', 'Blair Field', '4700 Deukmejian Dr, Long Beach, CA', 33.783, -118.153, 'past', false, 0),
  ('bbg-all-american-game-2024', 'BBG All-American Game 2024', 'The premier All-American showcase at Loyola Marymount University. College coaches and MLB scouts in attendance.', '2024-09-29T12:00:00-07:00', 'Loyola Marymount University', '1 Loyola Marymount University Dr, Los Angeles, CA', 33.97, -118.418, 'past', false, 0);
