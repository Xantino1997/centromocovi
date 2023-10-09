import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./styles/RecuperarPass.css";
import { Link, Navigate } from "react-router-dom";

export default function RecuperarPass() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [sentToken, setSentToken] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("recuperarToken");
    if (storedToken) {
      setSentToken(storedToken);
    }
  }, []);

  const generateRandomToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendToken = () => {
    if (email) {
      const newToken = generateRandomToken();
      setSentToken(newToken);
      localStorage.setItem("recuperarToken", newToken);

      setTimeout(() => {
        localStorage.removeItem("recuperarToken");
      }, 2 * 60 * 1000);

      fetch("https://back-comunidad.vercel.app/recuperar-password", {
        method: "POST",
        body: JSON.stringify({ email, token: newToken }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Token enviado al correo",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error al enviar el token",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error al enviar el token",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Por favor, ingresa un correo electrónico",
      });
    }
  };

  const handleVerifyToken = () => {
    const storedToken = localStorage.getItem("recuperarToken");
    if (typeof storedToken === "string") {
      const trimmedToken = token.trim();
      const trimmedSentToken = storedToken.trim();

      if (trimmedToken === trimmedSentToken) {
        Swal.fire({
          icon: "success",
          title: "Token válido",
        });
        setIsTokenValid(true);
        localStorage.removeItem("recuperarToken");
      } else {
        Swal.fire({
          icon: "error",
          title: "Token incorrecto",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error al verificar el token",
      });
    }
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        Swal.fire({
          icon: "error",
          title:
            "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.",
        });
        return;
      }

      fetch("http://localhost:4000/cambiar-password", {
        method: "PUT",
        body: JSON.stringify({ email, newPassword, token: sentToken }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Contraseña cambiada con éxito",
            }).then(() => {
              setRedirect(true);
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error al cambiar la contraseña",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error al cambiar la contraseña",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Las contraseñas no coinciden",
      });
    }
  };

  const handleCloseModal = () => {
    return <a />;
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="recover-password-container">
      <h1>Recuperar Contraseña</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Ingresa tu mail de logeo:</label>
          <input
            className="change-mail-input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <button type="button" onClick={handleSendToken}>
            Enviar Token
          </button>
        </div>
      </form>
      {sentToken && (
        <div className="verify-token-container">
          <h2>Verificar Token</h2>
          <div className="form-group">
            <label htmlFor="token">Token del correo:</label>
            <input
              className="change-mail-input"
              type="text"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button type="button" onClick={handleVerifyToken}>
              Verificar Token
            </button>
          </div>
        </div>
      )}

      {isTokenValid && (
        <div className="cambio-passwords-container">
          <div className="change-password-container">
            <h2 className="change-password-title">Cambiar Contraseña</h2>
            <div className="form-group">
              <label htmlFor="newPassword">Nueva Contraseña:</label>
              <br />
              <input
                className="change-password-input"
                type={showPassword ? "text" : "password"}
                autoFocus
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <br />
              <input
                className="change-password-input"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button type="button" onClick={handleChangePassword}>
                Cambiar Contraseña
              </button>
            </div>
            <div className="form-group">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
              </button>
            </div>
            <div className="div-close-button">
              <Link className="close-link" to="/redirigiendo">
                Regresar
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
