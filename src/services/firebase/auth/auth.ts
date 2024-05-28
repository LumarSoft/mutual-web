import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../app";
import { firestore } from "../firestore/firestore";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const auth = getAuth(app);

interface User {
  name: string;
  DNI: string;
  email: string;
  tel: string;
  bono: string;
  instalmentsQty: number;
  dateSubscription: string;
  DateLastPaid: string;
}

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
      console.log("No such document!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const signInAsUser = async (socioNumber: string, document: string) => {
  try {
    const q = query(
      collection(firestore, "users"),
      where("cliente", "==", socioNumber),
      where("documento", "==", document)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error(error);
  }
};

export const singUp = async (collectionName: string, user: User) => {
  try {
    const {
      name,
      DNI,
      email,
      tel,
      bono,
      instalmentsQty,
      dateSubscription,
      DateLastPaid,
    } = user;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      DNI
    );
    const newUser = userCredential.user;

    await setDoc(doc(firestore, collectionName, newUser.uid), {
      name,
      DNI,
      email,
      tel,
      bono,
      date_subscription: dateSubscription,
      instalments_Qty: instalmentsQty,
      last_paid: DateLastPaid,
      uid: newUser.uid,
    });
  } catch (error) {
    console.error(error);
  }
};
