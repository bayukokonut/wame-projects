import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type Params = { params: { id: string } };

// GET /api/bots/:id — detail bot + config + fitur aktif
export async function GET(_req: NextRequest, { params }: Params) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bot = await prisma.bot.findFirst({
    where: { id: Number(params.id), userId: user.id },
    include: {
      config: true,
      features: { include: { feature: true } },
    },
  });
  if (!bot) {
    return NextResponse.json({ error: "Bot tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(bot);
}

// PATCH /api/bots/:id — update BotConfig (nama, prefix, owner, dll)
export async function PATCH(req: NextRequest, { params }: Params) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bot = await prisma.bot.findFirst({
    where: { id: Number(params.id), userId: user.id },
  });
  if (!bot) {
    return NextResponse.json({ error: "Bot tidak ditemukan" }, { status: 404 });
  }

  const body = await req.json();
  const config = await prisma.botConfig.update({
    where: { botId: bot.id },
    data: {
      botName: body.botName,
      prefix: body.prefix,
      publicMode: body.publicMode,
      ownerNumbers: body.ownerNumbers,
      watermark: body.watermark,
    },
  });

  // TODO: beri tahu Bot Manager kalau config bot ini berubah,
  // supaya proses bot yang sedang jalan reload config tanpa restart total

  return NextResponse.json(config);
}

// DELETE /api/bots/:id — hapus bot
export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const bot = await prisma.bot.findFirst({
    where: { id: Number(params.id), userId: user.id },
  });
  if (!bot) {
    return NextResponse.json({ error: "Bot tidak ditemukan" }, { status: 404 });
  }

  // TODO: minta Bot Manager stop proses bot ini & hapus folder session-nya

  await prisma.bot.delete({ where: { id: bot.id } });
  return NextResponse.json({ success: true });
}
