"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ToggleBar from "@/components/ToggleBar";

type NavLink = { label: string; href: string };

type NavbarProps = {
  brand: string;
  navLinks: NavLink[];
};

export default function Navbar({ brand, navLinks }: Readonly<NavbarProps>) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-foreground hover:text-accent transition-colors duration-300"
        >
          <span className="text-accent">&gt;</span> {brand}
          <span className="text-accent animate-pulse">_</span>
        </Link>

        {/* Desktop links + toggles */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors duration-300 relative group"
            >
              <span className="text-accent mr-1 text-[10px]">0{i + 1}.</span>
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <ToggleBar />
        </div>

        {/* Mobile: toggles + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <ToggleBar />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                mobileOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-px bg-foreground transition-all duration-300 ${
                mobileOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-6 pb-8 pt-2">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                <span className="text-accent mr-2 text-xs">0{i + 1}.</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
