import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function Logout() {
  const { userInfo, setUserInfo } = UserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Obtener el token de las cookies y eliminarlo
        const token = "token"; // Nombre de la cookie del token

        // Obtener el token de las cookies
        const storedToken = document.cookie
          .split(";")
          .find((cookie) => cookie.trim().startsWith(`${token}=`));

        if (storedToken) {
          const token = storedToken.split("=")[1];
          // Eliminar la cookie
          document.cookie = `${token}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }

        // Mostrar mensaje de despedida con SweetAlert2
        Swal.fire({
          title: `¡Hasta luego, ${userInfo.username}!`,
          icon: "success",
          timer: 5000,
          showConfirmButton: false,
        }).then(() => {
          // Limpiar el usuario de UserContext (ajusta esto según tu implementación)
          setUserInfo(""); // Esto depende de cómo se implementó el contexto de usuario en tu aplicación
          navigate("/redirigiendo");
        });
      } catch (error) {
        console.error("Error:", error);
        // Mostrar mensaje de error si ocurre un error inesperado
        Swal.fire({
          title: "Error",
          text: "Ocurrió un error al cerrar sesión",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    // Llamamos a la función de logout automáticamente cuando el componente se monta
    handleLogout();
  }, [userInfo, setUserInfo, navigate]);

  // El componente no necesita renderizar nada
  return null;
}

export default Logout;
