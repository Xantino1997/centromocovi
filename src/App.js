import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import About from './pages/About';
import ArticuloDiv from './pages/Noticias';
import CrearPost from './pages/CrearPost';
import Recuperar from './pages/RecuperarPass';
import Noticias from './pages/NoticiaCompleta';
import RegisterPage from './pages/RegisterPage';
import SubirVideo from './pages/SubirVideo';
import Comunidades from './pages/Comunidades';
import VerComunidad from './pages/VerComunidad';
// import CaptchaComponent from './pages/Captcha'; para agregar captcha comunidades de google
import PostDetail from './pages/PostDetalles';
import { UserContextProvider } from './UserContext';


import Layout from './Layout';
import LoginForm from './pages/Login';
import AnimatedCircle from './AnimatedCircle';
import './App.css';

function App() {
  return (
    <UserContextProvider> {/* el UserProvider aca envuelve todo */}
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/noticias" element={<ArticuloDiv />} />
            <Route path="/pagina-noticias" element={<Noticias />} />
            <Route path="/redirigiendo" element={<AnimatedCircle />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/post-detalles" element={<PostDetail />} />
            <Route path="/recuperar" element={<Recuperar />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/subir-video" element={<SubirVideo />} />
            <Route path="/crear-post" element={<CrearPost />} />
            <Route path="/comunidades" element={<Comunidades />} />
            <Route path="/ver-comunidad" element={<VerComunidad />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
