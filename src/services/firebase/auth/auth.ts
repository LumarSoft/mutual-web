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
  dateSubscription: string;
  DateLastPaid: string;
}

export const signIn = async (
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

//Para eliminar un usuario
// export const deleteUserFirebase = async (uid: string) => {
//   deleteUser();
// };
