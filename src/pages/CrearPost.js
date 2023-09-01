import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../Editor";
import { UserContext } from "../UserContext";
import "./styles/CrearPost.css";


export default function CrearPost() {
  const { userInfo } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    data.set("profileAvatar", userInfo.profilePicture);

    try {
      const storedToken = document.cookie
        .split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith("token="));

      if (storedToken) {
        const [, tokenValue] = storedToken.split("=");

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
        } else {
          console.log("Error creating post:", response.status);
        }
      } else {
        console.log("Token not found.");
      }
    } catch (error) {
      console.log("Error creating post:", error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="conteiner-crear-post">
      <form className="conteiner-crear-post-form" onSubmit={createNewPost}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(ev) => setSummary(ev.target.value)}
        />
        <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
        <Editor  value={content} onChange={setContent} />
        <button className="conteiner-crear-post-btn" style={{ marginTop: "5px" }}>Create your post</button>
        <br />
        <br />
        <br />
        <hr />
      </form>
    </div>
  );
}
