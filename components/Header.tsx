"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/founder", label: "Founder", important: true },
    { href: "/#training", label: "Training" },
    { href: "/#services", label: "Services" },
    { href: "/#gallery", label: "Gallery" },
    { href: "/#membership", label: "Membership" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-violet-500/20 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-lg text-foreground">Virtueism.org</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-violet-300 transition-colors ${
                link.important ? "font-medium text-violet-200" : "text-violet-100/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          >
            Start Training
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-violet-200 md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-violet-500/20 p-4 shadow-xl md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-lg py-2 border-b border-violet-500/10 last:border-0 ${
                  link.important ? "font-semibold text-violet-200" : "text-violet-100/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
