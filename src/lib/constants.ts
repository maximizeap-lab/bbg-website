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
  { label: "Draft", href: "/draft" },
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
  { value: 44, suffix: "+", label: "Players Drafted" },
  { value: 50, suffix: "+", label: "College Commitments" },
  { value: 6, suffix: "", label: "All-Star Showcases" },
] as const;

export const DRAFTED_PLAYERS = [
  { name: "Druw Jones", team: "Arizona Diamondbacks", round: "1st Round", position: "OF", mlbId: 702258, headshot: "/images/headshots/druw-jones.png" },
  { name: "Termarr Johnson", team: "Pittsburgh Pirates", round: "1st Round", position: "INF", mlbId: 702261, headshot: "/images/headshots/termarr-johnson.png" },
  { name: "Justin Crawford", team: "Philadelphia Phillies", round: "1st Round", position: "OF", mlbId: 702222, headshot: "/images/headshots/justin-crawford.png" },
  { name: "Mikey Romero", team: "Boston Red Sox", round: "1st Round", position: "SS", mlbId: 702540, headshot: "/images/headshots/mikey-romero.png" },
  { name: "Malcolm Moore", team: "Texas Rangers", round: "1st Round", position: "C", mlbId: 702270, headshot: "/images/headshots/malcolm-moore.png" },
  { name: "Ralphy Velazquez", team: "Cleveland Guardians", round: "1st Round", position: "C", mlbId: 806252, headshot: "/images/headshots/ralphy-velazquez.png" },
  { name: "Cam Caminiti", team: "Atlanta Braves", round: "1st Round", position: "INF", mlbId: 807284, headshot: "/images/headshots/cam-caminiti.png" },
  { name: "Seth Hernandez", team: "Pittsburgh Pirates", round: "1st Round", position: "P", mlbId: 815825, headshot: "/images/headshots/seth-hernandez.png" },
  { name: "Billy Carlson", team: "Chicago White Sox", round: "1st Round", position: "INF", mlbId: 815814, headshot: "/images/headshots/billy-carlson.png" },
  { name: "Gavin Fien", team: "Texas Rangers", round: "1st Round", position: "P", mlbId: 815818, headshot: "/images/headshots/gavin-fien.png" },
  { name: "Kayson Cunningham", team: "Arizona Diamondbacks", round: "1st Round", position: "SS", mlbId: 815617, headshot: "/images/headshots/kayson-cunningham.png" },
  { name: "Tate Southisene", team: "Atlanta Braves", round: "1st Round", position: "OF", mlbId: 816111, headshot: "/images/headshots/tate-southisene.png" },
  { name: "Kruz Schoolcraft", team: "San Diego Padres", round: "1st Round", position: "P", mlbId: 828244, headshot: "/images/headshots/kruz-schoolcraft.png" },
  { name: "Brady Ebel", team: "Milwaukee Brewers", round: "1st Round", position: "P", mlbId: 815816, headshot: "/images/headshots/brady-ebel.png" },
  { name: "Levi Sterling", team: "Pittsburgh Pirates", round: "2nd Round", position: "P", mlbId: 815552, headshot: "/images/headshots/levi-sterling.png" },
  { name: "Boston Bateman", team: "San Diego Padres", round: "2nd Round", position: "OF", mlbId: 815348, headshot: "/images/headshots/boston-bateman.png" },
  { name: "Angel Cervantes", team: "Pittsburgh Pirates", round: "2nd Round", position: "INF", mlbId: 815979, headshot: "/images/headshots/angel-cervantes.png" },
  { name: "Quentin Young", team: "Pittsburgh Pirates", round: "2nd Round", position: "OF", mlbId: 0, headshot: "" },
  { name: "Chris Paciolla", team: "Chicago Cubs", round: "3rd Round", position: "C", mlbId: 800627, headshot: "/images/headshots/chris-paciolla.png" },
  { name: "Eric Bitonti", team: "Milwaukee Brewers", round: "3rd Round", position: "P", mlbId: 800724, headshot: "/images/headshots/eric-bitonti.png" },
  { name: "Brandon Winokur", team: "Minnesota Twins", round: "3rd Round", position: "INF", mlbId: 806263, headshot: "/images/headshots/brandon-winokur.png" },
  { name: "Antonio Anderson", team: "Boston Red Sox", round: "3rd Round", position: "OF", mlbId: 702995, headshot: "/images/headshots/antonio-anderson.png" },
  { name: "Dean Moss", team: "Tampa Bay Rays", round: "3rd Round", position: "P", mlbId: 0, headshot: "" },
  { name: "Jacob Reimer", team: "New York Mets", round: "4th Round", position: "P", mlbId: 702544, headshot: "/images/headshots/jacob-reimer.png" },
  { name: "RJ Austin", team: "Baltimore Orioles", round: "4th Round", position: "INF", mlbId: 0, headshot: "" },
  { name: "Landon Hodge", team: "Chicago White Sox", round: "4th Round", position: "OF", mlbId: 0, headshot: "" },
  { name: "Mason Neville", team: "Cincinnati Reds", round: "4th Round", position: "P", mlbId: 0, headshot: "" },
  { name: "Kaleb Wing", team: "Chicago Cubs", round: "4th Round", position: "OF", mlbId: 0, headshot: "" },
  { name: "Nick Montgomery", team: "Atlanta Braves", round: "5th Round", position: "INF", mlbId: 0, headshot: "" },
  { name: "Josiah Hartshorn", team: "Chicago Cubs", round: "6th Round", position: "P", mlbId: 0, headshot: "" },
  { name: "Dylan Fien", team: "Oakland Athletics", round: "7th Round", position: "P", mlbId: 0, headshot: "" },
  { name: "Boston Baro", team: "New York Mets", round: "8th Round", position: "OF", mlbId: 805951, headshot: "/images/headshots/boston-baro.png" },
  { name: "Trevor Heishman", team: "Detroit Tigers", round: "9th Round", position: "P", mlbId: 0, headshot: "" },
  { name: "CJ Hughes", team: "Milwaukee Brewers", round: "11th Round", position: "INF", mlbId: 0, headshot: "" },
  { name: "Nick Peoples", team: "Washington Nationals", round: "12th Round", position: "OF", mlbId: 703612, headshot: "/images/headshots/nick-peoples.png" },
  { name: "Omari Daniels", team: "Minnesota Twins", round: "14th Round", position: "OF", mlbId: 702673, headshot: "/images/headshots/omari-daniels.png" },
  { name: "Jaden Noot", team: "Milwaukee Brewers", round: "19th Round", position: "P", mlbId: 702562, headshot: "/images/headshots/jaden-noot.png" },
  { name: "Sam Parker", team: "Minnesota Twins", round: "19th Round", position: "P", mlbId: 0, headshot: "" },
  { name: "Austin Charles", team: "Kansas City Royals", round: "20th Round", position: "OF", mlbId: 800051, headshot: "/images/headshots/austin-charles.png" },
  { name: "Easton Shelton", team: "Los Angeles Dodgers", round: "Signed", position: "INF", mlbId: 0, headshot: "" },
  { name: "Luke Scherrer", team: "Pittsburgh Pirates", round: "Signed", position: "P", mlbId: 0, headshot: "" },
  { name: "Jaden Fielder", team: "Milwaukee Brewers", round: "Signed", position: "OF", mlbId: 0, headshot: "" },
  { name: "Rashawn Pinder", team: "Texas Rangers", round: "Int'l Signing", position: "OF", mlbId: 0, headshot: "" },
  { name: "Bohan Adderly", team: "New York Mets", round: "Int'l Signing", position: "INF", mlbId: 0, headshot: "" },
] as const;

export const MLB_TEAMS: Record<string, { color: string; abbr: string; teamId: number }> = {
  "Arizona Diamondbacks": { color: "#A71930", abbr: "ARI", teamId: 109 },
  "Atlanta Braves": { color: "#CE1141", abbr: "ATL", teamId: 144 },
  "Baltimore Orioles": { color: "#DF4601", abbr: "BAL", teamId: 110 },
  "Boston Red Sox": { color: "#BD3039", abbr: "BOS", teamId: 111 },
  "Chicago Cubs": { color: "#0E3386", abbr: "CHC", teamId: 112 },
  "Chicago White Sox": { color: "#27251F", abbr: "CWS", teamId: 145 },
  "Cincinnati Reds": { color: "#C6011F", abbr: "CIN", teamId: 113 },
  "Cleveland Guardians": { color: "#00385D", abbr: "CLE", teamId: 114 },
  "Detroit Tigers": { color: "#0C2340", abbr: "DET", teamId: 116 },
  "Kansas City Royals": { color: "#004687", abbr: "KC", teamId: 118 },
  "Los Angeles Dodgers": { color: "#005A9C", abbr: "LAD", teamId: 119 },
  "Milwaukee Brewers": { color: "#FFC52F", abbr: "MIL", teamId: 158 },
  "Minnesota Twins": { color: "#002B5C", abbr: "MIN", teamId: 142 },
  "New York Mets": { color: "#002D72", abbr: "NYM", teamId: 121 },
  "Oakland Athletics": { color: "#003831", abbr: "OAK", teamId: 133 },
  "Philadelphia Phillies": { color: "#E81828", abbr: "PHI", teamId: 143 },
  "Pittsburgh Pirates": { color: "#FDB827", abbr: "PIT", teamId: 134 },
  "San Diego Padres": { color: "#2F241D", abbr: "SD", teamId: 135 },
  "Seattle Mariners": { color: "#0C2C56", abbr: "SEA", teamId: 136 },
  "Tampa Bay Rays": { color: "#092C5C", abbr: "TB", teamId: 139 },
  "Texas Rangers": { color: "#003278", abbr: "TEX", teamId: 140 },
  "Washington Nationals": { color: "#AB0003", abbr: "WSH", teamId: 120 },
};

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
