import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Paper & Silk Parchment Tones (Pearl White & Blush Ivory)
        paper: {
          50: "#FDFAF7",  // Pearl White (Main Page Background)
          100: "#FAF1EE", // Blush Ivory (Card & Surface Backgrounds)
          200: "#F5E8E4", // Champagne Blush Silk
          300: "#ECD9D3", // Aged Rosewater Parchment
          400: "#E0C6BE",
        },
        // Royal Jewel Plum / Deep Regal Plum (Primary Dark / Base #4A0E4E)
        burgundy: {
          950: "#1F1024", // Deep Plum-Black (Main Dark Text)
          900: "#4A0E4E", // Deep Regal Plum (Primary Dark / Base)
          800: "#5D1063", // Royal Aubergine
          700: "#74157B", // Regal Violet Plum
          600: "#8E1A96", // Velvet Magenta Plum
          100: "#FAF1EE", // Blush Ivory
          50: "#FDFAF7",  // Pearl White
        },
        // Dedicated Royal Jewel Palette
        jewel: {
          plum: {
            950: "#1F1024",
            900: "#4A0E4E",
            800: "#5D1063",
            700: "#74157B",
            600: "#8E1A96",
            100: "#FAF1EE",
            50: "#FDFAF7",
          },
          ruby: {
            950: "#4A0E4E",
            900: "#6E0B32",
            800: "#900E42",
            700: "#960E44",
            600: "#B31252", // Rich Ruby Magenta (Primary CTA / Accent)
            500: "#C81D62",
            100: "#FDE8EE",
            50: "#FDFAF7",
          },
          emerald: {
            950: "#04231C",
            900: "#07382D",
            800: "#0A493B",
            700: "#0C5A48", // Emerald Green (Secondary Accent / Badges)
            600: "#0E6C56",
            500: "#118369",
            100: "#E3F5EE",
            50: "#F1FAF6",
          },
          gold: {
            900: "#6E552C",
            800: "#8E6F39",
            700: "#A88242",
            600: "#B8904C",
            500: "#C59E59", // Antique Warm Gold (Metallic Accents / Borders / Highlights)
            400: "#C59E59",
            300: "#DFC18A",
            200: "#F0DFBE",
            100: "#FBF6ED",
            50: "#FDFAF7",
          },
        },
        // Standalone Emerald Green (Secondary Accent / Badges #0C5A48)
        emerald: {
          50: "#F1FAF6",
          100: "#E3F5EE",
          200: "#C7EADB",
          500: "#118369",
          600: "#0E6C56",
          700: "#0C5A48", // Emerald Green
          800: "#0A493B",
          900: "#07382D",
          950: "#04231C",
        },
        // Standalone Rich Ruby Magenta (Primary CTA / Accent #B31252)
        ruby: {
          50: "#FDFAF7",
          100: "#FDE8EE",
          200: "#FBCDD9",
          500: "#C81D62",
          600: "#B31252", // Rich Ruby Magenta
          700: "#960E44",
          800: "#900E42",
          900: "#6E0B32",
          950: "#4A0E4E",
        },
        // Standalone Blush Ivory & Soft Roses
        blush: {
          50: "#FDFAF7",  // Pearl White
          100: "#FAF1EE", // Blush Ivory
          200: "#F5E8E4",
          300: "#ECD9D3",
          400: "#E0C6BE",
          500: "#B31252",
        },
        // Antique Warm Gold (#C59E59)
        gold: {
          100: "#FBF6ED",
          200: "#F0DFBE",
          300: "#DFC18A",
          400: "#C59E59", // Antique Warm Gold
          500: "#C59E59",
          600: "#A88242",
          700: "#8E6F39",
        },
        // Main Dark Text: Deep Plum-Black (#1F1024)
        ink: {
          title: "#1F1024",
          primary: "#1F1024",
          secondary: "#4A0E4E",
          muted: "#6B3B6F",
          faint: "#9B789E",
        },
        // Semantic Royal Jewel Named Tokens
        'regal-plum': "#4A0E4E",
        'ruby-magenta': "#B31252",
        'emerald-green': "#0C5A48",
        'antique-gold': "#C59E59",
        'blush-ivory': "#FAF1EE",
        'pearl-white': "#FDFAF7",
        'plum-black': "#1F1024",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "'Tiro Devanagari Hindi'", "Georgia", "serif"],
        display: ["var(--font-cinzel)", "'Tiro Devanagari Hindi'", "Cinzel", "serif"],
        script: ["var(--font-alex-brush)", "cursive"],
        sans: ["var(--font-sans)", "'Tiro Devanagari Hindi'", "system-ui", "sans-serif"],
        hindi: ["var(--font-tiro-hindi)", "'Tiro Devanagari Hindi'", "serif"],
        tiro: ["var(--font-tiro-hindi)", "'Tiro Devanagari Hindi'", "serif"],
      },
      boxShadow: {
        'stationery': "0 4px 20px -2px rgba(31, 16, 36, 0.07), 0 2px 6px -1px rgba(31, 16, 36, 0.04)",
        'stationery-deep': "0 12px 36px -4px rgba(31, 16, 36, 0.14), 0 4px 12px -2px rgba(31, 16, 36, 0.07)",
        'wax-seal': "0 6px 18px rgba(74, 14, 78, 0.40), inset 0 2px 4px rgba(255, 255, 255, 0.35), inset 0 -3px 6px rgba(0, 0, 0, 0.45)",
        'gold-glow': "0 0 25px rgba(197, 158, 89, 0.28)",
        'ruby-glow': "0 0 25px rgba(179, 18, 82, 0.25)",
        'emerald-glow': "0 0 25px rgba(12, 90, 72, 0.25)",
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'spin-very-slow': 'spin 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.94', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;