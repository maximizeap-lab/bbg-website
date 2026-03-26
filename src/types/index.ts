export interface Player {
  id: string;
  slug: string;
  name: string;
  position: string | null;
  graduation_year: number | null;
  hometown: string | null;
  school: string | null;
  current_team: string | null;
  status: "active" | "committed" | "pro" | "alumni";
  jersey_number: string | null;
  bio: string | null;
  bbg_journey: string | null;
  quote: string | null;
  instagram_handle: string | null;
  draft_info: string | null;
  achievements: string[];
  photo_url: string | null;
  gallery_urls: string[];
  is_featured: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  event_date: string;
  end_date: string | null;
  location_name: string | null;
  location_address: string | null;
  location_lat: number | null;
  location_lng: number | null;
  price_cents: number;
  capacity: number | null;
  registered_count: number;
  is_free: boolean;
  status: "upcoming" | "past" | "cancelled";
  hero_image_url: string | null;
  gallery_urls: string[];
  stripe_price_id: string | null;
  created_at: string;
}

export interface Registration {
  id: string;
  player_id: string | null;
  event_id: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  parent_name: string | null;
  parent_email: string | null;
  parent_phone: string | null;
  school: string | null;
  graduation_year: number | null;
  position: string | null;
  bats: string | null;
  throws: string | null;
  highlight_url: string | null;
  instagram_handle: string | null;
  gpa: number | null;
  heard_about: string | null;
  scholarship_requested: boolean;
  scholarship_note: string | null;
  payment_status: "paid" | "pending" | "scholarship" | "free";
  stripe_payment_intent_id: string | null;
  amount_paid_cents: number | null;
  registered_at: string;
}

export interface Donation {
  id: string;
  donor_first_name: string | null;
  donor_last_name: string | null;
  donor_email: string;
  donor_phone: string | null;
  amount_cents: number;
  is_recurring: boolean;
  stripe_payment_intent_id: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  in_honor_of: string | null;
  is_anonymous: boolean;
  covered_fees: boolean;
  status: "succeeded" | "pending" | "failed";
  donated_at: string;
}

export interface CartItem {
  id: string;
  name: string;
  price_cents: number;
  quantity: number;
  image_url: string;
  variant?: string;
}

export interface ImpactStory {
  player_name: string;
  headline: string;
  quote: string;
  photo_url: string;
  outcome: string;
  year_joined: number;
}

export interface InstagramPost {
  id: string;
  media_url: string;
  caption: string | null;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
  like_count?: number;
}

export interface Founder {
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface StaffMember {
  name: string;
  role: string;
  image?: string;
}
