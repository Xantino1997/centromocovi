import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import "./styles/Login.css";

import { UserContext } from "../UserContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Nuevo estado

  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(`https://back-comunidad.vercel.app/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((data) => {
        setUserInfo(data);
        const token = data.token;
        document.cookie = `token=${token}; path=/`; // Guardar el token en la cookie
        setRedirect(true);
        Swal.fire({
          title: `Bienvenido, ${data.username}!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setUsername("");
        setPassword("");
      });
    } else {
      Swal.fire({
        title: "Lo siento",
        text: "Credenciales no válidas",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  useEffect(() => {
    const storedToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (storedToken) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="login-container-form">
        <form className="login-form" onSubmit={login}>
          <br />
          <hr />
          <h3>Iniciar sesión</h3>
          <hr />
          <label htmlFor="username">Username:</label>
          <div className="mostrar-ocultar">
            <input
              className="change-mail-input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <label htmlFor="password">Password:</label>
          <div className="mostrar-ocultar">
            <input
              className="change-mail-input"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off" 
              onPaste={(e) => e.preventDefault()} 
            />
          </div>
          <button
            className="mostrar-ocultar-button"
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Cambiar el estado al hacer clic
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
          <button className="login-form-button" type="submit">
            Login
          </button>
          <br />
          <br />
          <hr />
          <Link to="/recuperar" className="recuperation-password">
            Olvidé la contraseña
          </Link>
        </form>
      </div>
    </>
  );
}
