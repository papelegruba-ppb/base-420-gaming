import { Gamepad2, Mail, Phone, Clock, MessageCircle, Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contacto" className="border-t border-white/5 bg-ink-800">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <a href="#inicio" className="flex items-center gap-2.5 mb-4">
              <span className="grid place-items-center w-10 h-10 rounded-xl bg-leaf-500/10 border border-leaf-500/30">
                <Gamepad2 className="w-5 h-5 text-leaf-400" />
              </span>
              <span className="font-display font-extrabold text-lg">
                Base<span className="text-leaf-400">420</span>
              </span>
            </a>
            <p className="text-white/55 leading-relaxed max-w-sm">
              Sala recreativa y gaming lounge. Juega a PS5 y otras consolas, conoce gente y
              vive la experiencia. Hasta 2 jugadores por consola. Pronto más novedades.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white/80">Contacto</h4>
            <ul className="space-y-3 text-white/55 text-sm">
              <li>
                <a href="https://wa.me/34668581523" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-leaf-400 transition-colors">
                  <MessageCircle className="w-4 h-4 text-leaf-400" /> WhatsApp: 668 581 523
                </a>
              </li>
              <li>
                <a href="mailto:administracion@labase420.com" className="flex items-center gap-2.5 hover:text-leaf-400 transition-colors">
                  <Mail className="w-4 h-4 text-leaf-400" /> administracion@labase420.com
                </a>
              </li>
              <li>
                <a href="tel:+34668581523" className="flex items-center gap-2.5 hover:text-leaf-400 transition-colors">
                  <Phone className="w-4 h-4 text-leaf-400" /> 668 581 523
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-leaf-400" /> Lun-Dom: 16:00 - 00:00
              </li>
              <li>
                <a href="https://www.tiktok.com/@labaselleida" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-electric-400 transition-colors">
                  <Music2 className="w-4 h-4 text-electric-400" /> @labaselleida
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4 text-white/80">Secciones</h4>
            <ul className="space-y-3 text-white/55 text-sm">
              <li><a href="#experiencia" className="hover:text-leaf-400 transition-colors">Experiencia</a></li>
              <li><a href="#consolas" className="hover:text-leaf-400 transition-colors">Consolas</a></li>
              <li><a href="#galeria" className="hover:text-leaf-400 transition-colors">Galería</a></li>
              <li><a href="#reservar" className="hover:text-leaf-400 transition-colors">Reservar</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Base 420. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1.5">
            Hecho con <span className="text-electric-400">●</span> para la comunidad gaming
          </p>
        </div>
      </div>
    </footer>
  );
}
