import { Auth } from '../Firebase';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { ExistsUser, CreateNewUser } from './UsersFunctions';
import { ProviderTypes } from '../Helpers';

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

    const userExistsResult = await ExistsUser(
      result.user.uid,
      ProviderTypes.GoogleProvider
    );

    if (userExistsResult.ok === false) throw userExistsResult.error;

    if (!userExistsResult) {
      const resultCreateUser = await CreateNewUser(
        result.user.uid,
        new Date().toLocaleDateString(),
        ProviderTypes.GoogleProvider
      );

      if (!resultCreateUser.ok) throw resultCreateUser.message;
    }

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

    const userExistsResult = await ExistsUser(
      result.user.uid,
      ProviderTypes.GitHubProvider
    );

    if (userExistsResult.ok === false) throw userExistsResult.error;

    if (!userExistsResult) {
      const resultCreateUser = await CreateNewUser(
        result.user.uid,
        new Date().toLocaleDateString(),
        ProviderTypes.GitHubProvider
      );

      if (!resultCreateUser.ok) throw resultCreateUser.message;
    }

    return { ok: true, user };
  } catch (error) {
    return { ok: false, error };
  }
}
