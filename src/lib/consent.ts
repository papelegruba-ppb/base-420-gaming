const KEY = 'labase420_cookie_consent';
const VERSION = 1;               // sube este número si cambias la política: se volverá a pedir
const MAX_MESES = 12;
export const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

export interface Consent { v: number; analiticas: boolean; marketing: boolean; fecha: string; }

export function getConsent(): Consent | null {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || 'null') as Consent | null;
    if (!c || c.v !== VERSION) return null;
    const meses = (Date.now() - new Date(c.fecha).getTime()) / (1000 * 60 * 60 * 24 * 30);
    return meses > MAX_MESES ? null : c;
  } catch { return null; }
}

export function setConsent(analiticas: boolean, marketing: boolean) {
  const c: Consent = { v: VERSION, analiticas, marketing, fecha: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch { /* Safari privado */ }
  applyConsent(c);
}

export function applyConsent(c: Consent | null) {
  if (c?.analiticas && GA_ID && !document.getElementById('ga4')) {
    const s = document.createElement('script');
    s.id = 'ga4'; s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag('js', new Date()); w.gtag('config', GA_ID, { anonymize_ip: true });
  }
}

export const OPEN_EVENT = 'labase420:open-cookies';
export const openCookieSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));
