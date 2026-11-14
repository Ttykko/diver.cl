import "./Expediciones.scss";
import React, { useState, useEffect, useRef } from "react";
import { EXPEDICIONES_HORIZONTALES, Expedicion } from "../../config";
import BotonWhatsApp from "../BotonWhatsApp";

function TarjetaExpedicion({ exp, delayInicial = 0, onAbrirGaleriaSpot }: { exp: Expedicion; delayInicial?: number; onAbrirGaleriaSpot: (exp: Expedicion, idx?: number) => void }) {
  const [leftSlide, setLeftSlide] = useState(0);
  const [rightSlide, setRightSlide] = useState(0);
  const [pausado, setPausado] = useState(false);
  const touchStartY = useRef(0);
  const totalLeft = exp.fotos.length;
  const totalRight = exp.tips.length;
  const fotosDerecha = exp.fotos.slice(5).concat(exp.fotos.slice(0, 5));

  useEffect(() => {
    if (pausado) return;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => { interval = setInterval(() => setLeftSlide((prev) => (prev + 1) % totalLeft), 2800); }, delayInicial);
    return () => { clearTimeout(timeout); if (interval) clearInterval(interval); };
  }, [pausado, totalLeft, delayInicial]);

  useEffect(() => {
    if (pausado) return;
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => { interval = setInterval(() => setRightSlide((prev) => (prev + 1) % totalRight), 6500); }, delayInicial + 1500);
    return () => { clearTimeout(timeout); if (interval) clearInterval(interval); };
  }, [pausado, totalRight, delayInicial]);

  const handleTouchStart = (e: React.TouchEvent) => { setPausado(true); touchStartY.current = e.touches.clientY; };
  const handleTouchEnd = (e: React.TouchEvent, lado: "izq" | "der") => {
    const diff = touchStartY.current - e.changedTouches.clientY;
    if (Math.abs(diff) > 35) {
      const dir = diff > 0 ? 1 : -1;
      if (lado === "izq") setLeftSlide((prev) => (prev + dir + totalLeft) % totalLeft);
      else setRightSlide((prev) => (prev + dir + totalRight) % totalRight);
    }
    setTimeout(() => setPausado(false), 3000);
  };

  const valorDestino = exp.nombre === "ISLA LAGARTIJA" ? "$119.000 CLP (Neto $100.000 + $19.000 IVA)" : "$101.150 CLP (Neto $85.000 + IVA)";
  const mensajePromo = `Hola V/ADiver, quiero reservar la promo de temporada:\n- Destino: ${exp.nombre} (${exp.ubicacion})\n- Descuento: -15% OFF\n- Valor: ${valorDestino}`;

  return (
    <div className="tarjeta-horizontal" onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
      <div className="col-slider-img" onTouchStart={handleTouchStart} onTouchEnd={(e) => handleTouchEnd(e, "izq")}>
        <span className="hud-counter-badge">{String(leftSlide + 1).padStart(2, "0")} / {String(totalLeft).padStart(2, "0")}</span>
        {exp.fotos.map((foto, i) => (
          <div key={i} className={`fade-up-item ${i === leftSlide ? "active" : ""}`} onClick={() => onAbrirGaleriaSpot(exp, i)} style={{ cursor: "pointer" }}>
            <img src={foto} alt={`${exp.nombre} ${i + 1}`} loading="lazy" />
          </div>
        ))}
        <div className="hud-progress-bar"><div className="hud-progress-fill" style={{ width: `${((leftSlide + 1) / totalLeft) * 100}%` }} /></div>
      </div>
      <div className="col-centro-info">
        <span className="promo-pill">-15% OFF TEMPORADA</span>
        <h3>{exp.nombre}</h3>
        <span className="ubicacion-sub">{exp.ubicacion}</span>
        <button type="button" className="btn-explorar-30" onClick={() => onAbrirGaleriaSpot(exp, leftSlide)}>Explorar {totalLeft} Fotos</button>
        <BotonWhatsApp mensaje={mensajePromo} textoBoton="Reservar Promo" mostrarIcono={false} />
      </div>
      <div className="col-slider-tips" onTouchStart={handleTouchStart} onTouchEnd={(e) => handleTouchEnd(e, "der")}>
        {exp.tips.map((tip, i) => (
          <div key={i} className={`fade-up-item tip-slide-card ${i === rightSlide ? "active" : ""}`} onClick={() => onAbrirGaleriaSpot(exp, (i + 5) % totalLeft)} style={{ cursor: "pointer" }}>
            <img src={fotosDerecha[i % fotosDerecha.length]} alt="" className="tips-bg-photo" loading="lazy" />
            <div className="tips-hud-overlay"><h4>{tip.titulo}</h4><p>{tip.texto}</p></div>
          </div>
        ))}
        <div className="vertical-dots-nav">{exp.tips.map((_, i) => <span key={i} className={`v-dot ${i === rightSlide ? "active" : ""}`} onClick={() => setRightSlide(i)} />)}</div>
      </div>
    </div>
  );
}

export default function Expediciones() {
  const [spotActivo, setSpotActivo] = useState<Expedicion | null>(null);
  const [fotoIndex, setFotoIndex] = useState(0);
  const abrirBoveda = (exp: Expedicion, idx = 0) => { setSpotActivo(exp); setFotoIndex(idx); };
  const cambiarFoto = (dir: number) => { if (spotActivo) setFotoIndex((prev) => (prev + dir + spotActivo.fotos.length) % spotActivo.fotos.length); };

  return (
    <section className="ofertas-mes-section" id="ofertas">
      <div className="ofertas-header">
        <span className="pulse-badge">EXCLUSIVO DE ESTE MES</span>
        <h2>¡Aprovecha las Ofertas de Temporada!</h2>
        <p>Explora las bitácoras fotográficas completas de cada expedición.</p>
      </div>
      <div className="expediciones-horizontales-list">
        {EXPEDICIONES_HORIZONTALES.map((exp, index) => <TarjetaExpedicion key={exp.id} exp={exp} delayInicial={index * 900} onAbrirGaleriaSpot={abrirBoveda} />)}
      </div>
      {spotActivo && (
        <div className="boveda-modal-overlay" onClick={() => setSpotActivo(null)}>
          <div className="boveda-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="boveda-top-bar">
              <div><span className="boveda-tag">BITÁCORA FOTOGRÁFICA • {spotActivo.ubicacion}</span><h3>{spotActivo.nombre}</h3></div>
              <div className="boveda-actions">
                <span className="boveda-counter">{String(fotoIndex + 1).padStart(2, "0")} / {String(spotActivo.fotos.length).padStart(2, "0")}</span>
                <button className="boveda-close-btn" onClick={() => setSpotActivo(null)}>✕</button>
              </div>
            </div>
            <div className="boveda-main-stage">
              <button className="boveda-nav-btn prev" onClick={() => cambiarFoto(-1)}>❮</button>
              <img src={spotActivo.fotos[fotoIndex]} alt={spotActivo.nombre} />
              <button className="boveda-nav-btn next" onClick={() => cambiarFoto(1)}>❯</button>
            </div>
            <div className="boveda-thumbs-strip">{spotActivo.fotos.map((thumb, idx) => <img key={idx} src={thumb} alt="" className={idx === fotoIndex ? "active" : ""} onClick={() => setFotoIndex(idx)} loading="lazy" />)}</div>
          </div>
        </div>
      )}
    </section>
  );
}
