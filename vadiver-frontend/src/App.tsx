import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Expediciones from "./components/Expediciones/Expediciones";
import Bautismos from "./components/Bautismos/Bautismos";
import Tarifas from "./components/Tarifas/Tarifas";
import Galeria from "./components/Galeria/Galeria";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Expediciones />
      <Bautismos />
      <Tarifas />
      <Galeria />
      <Footer />
    </>
  );
}
