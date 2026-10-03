import { useEffect, useState } from 'react';

export default function InstallButton() {
  const [evt, setEvt] = useState<any>(null);
  const [showIos, setShowIos] = useState(false);
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;

  useEffect(() => {
    const h = (e: Event) => { e.preventDefault(); setEvt(e); };
    window.addEventListener('beforeinstallprompt', h);
    return () => window.removeEventListener('beforeinstallprompt', h);
  }, []);

  if (standalone) return null;
  if (evt) return <button className="btn-ghost" onClick={async () => { evt.prompt(); await evt.userChoice; setEvt(null); }}>Añadir a inicio</button>;
  if (ios) return (
    <div>
      <button className="btn-ghost" onClick={() => setShowIos(!showIos)}>Añadir a inicio</button>
      {showIos && <p className="mt-2 text-sm text-zinc-400">En Safari pulsa el botón Compartir y elige «Añadir a pantalla de inicio».</p>}
    </div>
  );
  return null;
}
