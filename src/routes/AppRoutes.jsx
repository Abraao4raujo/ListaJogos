import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../auth/login";
import RegisterPage from "../auth/register";
import ListaGames from "../ApiGame";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ListaGames />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
