interface BotonWhatsAppProps {
  mensaje: string;
  textoBoton: string;
  className?: string;
  mostrarIcono?: boolean;
}

export default function BotonWhatsApp({
  mensaje,
  textoBoton,
  className = "btn-main",
  mostrarIcono = true,
}: BotonWhatsAppProps) {
  const params = new URLSearchParams({
    phone: "56934114891",
    text: mensaje,
  });

  const url = ["https:", "", "api.whatsapp.com", "send"].join("/") + "?" + params.toString();

  const handleAbrir = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const ventana = window.open(url, "_blank");
    if (ventana) {
      e.preventDefault();
      ventana.opener = null;
    }
  };

  return (
    <a
      href={url}
      onClick={handleAbrir}
      className={className}
      style={{ textDecoration: "none" }}
    >
      {mostrarIcono && <i className="fa-brands fa-whatsapp"></i>} {textoBoton}
    </a>
  );
}



