import type { ReactNode } from "react";

export const metadata = {
  title: "wame",
  description: "Platform penyedia layanan bot WhatsApp",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
