"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/validations";
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    // TODO: Replace with actual API call (e.g., Resend, server action)
    console.log("Contact form submission:", data);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitted(true);
    reset();
  }

  return (
    <div className="bg-navy min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-navy pt-32 pb-16">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-1/4 top-0 h-[200%] w-px rotate-[25deg] bg-gold" />
          <div className="absolute right-1/3 top-0 h-[200%] w-px rotate-[25deg] bg-gold" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-gold">
            Get In Touch
          </p>
          <h1 className="mt-4 font-display text-7xl uppercase leading-none text-white md:text-8xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-lg text-white/60">
            Questions about programs, partnerships, or just want to get
            involved? We&apos;d love to hear from you.
          </p>
          <div className="mt-6 h-1 w-24 mx-auto bg-gradient-to-r from-bbg-red via-gold to-bbg-red" />
        </div>
      </section>

      {/* ===== SPLIT LAYOUT ===== */}
      <section className="relative bg-navy pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* ---- LEFT: Contact Info ---- */}
            <div className="lg:col-span-2">
              <div className="sticky top-32 space-y-10">
                {/* Email */}
                <div className="group">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.2em] text-white/40">
                        Email
                      </p>
                      <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-body text-sm text-white transition-colors hover:text-gold"
                      >
                        {CONTACT_EMAIL}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram */}
                <div className="group">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.2em] text-white/40">
                        Instagram
                      </p>
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-white transition-colors hover:text-gold"
                      >
                        {INSTAGRAM_HANDLE}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="group">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.2em] text-white/40">
                        Location
                      </p>
                      <p className="font-body text-sm text-white">
                        South Los Angeles, CA
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

                {/* Quick links */}
                <div>
                  <p className="font-accent text-xs uppercase tracking-[0.2em] text-white/40">
                    Quick Links
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Link
                      href="/donate"
                      className="font-body text-sm text-gold transition-colors hover:text-gold/80"
                    >
                      Make a Donation
                    </Link>
                    <Link
                      href="/events"
                      className="font-body text-sm text-white/60 transition-colors hover:text-white"
                    >
                      Upcoming Events
                    </Link>
                    <Link
                      href="/foundation"
                      className="font-body text-sm text-white/60 transition-colors hover:text-white"
                    >
                      About the Foundation
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- RIGHT: Contact Form ---- */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm md:p-10">
                {isSubmitted ? (
                  /* Success State */
                  <div className="flex flex-col items-center py-16 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                      <svg
                        className="h-10 w-10 text-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-6 font-display text-3xl uppercase text-white">
                      Message Sent
                    </h3>
                    <p className="mt-3 max-w-sm font-body text-sm text-white/60">
                      Thanks for reaching out. We&apos;ll get back to you as
                      soon as possible.
                    </p>
                    <Button
                      className="mt-8"
                      variant="outline-gold"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  /* Form */
                  <>
                    <div className="mb-8">
                      <h2 className="font-display text-3xl uppercase text-white">
                        Send A Message
                      </h2>
                      <p className="mt-2 font-body text-sm text-white/50">
                        Fill out the form below and we&apos;ll respond within 48
                        hours.
                      </p>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="mb-2 block font-accent text-xs uppercase tracking-[0.15em] text-white/60"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="mt-1.5 font-body text-xs text-bbg-red">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block font-accent text-xs uppercase tracking-[0.15em] text-white/60"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          {...register("email")}
                        />
                        {errors.email && (
                          <p className="mt-1.5 font-body text-xs text-bbg-red">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Subject */}
                      <div>
                        <label
                          htmlFor="subject"
                          className="mb-2 block font-accent text-xs uppercase tracking-[0.15em] text-white/60"
                        >
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          placeholder="What is this regarding?"
                          {...register("subject")}
                        />
                        {errors.subject && (
                          <p className="mt-1.5 font-body text-xs text-bbg-red">
                            {errors.subject.message}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="mb-2 block font-accent text-xs uppercase tracking-[0.15em] text-white/60"
                        >
                          Message *
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Tell us what's on your mind..."
                          className="flex w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          {...register("message")}
                        />
                        {errors.message && (
                          <p className="mt-1.5 font-body text-xs text-bbg-red">
                            {errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="h-4 w-4 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PLAYER INFO SHEET DOWNLOAD ===== */}
      <section className="relative bg-[#0D1B30] py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col items-center gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl uppercase text-white">
                Player Info Sheet
              </h3>
              <p className="mt-1 font-body text-sm text-white/50">
                Download the BBG Player Information Sheet for camps, showcases,
                and tryout registration.
              </p>
            </div>
            <Button variant="outline-gold" size="lg" className="shrink-0">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download PDF
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
