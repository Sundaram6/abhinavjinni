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
        // Luxury Paper & Silk Parchment Tones
        paper: {
          50: "#FDFBF7", // Pure Pearl Silk
          100: "#FAF6F0", // Warm Handmade Alabaster Paper
          200: "#F5EDE2", // Champagne Silk
          300: "#EADECF", // Aged Parchment
          400: "#DFD0BF",
        },
        // Royal Jewel Plum / Imperial Aubergine (Primary Royal Jewel tone from 2026 Reference)
        burgundy: {
          950: "#24041B", // Velvet Midnight Plum
          900: "#3D072B", // Imperial Jewel Plum (Bridal Lehenga Base)
          800: "#540C3D", // Royal Aubergine
          700: "#75114F", // Velvet Ruby-Plum
          600: "#961660", // Royal Magenta Jewel
          100: "#F9EAF2", // Delicate Rosewater Cream
          50: "#FDF6FA",  // Whispering Jewel Ivory
        },
        // Dedicated Royal Jewel Palette
        jewel: {
          plum: {
            950: "#24041B",
            900: "#3D072B",
            800: "#540C3D",
            700: "#75114F",
            600: "#961660",
            100: "#F9EAF2",
            50: "#FDF6FA",
          },
          ruby: {
            950: "#4D0520",
            900: "#700832",
            800: "#8F0D43",
            700: "#AD1351", // Regal Ruby / Rani Pink swatch from reference
            600: "#C2185B",
            500: "#D81B60",
            100: "#FDE8EE",
            50: "#FEF4F6",
          },
          emerald: {
            950: "#01241A",
            900: "#013325",
            800: "#024B38",
            700: "#00664E", // Imperial Emerald swatch from reference
            600: "#057D60",
            500: "#0C9372",
            100: "#E3F5EE",
            50: "#F1FAF6",
          },
          gold: {
            900: "#6B4B17",
            800: "#8C6321",
            700: "#AB7B2C",
            600: "#C89B53", // Antique Royal Gold swatch from reference
            500: "#D4AF37", // Radiant Zari Gold
            400: "#E2BF6A",
            300: "#EED596",
            100: "#FBF5E6",
            50: "#FDFBF5",
          },
        },
        // Standalone Emerald Jewel Tone
        emerald: {
          50: "#F1FAF6",
          100: "#E3F5EE",
          200: "#C4EAD9",
          500: "#0C9372",
          600: "#057D60",
          700: "#00664E",
          800: "#024B38",
          900: "#013325",
          950: "#01241A",
        },
        // Standalone Regal Ruby Tone
        ruby: {
          50: "#FEF4F6",
          100: "#FDE8EE",
          200: "#FBCDD9",
          500: "#D81B60",
          600: "#C2185B",
          700: "#AD1351",
          800: "#8F0D43",
          900: "#700832",
          950: "#4D0520",
        },
        blush: {
          50: "#FDF6F8",
          100: "#F9EAF2",
          200: "#F2D3E3",
          300: "#E5ADC8",
          400: "#D482A8",
          500: "#BE5E8A",
        },
        gold: {
          100: "#FAF3E6",
          200: "#F3E4C6",
          300: "#E3CCA1",
          400: "#D4AF37",
          500: "#C89B53",
          600: "#AB7B2C",
          700: "#8C6321",
        },
        ink: {
          title: "#24041B",
          primary: "#361026",
          secondary: "#5C2F47",
          muted: "#855A70",
          faint: "#B593A4",
        }
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
        'stationery': "0 4px 20px -2px rgba(61, 7, 43, 0.07), 0 2px 6px -1px rgba(61, 7, 43, 0.04)",
        'stationery-deep': "0 12px 36px -4px rgba(61, 7, 43, 0.14), 0 4px 12px -2px rgba(61, 7, 43, 0.07)",
        'wax-seal': "0 6px 18px rgba(61, 7, 43, 0.40), inset 0 2px 4px rgba(255, 255, 255, 0.35), inset 0 -3px 6px rgba(0, 0, 0, 0.45)",
        'gold-glow': "0 0 25px rgba(212, 175, 55, 0.28)",
        'ruby-glow': "0 0 25px rgba(173, 19, 81, 0.25)",
        'emerald-glow': "0 0 25px rgba(0, 102, 78, 0.25)",
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
