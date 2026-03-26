"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { DRAFTED_PLAYERS } from "@/lib/constants";

const PLAYER_PHOTOS = [
  "/images/events/allstar-03.jpg",
  "/images/events/allstar-07.jpg",
  "/images/events/allstar-11.jpg",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const counterVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function DraftedPlayersSection() {
  return (
    <section className="bg-black py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-gold leading-[0.95] mb-4">
            OUR PLAYERS GET DRAFTED
          </h2>
          <p className="font-body text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            From South LA fields to professional diamonds. These are real BBG alumni.
          </p>
        </motion.div>

        {/* Player Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20"
        >
          {DRAFTED_PLAYERS.map((player, i) => (
            <motion.div
              key={player.name}
              variants={cardVariants}
              className="group relative rounded-xl overflow-hidden bg-[#111] border border-white/10 hover:border-gold/40 transition-all duration-300"
            >
              {/* Player Photo */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={PLAYER_PHOTOS[i]}
                  alt={player.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Position Badge */}
                <span className="absolute top-4 right-4 font-accent text-xs uppercase tracking-wider bg-gold text-black px-3 py-1.5 rounded-full font-bold">
                  {player.position}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 -mt-12 relative z-10">
                <h3 className="font-display text-2xl text-white mb-1 group-hover:text-gold transition-colors">
                  {player.name}
                </h3>
                <p className="font-accent text-gold text-sm uppercase tracking-wider mb-2">
                  {player.team}
                </p>
                <p className="font-body text-white/50 text-xs mb-3">
                  {player.round}
                </p>
                <p className="font-body text-white/60 text-sm leading-relaxed">
                  {player.note}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Large Counters */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-12"
        >
          <motion.div variants={counterVariants} className="text-center">
            <p className="font-accent text-5xl md:text-7xl text-gold font-bold leading-none">
              12+
            </p>
            <p className="font-display text-white text-lg md:text-xl mt-2 tracking-wide">
              PLAYERS DRAFTED
            </p>
          </motion.div>
          <motion.div variants={counterVariants} className="text-center">
            <p className="font-accent text-5xl md:text-7xl text-gold font-bold leading-none">
              50+
            </p>
            <p className="font-display text-white text-lg md:text-xl mt-2 tracking-wide">
              COLLEGE COMMITMENTS
            </p>
          </motion.div>
        </motion.div>

        {/* Gold Divider */}
        <div className="mx-auto max-w-md h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </div>
    </section>
  );
}
