import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "./components/Navbar";
import { Inter, Playfair_Display } from "next/font/google";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fight On. Code On.",
  description: "USC-inspired portfolio with glass depth, bold type, and disciplined motion.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <div className="bg-texture" />
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 pb-20 pt-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 pb-10">
          <div className="glass rounded-xl2 px-5 py-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm muted">
                © {new Date().getFullYear()} · Fight On. Code On.
              </div>
              <div className="text-xs muted smallcaps">
                Cardinal Red · Gold · Motion Discipline
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}