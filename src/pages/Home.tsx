import { Link } from 'react-router-dom';
import InstallButton from '../components/InstallButton';

export default function Home() {
  return (
    <section className="text-center py-10 space-y-6">
      <h1 className="font-title font-black text-4xl md:text-6xl text-green-400">LA BASE 420</h1>
      <p className="text-xl">Salón de gaming en Lleida: PS5 y PS4 Pro</p>
      <p className="text-zinc-300"><strong className="text-blue-400 text-2xl">10 €/hora</strong> · hasta 2 jugadores por consola · todos los días 16:30–22:00</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Link to="/reservar" className="btn-primary inline-flex items-center text-lg px-8">Reservar ahora</Link>
        <a className="btn-ghost inline-flex items-center" href="https://wa.me/34668581523" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a className="btn-ghost inline-flex items-center" href="https://www.google.com/maps/search/?api=1&query=Carrer+Nadal+Meroles+12+25008+Lleida" target="_blank" rel="noopener noreferrer">Cómo llegar</a>
      </div>
      <div className="flex justify-center"><InstallButton /></div>
      <p className="text-sm text-zinc-500">Carrer Nadal Meroles 12, 25008 Lleida</p>
    </section>
  );
}
