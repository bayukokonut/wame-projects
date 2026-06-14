import { PrismaClient } from "@prisma/client";

// Pola singleton — supaya Next.js (dengan hot-reload di dev mode)
// tidak membuat koneksi Prisma baru setiap kali file di-reload.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
