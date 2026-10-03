// Pon la URL del Apps Script en .env: VITE_API_URL=https://script.google.com/macros/s/XXXX/exec
const API_URL = import.meta.env.VITE_API_URL as string;

export const SLOTS = ['16:30', '17:30', '18:30', '19:30', '20:30'];
export const CONSOLAS = ['PS5'];

export interface Reserva {
  fecha: string; hora: string; consola: string; jugadores: number;
  nombre: string; telefono: string; notas?: string; estado?: string; codigo?: string;
}
export interface Bloqueo { fecha: string; hora: string; consola: string; motivo: string; }
type Res<T = object> = ({ ok: true } & T) | { ok: false; error: string };

// Fetch con timeout + reintentos
async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs = 15000): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function call<T = object>(accion: string, data: object = {}): Promise<Res<T>> {
  const body = JSON.stringify({ accion, ...data });
  const options: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body,
    redirect: 'follow',
  };

  // Intento 1
  try {
    console.log('[API] Enviando:', accion, data);
    const r = await fetchWithTimeout(API_URL, options, 15000);
    console.log('[API] Respuesta status:', r.status);
    const text = await r.text();
    console.log('[API] Respuesta texto:', text.substring(0, 200));
    try {
      return JSON.parse(text);
    } catch {
      return { ok: false, error: 'Respuesta inválida del servidor. Revisa la implementación del Apps Script.' };
    }
  } catch (err: any) {
    console.warn('[API] Fallo intento 1:', err?.name, err?.message);
    // Si el primer intento falla por timeout, reintenta una vez
    if (err?.name === 'AbortError') {
      try {
        console.log('[API] Reintentando...');
        const r = await fetchWithTimeout(API_URL, options, 20000);
        const text = await r.text();
        console.log('[API] Respuesta intento 2:', text.substring(0, 200));
        return JSON.parse(text);
      } catch (err2: any) {
        console.error('[API] Fallo intento 2:', err2);
        return { ok: false, error: 'El servidor tarda demasiado. Espera unos segundos y vuelve a intentarlo.' };
      }
    }
    return { ok: false, error: 'No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.' };
  }
}

export const normTel = (t: string) => t.replace(/\D/g, '').replace(/^34(?=\d{9}$)/, '');

export const crearReserva = (r: Reserva) => call<{ codigo: string }>('crear', r);
export const ocupadas = (fecha: string) => call<{ ocupadas: { hora: string; consola: string }[] }>('listar', { fecha });
export const buscarReserva = (telefono: string, codigo: string) =>
  call<{ reserva: Reserva }>('misReservas', { telefono: normTel(telefono), codigo: codigo.trim().toUpperCase() });
export const cancelarReserva = (telefono: string, codigo: string) =>
  call('cancelar', { telefono: normTel(telefono), codigo: codigo.trim().toUpperCase() });

export const adminListar = (password: string, fecha: string) =>
  call<{ reservas: Reserva[]; bloqueos: Bloqueo[] }>('admin_listar', { password, fecha });
export const adminCancelar = (password: string, codigo: string) => call('admin_cancelar', { password, codigo });
export const adminBloquear = (password: string, b: Bloqueo) => call('admin_bloquear', { password, ...b });
export const adminDesbloquear = (password: string, b: Bloqueo) => call('admin_desbloquear', { password, ...b });