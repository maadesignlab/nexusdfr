import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="footer grid gap-12 pt-20 pb-10 text-slate-300 rounded-t-2xl"
    >
      {/* Top */}
      <div className="footer-container max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Col 1 */}
        <section className="footer-column space-y-4">
          <div className="text-white font-semibold text-xl tracking-wide">
            NEXUS
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Nexus apoya a la comunidad universitaria con recursos digitales y
            espacios de coworking diseñados para el futuro.
          </p>
        </section>

        {/* Col 2 */}
        <nav className="footer-column space-y-4">
          <h2 className="text-white font-medium tracking-wide">Producto</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/library" className="hover:text-white transition">
                Librería
              </Link>
            </li>
            <li>
              <Link href="/coworking" className="hover:text-white transition">
                Coworking
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-white transition">
                Carrito
              </Link>
            </li>
          </ul>
        </nav>

        {/* Col 3 */}
        <nav className="footer-column space-y-4">
          <h2 className="text-white font-medium tracking-wide">Contacto</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                className="hover:text-white transition"
                href="mailto:info@nexus.es"
              >
                Soporte técnico
              </a>
            </li>
            <li>
              <a className="hover:text-white transition" href="#">
                Privacidad
              </a>
            </li>
            <li>
              <a className="hover:text-white transition" href="#">
                Instagram
              </a>
            </li>
          </ul>
        </nav>

        {/* Col 4 */}
        <section className="footer-column space-y-4">
          <h2 className="text-white font-medium tracking-wide">
            Reconocimientos
          </h2>

          <div className="rounded-xl bg-slate-800/60 p-4 text-sm">
            Awwwards Honors
          </div>

          <div className="rounded-xl bg-slate-800/60 p-4 text-sm">
            <span className="text-slate-400 text-xs">FEATURED ON</span>
            <br />
            <strong className="text-white">PRODUCT HUNT</strong>
          </div>
        </section>
      </div>

      {/* Bottom */}
      <div className="footer-bottom border-t border-slate-800 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-slate-400">
            © 2026 Nexus by Miguel Arias — Todos los derechos reservados.
          </p>

          <div className="footer-legal-links flex gap-6">
            <a className="hover:text-white transition" href="#">
              License
            </a>
            <a className="hover:text-white transition" href="#">
              Terms of Service
            </a>
            <a className="hover:text-white transition" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}