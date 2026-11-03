/**
 * CINEMATIC DESIGN SYSTEM TOKENS & FOUNDATION
 * Mansi weds Abhinav — "A Story in Bloom: A Divine Beginning"
 * 
 * Source of truth for palette, typography, spacing, and ornamentation.
 */

export const DESIGN_TOKENS = {
  theme: {
    title: "A Story in Bloom",
    subtitle: "A Divine Beginning",
    couple: "Abhinav & Mansi",
    monogram: "A & M",
    year: "2026",
    dates: "20 October 2026 (Noida) • 2–3 December 2026 (Bodhgaya)",
  },

  colors: {
    // Backgrounds: Warm ivory, champagne & pearl surfaces
    background: {
      ivory: "#FAF6F0",       // Primary warm heirloom background
      champagne: "#F5EBE1",   // Elevated card & secondary section background
      pearl: "#FDFBF7",       // Bright accents & highlight surfaces
      card: "#FAF1EE",        // Blush-undertone stationery card
      darkBase: "#4A0E4E",    // Deep regal plum (cinematic overlays & headers)
    },

    // Detailing: Antique gold metallurgy
    gold: {
      antique: "#C59E59",     // Primary metallic accent, badges, monograms
      light: "#DFC18A",       // Gilded highlights & subtle borders
      dark: "#8E6F39",        // Contrast text on gold, engraved borders
      subtle: "rgba(197, 158, 89, 0.35)", // Hairline borders & filigree
      faint: "rgba(197, 158, 89, 0.15)",  // Inner container frames
    },

    // Accents: Muted burgundy and dusty blush
    accent: {
      burgundyMuted: "#6B1D2F", // Regal, muted heritage burgundy
      burgundyDeep: "#4A0E4E",  // Primary dark / base plum
      ruby: "#B31252",          // Active CTA & vital highlights
      dustyBlush: "#DCAEAF",    // Soft floral tint & romantic accents
      softRose: "#F4E2E3",      // Gentle badge & pill background
      emerald: "#0C5A48",       // Bodhgaya serenity & auspicious leaves
    },

    // Typography Ink
    ink: {
      title: "#1F1024",       // Deep plum-black for high-contrast titles
      primary: "#2A182F",     // Primary body text
      secondary: "#5C4957",   // Editorial subtitles & timestamps
      muted: "#8C7387",       // Captions & helper text
      light: "#FDFAF7",       // Light text over dark / jewel backgrounds
      gold: "#C59E59",        // Golden accents in text
    },
  },

  typography: {
    fonts: {
      englishDisplay: {
        family: "Cormorant Garamond",
        className: "font-serif",
        cssVar: "var(--font-cormorant)",
        weights: [400, 500, 600, 700],
        roles: "Hero couple names, section headings, event titles, monogram seals, romantic italics",
      },
      englishSupporting: {
        family: "DM Sans",
        className: "font-sans",
        cssVar: "var(--font-dm-sans)",
        weights: [400, 500, 600, 700],
        roles: "Paragraphs, navigation links, buttons, event flow, dates, venue details, functional UI",
      },
      hindiDisplay: {
        family: "Tiro Devanagari Hindi",
        className: "font-hindi",
        cssVar: "var(--font-tiro-hindi)",
        weights: [400, 500],
        roles: "Invocations (॥ श्री गणेशाय नमः ॥), traditional shlokas, Hindi ceremony titles",
      },
      hindiSupporting: {
        family: "Mukta",
        className: "font-hindi-sans",
        cssVar: "var(--font-mukta)",
        weights: [400, 500, 600, 700],
        roles: "Hindi descriptions, venue instructions, guestbook Devanagari blessings",
      },
    },

    // Rules for Devanagari typography
    devanagariRules: {
      tracking: "tracking-normal", // Strictly avoid tracking-wider to prevent breaking conjuncts & shirorekha
      leading: "leading-relaxed",   // Generous vertical space for matras
    },
  },

  animation: {
    durations: {
      fast: "200ms",
      medium: "400ms",
      cinematic: "700ms",
      slow: "1200ms",
    },
    easings: {
      smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      gentle: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    },
  },
} as const;
