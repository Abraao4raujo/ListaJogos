import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

const getUserDocument = async (userId) => {
  const userRef = doc(db, "users", userId);
  try {
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
    return null;
  }
};

export default getUserDocument;