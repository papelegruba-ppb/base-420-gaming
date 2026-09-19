import { Users, Gamepad2, Wifi, Heart, Coffee, Trophy } from 'lucide-react';

const features = [
  {
    icon: Gamepad2,
    title: 'PS5 y más consolas',
    desc: 'Juega en PlayStation 5 y otras consolas con pantallas de alta definición y mandos en perfecto estado.',
  },
  {
    icon: Users,
    title: '2 jugadores por consola',
    desc: 'Cada consola admite hasta 2 personas. Ideal para compartir una partida con tu acompañante.',
  },
  {
    icon: Heart,
    title: 'Conecta con gente',
    desc: 'Un espacio pensado para interactuar, conocer a otros jugadores y crear comunidad alrededor del juego.',
  },
  {
    icon: Trophy,
    title: 'Ambiente recreativo',
    desc: 'Sala recreativa con buena energía, música y un ambiente pensado para que disfrutes cada partida.',
  },
  {
    icon: Wifi,
    title: 'Conexión estable',
    desc: 'Red rápida y estable para partidas online sin interrupciones ni lag inesperado.',
  },
  {
    icon: Coffee,
    title: 'Comodidad primero',
    desc: 'Sillones cómodos, snacks y bebidas para que la sesión se sienta como en casa, pero mejor.',
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-leaf-400 text-sm font-semibold tracking-widest uppercase">
            La experiencia
          </span>
          <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            Más que jugar, <span className="text-gradient-leaf">compartir</span>
          </h2>
          <p className="mt-5 text-white/60 text-lg leading-relaxed">
            Base 420 no es solo un lugar con consolas. Es un punto de encuentro para
            disfrutar, competir y conocer gente con los mismos gustos que tú.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-7 hover:border-leaf-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-leaf-500/10 border border-leaf-500/20 grid place-items-center text-leaf-400 mb-5 group-hover:glow-leaf transition-all">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{f.title}</h3>
              <p className="text-white/55 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
