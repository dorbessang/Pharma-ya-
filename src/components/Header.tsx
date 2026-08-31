interface HeaderProps {
  onLogoClick: () => void;
  onOrdersClick: () => void;
  ordersCount: number;
}

export function Header({ onLogoClick, onOrdersClick, ordersCount }: HeaderProps) {
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
        <nav className="flex items-center gap-4 sm:gap-6 text-sm text-slate-600">
          <span className="hidden sm:inline cursor-default">Farmacias</span>
          <button
            onClick={onOrdersClick}
            className="relative flex items-center gap-1.5 text-slate-700 font-medium hover:text-emerald-700"
          >
            Mis pedidos
            {ordersCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 text-white text-xs px-1.5">
                {ordersCount}
              </span>
            )}
          </button>
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
