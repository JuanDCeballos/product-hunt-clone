import { db } from '../Firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

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
export async function FollowUser(
  userUID,
  provider,
  userToFollowUID,
  userToFollowProvider,
  follorwerData,
  followedData
) {
  try {
    if (!follorwerData) throw "follorwerData can't be null.";
    if (!followedData) throw "followedData can't be null.";
    if (!userToFollowUID) throw "user to follow UID can't be null.";
    if (!userUID) throw "userUID can't be null.";
    if (!provider) throw "Provider can't be null";

    const userToFollowCollectionReference = collection(
      db,
      `Usuarios ${userToFollowProvider}/${userUID}/Followers Users`
    );

    await setDoc(userToFollowCollectionReference, follorwerData);
  } catch (error) {
    return { ok: false, error };
  }
}
export async function UnFollowUser(documentUID, userUID, provider) {
  try {
    if (!documentUID) throw "DocumentUID can't be null.";
    if (!userUID) throw "userUID can't be null.";
    if (!provider) throw "Provider can't be null";

    const documentReference = doc(
      db,
      `Usuarios ${provider}/${userUID}/Followed Users`,
      documentUID
    );
    await setDoc(documentReference, { enable: false }, { merge: true });
    return { ok: true, message: 'User unfollowed!' };
  } catch (error) {
    return { ok: false, error };
  }
}
export async function GetFollowedUsers(userUID, provider) {
  try {
    if (!userUID) throw "UserUID can't be null.";
    if (!provider) throw "Provider type can't be null.";
    const collectionReference = collection(
      db,
      `Usuarios ${provider}/${userUID}/Followed Users`
    );
    const querySnapshot = query(
      collectionReference,
      where('enable', '==', true)
    );
    const queryResult = await getDocs(querySnapshot);
    let followedUsers = [];
    queryResult.forEach((doc) => {
      followedUsers.push({ id: doc.id, ...doc.data() });
    });
    return { ok: true, users: followedUsers };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function GetFollowers(userUID, provider) {
  try {
    if (!userUID) throw "UserUID can't be null.";
    if (!provider) throw "Provider type can't be null.";
    const collectionReference = collection(
      db,
      `Usuarios ${provider}/${userUID}/Followers Users`
    );
    const querySnapshot = query(
      collectionReference,
      where('enable', '==', true)
    );
    const queryResult = await getDocs(querySnapshot);
    let followedUsers = [];
    queryResult.forEach((doc) => {
      followedUsers.push({ id: doc.id, ...doc.data() });
    });

    if (followedUsers.length === 0) followedUsers = [];

    return { ok: true, users: followedUsers };
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
