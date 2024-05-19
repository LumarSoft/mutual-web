import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../app";
import { firestore } from "../firestore/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth(app);

interface User {
  name: string;
  DNI: string;
  email: string;
  tel: string;
  bono: string;
  instalmentsQty: number;
  date: string;
}

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    const docRef = doc(firestore, "users", user.uid);
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

export const singUp = async (user: User) => {
  try {
    const { name, DNI, email, tel, bono, instalmentsQty, date } = user;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      DNI
    );
    const newUser = userCredential.user;

    await setDoc(doc(firestore, "users", newUser.uid), {
      admin: false,
      bono,
      date_subscription: date,
      DNI,
      email,
      instalments_Qty: instalmentsQty,
      last_paid: date,
      name,
      tel,
      uid: newUser.uid,
      up_to_date: true,
    });
  } catch (error) {
    console.error(error);
  }
};
