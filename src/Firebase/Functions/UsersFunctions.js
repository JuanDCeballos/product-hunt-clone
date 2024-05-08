import { db } from '../Firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

export async function UpdateUser(userIUD, userModified) {
  try {
    if (!userIUD) throw "User UID can't be null.";
    if (!userModified) throw "Modified data can't be null.";

    const userReference = doc(collection(db, 'Usuarios', userIUD));
    await setDoc(userReference, userModified, { merge: true });
    return { ok: true, message: 'user modified successfully!' };
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