import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Geist_Mono, Archivo } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "@/components/ui/noise-overlay";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Surbhi — Software Engineer Portfolio",
  description:
    "Personal software engineer portfolio of Surbhi, featuring full-stack web development, interactive UI engineering.",
  keywords: [
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Framer Motion",
    "Portfolio",
  ],
  authors: [{ name: "Surbhi" }],
  openGraph: {
    title: "Surbhi — Software Engineer",
    description: "Clean, web systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${plusJakartaSans.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f3f2ee] text-[#111111] relative selection:bg-neutral-900 selection:text-white">
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
