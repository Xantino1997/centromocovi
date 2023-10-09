import React, { useState, useEffect } from "react";
import "./styles/IndexPage.css";
import NewsCarousel from "./CarouselNoticias";
import mujerMocovi from "../assets/mujermocovi.png";
import { Link } from "react-router-dom";

const images = [
  {
    src: mujerMocovi,
    description: "Celebracion día de la Mujer Indigena",
  },
  {
    src: "https://www.ellitoral.com/images/2022/09/28/w-fdhQvna_870x580__1.jpg",
    description:
      "Celebración del 150 aniversario de la creación de la comunidad Mocoví de Colonia Dolores en el departamento San Justo.",
  },
  {
    src: "https://www.miradorprovincial.com/um/fotos/209093_pueblos_originarios_1024_x_600.jpg",
    description: "56 por ciento de los argentinos es de origen amerindio",
  },
];

function Carousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === images.length - 1 ? 0 : prevImage + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="carousel-index">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item-index ${
              index === currentImage ? "active" : ""
            }`}
            style={{
              backgroundImage: `url(${image.src})`,
              animationDelay: `${index * 0.8}s`,
            }}
          >
            <div className="carousel-content">
              <h5 className="carousel-content-h5">{image.description}</h5>
              <Link to="/pagina-noticias" className="carousel-btn">
                Ver Noticia
              </Link>
              <br />
              <hr style={{visibility:'hidden'}} />
            </div>
          </div>
        ))}
      </div>
      <NewsCarousel />
    </>
  );
}

export default Carousel;
