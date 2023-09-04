import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Comunidades.css";
import comunidad1 from "../assets/mocovi1.png";
import comunidad2 from "../assets/reunion1.png";
import comunidad3 from "../assets/reunion2.png";
import comunidad4 from "../assets/reunion3.png";
import comunidad5 from "../assets/reunion4.png";
import comunidad6 from "../assets/reunion5.png";
import comunidad7 from "../assets/reunion6.png";
import Swal from "sweetalert2";

const Comunidad = ({ nombre, localidad, telefono, resaltado }) => {
  const mostrarSweetAlert = () => {
    Swal.fire({
      title: "Carga de Datos",
      text: "Estamos terminando la carga de datos de la comunidad...",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const classNames = `comunidad ${resaltado ? "resaltado" : ""}`;

  return (
    <>
      <div className={classNames} id={nombre.toLowerCase()}>
        <img
          className="img-lista-comunidad"
          src={comunidad1}
          alt={`Imagen de ${nombre}`}
        />
        <div className="div-elementos-titulo" id="alcorta">
          <h1>{nombre}</h1>
          <p>Localidad: {localidad}</p>
          <p>Teléfono: {telefono || "No proporcionado"}</p>
          <Link to="/ver-comunidad" onClick={mostrarSweetAlert}>
            Ver Comunidad
          </Link>
        </div>
      </div>
      // <div className="texto-busqueda">
      //   <h1>Este es el resultado de los que aparecen en la lista</h1>
      // </div>
    </>
  );
};

const Comunidades = () => {
  const [usuario, setUsuario] = useState("");
  const [comunidades, setComunidades] = useState([]);
  const [nuevaComunidad, setNuevaComunidad] = useState({
    nombre: "",
    localidad: "",
    telefono: "",
    imagenURL: "",
  });
  const [busqueda, setBusqueda] = useState("");

  // Definir comunidadesEstaticas antes de filtrarComunidades
  const comunidadesEstaticas = [
    {
      id: "melincue",
      image:comunidad1,
      nombre: "Melincue",
      localidad: "Melincue",
      telefono: "346544555",
    },
    {
      id: "alcorta",
      image:comunidad2,
      nombre: "Alcorta",
      localidad: "Alcorta",
      telefono: "346544555",
    },
    {
      id: "santaTeresa",
      image:comunidad3,
      nombre: "Santa Teresa",
      localidad: "Santa Teresa ",
      telefono: "346544555",
    },
    {
      id: "sanMartinNorte",
      image:comunidad4,
      nombre: "San Martin Norte",
      localidad: "San Martin Norte",
      telefono: "346544555",
    },
    {
      id: "chovet",
      image:comunidad5,
      nombre: "Chovet",
      localidad: "Chovet",
      telefono: "346544555",
    },
    {
      id: "rosario",
      image:comunidad6,
      nombre: "Rosario",
      localidad: "Rosario",
      telefono: "346544555",
    },

    {
      id: "santaFe",
      image:comunidad7,
      nombre: "Santa Fe",
      localidad: "Santa Fe",
      telefono: "346544555",
    },
  ];

  const mostrarSweetAlert = () => {
    Swal.fire({
      title: "Estamos terminando de construir este link",
      icon: "info",
    });
  };

  // Función para ordenar comunidades estáticas en función de la búsqueda
  const ordenarComunidadesEstaticas = () => {
    const busquedaLowerCase = busqueda.toLowerCase();
    return comunidadesEstaticas.sort((a, b) => {
      if (a.id === busquedaLowerCase) return -1;
      if (b.id === busquedaLowerCase) return 1;
      return 0;
    });
  };
  const obtenerTotalComunidades = () => {
    const totalComunidades = comunidadesEstaticas.length;
    return totalComunidades;
  };
  useEffect(() => {
    const comunidadesFiltradas = filtrarComunidades();
    setComunidades(comunidadesFiltradas);
  }, [busqueda]);

  const filtrarComunidades = () => {
    if (!busqueda) {
      return [...comunidadesEstaticas];
    }

    return [...comunidadesEstaticas].filter((comunidad) => {
      const comunidadId = comunidad.nombre.toLowerCase();
      return comunidadId.includes(busqueda.toLowerCase());
    });
  };

  const agregarComunidad = () => {
    const nuevaLista = [...comunidades, nuevaComunidad];
    setComunidades(nuevaLista);
    setNuevaComunidad({
      nombre: "",
      localidad: "",
      telefono: "",
      imagenURL: "",
    });
  };

  return (
    <>
      <div className="container-sin-contenido"><p>No se puede mostrar contenido</p></div>
      <div className="container-comunidad">
        <h1>Comunidades</h1>
        {usuario && (
          <div>
            <h2>Agregar Comunidad</h2>
            {/* ... Input fields ... */}
            <button onClick={agregarComunidad}>Agregar Comunidad</button>
          </div>
        )}

        <div className="comunidades-list">
          <input
            className="busqueda-comunidad"
            type="text"
            placeholder="Buscar comunidad por nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {!busqueda && <p>Total comunidades: {obtenerTotalComunidades()}.</p>}
          {busqueda && comunidades.length === 0 && (
            <p>No se encontraron resultados que coincidan con la búsqueda.</p>
          )}
          {busqueda && comunidades.length > 0 && (
            <>
              <p>Mostrando {comunidades.length} resultados que coinciden:</p>
              {comunidades.map((comunidad, index) => (
                <Comunidad
                  key={index}
                  nombre={comunidad.nombre}
                  localidad={comunidad.localidad}
                  telefono={comunidad.telefono}
                  resaltado={true}
                />
              ))}
            </>
          )}

          {/* Divs estáticos */}
          {comunidadesEstaticas.map((comunidadEstatica, index) => (
            <div key={index} className="list-group">
              <img
                className="img-lista-comunidad"
                src={comunidadEstatica.image}
                alt={`Imagen Comunidad`}
              />
              <div className="div-elementos-titulo" id={comunidadEstatica.id}>
                <h1>{comunidadEstatica.nombre}</h1>
                <p>Localidad: {comunidadEstatica.localidad}</p>
                <p>
                  Teléfono: {comunidadEstatica.telefono || "No proporcionado"}
                </p>
                <Link to="" onClick={mostrarSweetAlert}>
                  Ver Comunidad
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comunidades;
