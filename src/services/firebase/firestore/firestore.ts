import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { app } from "../app";

export const firestore = getFirestore(app);

export const getCollection = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  await deleteDoc(doc(firestore, collectionName, docId));
};

export const getLastRaffle = async () => {
  try {
    const q = query(
      collection(firestore, "raffles"),
      orderBy("date", "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const lastRaffleDoc = querySnapshot.docs[0];
      return lastRaffleDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el último sorteo:", error);
    return null;
  }
};

export const newDocument = async (collectionName: string, data: object) => {
  try {
    await setDoc(doc(firestore, collectionName), data);
    console.log("Documento creado en la colección: ", collectionName);
  } catch (e) {
    console.error("Error creando documento: ", e);
  }
};

export const updateDocument = async (
  collectionName: string,
  docId: string,
  data: object
) => {
  try {
    await setDoc(doc(firestore, collectionName, docId), data);
    console.log("Documento actualizado con ID: ", docId);
  } catch (e) {
    console.error("Error actualizando documento: ", e);
  }
};
