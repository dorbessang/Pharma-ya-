interface HeaderProps {
  onLogoClick: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2 text-emerald-700 font-bold text-xl"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white text-base">
            +
          </span>
          Pharma Ya
        </button>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-slate-600">
          <span className="cursor-default">Cómo funciona</span>
          <span className="cursor-default">Farmacias</span>
          <button
            disabled
            title="Próximamente"
            className="rounded-full border border-slate-300 px-4 py-1.5 text-slate-400 cursor-not-allowed"
          >
            Ingresar
          </button>
        </nav>
      </div>
    </header>
  );
}
