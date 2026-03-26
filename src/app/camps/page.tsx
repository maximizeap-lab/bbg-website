"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { POSITIONS, HEARD_ABOUT_OPTIONS } from "@/lib/constants";
import {
  playerIntakeStep1,
  playerIntakeStep2,
  playerIntakeStep3,
  playerIntakeStep4,
  type PlayerIntakeStep1,
  type PlayerIntakeStep2,
  type PlayerIntakeStep3,
  type PlayerIntakeStep4,
} from "@/lib/validations";

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const STEPS = [
  { number: 1, label: "Player Info" },
  { number: 2, label: "Contact & School" },
  { number: 3, label: "Background" },
  { number: 4, label: "Event & Payment" },
  { number: 5, label: "Confirmation" },
] as const;

const EVENTS = [
  {
    id: "bbg-summer-camp-2026",
    name: "BBG Summer Camp 2026",
    date: "June 15 - 19, 2026",
    price: 15000,
  },
  {
    id: "bbg-fall-showcase-2026",
    name: "BBG Fall Showcase 2026",
    date: "September 20, 2026",
    price: 7500,
  },
  {
    id: "bbg-winter-clinic-2026",
    name: "BBG Winter Hitting Clinic 2026",
    date: "December 5 - 6, 2026",
    price: 5000,
  },
  {
    id: "bbg-all-star-game-2026",
    name: "BBG 8th All-Star Game 2026",
    date: "November 8, 2026",
    price: 0,
  },
];

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

/* -------------------------------------------------------------------------- */
/*  Shared form field styles                                                  */
/* -------------------------------------------------------------------------- */

const selectClass =
  "flex h-11 w-full rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy disabled:cursor-not-allowed disabled:opacity-50";

const labelClass = "block mb-1.5 text-sm font-medium text-white/70 font-body";

const errorClass = "mt-1 text-xs text-gold font-body";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function CampsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<
    Partial<PlayerIntakeStep1 & PlayerIntakeStep2 & PlayerIntakeStep3 & PlayerIntakeStep4>
  >({});

  /* ---------------------------------------------------------------------- */
  /*  Step 1 — Player Info                                                   */
  /* ---------------------------------------------------------------------- */

  const step1Form = useForm<PlayerIntakeStep1>({
    resolver: zodResolver(playerIntakeStep1),
    defaultValues: {
      first_name: "",
      last_name: "",
      date_of_birth: "",
      position_primary: "",
      position_secondary: "",
      graduation_year: 2027,
      bats: "R",
      throws: "R",
      height: "",
      weight: "",
      gpa: "",
    },
  });

  /* ---------------------------------------------------------------------- */
  /*  Step 2 — Contact & School                                              */
  /* ---------------------------------------------------------------------- */

  const step2Form = useForm<PlayerIntakeStep2>({
    resolver: zodResolver(playerIntakeStep2),
    defaultValues: {
      email: "",
      phone: "",
      parent_name: "",
      parent_phone: "",
      parent_email: "",
      school: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  /* ---------------------------------------------------------------------- */
  /*  Step 3 — Baseball Background                                           */
  /* ---------------------------------------------------------------------- */

  const step3Form = useForm<PlayerIntakeStep3>({
    resolver: zodResolver(playerIntakeStep3),
    defaultValues: {
      travel_team: "",
      years_playing: undefined,
      attended_bbg_before: "no",
      heard_about: "",
      highlight_url: "",
      instagram_handle: "",
    },
  });

  /* ---------------------------------------------------------------------- */
  /*  Step 4 — Event Selection + Payment                                     */
  /* ---------------------------------------------------------------------- */

  const step4Form = useForm<PlayerIntakeStep4>({
    resolver: zodResolver(playerIntakeStep4),
    defaultValues: {
      event_id: "",
      scholarship_requested: false,
      scholarship_note: "",
    },
  });

  /* ---------------------------------------------------------------------- */
  /*  Handlers                                                               */
  /* ---------------------------------------------------------------------- */

  const handleStep1 = step1Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  });

  const handleStep2 = step2Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  });

  const handleStep3 = step3Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(4);
  });

  const handleStep4 = step4Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(5);
  });

  const goBack = () => setCurrentStep((s) => Math.max(1, s - 1));

  /* ---------------------------------------------------------------------- */
  /*  Helpers                                                                */
  /* ---------------------------------------------------------------------- */

  const selectedEvent = EVENTS.find((e) => e.id === step4Form.watch("event_id"));

  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <main className="min-h-screen bg-navy">
      {/* ================================================================== */}
      {/*  HERO                                                              */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden py-28 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #F5A623 0, #F5A623 1px, transparent 0, transparent 50%)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          <h1 className="font-display text-6xl tracking-tight text-white sm:text-7xl lg:text-8xl">
            CAMPS & REGISTRATION
          </h1>
          <p className="mx-auto mt-4 max-w-2xl font-body text-lg text-white/60">
            Train with MLB-level coaches. Get seen by college recruiters and
            professional scouts. Join the BBG family.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  INFO SECTION                                                      */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-3xl text-white">
              WHAT BBG CAMPS OFFER
            </h2>
            <ul className="space-y-3 font-body text-white/70">
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                Professional-level hitting, pitching, and fielding instruction
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                Exposure to college coaches and MLB scouts
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                Life skills, leadership development, and mentorship
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 flex-shrink-0 rounded-full bg-gold" />
                Equipment and gear provided for players in need
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 font-display text-3xl text-white">
              WHY IT MATTERS
            </h2>
            <p className="font-body leading-relaxed text-white/70">
              Most kids in South LA never get a chance to play competitive
              travel baseball. The cost of equipment, travel, and coaching
              prices them out before they ever step on a field. BBG camps are
              free or low-cost to ensure that talent — not income — determines
              who gets a shot. Every registration helps us keep the doors open
              for the next generation.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/*  REGISTRATION FORM                                                 */}
      {/* ================================================================== */}
      <section className="mx-auto max-w-3xl px-6 pb-32">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            {STEPS.map((step) => (
              <button
                key={step.number}
                type="button"
                onClick={() => {
                  if (step.number < currentStep) setCurrentStep(step.number);
                }}
                className={`flex flex-col items-center gap-1.5 transition-colors ${
                  step.number <= currentStep
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300 ${
                    step.number < currentStep
                      ? "border-gold bg-gold text-navy"
                      : step.number === currentStep
                        ? "border-gold bg-transparent text-gold"
                        : "border-white/20 bg-transparent text-white/30"
                  }`}
                >
                  {step.number < currentStep ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`hidden text-xs font-body sm:block ${
                    step.number <= currentStep
                      ? "text-white/70"
                      : "text-white/30"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            ))}
          </div>

          {/* Progress track */}
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-gold/80 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          {/* ============================================================ */}
          {/*  STEP 1 — Player Info                                        */}
          {/* ============================================================ */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1} className="space-y-6">
              <h3 className="font-display text-2xl text-white">
                PLAYER INFORMATION
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <Input {...step1Form.register("first_name")} placeholder="First name" />
                  {step1Form.formState.errors.first_name && (
                    <p className={errorClass}>{step1Form.formState.errors.first_name.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <Input {...step1Form.register("last_name")} placeholder="Last name" />
                  {step1Form.formState.errors.last_name && (
                    <p className={errorClass}>{step1Form.formState.errors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Date of Birth *</label>
                <Input type="date" {...step1Form.register("date_of_birth")} />
                {step1Form.formState.errors.date_of_birth && (
                  <p className={errorClass}>{step1Form.formState.errors.date_of_birth.message}</p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Primary Position *</label>
                  <select className={selectClass} {...step1Form.register("position_primary")}>
                    <option value="" className="bg-navy">Select position</option>
                    {POSITIONS.map((pos) => (
                      <option key={pos} value={pos} className="bg-navy">{pos}</option>
                    ))}
                  </select>
                  {step1Form.formState.errors.position_primary && (
                    <p className={errorClass}>{step1Form.formState.errors.position_primary.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Secondary Position</label>
                  <select className={selectClass} {...step1Form.register("position_secondary")}>
                    <option value="" className="bg-navy">Select position</option>
                    {POSITIONS.map((pos) => (
                      <option key={pos} value={pos} className="bg-navy">{pos}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Graduation Year *</label>
                <select className={selectClass} {...step1Form.register("graduation_year")}>
                  {[2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035].map((y) => (
                    <option key={y} value={y} className="bg-navy">Class of {y}</option>
                  ))}
                </select>
                {step1Form.formState.errors.graduation_year && (
                  <p className={errorClass}>{step1Form.formState.errors.graduation_year.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Bats *</label>
                  <select className={selectClass} {...step1Form.register("bats")}>
                    <option value="R" className="bg-navy">Right</option>
                    <option value="L" className="bg-navy">Left</option>
                    <option value="Switch" className="bg-navy">Switch</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Throws *</label>
                  <select className={selectClass} {...step1Form.register("throws")}>
                    <option value="R" className="bg-navy">Right</option>
                    <option value="L" className="bg-navy">Left</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>Height *</label>
                  <Input {...step1Form.register("height")} placeholder={`5'10"`} />
                  {step1Form.formState.errors.height && (
                    <p className={errorClass}>{step1Form.formState.errors.height.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Weight *</label>
                  <Input {...step1Form.register("weight")} placeholder="175 lbs" />
                  {step1Form.formState.errors.weight && (
                    <p className={errorClass}>{step1Form.formState.errors.weight.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>GPA</label>
                  <Input {...step1Form.register("gpa")} placeholder="3.5" />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg">
                  Next Step
                </Button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/*  STEP 2 — Contact & School                                   */}
          {/* ============================================================ */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2} className="space-y-6">
              <h3 className="font-display text-2xl text-white">
                CONTACT & SCHOOL
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Player Email *</label>
                  <Input type="email" {...step2Form.register("email")} placeholder="player@email.com" />
                  {step2Form.formState.errors.email && (
                    <p className={errorClass}>{step2Form.formState.errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Player Phone *</label>
                  <Input type="tel" {...step2Form.register("phone")} placeholder="(310) 555-0000" />
                  {step2Form.formState.errors.phone && (
                    <p className={errorClass}>{step2Form.formState.errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
                  Parent / Guardian
                </p>
                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <Input {...step2Form.register("parent_name")} placeholder="Parent / guardian name" />
                    {step2Form.formState.errors.parent_name && (
                      <p className={errorClass}>{step2Form.formState.errors.parent_name.message}</p>
                    )}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Phone *</label>
                      <Input type="tel" {...step2Form.register("parent_phone")} placeholder="(310) 555-0000" />
                      {step2Form.formState.errors.parent_phone && (
                        <p className={errorClass}>{step2Form.formState.errors.parent_phone.message}</p>
                      )}
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <Input type="email" {...step2Form.register("parent_email")} placeholder="parent@email.com" />
                      {step2Form.formState.errors.parent_email && (
                        <p className={errorClass}>{step2Form.formState.errors.parent_email.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>School *</label>
                <Input {...step2Form.register("school")} placeholder="School name" />
                {step2Form.formState.errors.school && (
                  <p className={errorClass}>{step2Form.formState.errors.school.message}</p>
                )}
              </div>

              <div className="grid grid-cols-4 gap-5">
                <div className="col-span-2">
                  <label className={labelClass}>City *</label>
                  <Input {...step2Form.register("city")} placeholder="City" />
                  {step2Form.formState.errors.city && (
                    <p className={errorClass}>{step2Form.formState.errors.city.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <select className={selectClass} {...step2Form.register("state")}>
                    <option value="" className="bg-navy">--</option>
                    {US_STATES.map((s) => (
                      <option key={s} value={s} className="bg-navy">{s}</option>
                    ))}
                  </select>
                  {step2Form.formState.errors.state && (
                    <p className={errorClass}>{step2Form.formState.errors.state.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>ZIP *</label>
                  <Input {...step2Form.register("zip")} placeholder="90001" />
                  {step2Form.formState.errors.zip && (
                    <p className={errorClass}>{step2Form.formState.errors.zip.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="ghost" onClick={goBack}>
                  Back
                </Button>
                <Button type="submit" size="lg">
                  Next Step
                </Button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/*  STEP 3 — Baseball Background                                */}
          {/* ============================================================ */}
          {currentStep === 3 && (
            <form onSubmit={handleStep3} className="space-y-6">
              <h3 className="font-display text-2xl text-white">
                BASEBALL BACKGROUND
              </h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Travel Team</label>
                  <Input {...step3Form.register("travel_team")} placeholder="Team name (if any)" />
                </div>
                <div>
                  <label className={labelClass}>Years Playing</label>
                  <Input
                    type="number"
                    {...step3Form.register("years_playing")}
                    placeholder="e.g. 6"
                    min={0}
                    max={20}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Have you attended a BBG event before? *</label>
                <div className="mt-2 flex gap-6">
                  {(["yes", "no"] as const).map((val) => (
                    <label
                      key={val}
                      className="flex cursor-pointer items-center gap-2 font-body text-white/70"
                    >
                      <input
                        type="radio"
                        value={val}
                        {...step3Form.register("attended_bbg_before")}
                        className="h-4 w-4 accent-gold"
                      />
                      <span className="capitalize">{val}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>How did you hear about BBG? *</label>
                <select className={selectClass} {...step3Form.register("heard_about")}>
                  <option value="" className="bg-navy">Select one</option>
                  {HEARD_ABOUT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt} className="bg-navy">{opt}</option>
                  ))}
                </select>
                {step3Form.formState.errors.heard_about && (
                  <p className={errorClass}>{step3Form.formState.errors.heard_about.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Highlight Video URL</label>
                <Input {...step3Form.register("highlight_url")} placeholder="https://youtube.com/..." />
                {step3Form.formState.errors.highlight_url && (
                  <p className={errorClass}>{step3Form.formState.errors.highlight_url.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Instagram Handle</label>
                <Input {...step3Form.register("instagram_handle")} placeholder="@handle" />
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="ghost" onClick={goBack}>
                  Back
                </Button>
                <Button type="submit" size="lg">
                  Next Step
                </Button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/*  STEP 4 — Event Selection + Payment                          */}
          {/* ============================================================ */}
          {currentStep === 4 && (
            <form onSubmit={handleStep4} className="space-y-6">
              <h3 className="font-display text-2xl text-white">
                EVENT SELECTION & PAYMENT
              </h3>

              <div>
                <label className={labelClass}>Select an Event *</label>
                <select className={selectClass} {...step4Form.register("event_id")}>
                  <option value="" className="bg-navy">Choose an event</option>
                  {EVENTS.map((ev) => (
                    <option key={ev.id} value={ev.id} className="bg-navy">
                      {ev.name} — {ev.date}
                    </option>
                  ))}
                </select>
                {step4Form.formState.errors.event_id && (
                  <p className={errorClass}>{step4Form.formState.errors.event_id.message}</p>
                )}
              </div>

              {/* Price display */}
              {selectedEvent && (
                <div className="rounded-lg border border-gold/30 bg-gold/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-body text-sm text-white/60">
                        {selectedEvent.name}
                      </p>
                      <p className="font-body text-xs text-white/40">
                        {selectedEvent.date}
                      </p>
                    </div>
                    <p className="font-accent text-3xl text-gold">
                      {selectedEvent.price === 0
                        ? "FREE"
                        : `$${(selectedEvent.price / 100).toFixed(0)}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Scholarship toggle */}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    {...step4Form.register("scholarship_requested")}
                    className="mt-1 h-4 w-4 accent-gold"
                  />
                  <div>
                    <p className="font-body text-sm font-medium text-white">
                      I would like to request financial assistance / scholarship
                    </p>
                    <p className="mt-1 font-body text-xs text-white/40">
                      BBG is committed to making sure cost is never a barrier.
                      All scholarship requests are reviewed confidentially.
                    </p>
                  </div>
                </label>

                {step4Form.watch("scholarship_requested") && (
                  <div className="mt-4">
                    <label className={labelClass}>
                      Tell us about your situation (optional)
                    </label>
                    <textarea
                      {...step4Form.register("scholarship_note")}
                      rows={3}
                      className="flex w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-navy"
                      placeholder="Any details you'd like to share..."
                    />
                  </div>
                )}
              </div>

              {/* Payment placeholder */}
              <div className="rounded-lg border border-dashed border-white/20 p-8 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                  <svg
                    className="h-6 w-6 text-white/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                </div>
                <p className="font-body text-sm text-white/40">
                  Secure payment processing will be available here.
                </p>
                <p className="mt-1 font-body text-xs text-white/25">
                  Powered by Stripe
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="ghost" onClick={goBack}>
                  Back
                </Button>
                <Button type="submit" size="lg">
                  Complete Registration
                </Button>
              </div>
            </form>
          )}

          {/* ============================================================ */}
          {/*  STEP 5 — Confirmation                                       */}
          {/* ============================================================ */}
          {currentStep === 5 && (
            <div className="py-8 text-center">
              {/* Success animation */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
                <div className="flex h-14 w-14 animate-[scale-in_0.4s_ease-out] items-center justify-center rounded-full bg-gold">
                  <svg
                    className="h-7 w-7 text-navy"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-display text-4xl text-white">
                YOU&apos;RE REGISTERED!
              </h3>
              <p className="mx-auto mt-3 max-w-md font-body text-white/60">
                We&apos;ve received your registration. Check your email for a
                confirmation and next steps.
              </p>

              {/* Summary */}
              <div className="mx-auto mt-10 max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-6 text-left">
                <h4 className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gold">
                  Registration Summary
                </h4>
                <dl className="space-y-3">
                  {[
                    {
                      label: "Player",
                      value: `${formData.first_name} ${formData.last_name}`,
                    },
                    { label: "Position", value: formData.position_primary },
                    {
                      label: "Class",
                      value: formData.graduation_year
                        ? `Class of ${formData.graduation_year}`
                        : "—",
                    },
                    { label: "School", value: formData.school },
                    {
                      label: "Event",
                      value:
                        EVENTS.find((e) => e.id === formData.event_id)?.name ??
                        "—",
                    },
                    {
                      label: "Scholarship",
                      value: formData.scholarship_requested
                        ? "Requested"
                        : "Not requested",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0"
                    >
                      <dt className="font-body text-xs uppercase tracking-wider text-white/40">
                        {row.label}
                      </dt>
                      <dd className="font-body text-sm text-white">
                        {row.value || "—"}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link href="/players">
                  <Button variant="outline-gold">View the Roster</Button>
                </Link>
                <Link href="/events">
                  <Button variant="ghost">Browse Events</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
