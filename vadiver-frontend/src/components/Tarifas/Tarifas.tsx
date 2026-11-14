import "./Tarifas.scss";
import { useState } from "react";
import { TARIFAS_INMERSION } from "../../config";
import BotonWhatsApp from "../BotonWhatsApp";

export default function Tarifas() {
  const [modalidad, setModalidad] = useState<"individual" | "duo">("individual");
  return (
    <section className="tarifas-section" id="tarifas">
      <div className="tarifas-header">
        <span className="badge">VALORES PROMOCIONALES 2027 • DESCUENTO APLICADO</span>
        <h2>Tarifas de <span>Inmersión</span></h2>
        <p>Precios finales con descuento especial de temporada e IVA incluido.</p>
        <div className="tarifas-toggle-box">
          <button type="button" className={`toggle-pill ${modalidad === "individual" ? "active" : ""}`} onClick={() => setModalidad("individual")}>1 Persona</button>
          <button type="button" className={`toggle-pill ${modalidad === "duo" ? "active" : ""}`} onClick={() => setModalidad("duo")}>Pack Dúo (Ahorro Extra)</button>
        </div>
      </div>
      <div className="tarifas-grid">
        {TARIFAS_INMERSION.map((plan) => {
          const valorAntes = modalidad === "individual" ? plan.precioAntesIndividual : plan.precioAntesDuo;
          const valorActual = modalidad === "individual" ? plan.precioIndividual : plan.precioDuo;
          const desgloseIva = modalidad === "individual" ? plan.detalleIvaIndividual : plan.detalleIvaDuo;
          const etiquetaModalidad = modalidad === "individual" ? "1 Persona (Individual)" : "Pack Dúo (2 Personas)";
          const msg = `Hola V/ADiver, quiero reservar un cupo para ${plan.titulo} en modalidad ${etiquetaModalidad} por ${valorActual} CLP (${desgloseIva}).`;
          return (
            <div key={plan.id} className={`tarifa-card ${plan.destacado ? "is-featured" : ""}`}>
              <div className="tarifa-top-bar"><span className="tarifa-badge">{plan.badge}</span></div>
              <h3>{plan.titulo}</h3>
              <p className="tarifa-desc">{plan.subtitulo}</p>
              <div className="tarifa-price-display">
                <span className="price-old-tag">Valor normal: {valorAntes}</span>
                <div className="price-main-row"><span className="currency-tag">CLP</span><span className="price-number">{valorActual}</span><span className="price-unit">/ {modalidad === "individual" ? "buzo" : "2 buzos"}</span></div>
                <span className="iva-breakdown-tag">{desgloseIva}</span>
              </div>
              <ul className="tarifa-features">{plan.incluye.map((item, idx) => <li key={idx}><span>• {item}</span></li>)}</ul>
              <BotonWhatsApp mensaje={msg} textoBoton="Reservar Cupo" className="btn-main tarifa-cta-btn" mostrarIcono={false} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
