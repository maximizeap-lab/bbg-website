"use client";

import { useRef, useState, useEffect } from "react";
import { IMPACT_STATS } from "@/lib/constants";

function CounterCard({
  value,
  suffix,
  label,
  started,
}: {
  value: number;
  suffix: string;
  label: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let startTime: number;
    let animationFrame: number;
    const duration = 2200;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [started, value]);

  return (
    <div className="flex flex-col items-center text-center px-4 py-8">
      <span className="font-accent text-5xl sm:text-6xl lg:text-7xl text-gold font-bold tabular-nums leading-none">
        {count}
        <span className="text-gold">{suffix}</span>
      </span>
      <span className="mt-3 font-body text-sm sm:text-base uppercase tracking-wider text-black/70 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function ImpactCounters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  return (
    <section className="bg-white py-20 md:py-28">
      <div ref={containerRef} className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {IMPACT_STATS.map((stat) => (
            <CounterCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              started={hasStarted}
            />
          ))}
        </div>
        <p className="mt-12 text-center font-body text-black/50 text-sm tracking-wide uppercase">
          And growing every season
        </p>
      </div>
    </section>
  );
}
