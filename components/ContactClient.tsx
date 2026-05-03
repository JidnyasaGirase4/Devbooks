"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Send,
  Check,
  Sparkles,
  Clock,
  Globe2,
  Twitter,
  Github,
  Linkedin,
} from "lucide-react";

export default function ContactClient({
  settings = {},
}: {
  settings?: Record<string, string>;
}) {
  const eyebrowText = settings["contact.eyebrow"] || "We read every message";
  const heroTitle = settings["contact.title"] || "Let's talk.";
  const heroSubtitle =
    settings["contact.subtitle"] ||
    "Questions, recommendations, partnerships — drop us a line and we'll reply within 24 hours.";

  const email = settings["contact.email"] || "hello@devbooks.io";
  const phone = settings["contact.phone"] || "+91 80 4567 1234";
  const hours = settings["contact.hours"] || "Mon – Fri · 9am – 6pm IST";
  const hq = settings["contact.hq"] || "Bengaluru, India";

  const CONTACT_METHODS = [
    {
      icon: Mail,
      title: "Email",
      detail: email,
      sub: "Replies within a day",
      color: "from-brand-500 to-teal-600",
      halo: "bg-brand-300/40",
    },
    {
      icon: MessageSquare,
      title: "Live chat",
      detail: hours,
      sub: "Available on every page",
      color: "from-gold-500 to-orange-600",
      halo: "bg-gold-300/40",
    },
    {
      icon: Phone,
      title: "Phone",
      detail: phone,
      sub: "For order support",
      color: "from-rose-500 to-pink-600",
      halo: "bg-rose-300/40",
    },
    {
      icon: MapPin,
      title: "Headquarters",
      detail: hq,
      sub: "Remote-first team",
      color: "from-cyan-500 to-sky-600",
      halo: "bg-cyan-300/40",
    },
  ];

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", topic: "General", message: "" });
  };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-900/8 bg-cream-100/60">
        <div className="absolute inset-0 paper opacity-30" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gold-300/40 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="eyebrow"
          >
            <Sparkles className="h-3 w-3 text-gold-500 animate-twinkle" /> {eyebrowText}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="display mt-4 text-4xl text-ink-900 sm:text-6xl lg:text-7xl"
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-xl text-ink-700/80"
          >
            {heroSubtitle}
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
          {/* Decorative side panel */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-cream-50 sm:p-10 lg:w-5/12 lg:flex-none"
          >
            <div className="absolute inset-0 paper opacity-25" />
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-700/40 blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-gold-500/25 blur-3xl" />

            <div className="relative flex h-full flex-col">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-cream-100/15 bg-cream-100/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-100/80">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                {settings["contact.sidebar_eyebrow"] || "We're here"}
              </span>

              <h2 className="display mt-6 text-balance text-3xl leading-[1.1] sm:text-4xl">
                {settings["contact.sidebar_title"] ||
                  "Real engineers, real replies."}
              </h2>
              <p className="mt-4 text-cream-100/75">
                {settings["contact.sidebar_body"] ||
                  "No bots, no canned scripts — every message is read and answered by someone on the DevBooks team."}
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  {
                    icon: Clock,
                    label: "Reply time",
                    value: "Within 24 hours",
                  },
                  {
                    icon: Globe2,
                    label: "Working hours",
                    value: hours,
                  },
                  {
                    icon: Mail,
                    label: "For everything",
                    value: email,
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <li
                      key={item.label}
                      className="flex items-start gap-3 rounded-xl bg-cream-100/5 px-4 py-3 backdrop-blur"
                    >
                      <span className="mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gold-400/20 text-gold-300">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-100/50">
                          {item.label}
                        </div>
                        <div className="text-sm font-medium text-cream-50">
                          {item.value}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-auto pt-8">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream-100/50">
                  Or follow us
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {[Twitter, Github, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      aria-label="social"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/80 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400/10 hover:text-gold-300 hover:-translate-y-0.5"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.8} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            onSubmit={onSubmit}
            className="relative overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 p-7 shadow-xl shadow-ink-900/5 sm:p-8 lg:flex-1"
          >
            <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-gold-300/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-brand-300/25 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h3 className="display text-2xl font-semibold text-ink-900">
                  {settings["contact.form_title"] || "Send a message"}
                </h3>
                <span className="chip">
                  {settings["contact.form_chip"] || "Avg reply: 3 hrs"}
                </span>
              </div>
              <p className="mt-1 text-sm text-ink-700/70">
                {settings["contact.form_subtitle"] ||
                  "Fill the form — we'll get back fast."}
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Your name">
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="input"
                    placeholder="Ada Lovelace"
                  />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="input"
                    placeholder="ada@dev.com"
                  />
                </Field>
              </div>

              <div className="mt-5">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
                  What's it about?
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    "General",
                    "Book recommendation",
                    "Order support",
                    "Partnership",
                  ].map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setForm({ ...form, topic: t })}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                        form.topic === t
                          ? "bg-ink-900 text-cream-50 shadow-md"
                          : "bg-ink-900/5 text-ink-700 hover:bg-ink-900/10"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <Field label="Message">
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="input resize-none"
                    placeholder="Tell us a little more…"
                  />
                </Field>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-xs text-ink-700/60">
                  We'll never share your email. Promise.
                </p>
                <button type="submit" className="btn-primary">
                  {submitted ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.2} /> Sent
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="h-4 w-4" strokeWidth={2} />
                    </>
                  )}
                </button>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl border border-brand-300/60 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-900"
                >
                  Thanks — your message is on its way. We'll be in touch
                  shortly.
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>

        {/* Contact methods grid below */}
        <div className="mt-12">
          <div className="mb-6 text-center">
            <span className="eyebrow">Other ways to reach us</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CONTACT_METHODS.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-2xl border border-ink-900/10 bg-cream-50 p-5 shadow-sm transition-shadow duration-300 hover:shadow-lg"
                >
                  <div
                    className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${c.halo} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="relative flex items-start gap-3">
                    <span
                      className={`inline-flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-md transition-all duration-300 group-hover:rotate-[-12deg] group-hover:scale-110`}
                    >
                      <Icon className="h-4 w-4 group-hover:animate-bounce-soft" strokeWidth={2} />
                    </span>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
                        {c.title}
                      </div>
                      <div className="mt-0.5 truncate text-sm font-semibold text-ink-900">
                        {c.detail}
                      </div>
                      <div className="text-xs text-ink-700/60">{c.sub}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/70">
        {label}
      </span>
      {children}
    </label>
  );
}
