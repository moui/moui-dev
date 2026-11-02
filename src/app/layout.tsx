import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mauricio Barrera — Software Developer",
  description:
    "Portfolio and resume of Mauricio Barrera, a full stack software developer focused on GIS solutions and ArcGIS.",
  keywords: [
    "software developer",
    "full stack",
    "GIS",
    "ArcGIS",
    "portfolio",
    "web developer",
  ],
  openGraph: {
    title: "Mauricio Barrera — Software Developer",
    description:
      "Portfolio and resume of Mauricio Barrera, a full stack software developer focused on GIS solutions and ArcGIS.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        {/* Anti-flicker: apply theme class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.classList.add('light');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${jetbrains.variable} antialiased bg-background text-foreground font-mono`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
