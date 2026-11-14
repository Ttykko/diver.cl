import "./Navbar.scss";
import { useState } from "react";
import BotonWhatsApp from "../BotonWhatsApp";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);
  const irArriba = () => {
    cerrarMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={irArriba}>
        V/A<span>DIVER</span>
      </div>
      <div className="nav-right-group">
        <ul className="nav-links-list">
          <li><a href="#inicio" onClick={irArriba}>Inicio</a></li>
          <li><a href="#ofertas">Ofertas</a></li>
          <li><a href="#bautismos">Guías</a></li>
          <li><a href="#tarifas">Tarifas</a></li>
          <li><a href="#galeria">Fotos</a></li>
        </ul>
        <BotonWhatsApp
          mensaje="Hola V/ADiver, quiero consultar por disponibilidad y tarifas."
          textoBoton="WHATSAPP DIRECTO"
          className="btn-main nav-login-btn"
        />
        <button
          type="button"
          className={`hamburger-btn ${menuAbierto ? "is-active" : ""}`}
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div className={`mobile-dropdown-menu ${menuAbierto ? "is-open" : ""}`}>
        <a href="#inicio" onClick={irArriba}><i className="fa-solid fa-house"></i> Inicio</a>
        <a href="#ofertas" onClick={cerrarMenu}><i className="fa-solid fa-bolt"></i> Ofertas</a>
        <a href="#bautismos" onClick={cerrarMenu}><i className="fa-solid fa-user-shield"></i> Guías</a>
        <a href="#tarifas" onClick={cerrarMenu}><i className="fa-solid fa-tag"></i> Tarifas</a>
        <a href="#galeria" onClick={cerrarMenu}><i className="fa-solid fa-images"></i> Fotos</a>
      </div>
    </nav>
  );
}

