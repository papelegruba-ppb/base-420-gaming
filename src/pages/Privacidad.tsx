import { openCookieSettings } from '../lib/consent';

const H = ({ children }: { children: React.ReactNode }) => <h2 className="text-xl font-bold text-white mt-8 mb-2">{children}</h2>;

export default function Privacidad() {
  return (
    <article className="max-w-3xl mx-auto text-zinc-300 space-y-2">
      <h1 className="font-title text-2xl text-green-400">Política de privacidad y aviso legal</h1>

      <H>1. Titular (art. 10 LSSI)</H>
      <ul className="list-disc pl-6">
        <li>Denominación: LA BASE 420 SL · CIF B88968227</li>
        <li>Domicilio fiscal: Carrer Nadal Meroles 14, 25002 Lleida</li>
        <li>Local de atención al público: Carrer Nadal Meroles 12, 25008 Lleida</li>
        <li>Email: administracion@labase420.com · Teléfono: 668 58 15 23</li>
        <li>Registro Mercantil: [COMPLETAR: Registro, tomo, folio, hoja]</li>
      </ul>

      <H>2. Finalidad</H>
      <p>Gestionar tu reserva (nombre, teléfono, consola, fecha y hora, notas), contactarte para confirmarla, modificarla o cancelarla, y enviarte recordatorios de esa reserva.</p>

      <H>3. Base legal</H>
      <p>Ejecución del servicio que solicitas al reservar (art. 6.1.b RGPD). Las cookies analíticas y de marketing se basan en tu consentimiento (art. 6.1.a RGPD).</p>

      <H>4. Conservación</H>
      <p>Mantenemos los datos de la reserva [COMPLETAR: plazo, p. ej. 3 años, confirmar con tu gestoría] y después los bloqueamos durante los plazos legales de prescripción.</p>

      <H>5. Destinatarios y transferencias</H>
      <p>No cedemos datos salvo obligación legal. Usamos como encargados del tratamiento a Google (Google Workspace, Google Sheets y Apps Script, donde se almacenan las reservas) y a WhatsApp (Meta) si nos escribes por ese canal. Estos proveedores pueden tratar datos fuera del Espacio Económico Europeo con las garantías previstas en el RGPD (cláusulas contractuales tipo o decisión de adecuación).</p>

      <H>6. Derechos</H>
      <p>Puedes ejercer acceso, rectificación, supresión, oposición, limitación y portabilidad en administracion@labase420.com. Puedes reclamar ante la AEPD (www.aepd.es).</p>

      <H>7. Cookies</H>
      <ul className="list-disc pl-6">
        <li>Técnicas: necesarias para el funcionamiento y la instalación como app. No requieren consentimiento.</li>
        <li>Analíticas (Google Analytics 4): solo si las aceptas.</li>
        <li>Marketing (Google Ads): solo si las aceptas.</li>
      </ul>
      <p>Tu elección se guarda 12 meses. <button onClick={openCookieSettings} className="text-green-400 underline">Cambiar mis preferencias de cookies</button>.</p>

      <H>8. Propiedad intelectual</H>
      <p>Los contenidos de esta web son de LA BASE 420 SL o se usan con autorización. Queda prohibida su reproducción sin permiso.</p>

      <p className="text-sm text-zinc-500 pt-8">Última actualización: [COMPLETAR fecha]</p>
    </article>
  );
}
