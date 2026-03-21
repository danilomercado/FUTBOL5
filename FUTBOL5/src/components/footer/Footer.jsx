import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/10 bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black tracking-wide text-white">
            ArmaF5
          </h3>
          <p className="mt-1 text-sm text-zinc-400">
            Organizá jugadores y armá equipos con una estética más de fútbol.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <a
            href="https://github.com/danilomercado"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-emerald-400"
          >
            GitHub
          </a>
          <span className="text-zinc-700">•</span>
          <span>© 2025 ArmaF5</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
