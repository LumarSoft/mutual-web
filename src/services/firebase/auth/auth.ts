import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../app";

const auth = getAuth(app);

export const singIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};
