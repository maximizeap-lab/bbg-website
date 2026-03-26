import { z } from "zod";

export const playerIntakeStep1 = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  position_primary: z.string().min(1, "Primary position is required"),
  position_secondary: z.string().optional(),
  graduation_year: z.coerce
    .number()
    .min(2024, "Invalid graduation year")
    .max(2035, "Invalid graduation year"),
  bats: z.enum(["L", "R", "Switch"]),
  throws: z.enum(["L", "R"]),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
  gpa: z.string().optional(),
});

export const playerIntakeStep2 = z.object({
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  parent_name: z.string().min(1, "Parent/guardian name is required"),
  parent_phone: z.string().min(10, "Parent/guardian phone is required"),
  parent_email: z.string().email("Valid parent email required"),
  school: z.string().min(1, "School is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z.string().min(5, "Valid ZIP code required"),
});

export const playerIntakeStep3 = z.object({
  travel_team: z.string().optional(),
  years_playing: z.coerce.number().min(0).max(20).optional(),
  attended_bbg_before: z.enum(["yes", "no"]),
  heard_about: z.string().min(1, "Please tell us how you heard about BBG"),
  highlight_url: z.string().url().optional().or(z.literal("")),
  instagram_handle: z.string().optional(),
});

export const playerIntakeStep4 = z.object({
  event_id: z.string().min(1, "Please select an event"),
  scholarship_requested: z.boolean().default(false),
  scholarship_note: z.string().optional(),
});

export const donationSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  amount_cents: z.number().min(100, "Minimum donation is $1"),
  is_recurring: z.boolean().default(false),
  in_honor_of: z.string().optional(),
  is_anonymous: z.boolean().default(false),
  covered_fees: z.boolean().default(false),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Valid email required"),
});

export type PlayerIntakeStep1 = z.infer<typeof playerIntakeStep1>;
export type PlayerIntakeStep2 = z.infer<typeof playerIntakeStep2>;
export type PlayerIntakeStep3 = z.infer<typeof playerIntakeStep3>;
export type PlayerIntakeStep4 = z.infer<typeof playerIntakeStep4>;
export type DonationFormData = z.infer<typeof donationSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
