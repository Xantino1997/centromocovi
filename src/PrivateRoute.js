import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {createContext, useState} from "react";
export const PrivateRoute = createContext({});

export function PrivateRoute({ element, path }) {
  const { user } = useUserContext(); // Usa useUserContext para acceder al contexto de usuario

  if (!user) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si el usuario está autenticado, muestra el elemento de la ruta
  return <Route path={path} element={element} />;
}

