import "./Footer.scss";
import { CONFIG } from "../../config";
import BotonWhatsApp from "../BotonWhatsApp";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-grid">
        <div className="footer-column footer-brand">
          <div className="logo">
            V/A<span>DIVER</span>
          </div>
          <p className="brand-subtext">
            Sistema turístico de inmersiones, fotografías submarinas y experiencias únicas en bosques sumergidos.
          </p>
        </div>

        <div className="footer-column footer-links">
          <h4>Navegación</h4>
          <ul>
            <li>
              <a href="#inicio">
                <i className="fa-solid fa-house"></i> Inicio
              </a>
            </li>
            <li>
              <a href="#ofertas">
                <i className="fa-solid fa-bolt"></i> Ofertas
              </a>
            </li>
            <li>
              <a href="#bautismos">
                <i className="fa-solid fa-user-shield"></i> Guías
              </a>
            </li>
            <li>
              <a href="#tarifas">
                <i className="fa-solid fa-tag"></i> Tarifas
              </a>
            </li>
            <li>
              <a href="#galeria">
                <i className="fa-solid fa-images"></i> Fotos
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-column footer-contact">
          <h4>Contacto Oficial</h4>
          <ul>
            <li>
              <BotonWhatsApp
                mensaje="Hola V/ADiver, vengo desde la página web y me gustaría consultar por sus servicios de buceo y expediciones."
                textoBoton="+56 9 3411 4891"
                className="contact-item"
                mostrarIcono={true}
              />
            </li>
            <li>
              <a href={`mailto:${CONFIG.email}`} className="contact-item">
                <i className="fa-solid fa-envelope icon-accent"></i> {CONFIG.email}
              </a>
            </li>
            <li>
              <span className="contact-item-text">
                <i className="fa-solid fa-location-dot icon-accent"></i> {CONFIG.ubicacion}
              </span>
            </li>
          </ul>
        </div>

        <div className="footer-column footer-map">
          <h4>Estación Geográfica</h4>
          <a
            href="https://www.google.com/maps/place/Lago+Chapo/@-41.4580079,-72.6115598,11.46z/data=!4m6!3m5!1s0x9619c6147ef2efd7:0x74697c1789f6fef3!8m2!3d-41.4305438!4d-72.5323139!16s%2Fm%2F02rtqzt?entry=ttu&g_ep=EgoyMDI2MTExMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="radar-location-card"
          >
            <div className="radar-grid-bg"></div>
            <div className="radar-ping"></div>
            <div className="radar-coordinates">
              <span className="coord-label">LAT:</span>{" "}
              <span className="coord-val">-41.4547° S</span>
              <br />
              <span className="coord-label">LON:</span>{" "}
              <span className="coord-val">-72.5236° W</span>
            </div>
            <div className="radar-click-notice">
              <i className="fa-solid fa-satellite-dish"></i> LAGO CHAPO • SECTOR CORDILLERA
            </div>
          </a>

          <div className="system-status-wrapper">
            <span className="status-dot"></span>
            <span className="status-text">CORE SISTEMA: ONLINE</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2026 V/ADIVER. Todos los derechos reservados • Operaciones Submarinas Especializadas.
        </p>
        <div className="legal-links">
          <a href="#bautismos">Protocolos de Seguridad</a>
          <BotonWhatsApp
            mensaje="Hola V/ADiver, quisiera consultar sobre los requisitos de seguridad para inmersión."
            textoBoton="Requisitos de Inmersión"
            className="footer-legal-wa"
            mostrarIcono={false}
          />
        </div>
      </div>
    </footer>
  );
}
