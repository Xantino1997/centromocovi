<<<<<<< HEAD
import { useState } from "react";
import "./styles/RegisterPage.css";
import profileAvatar from "../assets/user.png";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Agregar estado para el correo electrónico
  const [profilePicture, setProfilePicture] = useState(null);

  async function register(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append(
      "email", // Agregar el correo electrónico al formData
      email
    );
    formData.append(
      "profilePicture",
      profilePicture
        ? profilePicture
        : await fetch("/user.png").then((r) => r.blob())
    );

    try {
      const response = await fetch("https://back-comunidad.vercel.app/register", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Registration successful",
        }).then(() => {
          console.log("User document:", data.user);
          // Redirigir a la parte de inicio (puedes cambiar la ruta según tus necesidades)
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred during registration",
      });
    }
  }

  function handleProfilePictureChange(event) {
    setProfilePicture(event.target.files[0]);
  }

  function handleChooseFile() {
    document.getElementById("fileInput").click();
  }

  function handleFocus(ev) {
    ev.target.classList.add("slide-up");
  }

  function handleBlur(ev) {
    if (ev.target.value === "") {
      ev.target.classList.remove("slide-up");
    }
  }

  return (
    <>
      <div className="register-container">
        <form className="register-form" onSubmit={register}>
          <h1>Register</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="register-username"
            onChange={(ev) => setUsername(ev.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="register-password"
            onChange={(ev) => setPassword(ev.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <input
            type="text"
            placeholder="Email" // Campo de entrada para el correo electrónico
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button type="button" onClick={handleChooseFile}>
            Choose Profile Picture
          </button>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
          <div className="profile-picture-div">
            <img
              src={
                profilePicture
                  ? URL.createObjectURL(profilePicture)
                  : profileAvatar
              }
              alt="Profile"
              className="porfile-picture-default"
            />
          </div>
          <button className="btn-register">Register</button>
          <br />
          <br />
          <br />
        </form>
      </div>
    </>
  );
}
=======
import { useState } from "react";
import "./styles/RegisterPage.css"
import profileAvatar from "../assets/user.png"

import Swal from "sweetalert2";
export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  async function register(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append(
      "profilePicture",
      profilePicture
        ? profilePicture
        : await fetch("/user.png").then((r) => r.blob())
    );

    try {
      const response = await fetch("https://back-comunidad.vercel.app/register", {
        method: "POST",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        Swal.fire({
          icon: "success",
          title: "Registration successful",
        }).then(() => {
          console.log("User document:", data.user);
          // Redirigir a la parte de inicio (puedes cambiar la ruta según tus necesidades)
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
        });
      }
    } catch (error) {
      console.log("Error:", error);
      Swal.fire({
        icon: "error",
        title: "An error occurred during registration",
      });
    }
  }

  function handleProfilePictureChange(event) {
    setProfilePicture(event.target.files[0]);
  }

  function handleChooseFile() {
    document.getElementById("fileInput").click();
  }

  function handleFocus(ev) {
    ev.target.classList.add("slide-up");
  }

  function handleBlur(ev) {
    if (ev.target.value === "") {
      ev.target.classList.remove("slide-up");
    }
  }

  return (
    <>
      <div className="register-container">
        <form className="register-form" onSubmit={register}>
          <h1>Register</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            className="register-username"
            onChange={(ev) => setUsername(ev.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="register-password"
            onChange={(ev) => setPassword(ev.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <button type="button" onClick={handleChooseFile}>
            Choose Profile Picture
          </button>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleProfilePictureChange}
          />
          <div className="profile-picture-div">
          <img
            src={
              profilePicture ? URL.createObjectURL(profilePicture) : profileAvatar
            }
            alt="Profile"
            className="porfile-picture-default"
          />
          </div>
          <button className="btn-register">Register</button>
          <br />
          <br />
          <br />
        </form>
      </div>
    </>
  );
}
>>>>>>> 37c2c2505fb9bb7e0a2143406f03857d08b97dfd
