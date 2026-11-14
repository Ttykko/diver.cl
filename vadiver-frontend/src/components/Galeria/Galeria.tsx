import "./Galeria.scss";
import { useState } from "react";
import { FOTOS_GALERIA } from "../../config";

export default function Galeria() {
  const [modalImg, setModalImg] = useState<string | null>(null);
  return (
    <>
      <section className="galeria-section" id="galeria">
        <h1 className="titulo-galeria">📸 Fotos</h1>
        <div className="galeria">{FOTOS_GALERIA.map((ruta, i) => <img key={i} src={ruta} alt={`V/ADiver ${i + 1}`} loading="lazy" onClick={() => setModalImg(ruta)} />)}</div>
      </section>
      {modalImg && <div className="modal show" onClick={() => setModalImg(null)}><img src={modalImg} alt="Vista ampliada" /></div>}
    </>
  );
}
