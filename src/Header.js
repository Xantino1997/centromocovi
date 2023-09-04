import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Swal from "sweetalert2";
import "./styles/Header.css";

function Header() {
  const { user } = useUserContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto o cerrado

  const handleImageClick = () => {
    Swal.fire({
      icon: "info",
      title: "¿Deseas editar tu perfil?",
      showCancelButton: true,
      confirmButtonText: "Editar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir a la página de edición de perfil usando useNavigate
        navigate("/register");
      }
    });
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Cambiar el estado para abrir o cerrar el menú
  };
  return (
    <header className="header">
      <div className="logo">
        <img
          className="logo-img"
          alt="Logo"
          src="data:image/jpeg;base64,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"
        />
      </div>
      
      <nav className={`menu ${isMenuOpen ? "active" : ""}`}>
        {/* Botón para cerrar el menú */}
        {isMenuOpen && (
          <button className="btn-menu-header" onClick={handleMenuToggle}>
            Cerrar
          </button>
        )}
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/sobre-nosotros">Sobre Nosotros</Link>
          </li>
          <li>
            <Link to="/noticias">Noticias</Link>
          </li>
          <li>
            <Link to="/comunidades">Comunidades</Link>
          </li>
          {/* <li>
                      <Link to="/comunidad">Comunidad</Link>
                    </li> */}
          {!user && (
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link to="/crear-noticias">Crear Noticias</Link>
              </li>
              <li>
                <Link to="/crear-post">Crear Post</Link>
              </li>
              <li>
                <Link to="logout">Logout</Link>
              </li>
              <div className="autor-info-header">
                <img
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "data:image/png;base64,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"
                  } // Aquí poner la ruta de la imagen de perfil o una imagen por defecto si no hay
                  alt="Autor"
                  className="autor-info-header-img"
                  onClick={handleImageClick}
                />
                <p className="autor-info-header-parrafo">{user.username}</p>
                <Link className="autor-info-header-register"  onClick={handleImageClick}>
                  <p style={{ color: "white" }}>Editar</p>
                </Link>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setSelectedImage(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </>
          )}
        </ul>
      </nav>
      {/* Botón para desplegar el menú */}
      {!isMenuOpen && (
        <button className="btn-menu-header-open" onClick={handleMenuToggle}>
          Menú
        </button>
      )}
    </header>
  );
}

export default Header;
