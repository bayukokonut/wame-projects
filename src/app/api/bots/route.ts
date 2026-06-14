import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

// GET /api/bots — daftar bot milik user yang login
export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bots = await prisma.bot.findMany({
    where: { userId: user.id },
    include: { config: true },
  });

  return NextResponse.json(bots);
}

// POST /api/bots — buat bot baru untuk user yang login
export async function POST() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Batas 1 bot untuk plan free — sesuaikan kalau perlu
  const existing = await prisma.bot.count({ where: { userId: user.id } });
  if (user.plan === "free" && existing >= 1) {
    return NextResponse.json(
      { error: "Plan free hanya bisa punya 1 bot" },
      { status: 403 }
    );
  }

  const bot = await prisma.bot.create({
    data: {
      userId: user.id,
      sessionPath: `sessions/bot_${user.id}_${Date.now()}`,
      config: { create: {} }, // pakai nilai default dari schema
    },
    include: { config: true },
  });

  // TODO: beri tahu Bot Manager untuk menyiapkan proses bot baru
  // (folder session belum dibuat sampai proses bot pertama kali jalan)

  return NextResponse.json(bot, { status: 201 });
}
