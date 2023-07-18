import { IUserInfo } from "@/store/userStoreInfo";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import Router from "next/router";
import Swal from 'sweetalert2';

async function callGoogleAuth() {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return {
      success: true,
      email: user.email ?? "",
      name: user.displayName ?? "",
      photoURL: user.photoURL ?? ""
    };
  } catch (error) {
    return { success: false, email: "", name: "", photoURL: "" };
  }
}

export async function handleLoginGoogle(setUserInfo: (userInfo: IUserInfo) => void) {
  try {
    const data = await callGoogleAuth();

    if (data.success) {
      setUserInfo({
        name: data.name,
        email: data.email,
        imageURL: data.photoURL
      });

      Router.push("/home");
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocorreu um erro ao fazer login com o Google!',
    });
  }
}
