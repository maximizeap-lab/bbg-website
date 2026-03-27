"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";

interface VideoCard {
  title: string;
  link: string;
  thumbnail: string;
  label: string;
}

const VIDEOS: VideoCard[] = [
  {
    title: "Jazz Chisholm Jr & Dom Smith on BBG All-Star Game",
    link: "https://www.mlb.com/video/jazz-chisholm-jr-and-dom-smith-on-bbg-all-star-game",
    thumbnail: "/images/events/allstar-04.jpg",
    label: "MLB.com",
  },
  {
    title: "Instagram Highlights — @baseballgenerations",
    link: "https://www.instagram.com/baseballgenerations/",
    thumbnail: "/images/events/allstar-14.jpg",
    label: "Instagram",
  },
  {
    title: "BBG YouTube Channel — Full Highlights",
    link: "https://www.youtube.com/@baseballgenerations",
    thumbnail: "/images/events/allstar-24.jpg",
    label: "YouTube",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function VideoShowcase() {
  return (
    <section className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-[#F5A623] mb-3">
            SEE IT IN ACTION
          </h2>
          <p className="font-body text-white/60 text-base md:text-lg max-w-2xl">
            Game footage, player highlights, and behind-the-scenes from BBG events
          </p>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {VIDEOS.map((video) => (
            <motion.a
              key={video.title}
              variants={cardVariants}
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg overflow-hidden bg-black border border-white/5 hover:border-[#F5A623]/30 transition-all duration-300"
            >
              {/* Thumbnail with play overlay */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#F5A623] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-black fill-black ml-0.5" />
                  </div>
                </div>
                {/* Source badge */}
                <span className="absolute top-3 left-3 inline-block rounded-full bg-black/70 px-2.5 py-0.5 font-accent text-xs uppercase tracking-wider text-[#F5A623]">
                  {video.label}
                </span>
              </div>

              {/* Title */}
              <div className="p-4">
                <h3 className="font-display text-base text-white leading-tight mb-2 group-hover:text-[#F5A623] transition-colors">
                  {video.title}
                </h3>
                <span className="font-accent text-sm text-[#F5A623] group-hover:underline">
                  Watch Now &rarr;
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <a
            href="https://www.instagram.com/baseballgenerations/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-accent text-sm uppercase tracking-wider text-white/60 hover:text-[#F5A623] transition-colors"
          >
            <svg
              className="w-5 h-5 text-[#F5A623]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
            Follow @baseballgenerations for daily updates
          </a>
        </motion.div>
      </div>
    </section>
  );
}
