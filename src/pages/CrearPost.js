import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { UserContext } from "../UserContext";
import Swal from "sweetalert2";
import "./styles/CrearPost.css";

export default function CrearPost() {
  const { userInfo } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [localidad, setLocalidad] = useState(""); // Agregada la categoría
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    // Obtiene el token de userInfo
    const tokenValue = userInfo.token;
    console.log("recuperado:", tokenValue);

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("profileAvatar", userInfo.profilePicture);
    data.set("localidad", localidad);
    console.log(data + " el formulario");
    try {
      const response = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        setRedirect(true);
        Swal.fire({
          icon: "success",
          title: "¡Post creado exitosamente!",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.log("Error creando el post:", response.status);
        Swal.fire({
          icon: "error",
          title: "¡Error al crear el post!",
          text: "Hubo un problema al crear el post. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    } catch (error) {
      console.log("Error creando el post:", error);
      Swal.fire({
        icon: "error",
        title: "¡Error al crear el post!",
        text: "Hubo un problema al crear el post. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="conteiner-crear-post">
      <form
        className="conteiner-crear-post-form"
        onSubmit={createNewPost}
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Resumen"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <div className="file-form-div">
          <input
            
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
          />
        </div>

        <br />
        <br />
        <hr />
        <select
          className="file-form-select"
          value={localidad}
          onChange={(ev) => setLocalidad(ev.target.value)}
        >
          <option value="">Selecciona la Localidad</option>
          <option value="Melincue">Melincue</option>
          <option value="Alcorta">Alcorta</option>
          <option value="Santa Teresa">Santa Teresa</option>
          <option value="Rosario">Rosario</option>
          <option value="SantaFe">Santa Fe</option>
        </select>
        <Editor value={content} onChange={setContent} />
        <button
          className="conteiner-crear-post-btn"
          style={{ marginTop: "5px" }}
        >
          Crear post
        </button>
        <br />
        <br />
        <br />
        <hr />
      </form>
    </div>
  );
}
