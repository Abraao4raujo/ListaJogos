import React from "react";
import { auth } from "../services/firebaseConfig";
import "./logoutButton.css";

const LogoutButton = () => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        alert("Você foi desconectado");
      })
      .catch((error) => {
        console.error("Ocorreu algum erro ao desconectar", error);
      });
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Sair
    </button>
  );
};

export default LogoutButton;
