"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Button, Eyebrow } from "@/components/sections";
import { Arrow, ChevronDown } from "@/components/icons";
import { heroPoster, heroVideo } from "@/lib/media";

/**
 * The homepage hero: one full-viewport black band carrying the brand gradient,
 * with mission footage composited over it. The gradient is the brand; the
 * footage is texture — hence the low opacity and the cool grade.
 *
 * This is the only surface on the site where black runs full-bleed above the
 * fold. Everything below it is white.
 */
export function HomeHero() {
  const video = useRef<HTMLVideoElement>(null);

  // Reduced motion holds the poster frame rather than the moving image.
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (query.matches) node.pause();
      else void node.play().catch(() => {});
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden grad-hero">
      {/* Poster carries mobile, slow connections and reduced motion. It has to
          work as a finished still on its own, so it sits under the video
          rather than only inside the poster attribute. */}
      <Image
        src={heroPoster.src}
        alt={heroPoster.alt}
        fill
        priority
        sizes="100vw"
        className="graded -z-10 object-cover opacity-45"
      />
      <video
        ref={video}
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster.src}
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Brand over footage, then a scrim to hold the headline at 21:1. */}
      <div className="absolute inset-0 -z-10 grad-bloom" aria-hidden />
      <div className="absolute inset-0 -z-10 scrim" aria-hidden />
      <div className="absolute inset-0 -z-10 hairline-grid opacity-50" aria-hidden />

      {/* Headline sits bottom-left, clear of the fixed header. */}
      <div className="shell flex flex-1 flex-col justify-end pt-[calc(var(--header-h)+3rem)] pb-14 sm:pb-20">
        <Eyebrow practice="government" onDark>
          Government · Commercial
        </Eyebrow>

        <h1 className="mt-7 max-w-[18ch] text-hero text-on-black">
          The IT Edge for Lean Government
        </h1>

        <p className="mt-7 max-w-[54ch] text-lg text-on-black-mute">
          Unified communications, network engineering, cybersecurity and
          software sustainment for federal missions — and Microsoft-estate
          digital transformation for the enterprises that run alongside them.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/government-it-services" onDark>
            Explore Government services
          </Button>
          <Button href="/technologygroup" variant="secondary" onDark>
            Explore Commercial services
          </Button>
        </div>
      </div>

      {/* Practice split, pinned to the foot of the hero — the first choice a
          visitor makes, before they read a word of the page. */}
      <div className="relative border-t border-white/15">
        <div className="shell grid sm:grid-cols-2">
          <PracticeLink
            href="/government-it-services"
            marker="bg-brand-red"
            label="Government"
            detail="DoD · DHS · HHS · prime contracts"
          />
          <PracticeLink
            href="/technologygroup"
            marker="bg-brand-blue"
            label="Commercial"
            detail="Azure · Dynamics 365 · Power Platform"
            divider
          />
        </div>

        <a
          href="#practices"
          aria-label="Skip to page content"
          className="absolute right-4 bottom-full mb-8 hidden text-on-black-mute transition-colors duration-150 ease-brand hover:text-on-black lg:block"
        >
          <ChevronDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}

function PracticeLink({
  href,
  marker,
  label,
  detail,
  divider = false,
}: {
  href: string;
  marker: string;
  label: string;
  detail: string;
  divider?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group flex items-center justify-between gap-6 py-6 transition-colors duration-150 ease-brand hover:bg-white/5 sm:py-7 ${
        divider ? "border-t border-white/15 sm:border-t-0 sm:border-l sm:pl-8" : "sm:pr-8"
      }`}
    >
      <span className="flex items-center gap-4">
        <span className={`h-8 w-[3px] shrink-0 ${marker}`} aria-hidden />
        <span>
          <span className="block text-h4 text-on-black">{label}</span>
          <span className="mt-1 block text-sm text-on-black-mute">{detail}</span>
        </span>
      </span>
      <Arrow className="h-4 w-4 shrink-0 text-on-black-mute transition-transform duration-150 ease-brand group-hover:translate-x-1" />
    </a>
  );
}
