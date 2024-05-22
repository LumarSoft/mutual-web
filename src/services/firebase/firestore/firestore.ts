import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { app } from "../app";

export const firestore = getFirestore(app);

// para obtener toda una coleccion

export const getCollection = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(firestore, collectionName));
  const data = querySnapshot.docs.map((doc) => doc.data());
  return data;
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  await deleteDoc(doc(firestore, collectionName, docId));
};

// obtener la coleccion de raffles y ordenarlos por fecha de forma descendente para obtener el ultimo sorteo realizado
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
