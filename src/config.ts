// Central place to edit brand + contact details.
export const SITE = {
  url: "https://armenandonian.com",
  // Brand / business name (shown in the logo, nav, footer and SEO).
  brand: "Armen Andonian",
  person: "Armen Andonian",
  role: "AI Automation & Search Visibility Consultant",
  tagline: "Helping businesses grow, scale & automate",
  email: "hello@armenandonian.com",
  // Internal anchor: every "Book" button scrolls to the on-page booking widget.
  bookingUrl: "#book",
  location: "Remote · Worldwide",

  // --- Booking (Cal.com inline embed) ---
  // Your Cal.com booking link in the form "username/event-slug".
  // Find it on the event type's "Copy link" button. Connect Google Calendar +
  // Stripe inside your Cal.com account; no keys live in this site.
  calLink: "armen-andonian-ms9g8r/30min",

  // --- Scorecard lead notifications (Web3Forms) ---
  // When someone completes the AI Opportunity Scorecard and enters their email,
  // their answers + result are emailed to you via Web3Forms. This access key is
  // tied to your email and is safe to expose in front-end code.
  // Get a key free at https://web3forms.com (no login, just enter your email).
  // Leave empty ("") to disable sending (the form still works visually).
  web3formsKey: "d12587ab-b5db-463b-8703-939b1aa00987",

  // --- Google Analytics (GA4) ---
  // Your GA4 Measurement ID in the form "G-XXXXXXXXXX". Find it in GA4 under
  // Admin → Data Streams → (your web stream) → Measurement ID.
  // Loaded only on the live site (not during local `npm run dev`), so your own
  // dev traffic isn't counted. Leave empty ("") to disable analytics entirely.
  gaId: "G-YEKKRRCGMK",
} as const;
