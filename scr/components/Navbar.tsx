import { useEffect, useState } from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#experiencia', label: 'Experiencia' },
  { href: '#consolas', label: 'Consolas' },
  { href: '#galeria', label: 'Galería' },
  { href: '#reservar', label: 'Reservar' },
  { href: '#contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-900/85 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <span className="relative grid place-items-center w-10 h-10 rounded-xl bg-leaf-500/10 border border-leaf-500/30 glow-leaf">
            <Gamepad2 className="w-5 h-5 text-leaf-400" />
          </span>
          <span className="font-display font-extrabold text-lg tracking-tight">
            Base<span className="text-leaf-400">420</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/70 hover:text-white transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-leaf-400 hover:after:w-full after:transition-all"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservar"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-leaf-500 hover:bg-leaf-400 text-ink-900 font-semibold text-sm px-5 py-2.5 transition-all glow-leaf hover:glow-leaf-strong"
        >
          Reservar plaza
        </a>

        <button
          className="md:hidden text-white/80 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menú"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-ink-800/95 backdrop-blur-xl border-t border-white/5">
          <ul className="px-5 py-4 space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-white/80 hover:text-leaf-400 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reservar"
                onClick={() => setOpen(false)}
                className="mt-2 block text-center rounded-full bg-leaf-500 text-ink-900 font-semibold py-3"
              >
                Reservar plaza
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
