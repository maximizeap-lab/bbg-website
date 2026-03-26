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
  { value: 500, suffix: "+", label: "Players Developed" },
  { value: 50, suffix: "+", label: "College Commitments" },
  { value: 12, suffix: "+", label: "Players Drafted" },
  { value: 6, suffix: "", label: "All-Star Showcases" },
] as const;

export const DRAFTED_PLAYERS = [
  { name: "Tyresse Turner", team: "Cleveland Guardians", round: "13th Round, 2022", school: "USC", position: "INF", note: "Trained with BBG from its inception. All-Pac-12 honors at USC. .330 BA, 33 RBI, 40 runs." },
  { name: "Druw Jones", team: "Arizona Diamondbacks", round: "2nd Overall, 2022", school: "Wesleyan HS", position: "OF", note: "Won BBG All-Star Game Home Run Derby. Son of Andruw Jones. Top MLB prospect." },
  { name: "J.P. Crawford", team: "Seattle Mariners", round: "1st Round, 2013", school: "Lakewood HS", position: "SS", note: "South LA native. Gold Glove winner. Now coaches at BBG events giving back to the community." },
] as const;

export const TESTIMONIALS = [
  {
    name: "Tyresse Turner",
    role: "Cleveland Guardians — BBG Alum",
    quote: "BBG changed the trajectory of my life. I went from playing on dirt lots in South LA to getting drafted by the Guardians. Dom and Ron showed me what was possible.",
    image: "/images/players/player-action-2.jpg",
  },
  {
    name: "Dylan Lina",
    role: "D1 Prospect — Carson, CA",
    quote: "Before BBG, I didn't have access to real coaching or scouts. They opened every door for me. Now I'm playing at the level I always dreamed of.",
    image: "/images/players/player-action-4.jpg",
  },
  {
    name: "J.P. Crawford",
    role: "Seattle Mariners — BBG Coach",
    quote: "I come back every year because these kids deserve the same chance I got. BBG is the real deal — it's family, it's development, it's opportunity.",
    image: "/images/players/player-action-1.jpg",
  },
  {
    name: "Parent — Compton",
    role: "BBG Parent",
    quote: "My son couldn't afford travel ball. BBG took him in for free, got him in front of college coaches, and now he's playing on a scholarship. They saved his future.",
    image: "/images/events/allstar-25.jpg",
  },
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
    player_name: "Tyresse Turner",
    headline: "From South LA to the Cleveland Guardians — 13th Round Draft Pick",
    quote:
      "BBG changed the trajectory of my life. I went from playing on dirt lots in South LA to getting drafted by the Guardians.",
    photo_url: "/images/players/player-action-2.jpg",
    outcome: "MLB Draft — Cleveland Guardians",
    year_joined: 2017,
  },
  {
    player_name: "Druw Jones",
    headline: "BBG Home Run Derby Champion to #2 Overall Pick",
    quote:
      "The BBG All-Star Game was one of the best showcases I've been to. The energy, the competition — it's real.",
    photo_url: "/images/players/player-action-3.jpg",
    outcome: "#2 Overall Pick — Arizona Diamondbacks",
    year_joined: 2020,
  },
  {
    player_name: "Dylan Lina",
    headline: "Carson Prospect Showcased at BBG — Now D1 Committed",
    quote:
      "Before BBG, I didn't have access to real coaching or scouts. They opened every door for me.",
    photo_url: "/images/players/player-action-4.jpg",
    outcome: "D1 College Commitment",
    year_joined: 2021,
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
