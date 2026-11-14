import "./Bautismos.scss";
import { useState, useEffect } from "react";
import { STAFF_GUIAS } from "../../config";

export default function Bautismos() {
  const [indiceActivo, setIndiceActivo] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndiceActivo((prev) => (prev + 1) % STAFF_GUIAS.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bautismos-slider-section" id="bautismos">
      <div className="slider-title-container">
        <span className="badge">STAFF CERTIFICADO</span>
        <h2>Nuestros <span>Guías e Instructores</span></h2>
        <p>Profesionales acreditados para garantizar una inmersión segura y memorable.</p>
      </div>
      <div className="guias-carousel-viewport">
        <div className="guias-horizontal-track" style={{ transform: `translateX(-${indiceActivo * 100}%)` }}>
          {STAFF_GUIAS.map((guia, idx) => (
            <div key={guia.id} className={`guia-slide-card ${idx === indiceActivo ? "active" : ""}`}>
              <img src={guia.foto} alt="" className="guia-bg-blur" />
              <img src={guia.foto} alt={guia.nombre} className="guia-bg-img" />
              <div className="guia-hud-legend">
                <div className="guia-header-row"><span className="guia-rank-badge">{guia.cargo}</span><span className="guia-id-tag">UNIT // 0{idx + 1}</span></div>
                <h3>{guia.nombre}</h3>
                <div className="guia-certs-list">{guia.certificaciones.map((cert, i) => <span key={i} className="cert-pill"><i className="fa-solid fa-shield-halved"></i> {cert}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
