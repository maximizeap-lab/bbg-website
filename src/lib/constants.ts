import { Founder, StaffMember, ImpactStory, Event } from "@/types";

export const SITE_NAME = "Baseball Generations";
export const SITE_DESCRIPTION =
  "Baseball Generations is building the next generation of players, leaders, and men. Founded in South Los Angeles by Dom Smith, Ron Miller & Tim Ravare.";
export const SITE_URL = "https://baseballgenerations.com";
export const CONTACT_EMAIL = "Generationalbaseball@gmail.com";
export const EIN = "85-3342897";
export const INSTAGRAM_HANDLE = "@baseballgenerations";
export const INSTAGRAM_URL = "https://instagram.com/baseballgenerations";

export const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Players", href: "/players" },
  { label: "Events", href: "/events" },
  { label: "Camps", href: "/camps" },
  { label: "Foundation", href: "/foundation" },
  { label: "Shop", href: "/shop" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOUNDERS: Founder[] = [
  {
    name: "Dominic Smith",
    role: "Co-Founder",
    bio: "Born and raised in LA. Serra High School. 11th overall pick in the 2013 MLB Draft by the New York Mets. Currently with the Atlanta Braves. Dom started BBG because the kids coming up behind him deserved the same shot he got — without having to figure it all out alone.",
    image: "/images/founders/dom-smith.jpg",
  },
  {
    name: "Ron Miller",
    role: "Co-Founder & Head of Player Development",
    bio: "Crenshaw and Serra High School product. Drafted in the 10th round by the Miami Marlins. Played 3 years of professional baseball. Now a hitting instructor and the backbone of BBG's on-field development program.",
    image: "/images/founders/ron-miller.jpg",
  },
  {
    name: "Tim Ravare",
    role: "Co-Founder & Executive Director",
    bio: "Serra High School. North Carolina A&T team captain and first team all-conference 2015. BA in Business Administration. Tim runs the business side of BBG — from events to nonprofit operations to partnerships.",
    image: "/images/founders/tim-ravare.jpg",
  },
];

export const STAFF: StaffMember[] = [
  { name: "J.P. Crawford", role: "Player Development" },
  { name: "Reggie Southall", role: "Operations" },
  { name: "Andrew Toussaint", role: "Coaching Staff" },
  { name: "Thomas Walker", role: "Coaching Staff" },
  { name: "Glenn Walker", role: "Coaching Staff" },
  { name: "Tyler Adkison", role: "Coaching Staff" },
  { name: "Jordan Aboties", role: "Coaching Staff" },
];

export const IMPACT_STATS = [
  { value: 500, suffix: "+", label: "Players Served" },
  { value: 6, suffix: "", label: "All-Star Games" },
  { value: 40, suffix: "K+", label: "IG Followers" },
  { value: 100, suffix: "%", label: "Free to Low-Income Kids" },
] as const;

export const SEED_EVENTS: Partial<Event>[] = [
  {
    slug: "bbg-6th-all-star-game-2024",
    name: "BBG 6th All-Star Game",
    description:
      "The biggest showcase of young talent in South LA. Top players from across the country compete at Blair Field in Long Beach.",
    event_date: "2024-11-10T13:00:00-08:00",
    location_name: "Blair Field",
    location_address: "4700 Deukmejian Dr, Long Beach, CA",
    location_lat: 33.783,
    location_lng: -118.153,
    status: "past",
    is_free: false,
    price_cents: 0,
  },
  {
    slug: "bbg-all-american-game-2024",
    name: "BBG All-American Game 2024",
    description:
      "The premier All-American showcase at Loyola Marymount University. College coaches and MLB scouts in attendance.",
    event_date: "2024-09-29T12:00:00-07:00",
    location_name: "Loyola Marymount University",
    location_address: "1 Loyola Marymount University Dr, Los Angeles, CA",
    location_lat: 33.97,
    location_lng: -118.418,
    status: "past",
    is_free: false,
    price_cents: 0,
  },
];

export const SAMPLE_IMPACT_STORIES: ImpactStory[] = [
  {
    player_name: "Marcus",
    headline: "From Compton to Kansas State on a Full Scholarship",
    quote:
      "BBG gave me a chance when nobody else would. Coach Ron believed in me before I believed in myself.",
    photo_url: "/images/players/placeholder-1.jpg",
    outcome: "Full Scholarship — Kansas State",
    year_joined: 2019,
  },
  {
    player_name: "Jaylen",
    headline: "First in His Family to Play College Ball",
    quote:
      "I didn't even know how to talk to college coaches. BBG taught me everything — the game and the business.",
    photo_url: "/images/players/placeholder-2.jpg",
    outcome: "Committed — UC Riverside",
    year_joined: 2020,
  },
  {
    player_name: "DeAndre",
    headline: "From South LA Sandlots to the MLB Draft",
    quote:
      "Dom showed me what was possible. He came from the same streets I did. That changed everything.",
    photo_url: "/images/players/placeholder-3.jpg",
    outcome: "MLB Draft Selection",
    year_joined: 2018,
  },
];

export const SHOP_PRODUCTS = [
  {
    id: "bbg-hat-powder-blue",
    name: "BBG x Baseballism Hat — Powder Blue",
    price_cents: 2500,
    image_url: "/images/shop/hat-powder-blue.jpg",
    variant: "Powder Blue",
  },
  {
    id: "bbg-hat-navy",
    name: "BBG x Baseballism Hat — Navy Blue",
    price_cents: 2500,
    image_url: "/images/shop/hat-navy.jpg",
    variant: "Navy Blue",
  },
  {
    id: "bbg-tee-navy",
    name: "BBG x Baseballism Tee — Navy Blue",
    price_cents: 3500,
    image_url: "/images/shop/tee-navy.jpg",
    variant: "Navy Blue",
  },
  {
    id: "bbg-tee-powder-blue",
    name: "BBG x Baseballism Tee — Powder Blue",
    price_cents: 3500,
    image_url: "/images/shop/tee-powder-blue.jpg",
    variant: "Powder Blue",
  },
] as const;

export const POSITIONS = [
  "P",
  "C",
  "1B",
  "2B",
  "3B",
  "SS",
  "LF",
  "CF",
  "RF",
  "DH",
  "UTL",
] as const;

export const HEARD_ABOUT_OPTIONS = [
  "Instagram",
  "Friend / Word of Mouth",
  "Coach Referral",
  "School",
  "Website",
  "News / Press",
  "Other",
] as const;

export const DONATION_AMOUNTS = [1000, 2500, 5000, 10000, 25000] as const;

export const SPONSOR_TIERS = [
  {
    name: "Community Sponsor",
    emoji: "🥉",
    price: "$1,000/yr",
    perks: ["Logo on website", "Social media mention"],
  },
  {
    name: "Diamond Sponsor",
    emoji: "🥈",
    price: "$5,000/yr",
    perks: [
      "Logo on event signage",
      "Logo on website",
      "10 free registrations",
    ],
  },
  {
    name: "Founding Sponsor",
    emoji: "🏆",
    price: "$10,000/yr",
    perks: [
      "Presenting sponsorship of annual All-Star Game",
      "All Diamond Sponsor perks",
    ],
  },
] as const;
