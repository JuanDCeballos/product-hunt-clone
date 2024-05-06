import { Auth } from '../Firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const GoogleProvider = new GoogleAuthProvider();
const GitHubProvider = new GithubAuthProvider();

export async function SingInWithOutProvider(email, password) {
  try {
    if (!email) throw "Email can't be null.";
    if (!password) throw "PassWord can't be null.";

    const result = await signInWithEmailAndPassword(Auth, email, password);
    const { uid, photoURL, displayName } = result.user;

    return {
      ok: true,
      uid,
      photoURL,
      displayName,
    };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function SingInWithGoogle() {
  try {
    const result = await signInWithPopup(Auth, GoogleProvider);

    const user = result.user;
    return { ok: true, user };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function SingInWithGitHub() {
  try {
    const result = await signInWithPopup(Auth, GitHubProvider);
    const user = result.user;
    console.log(user);
    return { ok: true, user };
  } catch (error) {
    return { ok: false, error };
  }
}
