import React from "react";
import { auth } from "../services/firebaseConfig";

const LogoutButton = () => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        // Logout successful logic...
        console.log("User logged out successfully!");
      })
      .catch((error) => {
        // Handle logout error...
        console.error("Error occurred during logout:", error);
      });
  };

  return <button onClick={handleLogout}>Deslogar</button>;
};

export default LogoutButton;
