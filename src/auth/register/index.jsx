import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        email,
        password
      );

      if (userCredential && userCredential.user) {
        const newUser = userCredential.user;

        // Adicionar um novo documento ao Firestore para o usuário com a propriedade "favorites" vazia
        await setDoc(doc(db, "users", newUser.uid), {
          favorites: [],
        });

        navigate("/");
      }
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <>
      <div className="modal-container">
        <div className="modal-content">
          <h1>Cadastro</h1>
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
              Cadastrar
            </button>
            <div className="footer">
              <p>Você já possui uma conta?</p>
              <Link to="/login">Acessar conta</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
