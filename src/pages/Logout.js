import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";

function Logout() {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Mostrar mensaje de despedida con SweetAlert2
        Swal.fire({
          title: `¡Hasta luego, ${user.username}!`,
          icon: "success",
          timer: 5000,
          showConfirmButton: false,
        }).then(() => {
          // Limpiar el usuario de UserContext
          setUser("");
          navigate('/redirigiendo');
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
  }, [user, setUser]);

  // El componente no necesita renderizar nada
  return null;
}

export default Logout;
