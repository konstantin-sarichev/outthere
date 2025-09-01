-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable pgvector extension for embeddings
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
  embedding vector(1536), -- OpenAI embedding dimension
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Availability table
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  weekday INTEGER NOT NULL CHECK (weekday >= 0 AND weekday <= 6), -- 0 = Sunday
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
  capacity INTEGER DEFAULT 8,
  visibility VARCHAR(50) DEFAULT 'public',
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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
  score DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, other_user_id)
);

-- Groups table
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  member_ids UUID[] DEFAULT '{}',
  chat_id UUID,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_type VARCHAR(50) NOT NULL, -- 'user', 'event', 'message'
  target_id UUID NOT NULL,
  reason TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_neighborhood ON users(neighborhood);
CREATE INDEX idx_user_interests_user_id ON user_interests(user_id);
CREATE INDEX idx_user_interests_tag ON user_interests(tag);
CREATE INDEX idx_availability_user_id ON availability(user_id);
CREATE INDEX idx_events_start_ts ON events(start_ts);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_event_attendees_event_id ON event_attendees(event_id);
CREATE INDEX idx_event_attendees_user_id ON event_attendees(user_id);
CREATE INDEX idx_matches_user_id ON matches(user_id);
CREATE INDEX idx_venues_categories ON venues USING GIN(categories);

-- RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users can only see their own profile data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can view interests of others but only modify their own
CREATE POLICY "Users can view all interests" ON user_interests
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own interests" ON user_interests
  FOR ALL USING (auth.uid() = user_id);

-- Users can only manage their own availability
CREATE POLICY "Users can manage own availability" ON availability
  FOR ALL USING (auth.uid() = user_id);

-- Events are public for viewing
CREATE POLICY "Events are public" ON events
  FOR SELECT USING (status = 'active');

CREATE POLICY "Users can create events" ON events
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can manage own events" ON events
  FOR UPDATE USING (auth.uid() = creator_id);

-- Event attendees
CREATE POLICY "Users can view event attendees" ON event_attendees
  FOR SELECT USING (true);

CREATE POLICY "Users can manage own RSVPs" ON event_attendees
  FOR ALL USING (auth.uid() = user_id);

-- Matches are visible to both parties
CREATE POLICY "Users can view their matches" ON matches
  FOR SELECT USING (auth.uid() = user_id OR auth.uid() = other_user_id);

-- Insert sample data for demo
INSERT INTO venues (name, address, categories, noise_level, price_tier, lat, lng) VALUES
('Café Luna', '123 Bedford Ave, Brooklyn, NY', ARRAY['coffee', 'casual'], 2, 2, 40.7181, -73.9571),
('Brooklyn Brewery', '79 N 11th St, Brooklyn, NY', ARRAY['brewery', 'games'], 3, 3, 40.7208, -73.9578),
('Prospect Park', 'Prospect Park, Brooklyn, NY', ARRAY['outdoors', 'fitness'], 1, 1, 40.6602, -73.9690),
('The Book Club Bar', '197 E 3rd St, New York, NY', ARRAY['books', 'quiet', 'wine'], 2, 3, 40.7202, -73.9857),
('Brooklyn Bridge Park', 'Brooklyn Bridge Park, Brooklyn, NY', ARRAY['outdoors', 'views'], 1, 1, 40.7024, -73.9969);

-- Sample interests tags
INSERT INTO user_interests (user_id, tag) VALUES
-- We'll populate this when users sign up
(uuid_generate_v4(), 'coffee'),
(uuid_generate_v4(), 'hiking'),
(uuid_generate_v4(), 'tech'),
(uuid_generate_v4(), 'books'),
(uuid_generate_v4(), 'fitness');

-- Sample events
INSERT INTO events (creator_id, title, description, venue_id, start_ts, end_ts, capacity, tags) VALUES
(uuid_generate_v4(), 
 'Coffee & Chat for Newcomers', 
 'Casual coffee meetup for people new to the area. Great way to meet locals and get neighborhood tips!',
 (SELECT id FROM venues WHERE name = 'Café Luna'),
 NOW() + INTERVAL '2 hours',
 NOW() + INTERVAL '4 hours',
 6,
 ARRAY['coffee', 'newcomers', 'casual']
),
(uuid_generate_v4(),
 'Board Games & Beers',
 'Weekly board game night at Brooklyn Brewery. Bring your competitive spirit!',
 (SELECT id FROM venues WHERE name = 'Brooklyn Brewery'),
 NOW() + INTERVAL '2 days',
 NOW() + INTERVAL '2 days 3 hours',
 8,
 ARRAY['games', 'beer', 'weekly']
),
(uuid_generate_v4(),
 'Morning Run Club',
 '5K run through beautiful Prospect Park. All fitness levels welcome!',
 (SELECT id FROM venues WHERE name = 'Prospect Park'),
 NOW() + INTERVAL '3 days',
 NOW() + INTERVAL '3 days 2 hours',
 12,
 ARRAY['running', 'fitness', 'outdoors']
); 