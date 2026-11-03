import fs from 'fs';
import path from 'path';

export interface RSVPRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  guestsCount: number;
  eventsAttending: string[];
  dietaryNotes?: string;
  personalNote?: string;
  createdAt: string;
}

export interface WishRecord {
  id: string;
  name: string;
  relationship: string;
  blessingTag?: string;
  message: string;
  likes: number;
  status: 'approved' | 'pending';
  createdAt: string;
}

interface DatabaseSchema {
  rsvps: RSVPRecord[];
  wishes: WishRecord[];
}

const DATA_FILE = path.join(process.cwd(), 'data', 'wedding_data.json');

const INITIAL_WISHES: WishRecord[] = [
  {
    id: "wish-1",
    name: "Sh. Inder Pal & Smt. Nirmala",
    relationship: "Groom's Parents",
    blessingTag: "Sada Saubhagya Vati Bhava",
    message: "Dearest Abhinav and Mansi, our heartfelt blessings are always with you both. May Lord Ganesha shower your new journey with endless joy, peace, and eternal togetherness.",
    likes: 18,
    status: "approved",
    createdAt: "2026-10-21T10:15:00+05:30",
  },
  {
    id: "wish-2",
    name: "The Sharma Family",
    relationship: "Bride's Family",
    blessingTag: "Eternal Harmony",
    message: "Mansi our beloved daughter, and Abhinav our wonderful son-in-law, watching you two step into this sacred chapter fills our hearts with pride and pure bliss.",
    likes: 16,
    status: "approved",
    createdAt: "2026-10-22T14:30:00+05:30",
  },
];

function ensureDbFile(): DatabaseSchema {
  try {
    if (!fs.existsSync(path.dirname(DATA_FILE))) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
      const initialData: DatabaseSchema = {
        rsvps: [],
        wishes: INITIAL_WISHES,
      };
      fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.wishes || parsed.wishes.length === 0) {
      parsed.wishes = INITIAL_WISHES;
      fs.writeFileSync(DATA_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
    }
    return parsed;
  } catch (err) {
    console.error("Error reading db file, falling back to initial data:", err);
    return {
      rsvps: [],
      wishes: INITIAL_WISHES,
    };
  }
}

function writeDbFile(data: DatabaseSchema): void {
  try {
    if (!fs.existsSync(path.dirname(DATA_FILE))) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error("Error writing db file:", err);
  }
}

export async function getRSVPs(): Promise<RSVPRecord[]> {
  const db = ensureDbFile();
  return db.rsvps;
}

export async function saveRSVP(record: Omit<RSVPRecord, 'id' | 'createdAt'>): Promise<RSVPRecord> {
  const db = ensureDbFile();
  const newRecord: RSVPRecord = {
    ...record,
    id: `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
  };
  db.rsvps.unshift(newRecord);
  writeDbFile(db);
  return newRecord;
}

export async function getWishes(): Promise<WishRecord[]> {
  const db = ensureDbFile();
  return db.wishes.filter(w => w.status === 'approved');
}

export async function addWish(record: Omit<WishRecord, 'id' | 'likes' | 'status' | 'createdAt'>): Promise<WishRecord> {
  const db = ensureDbFile();
  const newWish: WishRecord = {
    ...record,
    id: `wish_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    likes: 0,
    status: 'approved', // auto-approve for seamless guest experience
    createdAt: new Date().toISOString(),
  };
  db.wishes.unshift(newWish);
  writeDbFile(db);
  return newWish;
}

export async function likeWish(id: string): Promise<WishRecord | null> {
  const db = ensureDbFile();
  const index = db.wishes.findIndex(w => w.id === id);
  if (index === -1) return null;
  db.wishes[index].likes = (db.wishes[index].likes || 0) + 1;
  writeDbFile(db);
  return db.wishes[index];
}
