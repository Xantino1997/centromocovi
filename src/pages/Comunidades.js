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
    // Guardar los datos de la comunidad en el localStorage
    localStorage.setItem(
      "comunidadSeleccionada",
      JSON.stringify({ nombre, localidad, telefono })
    );

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
        <div className="div-elementos-titulo" id={nombre.toLowerCase()}>
          <h1>{nombre}</h1>
          <p>Localidad: {localidad}</p>
          <p>Teléfono: {telefono || "No proporcionado"}</p>
          <Link to="/ver-comunidad" onClick={mostrarSweetAlert}>
            Ver Comunidad
          </Link>
        </div>
      </div>
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
      image: comunidad1,
      nombre: "Melincue",
      localidad: "Melincue",
      telefono: "346544555",
      resumen:
        "La localidad de Melincue es un pueblo ubicado al sur de la provincia de Sta Fe, en su historia alberga un sin fin de momentos historicos dentro de los cuales muchos se escribieron con la tinta de la comunidad Mocovi...",
    },
    {
      id: "alcorta",
      image: comunidad2,
      nombre: "Alcorta",
      localidad: "Alcorta",
      telefono: "346544555",
      resumen:
        "Alcorta llamada tambien la cuna de la revolucion agraria a tenido una influencia relevante para el desarrollo del pais, sus tierras tambien tienen huellas de la diversidad de la cultura Mocovi, que yace dentro de un singular movimiento de querer revitalizar esa potente herencia de esta comunidad cuenta con un creciente numero de miembros ",
    },
    {
      id: "santaTeresa",
      image: comunidad3,
      nombre: "Santa Teresa",
      localidad: "Santa Teresa ",
      telefono: "346544555",
    },
    {
      id: "sanMartinNorte",
      image: comunidad4,
      nombre: "San Martin Norte",
      localidad: "San Martin Norte",
      telefono: "346544555",
    },
    {
      id: "chovet",
      image: comunidad5,
      nombre: "Chovet",
      localidad: "Chovet",
      telefono: "346544555",
    },
    {
      id: "rosario",
      image: comunidad6,
      nombre: "Rosario",
      localidad: "Rosario",
      telefono: "346544555",
    },

    {
      id: "santaFe",
      image: comunidad7,
      nombre: "Santa Fe",
      localidad: "Santa Fe",
      telefono: "346544555",
    },
  ];

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

  const [showScrollButton, setShowScrollButton] = useState(false);

  // Función para desplazarse al principio de la página
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Detectar el desplazamiento y mostrar/ocultar el botón
  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  // Agregar un event listener al cargar el componente
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

 

  return (
    <>
      <div className="container-sin-contenido">
        <p>No se puede mostrar contenido</p>
      </div>
      <div className="container-comunidad">
      {showScrollButton && (
          <div className="scroll-button" onClick={scrollToTop}>
            <span>&uarr;</span>
          </div>
        )}
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
                <Link
                  to="/ver-comunidad"
                  onClick={() => mostrarSweetAlert(comunidadEstatica)}
                >
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

const mostrarSweetAlert = (comunidadEstatica) => {
  const nombre = comunidadEstatica.nombre;
  const localidad = comunidadEstatica.localidad;
  const telefono = comunidadEstatica.telefono;
  const image = comunidadEstatica.image;
  const resumen = comunidadEstatica.resumen;

  // Guardar los datos de la comunidad en el localStorage
  localStorage.setItem(
    "comunidadSeleccionada",
    JSON.stringify({ nombre, localidad, telefono, image, resumen })
  );

  Swal.fire({
    title: "Carga de Datos",
    text: `Bienvenido a la comunidad ${localidad}`,
    icon: "info",
    timer: 2000,
    showConfirmButton: false,
  });
};

export default Comunidades;
