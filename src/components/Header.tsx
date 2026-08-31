import { Logo } from "./Logo";

interface HeaderProps {
  onLogoClick: () => void;
  onOrdersClick: () => void;
  ordersCount: number;
}

export function Header({ onLogoClick, onOrdersClick, ordersCount }: HeaderProps) {
  return (
    <header className="bg-cream-50/90 backdrop-blur sticky top-0 z-40 border-b border-ink-900/5">
      <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center gap-2.5 group">
          <Logo className="h-9 w-9 shadow-sm shadow-brand-600/20 rounded-[11px] transition-transform group-hover:-rotate-3" />
          <span className="font-display font-medium text-xl text-ink-900 tracking-tight">
            Pharma Ya
          </span>
        </button>
        <nav className="flex items-center gap-3 sm:gap-5 text-sm">
          <span className="hidden sm:inline text-ink-500 font-medium">
            Farmacias
          </span>
          <button
            onClick={onOrdersClick}
            className="relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-ink-700 font-semibold hover:bg-ink-900/5 transition-colors"
          >
            Mis pedidos
            {ordersCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 text-white text-[11px] font-bold px-1.5">
                {ordersCount}
              </span>
            )}
          </button>
          <button
            disabled
            title="Próximamente"
            className="rounded-full border border-ink-900/10 px-4 py-1.5 text-ink-300 cursor-not-allowed font-medium"
          >
            Ingresar
          </button>
        </nav>
      </div>
    </header>
  );
}
