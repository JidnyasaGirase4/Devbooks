"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Users,
  Heart,
  Sparkles,
  Globe2,
  Award,
} from "lucide-react";
import type { TeamMember } from "@/lib/queries";

const DEFAULT_STRIP = [
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80",
    eyebrow: "The library",
    caption: "Hand-picked, shelf by shelf.",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80",
    eyebrow: "The team",
    caption: "Engineers who really love books.",
  },
  {
    src: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=80",
    eyebrow: "The reader",
    caption: "Your weekend, well spent.",
  },
];

export default function AboutClient({
  settings = {},
  team = [],
}: {
  settings?: Record<string, string>;
  team?: TeamMember[];
}) {
  const eyebrowText = settings["about.eyebrow"] || "Our story";
  const heroTitle =
    settings["about.title"] ||
    "We're building the bookshelf every developer deserves.";
  const heroSubtitle =
    settings["about.subtitle"] ||
    "DevBooks started as a Notion list of must-read programming books shared between three engineers. Today it's a curated library used by 120,000+ developers around the world.";
  const missionTitle =
    settings["about.mission_title"] || "Quality over noise.";
  const missionBody =
    settings["about.mission_body"] ||
    "Programming books are how most of us learned to code. But the shelf is noisy — outdated titles, repetitive content, and algorithm-optimized listings. DevBooks is a quiet, hand-tended alternative.";

  const stripImages = [1, 2, 3].map((n, i) => ({
    src: settings[`about.image${n}_url`] || DEFAULT_STRIP[i].src,
    eyebrow: settings[`about.image${n}_eyebrow`] || DEFAULT_STRIP[i].eyebrow,
    caption: settings[`about.image${n}_caption`] || DEFAULT_STRIP[i].caption,
  }));

  const ctaTitle = settings["about.cta_title"] || "Got a book to recommend?";
  const ctaBody =
    settings["about.cta_body"] ||
    "Tell us about a title that changed how you write code — we read every suggestion.";
  const ctaLabel = settings["about.cta_label"] || "Get in touch";
  const ctaHref = settings["about.cta_href"] || "/contact";

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink-900/8">
        <div className="absolute inset-0 -z-10 bg-cream-50" />
        <div className="absolute inset-0 -z-10 paper opacity-30" />
        <div className="absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-gold-300/40 blur-3xl" />
        <div className="absolute -left-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-brand-200/50 blur-3xl" />

        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
          >
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-heartbeat" /> {eyebrowText}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="display mt-5 text-balance text-4xl text-ink-900 sm:text-6xl lg:text-7xl"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-ink-700/80"
          >
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      {/* IMAGE STRIP */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {stripImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative aspect-[4/5] overflow-hidden rounded-3xl shadow-lg shadow-ink-900/10 ${
                i === 1 ? "sm:translate-y-8" : ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.eyebrow}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-cream-50">
                <div className="display text-[10px] uppercase tracking-[0.2em] text-cream-50/70">
                  {img.eyebrow}
                </div>
                <div className="display mt-1 text-xl font-semibold leading-tight">
                  {img.caption}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: settings["about.stat1_value"] || "120K+", v: settings["about.stat1_label"] || "Developers using DevBooks" },
            { k: settings["about.stat2_value"] || "500+", v: settings["about.stat2_label"] || "Curated books" },
            { k: settings["about.stat3_value"] || "70+", v: settings["about.stat3_label"] || "Free resources" },
            { k: settings["about.stat4_value"] || "32", v: settings["about.stat4_label"] || "Countries shipping to" },
          ].map((s, i) => (
            <motion.div
              key={s.v}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card p-6"
            >
              <div className="display text-4xl font-semibold text-ink-900">
                {s.k}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-700/70">
                {s.v}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="border-y border-ink-900/8 bg-cream-100/60 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Our mission</span>
              <h2 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
                {missionTitle}
              </h2>
              <p className="mt-5 whitespace-pre-line text-ink-700/80">
                {missionBody}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Heart,
                  title: settings["about.value1_title"] || "Honest reviews",
                  body: settings["about.value1_body"] || "We publish what we'd recommend to a friend.",
                  color: "text-rose-500 bg-rose-50",
                },
                {
                  icon: Sparkles,
                  title: settings["about.value2_title"] || "Curated, not exhaustive",
                  body: settings["about.value2_body"] || "Quality over quantity, every single time.",
                  color: "text-gold-600 bg-gold-50",
                },
                {
                  icon: Users,
                  title: settings["about.value3_title"] || "Community-shaped",
                  body: settings["about.value3_body"] || "Reader reviews shape the rankings.",
                  color: "text-brand-700 bg-brand-50",
                },
                {
                  icon: Globe2,
                  title: settings["about.value4_title"] || "Global library",
                  body: settings["about.value4_body"] || "Books shipped to 32+ countries.",
                  color: "text-cyan-600 bg-cyan-50",
                },
              ].map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group card p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${v.color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-8deg]`}
                    >
                      <Icon className="h-4 w-4 group-hover:animate-bounce-soft" strokeWidth={2} />
                    </span>
                    <h3 className="mt-3 text-sm font-semibold text-ink-900">
                      {v.title}
                    </h3>
                    <p className="mt-1 text-sm text-ink-700/80">{v.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      {team.length > 0 && (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <Award className="h-3 w-3 text-gold-500" />{" "}
            {settings["about.team_eyebrow"] || "The team"}
          </span>
          <h2 className="display mt-4 text-4xl text-ink-900 sm:text-5xl">
            {settings["about.team_title"] ||
              "Engineers and designers who really love books."}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {team.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-7 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div
                className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${p.accent} text-2xl font-bold text-white shadow-lg`}
              >
                {p.initials ?? p.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="display mt-5 text-xl font-semibold text-ink-900">
                {p.name}
              </div>
              <div className="text-sm text-brand-700">{p.role}</div>
              <p className="mt-3 text-sm text-ink-700/80">{p.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
      )}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-center text-cream-50 sm:p-12 lg:p-16">
          <div className="absolute inset-0 paper opacity-25" />
          <div className="absolute -top-32 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-700/40 blur-3xl" />

          <div className="relative">
            <h2 className="display text-4xl text-cream-50 sm:text-5xl">
              {ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-100/80">
              {ctaBody}
            </p>
            <Link
              href={ctaHref}
              className="mt-7 inline-flex items-center gap-2 btn-gold"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
