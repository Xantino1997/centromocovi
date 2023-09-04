import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Comunidades.css";
import comunidad1 from "../assets/mocovi1.png";

const Comunidad = ({ nombre, localidad, telefono }) => (
  <div className="comunidad">
    <img src={comunidad1} alt={`Imagen de ${nombre}`} />
    <h1>{nombre}</h1>
    <p>Localidad: {localidad}</p>
    <p>Teléfono: {telefono || "No proporcionado"}</p>
    <Link to="/ver-comunidad">Ver Comunidad</Link>
  </div>
);

const Comunidades = () => {
  const [usuario, setUsuario] = useState(""); // Aquí deberías obtener el usuario actual
  const [comunidades, setComunidades] = useState([]);
  const [nuevaComunidad, setNuevaComunidad] = useState({
    nombre: "",
    localidad: "",
    telefono: "",
    imagenURL: "",
  });

  const agregarComunidad = () => {
    // Agregar lógica para agregar la comunidad a la lista
    // Asegúrate de validar si el usuario es Gali antes de habilitar esta función.
    const nuevaLista = [...comunidades, nuevaComunidad];
    setComunidades(nuevaLista);
    // Limpia el formulario después de agregar la comunidad
    setNuevaComunidad({
      nombre: "",
      localidad: "",
      telefono: "",
      imagenURL: "",
    });
  };

  return (
    <div className="container-comunidad">
      <h1>Comunidades</h1>
      {usuario === "Gali" && (
        <div>
          <h2>Agregar Comunidad</h2>
          <input
            type="text"
            placeholder="Nombre de la comunidad"
            value={nuevaComunidad.nombre}
            onChange={(e) =>
              setNuevaComunidad({ ...nuevaComunidad, nombre: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Localidad"
            value={nuevaComunidad.localidad}
            onChange={(e) =>
              setNuevaComunidad({
                ...nuevaComunidad,
                localidad: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={nuevaComunidad.telefono}
            onChange={(e) =>
              setNuevaComunidad({ ...nuevaComunidad, telefono: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="URL de la imagen"
            value={nuevaComunidad.imagenURL}
            onChange={(e) =>
              setNuevaComunidad({
                ...nuevaComunidad,
                imagenURL: e.target.value,
              })
            }
          />
          <button onClick={agregarComunidad}>Agregar Comunidad</button>
        </div>
      )}

      <div className="comunidades-list">
        {/* {comunidades.map((comunidad, index) => (
          <Comunidad
            key={index}
            nombre={comunidad.nombre}
            localidad={comunidad.localidad}
            telefono={comunidad.telefono}
          />
        ))} */}
        <>
          <div className="list-group">
            <img
              className="img-lista-comunidad"
              src={comunidad1}
              alt={`Imagen Comunidad`}
            />
            <div className="div-elementos-titulo">
              <h1>Alcorta</h1>
              <p>Localidad: Chovet</p>
              <p>Teléfono: {346544555 || "No proporcionado"}</p>
              <Link to="/ver-comunidad">Ver Comunidad</Link>
            </div>
          </div>
          <div className="list-group">
            <img
              className="img-lista-comunidad"
              src={comunidad1}
              alt={`Imagen Comunidad`}
            />
            <div className="div-elementos-titulo">
              <h1>Alcorta</h1>
              <p>Localidad: Chovet</p>
              <p>Teléfono: {346544555 || "No proporcionado"}</p>
              <Link to="/ver-comunidad">Ver Comunidad</Link>
            </div>
          </div>
          <div className="list-group">
            <img
              className="img-lista-comunidad"
              src={comunidad1}
              alt={`Imagen Comunidad`}
            />
            <div className="div-elementos-titulo">
              <h1>Alcorta</h1>
              <p>Localidad: Chovet</p>
              <p>Teléfono: {346544555 || "No proporcionado"}</p>
              <Link to="/ver-comunidad">Ver Comunidad</Link>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default Comunidades;
