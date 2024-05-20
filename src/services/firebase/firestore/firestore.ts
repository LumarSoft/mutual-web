import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
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
}