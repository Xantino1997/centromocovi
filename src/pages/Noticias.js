import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/ArticuloDiv.css";
import "./styles/NoticiaCompleta.css";

const ArticuloDiv = () => {
  const [currentLanguage, setCurrentLanguage] = useState("Español");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNews, setSelectedNews] = useState(null);
  const [posts, setPosts] = useState([]); // Estado para almacenar los posts
  const [currentCategory, setCurrentCategory] = useState("Noticias");
  const [videoId, setVideoId] = useState(""); // Estado para almacenar el ID del video de YouTube

  useEffect(() => {
    // Realiza una solicitud GET a la ruta /post en tu API
    fetch("https://back-comunidad.vercel.app/post")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de posts:", error);
      });
  }, []);

  const handleLanguageChange = () => {
    // Cambiar entre Español y Mocoví
    setCurrentLanguage(currentLanguage === "Español" ? "Mocoví" : "Español");
    setCurrentPage(1); // Restablece la página a la primera cuando cambias de idioma
  };

  const itemsPerPage = 3; // Número de noticias o videos por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const contenidoActual =
    currentCategory === "Noticias" ? posts.slice(startIndex, endIndex) : [];

  const totalItems =
    currentCategory === "Noticias" ? posts.length : 0; // Cambiar a 0 si no deseas contar los videos en la paginación
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

  const handleVerMasClick = (postId) => {
    // Navegar a la otra ruta con el ID en la URL
    // Puedes configurar esta ruta en tu archivo de enrutamiento
  };

  return (
    <div className="ArticuloDiv">
      <div className="botones">
        <button
          className={
            currentCategory === "Noticias" ? "active-boton" : "boton-gris"
          }
          onClick={() => {
            setCurrentCategory("Noticias");
            setVideoId(""); // Reiniciar el ID del video al cambiar a "Noticias"
          }}
        >
          Noticias
        </button>
        <button
          className={
            currentCategory === "Video" ? "active-boton" : "boton-gris"
          }
          onClick={() => {
            setCurrentCategory("Video");
            setVideoId("VhDlH-hvhfo"); // Establece aquí el ID del video de YouTube
          }}
        >
          Video
        </button>
        <button className="boton-idioma" onClick={handleLanguageChange}>
          Cambiar idioma ({currentLanguage})
        </button>
      </div>

      {contenidoActual.map((post) => (
        <div className="Item" key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.subtitulo}</p>
          <img src={post.cover} alt={post.title} />
          <p>{post.info}</p>
          <small>{post.localidad}</small>
          <br/>
          <Link
            className="link-noticias"
            to={`/pagina-noticias`} // Pasa el ID como parte de la URL
            onClick={() => handleVerMasClick(post._id)} // Llama a la función con el ID
          >
            Ver Más
          </Link>
        </div>
      ))}

      {/* Sección para mostrar la noticia seleccionada */}
      {selectedNews && (
        <div className="noticia-seleccionada">
          <h2>{selectedNews.titulo}</h2>
          <img src={selectedNews.image} alt={selectedNews.titulo} />
          <p>{selectedNews.contenido}</p>
        </div>
      )}

      {/* Sección para mostrar el video */}
      {currentCategory === "Video" && (
        <div className="video-container-noticias">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}

      {/* Paginación */}
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
