import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import "./styles/SubirVideo.css";
import noVideoImage from "../assets/subida.png";
import okVideoImage from "../assets/nubeok.png";

const SubirVideo = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(noVideoImage);
  const [nombreVideo, setNombreVideo] = useState("");
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [videosSubidos, setVideosSubidos] = useState([]);
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [progress, setProgress] = useState(1); // Cambia el valor inicial a 1
  const [videoDuration, setVideoDuration] = useState(null);

  const handleNombreChange = (event) => {
    setNombreVideo(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      setNombreVideo(file.name);
      if (file.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setThumbnail(okVideoImage);
        };
        // Obtener la duración del video
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          setVideoDuration(video.duration);
        };
        video.src = URL.createObjectURL(file);
      } else {
        setThumbnail(noVideoImage);
      }
    }
  };
  const handleUpload = async () => {
    if (!videoFile) {
      Swal.fire("Error", "Por favor, selecciona un video", "error");
      return;
    }

    if (videosSubidos.length > 0) {
      const confirmResult = await Swal.fire({
        title: "¿Estás seguro?",
        text: `Deseas cargar ${videosSubidos[0].nombreArchivo} en lugar de ${videoFile.name}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      });

      if (!confirmResult.isConfirmed) {
        return;
      }
    }

    setShowProgressBar(true);
    setUploadInProgress(true);
    setUploadComplete(false);

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("nombreArchivo", nombreVideo || videoFile.name);

    try {
      // Calcula el progreso basado en el tamaño del video y la duración
      const totalSize = videoFile.size;
      let loadedSize = 0;
      const updateProgress = (loaded) => {
        loadedSize = loaded;
        const percentCompleted = Math.min(
          99,
          Math.round((loadedSize / totalSize) * 100)
        ); // Limita el progreso a 99
        setProgress(percentCompleted);
      };

      // Establece un evento de progreso para actualizar la barra de progreso
      formData.set("onUploadProgress", (progressEvent) => {
        updateProgress(progressEvent.loaded);
      });

      const response = await fetch("https://back-comunidad.vercel.app/subir-video", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setVideosSubidos([...videosSubidos, { nombreArchivo: videoFile.name }]);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Espera 1 segundo (puedes ajustar el tiempo según tus necesidades).
        setProgress(100);
        await Swal.fire(
          "Éxito",
          "El video se ha subido correctamente",
          "success"
        );
        setUploadComplete(true);
        setUploadInProgress(false);
        setVideoFile(null);
        setThumbnail(noVideoImage);
        setNombreVideo("");
        setShowProgressBar(false);
      } else {
        throw new Error("Error al subir el video");
      }
    } catch (error) {
      Swal.fire("Error", "Ha ocurrido un error al subir el video", "error");
      setUploadInProgress(false);
    }
  };

  
  const handleCancelUpload = () => {
    setShowProgressBar(false);
    setVideoFile(null);
    setNombreVideo("");
    setThumbnail(noVideoImage);
    setProgress(0);
    setUploadInProgress(false);

    // Verifica si el elemento .progress-bar existe antes de intentar acceder a su classList
    const progressBar = document.querySelector(".progress-bar");
    if (progressBar) {
      progressBar.classList.remove("loading");
    }
  };

  const handleEliminarVideo = (index) => {
    const nuevosVideosSubidos = [...videosSubidos];
    nuevosVideosSubidos.splice(index, 1);
    setVideosSubidos(nuevosVideosSubidos);
  };

  const inputRef = useRef(null);

  const openFileDialog = () => {
    inputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (videoFile) {
        const confirmResult = await Swal.fire({
          title: "¿Estás seguro?",
          text: "Deseas cambiar el video actual por el nuevo video arrastrado?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí",
          cancelButtonText: "No",
        });

        if (!confirmResult.isConfirmed) {
          return;
        }
      }

      setVideoFile(file);
      setNombreVideo(file.name);
      if (file.type.startsWith("video/")) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setThumbnail(okVideoImage);
        };
        // Obtener la duración del video
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => {
          setVideoDuration(video.duration);
        };
        video.src = URL.createObjectURL(file);
      } else {
        setThumbnail(noVideoImage);
      }
    }
  };

  useEffect(() => {
    // Si la duración del video es mayor que 30 segundos, actualiza el progreso gradualmente
    if (videoDuration && videoDuration > 30) {
      let currentProgress = 1;
      const interval = setInterval(() => {
        if (currentProgress < 99) {
          currentProgress += 1;
          setProgress(currentProgress);
        } else {
          clearInterval(interval);
        }
      }, (videoDuration - 30) * 10); // Aumenta el progreso cada 100 ms para completar en el tiempo restante
    }
  }, [videoDuration]);

  return (
    <div className="subirVideo" onDragOver={handleDragOver} onDrop={handleDrop}>
      <h2 className="subirVideo-titulo">
        {videoFile ? "Video cargado" : "Subir Video"}
      </h2>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={inputRef}
      />
      <div className="drag-drop">
        <div className="thumbnail">
          <img src={thumbnail} alt="Miniatura del video" />
        </div>
        {videoFile && (
          <button className="cancel-button" onClick={handleCancelUpload}>
            Cancelar
          </button>
        )}
        <div className="border-dot">
          <i className="fas fa-upload"></i>
          <p>Arrastra aquí el video</p>
        </div>
      </div>
      <input
        type="text"
        placeholder="Nombre del video"
        value={nombreVideo}
        onChange={handleNombreChange}
        className="input-nombre-video"
      />
      <button onClick={openFileDialog}>Seleccionar Video</button>
      <button onClick={handleUpload}>Guardar Video</button>

      {showProgressBar && (
        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              backgroundColor: `#71de43`, // Fondo verde
            }}
          ></div>
          {uploadComplete && (
            <button className="cancel-button" onClick={handleCancelUpload}>
              Cancelar
            </button>
          )}
        </div>
      )}

      {uploadInProgress && (
        <h2 className="subirVideo-progreso">Progreso: {progress}%</h2>
      )}

      <div className="videos-subidos">
        <h3 className="subirVideo-titulo">Videos Subidos</h3>
        <ul>
          {videosSubidos.map((video, index) => (
            <li key={index}>
              {video.nombreArchivo}{" "}
              <button
                className="subirVideo-eliminar"
                onClick={() => handleEliminarVideo(index)}
              >
                <span>X</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SubirVideo;
