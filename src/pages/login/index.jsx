import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      if (user) {
        console.log(user);
        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }

  return (
    <>
      <div className="modal-container">
        <div className="modal-content">
          <h1>Login</h1>
          <form>
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              placeholder="seuemail@example.com"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              placeholder="********"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button" type="submit" onClick={handleSignIn}>
              Entrar
            </button>
            <div className="footer">
              <p>Você ainda não possui uma conta?</p>
              <Link to="/register">Criar conta</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
