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
  DocumentData,
} from "firebase/firestore";
import { Premio } from "@/shared/types/users";

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

    if (querySnapshot.empty) {
      throw new Error("No such document");
    }

    // A bono that won more than once has one row per win in the Excel,
    // so keep the win data of every matching row, not only the first one.
    const rows = querySnapshot.docs.map((d) => d.data());
    const premios: Premio[] = rows.map((row) => ({
      fec_gan: String(row.fec_gan),
      pre_pen: String(row.pre_pen),
    }));

    const user: DocumentData = { ...rows[0], premios };
    return user;
  } catch (error: any) {
    console.error(error);
    throw new Error(error.message || "Error desconocido al iniciar sesión");
  }
};
