import { doc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const saveFavoritesToFirestore = async (userId, gameId, isFavorite) => {
  const userRef = doc(db, "users", userId);

  try {
    if (isFavorite) {
      await updateDoc(userRef, {
        favorites: arrayUnion(gameId),
      });
      console.log("Jogo adicionado aos favoritos no Firestore com sucesso!");
    } else {
      await updateDoc(userRef, {
        favorites: arrayRemove(gameId),
      });
      console.log("Jogo removido dos favoritos no Firestore com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao salvar o jogo favorito no Firestore:", error);
  }
};

export default saveFavoritesToFirestore;
