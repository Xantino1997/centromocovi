import React, { useEffect, useState } from "react";
import "./styles/VerComunidad.css"; // Asegúrate de importar el archivo CSS correspondiente
import { Link, useNavigate } from "react-router-dom";

const VerComunidad = () => {
  const [comunidad, setComunidad] = useState(null);

  useEffect(() => {
    // Obtener los datos de la comunidad desde el localStorage
    const comunidadGuardada = localStorage.getItem("comunidadSeleccionada");

    if (comunidadGuardada) {
      const comunidadParsed = JSON.parse(comunidadGuardada);
      setComunidad(comunidadParsed);
    }
  }, []);

  return (
    <>
      <div className="ver-comunidad">
        <h1>Detalle de la Comunidad</h1>
        {comunidad ? (
          <>
            <img
              className="img-comunidad"
              src={comunidad.image} // Asegúrate de tener una URL de imagen en los datos de la comunidad
              alt={`Imagen de ${comunidad.nombre}`}
            />
            <div className="datos-comunidad">
              <h2>{comunidad.nombre}</h2>
              <p>{comunidad.resumen}</p>
              <p>Localidad: {comunidad.localidad}</p>
              <p>Teléfono: {comunidad.telefono || "No proporcionado"}</p>
            </div>
          </>
        ) : (
          <p>No se encontraron datos de la comunidad.</p>
        )}
      </div>
      <div className="div-retorno-comunidad">
        <Link to="/comunidades" className="retorno-comunidad">
          Regresar
        </Link>
      </div>
    </>
  );
};

export default VerComunidad;
