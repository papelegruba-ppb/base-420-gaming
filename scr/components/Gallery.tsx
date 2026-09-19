const photos = [
  {
    src: 'https://images.pexels.com/photos/9071471/pexels-photo-9071471.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Dos amigos jugando videojuegos en un sofá',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/9072202/pexels-photo-9072202.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Sala de gaming con luces de neón',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/7776191/pexels-photo-7776191.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Amigos disfrutando una noche de gaming',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/9068963/pexels-photo-9068963.jpeg?auto=compress&cs=tinysrgb&w=700',
    alt: 'Dos personas jugando en el sofá',
    span: '',
  },
  {
    src: 'https://images.pexels.com/photos/9072386/pexels-photo-9072386.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Sala iluminada con pantallas y neón',
    span: 'sm:col-span-2',
  },
];

export default function Gallery() {
  return (
    <section id="galeria" className="py-24 sm:py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-leaf-400 text-sm font-semibold tracking-widest uppercase">
            Galería
          </span>
          <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            El ambiente de <span className="text-gradient-leaf">Base 420</span>
          </h2>
          <p className="mt-5 text-white/60 text-lg leading-relaxed">
            Un vistazo a la sala, las consolas y la gente que ya vive la experiencia.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[200px] gap-3">
          {photos.map((p, i) => (
            <figure
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
