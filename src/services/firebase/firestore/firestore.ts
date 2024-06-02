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
  deleteDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { app } from "../app";
import * as XLSX from "xlsx";
import { RowExcel } from "@/shared/types/rowExcel";

export const firestore = getFirestore(app);

//Funcion para cargar el excel en firestore
export const uploadExcelInFirestore = async (file: File): Promise<boolean> => {
  try {
    const data: RowExcel[] = await new Promise((resolve, reject) => {
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

    console.log("Datos del archivo cargado:", data);
    const usersCollectionRef = collection(firestore, "users");

    const querySnapshot = await getDocs(usersCollectionRef);
    const deletePromises: Promise<void>[] = [];

    querySnapshot.forEach((doc) => {
      deletePromises.push(deleteDoc(doc.ref));
    });

    await Promise.all(deletePromises);

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

    const uploadPromises: Promise<void>[] = dataString.map((item) => {
      const docRef = doc(usersCollectionRef, String(item.cliente));
      return setDoc(docRef, item);
    });

    await Promise.all(uploadPromises);

    return true;
  } catch (error) {
    console.error("Error al cargar el archivo en Firestore:", error);
    return false;
  }
};

//Funcion para traer los telefonos de la coleccion tel
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
  const q = query(
    collectionRef,
    where("fec_gan", "!=", "undefined"),
    orderBy("fec_gan", "desc"),
    limit(1)
  );
  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return [];
    }

    const documents = querySnapshot.docs.map((doc) => doc.data());

    return documents;
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw new Error("Error fetching documents");
  }
};

// Función para actualizar el número de teléfono
export const updatePhoneNumber = async ({
  tel,
  cliente,
  apellido,
}: {
  tel: string;
  cliente: string;
  apellido: string;
}) => {
  const docRef = doc(firestore, "tel", cliente); // Usamos el número de cliente como documentId
  await setDoc(docRef, { tel, cliente, apellido }, { merge: true });
};
// Función para obtener el número de teléfono por cliente
export const getPhoneNumber = async (cliente: string) => {
  const docRef = doc(firestore, "tel", cliente);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    return null;
  }
};
