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
} from "firebase/firestore";
import { app } from "../app";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { RowExcel } from "@/shared/types/rowExcel";

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
  // Primero creamos una promesa a resolver
  const promise = new Promise<RowExcel[]>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      if (!e.target) {
        return reject("Error al leer el archivo");
      }

      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const data: RowExcel[] = XLSX.utils.sheet_to_json(ws);

      resolve(data);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  promise
    .then(async (data) => {
      console.log("Datos del archivo cargado:", data);
      const usersCollectionRef = collection(firestore, "users");

      // Obtener todos los documentos de la colección users
      const querySnapshot = await getDocs(usersCollectionRef);
      const deletePromises: Promise<void>[] = [];

      // Eliminar cada documento de la colección
      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref));
      });

      await Promise.all(deletePromises);

      // Poner todos los campos de los objetos de dentro de Data en formato string

      const dataString = data.map((item) => {
        const newItem: RowExcel = {
          documento: String(item.documento),
          apellido: String(item.apellido),
          cliente: String(item.cliente),
          entidad: String(item.entidad),
          codigo: String(item.codigo),
          fec_mae: String(item.fec_mae),
          ganador: String(item.ganador),
          cuopag: String(item.cuopag),
          cuopen: String(item.cuopen),
          ult_cob: String(item.ult_cob),
          fupdate: String(item.fupdate),
          fupd: String(item.fupd),
          fec_gan: String(item.fec_gan),
          pre_pen: String(item.pre_pen),
        };
        return newItem;
      });

      // Cargar nuevos datos en la colección users con el id como la propiedad cliente
      const uploadPromises: Promise<void>[] = dataString.map((item) => {
        const docRef = doc(usersCollectionRef, String(item.cliente));
        return setDoc(docRef, item);
        
      });

      await Promise.all(uploadPromises);

      console.log("Colección 'users' actualizada exitosamente.");
    })
    .catch((error) => {
      console.error("Error al cargar el archivo en Firestore:", error);
    });
};

 // 445060

export const getPhones = async () => {
  const collectionRef = collection(firestore, "tel");

  try {
    const querySnapshot = await getDocs(collectionRef);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    const documents = querySnapshot.docs.map((doc) => doc.data());

    console.log("Documentos encontrados: ", documents);
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Error fetching documents");
  }
};


// funcion para obtener utlimo ganador, y que premio gano, de la coleccion users
export const getLastWinner = async () => {
  const collectionRef = collection(firestore, "users");
  //solo traer los documentos que tengan un fec_gan distinto de null
  const q = query(collectionRef, where("fec_gan", "!=", "undefined"), orderBy("fec_gan", "desc"), limit(1));
  //filtrar por fecha de ganador mas reciente
  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    const documents = querySnapshot.docs.map((doc) => doc.data());

    console.log("Documentos encontrados: ", documents);
    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Error fetching documents");
  }

};