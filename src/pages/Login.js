import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../UserContext';
import './styles/Login.css';

function LoginForm() {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { user } = useUserContext();


  const handleSubmit = async (e) => {
    e.preventDefault();
// https://back-comunidad.vercel.app
    try {
      // Send the login data to the server for authentication
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if the login was successful based on the response from the backend
        if (data.success) {
          // Set the username in the UserContext
          setUser(data.user);

          // Display the welcome message using SweetAlert2
          Swal.fire({
            title: `Bienvenido, ${data.user.username}!`,
            icon: 'success',
            timer: 2000, // Automatically close the alert after 2 seconds
            showConfirmButton: false,
          });

          // Reset the form
          setUsername('');
          setPassword('');

          // Redirigir automáticamente después de 2 segundos a la ruta "/redirigiendo"
          setTimeout(() => {
            navigate('/redirigiendo');
          }, 2000); // Esperamos 2 segundos adicionales después de mostrar el mensaje
        } else {
          // Display an error message for incorrect login credentials
          Swal.fire({
            title: 'Lo siento',
            text: 'Credenciales no válidas',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } else {
        // Display an error message for failed login request
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al iniciar sesión',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      // Display an error message for failed login request
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error al iniciar sesión',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <>
      <div className="login-container-form">
        <form className="login-form" onSubmit={handleSubmit}>
          <br />
          <h3>Iniciar sesión</h3>
          <hr />
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <br />
          <br />
          <hr />
          <Link to="/" className="recuperation-password">
            Olvide la contraseña
          </Link>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
