import "./Galeria.scss";
import { useState } from "react";

const FOTOS_GALERIA = Array.from({ length: 37 }, (_, i) => `/img/${i + 1}.jpg`);

export default function Galeria() {
  const [fotoActiva, setFotoActiva] = useState<string | null>(null);

  return (
    <section className="galeria-section" id="galeria">
      <h2 className="titulo-galeria">📸 Fotos</h2>

      <div className="galeria">
        {FOTOS_GALERIA.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Expedición Submarina V/ADiver ${index + 1}`}
            loading="lazy"
            onClick={() => setFotoActiva(src)}
          />
        ))}
      </div>

      {fotoActiva && (
        <div className="modal show" onClick={() => setFotoActiva(null)}>
          <img src={fotoActiva} alt="Vista ampliada V/ADiver" />
        </div>
      )}
    </section>
  );
}
