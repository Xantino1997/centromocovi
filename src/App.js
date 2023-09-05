import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Importamos el UserProvider desde el UserContext.js
import IndexPage from './pages/IndexPage';
import About from './pages/About';
import ArticuloDiv from './pages/Noticias';
import CrearPost from './pages/CrearPost';
import Noticias from './pages/NoticiaCompleta';
import RegisterPage from './pages/RegisterPage';
import Comunidades from './pages/Comunidades';
import VerComunidad from './pages/VerComunidad';

import Layout from './Layout';
import LoginForm from './pages/Login';
import Logout from './pages/Logout';
import AnimatedCircle from './AnimatedCircle';
import './App.css';

function App() {
  return (
    <UserProvider> {/* Colocamos el UserProvider aquí para que envuelva todo */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/noticias" element={<ArticuloDiv />} />
            <Route path="/pagina-noticias" element={<Noticias />} />
            <Route path="/redirigiendo" element={<AnimatedCircle />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/crear-post" element={<CrearPost />} />
            <Route path="/comunidades" element={<Comunidades />} />
            <Route path="/ver-comunidad" element={<VerComunidad />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
