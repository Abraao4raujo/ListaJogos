import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebaseConfig";

const handleRegister = async (email, password) => {
  try {
    // Realiza o registro do usuário com o Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Após o registro, cria um novo documento no Firestore para esse usuário
    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userRef, {
      favorites: [], // Inicializa o campo "favorites" como um array vazio
    });

    console.log("Usuário registrado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar o usuário:", error);
  }
};

export default handleRegister;