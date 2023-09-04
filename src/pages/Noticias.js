import React, { useState } from "react";
import "./styles/ArticuloDiv.css";
import reunion4 from "../assets/reunion4.png";
import { Link } from "react-router-dom";

const ArticuloDiv = () => {
  const [currentCategory, setCurrentCategory] = useState("Noticias");
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [activeButton, setActiveButton] = useState("Noticias"); // Estado para el botón activo

  const handleDotClick = (categoria) => {
    setCurrentCategory(categoria);
    setCurrentPage(1); // Restablece la página a la primera cuando cambias de categoría
    setActiveButton(categoria);
  };

  const handleLanguageChange = () => {
    setCurrentLanguage(currentLanguage === "English" ? "Español" : "English");
    setCurrentPage(1); // Restablece la página a la primera cuando cambias de idioma
  };

  const articulos = {
    English: {
      Noticias: [
        {
          id: 1,
          titulo: "Entrega personalidad juridica",
          subtitulo: "Hito para San Martin Norte",
          info: "Se hizo entrega de la personalidad juridica...",
          image: reunion4,
        },
      ],
      Video: [
        {
          id: 1,
          titulo: "Video 1",
          subtitulo: "Subtítulo para Video 1",
          info: "Breve información sobre el Video 1...",
          videoId: "VhDlH-hvhfo", // ID del video de YouTube
        },
      ],
    },
    Español: {
      Noticias: [
        {
          id: 1,
          titulo: "News 1",
          subtitulo: "Subtitle for News 1",
          info: "Brief information about News 1...",
          image: reunion4,
        },
      ],
      Video: [
        {
          id: 1,
          titulo: "Video 1",
          subtitulo: "Subtitle for Video 1",
          info: "Brief information about Video 1...",
          videoId: "VhDlH-hvhfo", // ID del video de YouTube

        },
      ],
    },
  };

  const itemsPerPage = 3; // Número de noticias o videos por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const contenidoActual = articulos[currentLanguage][currentCategory].slice(
    startIndex,
    endIndex
  );

  const totalItems = articulos[currentLanguage][currentCategory].length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="ArticuloDiv">
      <div className="botones">
        <button
          className={
            activeButton === "Noticias" ? "active-boton" : "boton-gris"
          }
          onClick={() => handleDotClick("Noticias")}
        >
          Noticias
        </button>
        <button
          className={activeButton === "Video" ? "active-boton" : "boton-gris"}
          onClick={() => handleDotClick("Video")}
        >
          Video
        </button>
        {/* <button className="boton-idioma" onClick={handleLanguageChange}>
          Cambiar idioma
        </button> */}
      </div>
      {contenidoActual.map((item) => (
        <div className="Item" key={item.id}>
          <h2>{item.titulo}</h2>
          <p>{item.subtitulo}</p>
          <p>{item.info}</p>
          {currentCategory === "Video" && (
            <iframe
              className="video-container-noticias"
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${item.videoId}`}
              title={item.titulo}
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          )}
          {currentCategory === "Noticias" && (
            <>
              <hr />
              <div className="container-noticias">
                <img
                  className="img-informe-noticia"
                  src={item.image}
                  alt={item.titulo}
                />
                <Link className="link-noticias" to="/pagina-noticias">
                  Ver Mas
                </Link>
              </div>
            </>
          )}
        </div>
      ))}
      <div className="Paginacion">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ArticuloDiv;
