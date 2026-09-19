import { ArrowRight, Users, Clock, Sparkles } from 'lucide-react';

const heroImg =
  'https://images.pexels.com/photos/9072386/pexels-photo-9072386.jpeg?auto=compress&cs=tinysrgb&w=1600';

export default function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Sala de gaming con luces de neón"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900/75 via-ink-900/85 to-ink-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-ink-900/45 to-transparent" />
        <div className="absolute inset-0 bg-electric-600/10 mix-blend-screen" />
      </div>

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-electric-500/25 blur-[120px] animate-pulse-glow" />
      <div className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full bg-leaf-700/25 blur-[120px] animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-28 pb-20 w-full">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-leaf-500/30 bg-leaf-500/10 px-4 py-1.5 text-sm text-leaf-300 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            Play. Compite. Disfruta.
          </span>

          <h1
            className="mt-6 font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight animate-fade-up"
            style={{ animationDelay: '80ms' }}
          >
            Vive el juego en
            <br />
            <span className="text-gradient-play">Base 420</span>
          </h1>

          <p
            className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl animate-fade-up"
            style={{ animationDelay: '160ms' }}
          >
            Un espacio para jugar a PS5 y otras consolas, conocer gente y compartir la
            experiencia. Hasta 2 personas por consola. Pronto vendrán más novedades.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            <a
              href="#reservar"
              className="group inline-flex items-center gap-2 rounded-full bg-electric-500 hover:bg-electric-400 text-ink-900 font-semibold px-7 py-3.5 transition-all glow-electric"
            >
              Reserva tu sesión
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#experiencia"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 hover:border-white/30 text-white px-7 py-3.5 transition-colors"
            >
              Ver la experiencia
            </a>
          </div>

          <div
            className="mt-12 grid grid-cols-3 gap-4 max-w-md animate-fade-up"
            style={{ animationDelay: '320ms' }}
          >
            <Stat icon={<Users className="w-5 h-5" />} value="2" label="jugadores / consola" />
            <Stat icon={<Clock className="w-5 h-5" />} value="PS5" label="y más consolas" />
            <Stat icon={<Sparkles className="w-5 h-5" />} value="Pronto" label="más novedades" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
      <div className="text-electric-400 mb-2">{icon}</div>
      <div className="font-display font-bold text-xl">{value}</div>
      <div className="text-xs text-white/50 mt-0.5">{label}</div>
    </div>
  );
}
