import { useState } from 'react';
import { Bloqueo, CONSOLAS, Reserva, SLOTS, adminBloquear, adminCancelar, adminDesbloquear, adminListar } from '../lib/api';

const hoy = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

export default function Admin() {
  const [pw, setPw] = useState(sessionStorage.getItem('adm') || '');
  const [logged, setLogged] = useState(false);
  const [fecha, setFecha] = useState(hoy());
  const [res, setRes] = useState<Reserva[]>([]); const [blq, setBlq] = useState<Bloqueo[]>([]);
  const [b, setB] = useState({ hora: SLOTS[0], consola: 'Todas', motivo: '' });
  const [msg, setMsg] = useState('');

  async function cargar(d = fecha, p = pw) {
    const r = await adminListar(p, d);
    if (r.ok) { setRes(r.reservas); setBlq(r.bloqueos); setLogged(true); setMsg(''); sessionStorage.setItem('adm', p); }
    else { setMsg(r.error); setLogged(false); }
  }
  const run = async (p: Promise<{ ok: boolean; error?: string }>) => { const r: any = await p; if (!r.ok) setMsg(r.error); await cargar(); };

  if (!logged) return (
    <section className="max-w-sm mx-auto space-y-4">
      <h1 className="font-title text-2xl text-green-400">Admin</h1>
      <input className="input" type="password" placeholder="Contraseña" value={pw} onChange={(e) => setPw(e.target.value)} />
      <button className="btn-primary w-full" onClick={() => cargar()}>Entrar</button>
      {msg && <p role="alert" className="text-red-400">{msg}</p>}
    </section>
  );

  return (
    <section className="space-y-6">
      <div className="flex gap-3 items-center flex-wrap">
        <h1 className="font-title text-2xl text-green-400">Admin</h1>
        <input type="date" className="input max-w-[200px]" value={fecha} onChange={(e) => { setFecha(e.target.value); cargar(e.target.value); }} />
        <button className="btn-ghost" onClick={() => { sessionStorage.removeItem('adm'); setLogged(false); setPw(''); }}>Salir</button>
      </div>
      {msg && <p role="alert" className="text-red-400">{msg}</p>}
      <div>
        <h2 className="font-semibold mb-2">Reservas ({res.length})</h2>
        {res.length === 0 && <p className="text-zinc-500">No hay reservas este día.</p>}
        <ul className="space-y-2">{res.map((x) => (
          <li key={x.codigo} className="border border-zinc-700 rounded-lg p-3 flex flex-wrap justify-between gap-2">
            <span>{x.hora} · {x.consola} · {x.nombre} · <a className="text-blue-400" href={`tel:${x.telefono}`}>{x.telefono}</a> · {x.estado}{x.notas ? ` · ${x.notas}` : ''}</span>
            {x.estado === 'Confirmada' && <button className="btn-ghost" onClick={() => confirm('¿Cancelar?') && run(adminCancelar(pw, x.codigo!))}>Cancelar</button>}
          </li>))}</ul>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Bloqueos</h2>
        <ul className="space-y-2 mb-3">{blq.map((x, i) => (
          <li key={i} className="border border-zinc-700 rounded-lg p-3 flex justify-between gap-2">
            <span>{x.hora} · {x.consola} · {x.motivo}</span>
            <button className="btn-ghost" onClick={() => run(adminDesbloquear(pw, x))}>Quitar</button>
          </li>))}</ul>
        <div className="flex flex-wrap gap-2">
          <select className="input max-w-[140px]" value={b.hora} onChange={(e) => setB({ ...b, hora: e.target.value })}>{SLOTS.map((h) => <option key={h}>{h}</option>)}</select>
          <select className="input max-w-[140px]" value={b.consola} onChange={(e) => setB({ ...b, consola: e.target.value })}>{['Todas', ...CONSOLAS].map((c) => <option key={c}>{c}</option>)}</select>
          <input className="input max-w-[220px]" placeholder="Motivo" value={b.motivo} onChange={(e) => setB({ ...b, motivo: e.target.value })} />
          <button className="btn-primary" onClick={() => run(adminBloquear(pw, { fecha, ...b }))}>Bloquear franja</button>
        </div>
      </div>
    </section>
  );
}
