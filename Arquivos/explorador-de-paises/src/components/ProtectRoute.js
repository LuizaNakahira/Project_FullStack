import React from "react";
import { Route, Navigate, Routes } from "react-router-dom"; // Altere o import aqui
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token"); // Verifica se o token está presente
  console.log(":::ProtectedRoute:::");

  return (
    <Routes>
      <Route
        {...rest}
        element={
          isAuthenticated ? (
            <Component /> // Renderiza o componente se estiver autenticado
          ) : (
            <Navigate to="/login" /> // Redireciona para o login se não estiver autenticado
          )
        }
      />
    </Routes>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
