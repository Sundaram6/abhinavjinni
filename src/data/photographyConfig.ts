/**
 * PHOTOGRAPHY ARCHITECTURE & CONFIGURATION
 * Mansi weds Abhinav — "A Story in Bloom: A Divine Beginning"
 * 
 * Centralized registry for all photographs across the website (maximum 6–8 slots).
 * Photos can be swapped or updated here without editing individual components.
 * When real photographs are added, set `imageSrc` to the path and `isPlaceholder: false`.
 */

export type PhotoSlotId =
  | 'mansi-solo'
  | 'abhinav-solo'
  | 'engagement-proposal'
  | 'mansi-family'
  | 'abhinav-family'
  | 'main-couple'
  | 'candid-couple'
  | 'sacred-ritual';

export interface PhotoSlot {
  id: PhotoSlotId;
  slotNumber: number;
  title: string;
  subject: string;
  role: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  aspectClass: string;
  imageSrc: string | null;
  isPlaceholder: boolean;
  alt: string;
  caption: string;
  storySnippet?: string;
  placeholder: {
    motif: 'bride' | 'groom' | 'rings' | 'bride-family' | 'groom-family' | 'couple' | 'candid' | 'ritual';
    heading: string;
    subheading: string;
    devaText: string;
    symbol: string;
  };
}

export const PHOTOGRAPHY_CONFIG: Record<PhotoSlotId, PhotoSlot> = {
  'mansi-solo': {
    id: 'mansi-solo',
    slotNumber: 1,
    title: "Mansi's Bridal Portrait",
    subject: "Mansi Sharma",
    role: "The Bride — Grace, Radiance & Poise",
    aspectRatio: 'portrait',
    aspectClass: 'aspect-[3/4]',
    imageSrc: null, // Ready for real portrait: e.g. '/assets/photos/mansi_solo.jpg'
    isPlaceholder: true,
    alt: "Mansi Sharma — The Bride",
    caption: "A portrait of grace, serenity, and timeless bridal elegance.",
    storySnippet: "Daughter of Sh. Mahabir Prasad Sharma & Smt. Babita Sharma",
    placeholder: {
      motif: 'bride',
      heading: "Mansi Sharma",
      subheading: "The Bride • Solo Portrait",
      devaText: "॥ सौभाग्यवती कन्या मानसी ॥",
      symbol: "🌸",
    },
  },

  'abhinav-solo': {
    id: 'abhinav-solo',
    slotNumber: 2,
    title: "Abhinav's Groom Portrait",
    subject: "Abhinav Pal",
    role: "The Groom — Regal Devotion & Joy",
    aspectRatio: 'portrait',
    aspectClass: 'aspect-[3/4]',
    imageSrc: null, // Ready for real portrait: e.g. '/assets/photos/abhinav_solo.jpg'
    isPlaceholder: true,
    alt: "Abhinav Pal — The Groom",
    caption: "A portrait of devotion, warmth, and noble joy.",
    storySnippet: "Son of Sh. Inder Pal & Smt. Nirmala",
    placeholder: {
      motif: 'groom',
      heading: "Abhinav Pal",
      subheading: "The Groom • Solo Portrait",
      devaText: "॥ चिरंजीव वर अभिनव ॥",
      symbol: "⚜️",
    },
  },

  'engagement-proposal': {
    id: 'engagement-proposal',
    slotNumber: 3,
    title: "The Promise Rings",
    subject: "The Engagement & Ring Ceremony",
    role: "The Promise Night — 20 October 2026",
    aspectRatio: 'landscape',
    aspectClass: 'aspect-[4/3]',
    // 100% Authentic photograph from the couple's genuine engagement
    imageSrc: '/assets/couple_rings.jpg',
    isPlaceholder: false,
    alt: "Abhinav & Mansi Engagement Rings on The Promise Night",
    caption: "Hands united with intricate bridal henna, kundan bangles, and sparkling vows of forever.",
    storySnippet: "Exchanged under golden chandeliers at The Royal Palace Banquet, Noida.",
    placeholder: {
      motif: 'rings',
      heading: "The Promise Rings",
      subheading: "The Engagement Ceremony",
      devaText: "॥ मुद्रिका परिणय संस्कार ॥",
      symbol: "💍",
    },
  },

  'mansi-family': {
    id: 'mansi-family',
    slotNumber: 4,
    title: "The Sharma Family",
    subject: "Bride's Family",
    role: "Sh. Mahabir Prasad Sharma & Smt. Babita Sharma Family",
    aspectRatio: 'landscape',
    aspectClass: 'aspect-[16/10]',
    imageSrc: null, // Ready for real portrait: e.g. '/assets/photos/sharma_family.jpg'
    isPlaceholder: true,
    alt: "The Sharma Family — With Heartfelt Joy & Warm Welcome",
    caption: "Bound in love, tradition, and profound blessings for the couple.",
    storySnippet: "Welcoming honored guests with open arms and festive celebration.",
    placeholder: {
      motif: 'bride-family',
      heading: "The Sharma Family",
      subheading: "Sh. Mahabir Prasad Sharma & Smt. Babita Sharma",
      devaText: "॥ वधू पक्ष स्नेह एवं स्वागत ॥",
      symbol: "🏛️",
    },
  },

  'abhinav-family': {
    id: 'abhinav-family',
    slotNumber: 5,
    title: "The Pal Family",
    subject: "Groom's Family",
    role: "Sh. Inder Pal & Smt. Nirmala Family",
    aspectRatio: 'landscape',
    aspectClass: 'aspect-[16/10]',
    imageSrc: null, // Ready for real portrait: e.g. '/assets/photos/pal_family.jpg'
    isPlaceholder: true,
    alt: "The Pal Family — With Love, Blessings & Gratitude",
    caption: "Leading the royal celebrations and sacred Barat procession to Bodhgaya.",
    storySnippet: "Together with Surender, Yogender, Himanshu, Rishabh, Nityaya & Avyagra Pal.",
    placeholder: {
      motif: 'groom-family',
      heading: "The Pal Family",
      subheading: "Sh. Inder Pal & Smt. Nirmala",
      devaText: "॥ वर पक्ष सप्रेम निमन्त्रण ॥",
      symbol: "🌿",
    },
  },

  'main-couple': {
    id: 'main-couple',
    slotNumber: 6,
    title: "Abhinav & Mansi",
    subject: "The Couple",
    role: "A Story in Bloom — Together, Forever",
    aspectRatio: 'portrait',
    aspectClass: 'aspect-[3/4]',
    imageSrc: null, // Ready for real portrait: e.g. '/assets/photos/couple_main.jpg'
    isPlaceholder: true,
    alt: "Abhinav & Mansi — Together, Forever",
    caption: "Two souls, two stories, blooming together in eternal love and devotion.",
    storySnippet: "Bodhgaya & Noida • 2026",
    placeholder: {
      motif: 'couple',
      heading: "Abhinav & Mansi",
      subheading: "A Story in Bloom • 2026",
      devaText: "॥ अनन्त प्रेम पाणिग्रहणम् ॥",
      symbol: "🌹",
    },
  },

  'candid-couple': {
    id: 'candid-couple',
    slotNumber: 7,
    title: "Cherished Moments",
    subject: "Candid Couple Moment",
    role: "Laughter, Warmth & Friendship",
    aspectRatio: 'landscape',
    aspectClass: 'aspect-[4/3]',
    imageSrc: null, // Ready for real photo: e.g. '/assets/photos/couple_candid.jpg'
    isPlaceholder: true,
    alt: "Abhinav & Mansi Candid Smile",
    caption: "In the quiet laughter and stolen glances, the beauty of our story unfolds.",
    storySnippet: "Capturing the joy of shared dreams.",
    placeholder: {
      motif: 'candid',
      heading: "Joyful Moments",
      subheading: "Candid Expressions of Love",
      devaText: "॥ स्मृतयः सानन्दाः ॥",
      symbol: "✨",
    },
  },

  'sacred-ritual': {
    id: 'sacred-ritual',
    slotNumber: 8,
    title: "The Seven Sacred Vows",
    subject: "Sacred Ceremony & Blessings",
    role: "Sapta Padi & Holy Fire",
    aspectRatio: 'landscape',
    aspectClass: 'aspect-[4/3]',
    // Uses the authentic Shiva-Parvati Vivah sacred artwork blessing
    imageSrc: '/assets/shiva_parvati.png',
    isPlaceholder: false,
    alt: "Divine Blessing of Lord Shiva & Goddess Parvati",
    caption: "As primordial celestial hands unite, two families join in eternal harmony under the Bodhi sky.",
    storySnippet: "Buddha Heritage Resort, Bodhgaya • 3 December 2026",
    placeholder: {
      motif: 'ritual',
      heading: "Sacred Vows",
      subheading: "Sapta Padi & Pheras",
      devaText: "॥ सप्तपदी मङ्गलम् ॥",
      symbol: "🔥",
    },
  },
};

/**
 * Helper to fetch a single photo slot by key
 */
export function getPhotoSlot(id: PhotoSlotId): PhotoSlot {
  return PHOTOGRAPHY_CONFIG[id];
}

/**
 * Helper to fetch all slots in numerical order
 */
export function getAllPhotoSlots(): PhotoSlot[] {
  return Object.values(PHOTOGRAPHY_CONFIG).sort((a, b) => a.slotNumber - b.slotNumber);
}
