import "./Hero.scss";
import BotonWhatsApp from "../BotonWhatsApp";

export default function Hero() {
  return (
    <header className="hero" id="inicio">
      <div className="hero-bg-image" style={{ backgroundImage: "url('/img/lagartija/1.jpg')" }} />
      <div className="hero-content">
        <h1>Atrévete a Bucear <span>este fin de año!</span></h1>
        <p>Expediciones y bautismos submarinos.</p>
        <div className="hero-btns">
          <BotonWhatsApp mensaje="Hola V/ADiver, quiero consultar por sus servicios de bautismos y expediciones submarinas." textoBoton="Agendar por WhatsApp" mostrarIcono={false} />
          <a href="#ofertas" className="btn-main btn-outline">Ver Expediciones</a>
        </div>
      </div>
    </header>
  );
}
