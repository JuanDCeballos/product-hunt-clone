import { db } from '../Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export async function UpdateUser(userIUD, userModified, provider) {
  try {
    if (!userIUD) throw "User UID can't be null.";
    if (!userModified) throw "Modified data can't be null.";

    const userReference = doc(db, `Usuarios ${provider}`, userIUD);
    await setDoc(userReference, userModified, { merge: true });
    return { ok: true, message: 'user modified successfully!' };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function GetUser(userUID, provider) {
  try {
    if (!userUID) throw "UserUID can't be null.";
    if (!provider) throw "Provider can't be null.";
    const userReference = doc(db, `Usuarios ${provider}`, userUID);
    const documentResult = await getDoc(userReference);

    return { ok: true, user: documentResult.data() };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function CreateNewUser(userIUD, timeStamp, provider) {
  try {
    if (!userIUD) throw "User UID can't be null.";
    if (!provider) throw "Provider can't be null.";
    const defaultData = {
      createdAt: timeStamp,
      updatedAt: timeStamp,
      provider: provider,
    };
    await setDoc(doc(db, `Usuarios ${provider}`, userIUD), defaultData);
    return { ok: true, message: 'User created successfully!' };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function ExistsUser(userIUD, provider) {
  try {
    if (!userIUD) throw "User UID can't be null.";
    if (!provider) throw "Provider can't be null.";

    const userReference = doc(db, `Usuarios ${provider}`, userIUD);
    const documentResult = await getDoc(userReference);

    return documentResult.exists();
  } catch (error) {
    return { ok: false, error };
  }
}
