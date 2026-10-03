import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DayPicker } from 'react-day-picker';
import { es } from 'date-fns/locale';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { CONSOLAS, SLOTS, crearReserva, normTel, ocupadas } from '../lib/api';

const hoy = new Date();

export default function Reservar() {
  const [f, setF] = useState({
    fecha: format(hoy, 'yyyy-MM-dd'),
    hora: '',
    consola: 'PS5',
    jugadores: 1,
    nombre: '',
    telefono: '',
    notas: '',
    ok: false,
  });
  const [occ, setOcc] = useState<{ hora: string; consola: string }[]>([]);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [showCal, setShowCal] = useState(false);
  const set = (k: string, v: any) => setF((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    set('hora', '');
    ocupadas(f.fecha).then((r) => r.ok && setOcc(r.ocupadas));
  }, [f.fecha]);

  const libre = (h: string) => !occ.some((o) => o.hora === h && o.consola === f.consola);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    if (!f.hora) return setErr('Elige una hora.');
    if (f.nombre.trim().length < 2) return setErr('Escribe tu nombre.');
    if (!/^[6-9]\d{8}$/.test(normTel(f.telefono))) return setErr('Teléfono no válido (9 dígitos).');
    if (!f.ok) return setErr('Acepta la política de privacidad.');
    setBusy(true);
    const r = await crearReserva({ ...f, telefono: normTel(f.telefono) });
    setBusy(false);
    if (r.ok) setCodigo((r as any).codigo || '');
    else setErr(r.error);
  }

  if (codigo) {
    const msg = encodeURIComponent(
      `Hola, he reservado en La Base 420: ${f.consola}, ${f.fecha} a las ${f.hora}. Código ${codigo}. Nombre: ${f.nombre}`
    );
    return (
      <section className="max-w-md mx-auto text-center space-y-4" aria-live="polite">
        <h1 className="font-title text-2xl text-green-400">¡Reserva confirmada!</h1>
        <p>{f.consola} · {f.fecha} · {f.hora}</p>
        <p>Tu código para consultar o cancelar:</p>
        <p className="font-title text-4xl tracking-widest text-blue-400">{codigo}</p>
        <p className="text-sm text-zinc-400">Guárdalo: lo necesitarás en «Mis reservas».</p>
        <a
          className="btn-primary inline-flex items-center"
          href={`https://wa.me/34668581523?text=${msg}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Avisar por WhatsApp
        </a>
      </section>
    );
  }

  return (
    <form className="max-w-md mx-auto space-y-4" onSubmit={enviar} noValidate>
      <h1 className="font-title text-2xl text-green-400">Reservar</h1>

      <div className="relative">
        <label className="block">Fecha</label>
        <button
          type="button"
          onClick={() => setShowCal(!showCal)}
          className="input mt-1 text-left flex justify-between items-center"
        >
          <span>{format(new Date(f.fecha + 'T12:00:00'), "d 'de' MMMM 'de' yyyy", { locale: es })}</span>
          <span className="text-zinc-500">📅</span>
        </button>
        {showCal && (
          <div className="absolute z-10 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg p-3 shadow-xl">
            <DayPicker
              mode="single"
              selected={new Date(f.fecha + 'T12:00:00')}
              onSelect={(day) => {
                if (day) {
                  set('fecha', format(day, 'yyyy-MM-dd'));
                  setShowCal(false);
                }
              }}
              disabled={{ before: hoy }}
              locale={es}
              styles={{
                caption: { color: '#4ade80', fontFamily: 'Orbitron, sans-serif' },
                head_cell: { color: '#a1a1aa', textTransform: 'uppercase', fontSize: '0.75rem' },
                day: { color: '#ffffff', borderRadius: '0.5rem' },
                day_selected: { backgroundColor: '#22c55e', color: '#0a0a0a', fontWeight: 'bold' },
                day_today: { color: '#159cff', fontWeight: 'bold' },
                day_disabled: { color: '#3f3f46', opacity: 0.4 },
                nav_button: { color: '#4ade80' },
              }}
            />
          </div>
        )}
      </div>

      <label className="block">
        Consola
        <select className="input mt-1" value={f.consola} onChange={(e) => set('consola', e.target.value)}>
          {CONSOLAS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </label>

      <fieldset>
        <legend className="mb-1">Hora</legend>
        <div className="grid grid-cols-3 gap-2">
          {SLOTS.map((h) => (
            <button
              type="button"
              key={h}
              disabled={!libre(h)}
              aria-pressed={f.hora === h}
              onClick={() => set('hora', h)}
              className={`btn border ${f.hora === h ? 'bg-green-500 text-black border-green-500' : 'border-zinc-600'} disabled:opacity-30 disabled:line-through`}
            >
              {h}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="block">
        Jugadores
        <select className="input mt-1" value={f.jugadores} onChange={(e) => set('jugadores', +e.target.value)}>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </label>

      <label className="block">
        Nombre
        <input className="input mt-1" autoComplete="name" value={f.nombre} onChange={(e) => set('nombre', e.target.value)} />
      </label>

      <label className="block">
        Teléfono
        <input className="input mt-1" type="tel" autoComplete="tel" value={f.telefono} onChange={(e) => set('telefono', e.target.value)} />
      </label>

      <label className="block">
        Notas (opcional)
        <textarea className="input mt-1 py-2" rows={2} value={f.notas} onChange={(e) => set('notas', e.target.value)} />
      </label>

      <label className="flex gap-3 items-start text-sm">
        <input type="checkbox" className="h-5 w-5 mt-0.5 accent-green-500" checked={f.ok} onChange={(e) => set('ok', e.target.checked)} />
        <span>He leído la <Link to="/privacidad" className="text-green-400 underline">política de privacidad</Link>.</span>
      </label>

      {err && <p role="alert" className="text-red-400">{err}</p>}

      <button type="submit" className="btn-primary w-full" disabled={busy}>
        {busy ? 'Reservando…' : 'Confirmar reserva'}
      </button>
    </form>
  );
}
