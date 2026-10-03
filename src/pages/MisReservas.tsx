import { useState } from 'react';
import { Reserva, buscarReserva, cancelarReserva } from '../lib/api';

export default function MisReservas() {
  const [tel, setTel] = useState(''); const [cod, setCod] = useState('');
  const [r, setR] = useState<Reserva | null>(null); const [msg, setMsg] = useState('');

  async function buscar() {
    setMsg(''); setR(null);
    const x = await buscarReserva(tel, cod);
    if (x.ok) setR(x.reserva); else setMsg(x.error);
  }
  async function cancelar() {
    if (!confirm('¿Cancelar esta reserva?')) return;
    const x = await cancelarReserva(tel, cod);
    if (x.ok) { setR(null); setMsg('Reserva cancelada.'); } else setMsg(x.error);
  }

  return (
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="font-title text-2xl text-green-400">Mis reservas</h1>
      <label className="block">Teléfono<input className="input mt-1" type="tel" value={tel} onChange={(e) => setTel(e.target.value)} /></label>
      <label className="block">Código de reserva<input className="input mt-1 uppercase" maxLength={6} value={cod} onChange={(e) => setCod(e.target.value)} /></label>
      <button className="btn-primary w-full" onClick={buscar}>Buscar</button>
      {msg && <p role="alert" className="text-amber-400">{msg}</p>}
      {r && (
        <div className="border border-zinc-700 rounded-lg p-4 space-y-1">
          <p className="font-semibold">{r.consola} · {r.jugadores} jugador(es)</p>
          <p>{r.fecha} a las {r.hora}</p>
          <p className="text-sm text-zinc-400">Estado: {r.estado}</p>
          {r.estado === 'Confirmada' && <button className="btn-ghost mt-3" onClick={cancelar}>Cancelar reserva</button>}
        </div>
      )}
    </section>
  );
}
