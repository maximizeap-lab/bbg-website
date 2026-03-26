import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface PlayerProfile {
  slug: string;
  first_name: string;
  last_name: string;
  jersey_number: number;
  position: string;
  graduation_year: number;
  school: string;
  hometown: string;
  high_school: string;
  current_team: string;
  status: "active" | "committed" | "pro" | "alumni";
  bio: string;
  quote: string;
  stats: { label: string; value: string }[];
  achievements: string[];
  bbg_journey: string;
}

/* -------------------------------------------------------------------------- */
/*  Sample Data                                                               */
/* -------------------------------------------------------------------------- */

const PLAYERS: PlayerProfile[] = [
  {
    slug: "marcus-johnson",
    first_name: "Marcus",
    last_name: "Johnson",
    jersey_number: 7,
    position: "SS",
    graduation_year: 2025,
    school: "Kansas State",
    hometown: "Compton, CA",
    high_school: "Serra High School",
    current_team: "Kansas State Wildcats",
    status: "committed",
    bio: "Marcus grew up in Compton and discovered BBG through a community clinic at Lueders Park. A dynamic shortstop with elite range and a powerful bat, he earned a full scholarship to Kansas State after starring at Serra High School.",
    quote: "BBG gave me a chance when nobody else would. Coach Ron believed in me before I believed in myself.",
    stats: [
      { label: "AVG", value: ".342" },
      { label: "HR", value: "8" },
      { label: "RBI", value: "47" },
      { label: "SB", value: "23" },
    ],
    achievements: [
      "2024 BBG All-Star Game MVP",
      "All-CIF Southern Section First Team",
      "Perfect Game Top 500 National Ranking",
      "Full athletic scholarship to Kansas State",
    ],
    bbg_journey:
      "Marcus joined BBG in 2019 as a quiet 14-year-old who had never played travel ball. Within two years he was one of the top prospects on the West Coast. His work ethic and coachability made him a leader in every room he walked into. Marcus credits the mentorship he received from Dom Smith and Ron Miller as the turning point in his life — not just in baseball, but in how he carries himself as a young man.",
  },
  {
    slug: "jaylen-carter",
    first_name: "Jaylen",
    last_name: "Carter",
    jersey_number: 24,
    position: "CF",
    graduation_year: 2026,
    school: "Serra High School",
    hometown: "Gardena, CA",
    high_school: "Serra High School",
    current_team: "BBG 16U",
    status: "active",
    bio: "Jaylen is a five-tool center fielder with elite speed and an advanced approach at the plate. He is one of the most exciting young prospects in the BBG program and is being recruited by several Pac-12 programs.",
    quote: "I didn't even know how to talk to college coaches. BBG taught me everything — the game and the business.",
    stats: [
      { label: "AVG", value: ".387" },
      { label: "HR", value: "5" },
      { label: "RBI", value: "32" },
      { label: "SB", value: "41" },
    ],
    achievements: [
      "2025 BBG All-American Selection",
      "USA Baseball 16U National Team Trials Invitee",
      "MaxPreps Sophomore All-American",
      "Team captain, Serra High School JV (Freshman year)",
    ],
    bbg_journey:
      "Jaylen walked onto the field at his first BBG clinic with a borrowed glove and shoes a size too big. What he lacked in equipment he made up for in heart. Within six months, BBG had him fully outfitted and on the travel roster. Now he is being recruited by D1 programs across the country and is a mentor to younger players in the program.",
  },
  {
    slug: "deandre-williams",
    first_name: "DeAndre",
    last_name: "Williams",
    jersey_number: 11,
    position: "P",
    graduation_year: 2024,
    school: "UC Riverside",
    hometown: "South Los Angeles, CA",
    high_school: "Crenshaw High School",
    current_team: "UC Riverside Highlanders",
    status: "committed",
    bio: "DeAndre is a hard-throwing right-hander who went from unknown to one of the top arms in the city through BBG's pitching development program. He committed to UC Riverside on a baseball scholarship.",
    quote: "Dom showed me what was possible. He came from the same streets I did. That changed everything.",
    stats: [
      { label: "ERA", value: "1.87" },
      { label: "K", value: "112" },
      { label: "W", value: "9" },
      { label: "IP", value: "78.2" },
    ],
    achievements: [
      "MaxPreps All-State Honorable Mention",
      "BBG Pitcher of the Year 2023",
      "Topped 91 MPH at PG National Showcase",
      "Committed to UC Riverside on scholarship",
    ],
    bbg_journey:
      "DeAndre had never been clocked by a radar gun before attending a BBG workout. When he hit 85 as a sophomore, the coaches knew he had special arm talent. Through dedicated training, nutrition guidance, and exposure at BBG showcases, DeAndre's velocity jumped to 91 by his senior year. He signed with UC Riverside and plans to study kinesiology.",
  },
  {
    slug: "isaiah-brooks",
    first_name: "Isaiah",
    last_name: "Brooks",
    jersey_number: 3,
    position: "2B",
    graduation_year: 2027,
    school: "Crenshaw High School",
    hometown: "Inglewood, CA",
    high_school: "Crenshaw High School",
    current_team: "BBG 15U",
    status: "active",
    bio: "Isaiah is one of the youngest players in the BBG program but already plays with the poise and baseball IQ of a senior. A slick-fielding second baseman with surprising pop, he is the future of the program.",
    quote: "BBG is my second family. These coaches actually care about us off the field too.",
    stats: [
      { label: "AVG", value: ".315" },
      { label: "HR", value: "3" },
      { label: "RBI", value: "28" },
      { label: "SB", value: "18" },
    ],
    achievements: [
      "2025 BBG Future Stars Selection",
      "Inglewood City Baseball MVP (Middle School)",
      "3.8 GPA — Honor Roll",
      "Youngest player on BBG travel roster",
    ],
    bbg_journey:
      "Isaiah was introduced to BBG by his older cousin who had gone through the program. At just 13, he showed up to tryouts and held his own against players two and three years older. Coach Ron saw something special in his hands and footwork and immediately began working with him daily. Isaiah represents the next wave of BBG talent.",
  },
  {
    slug: "xavier-thomas",
    first_name: "Xavier",
    last_name: "Thomas",
    jersey_number: 44,
    position: "1B",
    graduation_year: 2023,
    school: "Atlanta Braves Organization",
    hometown: "Carson, CA",
    high_school: "Carson High School",
    current_team: "Atlanta Braves — A Ball",
    status: "pro",
    bio: "Xavier is a BBG success story and the pride of the program. Drafted by the Atlanta Braves, he is currently in the minor league system working his way to The Show. He returns every off-season to mentor current BBG players.",
    quote: "Everything I have in this game traces back to BBG. That program saved my life.",
    stats: [
      { label: "AVG", value: ".278" },
      { label: "HR", value: "14" },
      { label: "RBI", value: "63" },
      { label: "SB", value: "4" },
    ],
    achievements: [
      "Drafted by the Atlanta Braves (2023)",
      "BBG All-Star Game HR Derby Champion (2x)",
      "All-CIF First Team (2x)",
      "Carson High School career HR record holder",
    ],
    bbg_journey:
      "Xavier joined BBG in 2018 when he was a raw but powerful freshman at Carson High. Over four years, the BBG coaching staff refined his swing, taught him plate discipline, and connected him with MLB scouts. He was drafted by the Atlanta Braves and is now living his dream in professional baseball. Xavier credits Dom Smith as his biggest mentor and role model.",
  },
  {
    slug: "cameron-davis",
    first_name: "Cameron",
    last_name: "Davis",
    jersey_number: 15,
    position: "C",
    graduation_year: 2024,
    school: "Long Beach State",
    hometown: "Long Beach, CA",
    high_school: "Lakewood High School",
    current_team: "Long Beach State Dirtbags",
    status: "alumni",
    bio: "Cameron is a former BBG catcher who now plays at Long Beach State. Known for his game-calling ability and leadership behind the plate, he was a multi-year BBG participant and All-Star Game selection.",
    quote: "The discipline I learned at BBG is what got me to college baseball. It's not just about talent.",
    stats: [
      { label: "AVG", value: ".267" },
      { label: "HR", value: "6" },
      { label: "RBI", value: "38" },
      { label: "SB", value: "2" },
    ],
    achievements: [
      "Long Beach State starting catcher (Freshman)",
      "BBG All-Star Game (3x selection)",
      "All-Moore League First Team",
      "National Honor Society member",
    ],
    bbg_journey:
      "Cameron was one of the first players to join BBG when the program launched. He watched it grow from small weekend workouts to a nationally recognized organization. As a catcher, he learned invaluable leadership skills from the coaching staff that translate far beyond the diamond. Cameron plans to pursue a career in sports management after college.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Static Params                                                             */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return PLAYERS.map((p) => ({ slug: p.slug }));
}

/* -------------------------------------------------------------------------- */
/*  Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const player = PLAYERS.find((p) => p.slug === slug);

  if (!player) {
    return { title: "Player Not Found | Baseball Generations" };
  }

  return {
    title: `${player.first_name} ${player.last_name} | Baseball Generations`,
    description: player.bio.slice(0, 160),
  };
}

/* -------------------------------------------------------------------------- */
/*  Page Component                                                            */
/* -------------------------------------------------------------------------- */

export default async function PlayerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = PLAYERS.find((p) => p.slug === slug);

  if (!player) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-navy">
      {/* ================================================================== */}
      {/*  HERO                                                              */}
      {/* ================================================================== */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-[#111D35] to-bbg-red/30" />

        {/* Giant jersey number watermark */}
        <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 select-none font-accent text-[20rem] leading-none text-white/[0.04] sm:text-[28rem] lg:right-16 lg:text-[36rem]">
          {player.jersey_number}
        </span>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40">
          {/* Position badge */}
          <Badge className="mb-4 text-sm">{player.position}</Badge>

          <h1 className="font-display text-6xl tracking-tight text-white sm:text-7xl lg:text-9xl">
            {player.first_name}
            <br />
            {player.last_name}
          </h1>

          <p className="mt-4 font-body text-lg text-white/60">
            {player.current_team} &middot; Class of {player.graduation_year}
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  BIO                                                               */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Left — Bio details */}
          <div className="lg:col-span-2">
            <h2 className="mb-6 font-display text-3xl text-white">ABOUT</h2>
            <p className="font-body text-lg leading-relaxed text-white/70">
              {player.bio}
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {[
                { label: "Hometown", value: player.hometown },
                { label: "High School", value: player.high_school },
                { label: "Current Team", value: player.current_team },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-body text-xs uppercase tracking-widest text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-1 font-body text-base text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Stats panel */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="mb-6 font-display text-2xl text-white">
              SEASON STATS
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {player.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-accent text-4xl text-gold">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-body text-xs uppercase tracking-widest text-white/40">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  QUOTE                                                             */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <blockquote className="relative rounded-xl border-l-4 border-gold bg-white/[0.03] px-8 py-10">
          <span className="absolute -top-4 left-6 font-accent text-6xl leading-none text-gold/30">
            &ldquo;
          </span>
          <p className="relative font-body text-xl italic leading-relaxed text-white/80 sm:text-2xl">
            {player.quote}
          </p>
          <footer className="mt-4 font-body text-sm text-white/40">
            &mdash; {player.first_name} {player.last_name}
          </footer>
        </blockquote>
      </section>

      {/* ================================================================== */}
      {/*  BBG JOURNEY                                                       */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-8 font-display text-4xl text-white">
          THE BBG JOURNEY
        </h2>
        <div className="max-w-3xl">
          <p className="font-body text-lg leading-relaxed text-white/70">
            {player.bbg_journey}
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  ACHIEVEMENTS                                                      */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 font-display text-3xl text-white">ACHIEVEMENTS</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {player.achievements.map((a) => (
            <li key={a} className="flex items-start gap-3">
              <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
              <span className="font-body text-base text-white/70">{a}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ================================================================== */}
      {/*  PHOTO GALLERY PLACEHOLDER                                         */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 font-display text-3xl text-white">GALLERY</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02]"
            />
          ))}
        </div>
      </section>

      {/* ================================================================== */}
      {/*  CTA                                                               */}
      {/* ================================================================== */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          <h2 className="font-display text-4xl text-white sm:text-5xl">
            SUPPORT A PLAYER LIKE {player.first_name.toUpperCase()}
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-white/50">
            Your donation helps cover equipment, travel, coaching, and camp
            registration fees so every kid gets a fair shot — regardless of
            their family&apos;s income.
          </p>
          <Link href="/donate" className="mt-8">
            <Button size="lg">Donate Now</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
