import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { applyConsent, getConsent, OPEN_EVENT, setConsent } from '../lib/consent';

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState(false);
  const [ana, setAna] = useState(false);
  const [mkt, setMkt] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (c) { applyConsent(c); setAna(c.analiticas); setMkt(c.marketing); } else setOpen(true);
    const show = () => { const x = getConsent(); setAna(!!x?.analiticas); setMkt(!!x?.marketing); setConfig(true); setOpen(true); };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  const elegir = (a: boolean, m: boolean) => { setConsent(a, m); setOpen(false); setConfig(false); };
  if (!open) return null;

  return (
    <div role="dialog" aria-modal="false" aria-label="Preferencias de cookies"
      className="fixed bottom-0 inset-x-0 z-50 bg-zinc-900 border-t border-green-500/30 p-4 md:p-6 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="max-w-5xl mx-auto space-y-4">
        <p className="text-sm text-zinc-300">
          Usamos cookies técnicas (necesarias). Con tu permiso, también analíticas y de marketing. Más info en la{' '}
          <Link to="/privacidad" className="text-green-400 underline">política de privacidad</Link>.
        </p>
        {config && (
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-3"><input type="checkbox" checked disabled className="h-5 w-5" /> Técnicas (siempre activas)</label>
            <label className="flex items-center gap-3"><input type="checkbox" checked={ana} onChange={(e) => setAna(e.target.checked)} className="h-5 w-5 accent-green-500" /> Analíticas (Google Analytics)</label>
            <label className="flex items-center gap-3"><input type="checkbox" checked={mkt} onChange={(e) => setMkt(e.target.checked)} className="h-5 w-5 accent-green-500" /> Marketing (Google Ads)</label>
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <button className="btn-ghost" onClick={() => elegir(false, false)}>Rechazar</button>
          {config
            ? <button className="btn-ghost" onClick={() => elegir(ana, mkt)}>Guardar selección</button>
            : <button className="btn-ghost" onClick={() => setConfig(true)}>Configurar</button>}
          <button className="btn-primary" onClick={() => elegir(true, true)}>Aceptar todas</button>
        </div>
      </div>
    </div>
  );
}
