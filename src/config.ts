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
} as const;
