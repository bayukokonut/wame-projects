// Seed katalog fitur wame.
// Jalankan dengan: npm run prisma:seed
// (atau otomatis setelah `prisma migrate dev` karena terdaftar di package.json)

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const features = [
  // --- AI ---
  {
    key: "ai-chat",
    name: "Chat AI (Gemini)",
    category: "ai",
    isPremium: false,
  },
  {
    key: "ai-image-gen",
    name: "Generate gambar dari teks",
    category: "ai",
    isPremium: true,
  },

  // --- Automation ---
  {
    key: "auto-read",
    name: "Baca pesan otomatis",
    category: "automation",
    isPremium: false,
  },
  {
    key: "auto-typing",
    name: "Status mengetik otomatis",
    category: "automation",
    isPremium: false,
  },
  {
    key: "scheduled-broadcast",
    name: "Broadcast terjadwal",
    category: "automation",
    isPremium: true,
  },
  {
    key: "welcome-goodbye",
    name: "Welcome & goodbye anggota grup",
    category: "automation",
    isPremium: false,
  },

  // --- Productivity ---
  {
    key: "afk-mode",
    name: "Mode AFK dengan auto-reply",
    category: "productivity",
    isPremium: false,
  },
  {
    key: "reminder",
    name: "Pengingat terjadwal",
    category: "productivity",
    isPremium: false,
  },
  {
    key: "notes",
    name: "Catatan pribadi via chat",
    category: "productivity",
    isPremium: false,
  },

  // --- Media ---
  {
    key: "sticker-maker",
    name: "Buat stiker dari gambar/video",
    category: "media",
    isPremium: false,
  },
  {
    key: "media-downloader",
    name: "Download media dari link",
    category: "media",
    isPremium: false,
  },
  {
    key: "voice-converter",
    name: "Konversi audio ke voice note",
    category: "media",
    isPremium: true,
  },

  // --- Information ---
  {
    key: "group-info",
    name: "Info grup & daftar member",
    category: "information",
    isPremium: false,
  },
  {
    key: "ticket-monitor",
    name: "Monitor info tiket/promo",
    category: "information",
    isPremium: true,
  },
  {
    key: "weather-info",
    name: "Info cuaca",
    category: "information",
    isPremium: false,
  },

  // --- Security ---
  {
    key: "anti-delete",
    name: "Anti hapus pesan",
    category: "security",
    isPremium: false,
  },
  {
    key: "anti-link",
    name: "Anti link asing di grup",
    category: "security",
    isPremium: true,
  },
  {
    key: "hidetag",
    name: "Hidetag / tag semua anggota",
    category: "security",
    isPremium: false,
  },
];

async function main() {
  for (const feature of features) {
    await prisma.feature.upsert({
      where: { key: feature.key },
      update: feature,
      create: feature,
    });
  }
  console.log(`Seed selesai: ${features.length} fitur dimasukkan.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
