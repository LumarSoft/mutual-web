import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  query,
  orderBy,
  limit,
  where,
  updateDoc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { app } from "../app";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

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

export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    await deleteDoc(doc(firestore, collectionName, docId));
    console.log("Documento eliminado con ID: ", docId);
  } catch (e) {
    console.error("Error eliminando documento: ", e);
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




export const uploadExcelInFirestore = async (file: File) => {
  try {
    const fileReader = new FileReader();

    const promise = new Promise((resolve, reject) => {
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (!e.target) {
          return reject("Error al leer el archivo");
        }

        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    const data = await promise;

    // Ahora una vez que ya tenemos todos los datos en JSON, procedemos a actualizar la colección de usuarios de Firestore.
    const batch = writeBatch(firestore); // Usamos writeBatch para crear una instancia de batch
    const usersCollectionRef = collection(firestore, "usuarios");

    for (const record of data) {
      const docRef = doc(usersCollectionRef, record.id); // Suponiendo que el documento tiene una propiedad 'id' que utilizamos como ID de documento

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Actualiza el documento existente
        batch.update(docRef, record);
      } else {
        // Crea un nuevo documento si no existe
        batch.set(docRef, record);
      }
    }

    await batch.commit();
    toast.success("Datos actualizados en Firestore correctamente");
  } catch (error) {
    toast.error("Error al actualizar los datos en Firestore: " + error.message);
    console.error("Error al procesar los documentos: ", error);
  }
};



const getWinner = () =>{
  // Buscar quien fue el ultimo ganador en la coleccion users
}

const getAllTel = () =>{
  // Buscar en la coleccion tel todos los numeros
}