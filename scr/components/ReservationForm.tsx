import { useState } from 'react';
import { Send, CheckCircle2, Loader2, AlertCircle, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const consoleOptions = ['PlayStation 5', 'PlayStation 4 Pro'];
const timeSlots = ['16:00', '17:30', '19:00', '20:30', '22:00'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ReservationForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    console: 'PlayStation 5',
    date: '',
    time: '17:30',
    players: '2',
    notes: '',
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('reservations').insert({
        name: form.name,
        phone: form.phone,
        console: form.console,
        date: form.date,
        time: form.time,
        players: Number(form.players),
        notes: form.notes || null,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ ...form, name: '', phone: '', date: '', notes: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="reservar" className="py-24 sm:py-32 border-t border-white/5 relative overflow-hidden">
      <div className="absolute -top-20 right-0 w-96 h-96 rounded-full bg-leaf-500/10 blur-[130px]" />
      <div className="mx-auto max-w-5xl px-5 sm:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-leaf-400 text-sm font-semibold tracking-widest uppercase">
            Reserva
          </span>
          <h2 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            Reserva tu <span className="text-gradient-leaf">sesión</span>
          </h2>
          <p className="mt-5 text-white/60 text-lg leading-relaxed">
            Rellena el formulario y te confirmamos por teléfono, o reserva directamente por WhatsApp. Hasta 2 jugadores por consola.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 sm:p-10 backdrop-blur-sm"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Nombre">
              <input
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Tu nombre"
                className="input"
              />
            </Field>
            <Field label="Teléfono">
              <input
                required
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="600 000 000"
                className="input"
              />
            </Field>
            <Field label="Consola">
              <select
                value={form.console}
                onChange={(e) => update('console', e.target.value)}
                className="input"
              >
                {consoleOptions.map((c) => (
                  <option key={c} value={c} className="bg-ink-800">
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Jugadores">
              <select
                value={form.players}
                onChange={(e) => update('players', e.target.value)}
                className="input"
              >
                <option value="1" className="bg-ink-800">1 jugador</option>
                <option value="2" className="bg-ink-800">2 jugadores</option>
              </select>
            </Field>
            <Field label="Fecha">
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className="input"
              />
            </Field>
            <Field label="Hora">
              <select
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className="input"
              >
                {timeSlots.map((t) => (
                  <option key={t} value={t} className="bg-ink-800">
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Notas (opcional)">
              <textarea
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
                rows={3}
                placeholder="¿Algún juego en concreto o petición especial?"
                className="input resize-none"
              />
            </Field>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-electric-500 hover:bg-electric-400 disabled:opacity-60 text-ink-900 font-semibold px-8 py-3.5 transition-all glow-electric"
            >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Solicitar reserva
              </>
            )}
            </button>
            <a
              href={`https://wa.me/34668581523?text=${encodeURIComponent(
                `Hola, quiero hacer una reserva en Base 420.\nNombre: ${form.name || '—'}\nConsola: ${form.console}\nFecha: ${form.date || '—'}\nHora: ${form.time}\nJugadores: ${form.players}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-leaf-400/40 hover:border-leaf-300 text-white font-semibold px-8 py-3.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-leaf-300" />
              WhatsApp · 668 581 523
            </a>
          </div>

          {status === 'success' && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-leaf-500/30 bg-leaf-500/10 px-4 py-3 text-leaf-200">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="text-sm">
                ¡Reserva recibida! Te contactaremos por teléfono para confirmar.
              </span>
            </div>
          )}
          {status === 'error' && (
            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-200">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm">
                No se pudo enviar la reserva. Inténtalo de nuevo en un momento.
              </span>
            </div>
          )}
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.9rem;
          padding: 0.75rem 1rem;
          color: white;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .input::placeholder { color: rgba(255,255,255,0.35); }
        .input:focus {
          outline: none;
          border-color: rgba(21,156,255,0.6);
          background: rgba(21,156,255,0.06);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm text-white/60 mb-2">{label}</span>
      {children}
    </label>
  );
}
