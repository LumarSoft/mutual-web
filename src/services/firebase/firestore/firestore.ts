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
  where,
  updateDoc,
} from "firebase/firestore";
import { app } from "../app";
import { toast } from "react-toastify";

export const firestore = getFirestore(app);


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

export const getDocumentsByField = async (
  collectionName: string,
  field: string,
  value: string
) => {
  const collectionRef = collection(firestore, collectionName);

  // Crear una consulta con un filtro para el campo y valor específicos
  const q = query(collectionRef, where(field, "==", value));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    // Mapear los documentos directamente sin necesidad de filtrar localmente
    const documents = querySnapshot.docs.map((doc) => doc.data());

    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Error fetching documents");
  }
};

export const filterWinningUsers = async (
  collectionName: string,
  field: string,
  value: string
) => {
  const collectionRef = collection(firestore, collectionName);

  // Crear una consulta con un filtro para el campo y valor específicos
  const q = query(collectionRef, where(field, "!=", value));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    // Mapear los documentos directamente sin necesidad de filtrar localmente
    const documents = querySnapshot.docs.map((doc) => doc.data());

    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Error fetching documents");
  }
};

export const newWinner = async (client: string, award: string) => {
  const collectionRef = collection(firestore, "users");
  const q = query(collectionRef, where("cliente", "==", client));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    const documents = querySnapshot.docs.map((doc) => doc.data());
    440902;
    console.log("Documentos encontrados: ", documents);

    if (documents[0].cuopen !== "0") {
      return toast.error(
        `El cliente tiene ${documents[0].cuopen} cuotas pendientes`
      );
    }

    const docId = querySnapshot.docs[0].id;
    const docRef = doc(firestore, "users", docId);

    const cantWin = parseInt(documents[0].ganador) + 1;

    await updateDoc(docRef, {
      ganador: cantWin.toString(),
      fec_gan: new Date().toLocaleDateString("es-ES"),
      pre_pen: award,
    });

    toast.success("Usuario ganador actualizado");
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Error fetching documents");
  }
};
