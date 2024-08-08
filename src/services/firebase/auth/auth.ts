import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../app";
import { firestore } from "../firestore/firestore";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const auth = getAuth(app);

export const signInAsAdmin = async (
  email: string,
  password: string,
  loginAs: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const docRef = doc(firestore, loginAs, user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document");
    }
  } catch (error: any) {
    console.error(error);
    if (
      error.code === "auth/invalid-credential" ||
      error.code === "auth/wrong-password"
    ) {
      throw new Error("Credenciales inválidas");
    }
    throw new Error(error.message || "Error desconocido al iniciar sesión");
  }
};

export const signInAsUser = async (socioNumber: string, document: string) => {
  try {
    const q = query(
      collection(firestore, "users"),
      where("codigo", "==", socioNumber),
      where("documento", "==", document)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      throw new Error("No such document");
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Error desconocido al iniciar sesión");
  }
};
