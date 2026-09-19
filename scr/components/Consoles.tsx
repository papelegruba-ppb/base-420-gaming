import { Check, Users } from 'lucide-react';

const consoles = [
  {
    name: 'PlayStation 5',
    tag: 'Disponible',
    desc: 'La nueva generación de Sony con gráficos 4K, SSD ultrarrápido y el DualSense con feedback háptico.',
    perks: ['Pantalla 4K', 'DualSense', '2 jugadores', 'Catálogo amplio'],
    img: 'https://images.pexels.com/photos/7069031/pexels-photo-7069031.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: true,
  },
  {
    name: 'PlayStation 4 Pro',
    tag: 'Disponible',
    desc: 'La consola más popular de la generación pasada. Ideal para clásicos y multijugador local.',
    perks: ['HDR', '2 jugadores', 'Multijugador local', 'Clásicos'],
    img: 'https://images.pexels.com/photos/7776877/pexels-photo-7776877.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: false,
  },
  {
    name: 'Retro & más',
    tag: 'Próximamente',
    desc: 'Estamos preparando novedades: consolas retro, simuladores y nuevas experiencias. ¡Atento!',
    perks: ['Retro', 'Simuladores', 'Novedades', 'Sorpresas'],
    img: 'https://images.pexels.com/photos/10492317/pexels-photo-10492317.jpeg?auto=compress&cs=tinysrgb&w=1200',
    featured: false,
  },
];

export default function Consoles() {
  return (
    <section id="consolas" className="relative py-24 sm:py-32 border-t border-white/5">
      <div className="absolute top-1/2 left-0 w-72 h-72 -translate-y-1/2 rounded-full bg-leaf-700/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
        <div className="max-w-2xl">
          <span className="text-leaf-400 text-sm font-semibold tracking-widest uppercase">
            Nuestras consolas
          </span>
          <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            Elige tu <span className="text-gradient-leaf">plataforma</span>
          </h2>
          <p className="mt-5 text-white/60 text-lg leading-relaxed">
            Cada consola está lista para 2 jugadores. Reserva la que más te guste y ven a
            disfrutar con tu acompañante.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {consoles.map((c) => (
            <article
              key={c.name}
              className={`group relative overflow-hidden rounded-3xl border bg-ink-700 transition-all duration-300 hover:-translate-y-1.5 ${
                c.featured ? 'border-leaf-500/40 glow-leaf' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-700 via-ink-700/40 to-transparent" />
                <span
                  className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                    c.tag === 'Disponible'
                      ? 'bg-leaf-500/15 text-leaf-300 border border-leaf-500/30'
                      : 'bg-white/10 text-white/70 border border-white/15'
                  }`}
                >
                  {c.tag}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display font-bold text-2xl mb-2">{c.name}</h3>
                <p className="text-white/55 leading-relaxed text-sm mb-5">{c.desc}</p>

                <ul className="space-y-2.5 mb-5">
                  {c.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-white/70">
                      <Check className="w-4 h-4 text-leaf-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                  <li className="flex items-center gap-2.5 text-sm text-white/70">
                    <Users className="w-4 h-4 text-leaf-400 shrink-0" />
                    Hasta 2 jugadores
                  </li>
                </ul>

                <a
                  href="#reservar"
                  className={`block text-center rounded-full font-semibold text-sm py-3 transition-all ${
                    c.featured
                      ? 'bg-leaf-500 hover:bg-leaf-400 text-ink-900'
                      : 'border border-white/15 hover:border-leaf-500/40 text-white'
                  }`}
                >
                  Reservar
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
