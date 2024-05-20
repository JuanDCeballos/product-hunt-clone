import { db } from '../Firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

export async function GetFollowedUsersUID(userUID, userProvider) {
  try {
    if (!userUID) throw "User UID can't be null.";
    if (!userProvider) throw "User Provider can't be null.";

    const collectionReference = collection(
      db,
      `Usuarios ${userProvider}/${userUID}/Followed Users`
    );

    const result = await getDocs(collectionReference);
    let usersUID = [];
    result.forEach((user) => {
      usersUID.push(user.data().UserID);
    });
    return { ok: true, followedUsers: usersUID };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function GetUsersList(currentUserUID, userProvider) {
  try {
    if (!currentUserUID) throw "Current userUID can't be null.";
    if (!userProvider) throw "User Provider can't be null.";

    const gitHubCollectionRefernce = collection(
      db,
      'Usuarios [Provider] GitHub'
    );
    const googleCollectionReference = collection(
      db,
      'Usuarios [Provider] Google'
    );

    const { ok, followedUsers, error } = await GetFollowedUsersUID(
      currentUserUID,
      userProvider
    );

    if (!ok) throw 'Error at trying to get followed users';

    const gitHubUsersResult = await getDocs(gitHubCollectionRefernce);
    const googleUsersResult = await getDocs(googleCollectionReference);
    let users = [];
    gitHubUsersResult.forEach((user) => {
      if (user.id != currentUserUID) {
        users.push({
          id: user.id,
          UserDescription: user.data().profileDesc,
          UserName: user.data().displayName,
          UserPhotoURL: user.data().photoURL,
          provider: user.data().provider,
          followed: followedUsers.includes(user.id),
        });
      }
    });

    googleUsersResult.forEach((user) => {
      if (user.id != currentUserUID) {
        users.push({
          id: user.id,
          UserDescription: user.data().profileDesc,
          UserName: user.data().displayName,
          UserPhotoURL: user.data().photoURL,
          provider: user.data().provider,
          followed: followedUsers.includes(user.id),
        });
      }
    });

    return { ok: true, users };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function FollowUser(
  FollowerUID,
  FollowerProvider,
  FollowerData,
  FollowedUID,
  FollowedProvider,
  FollowedData
) {
  try {
    if (!FollowerUID) throw "FollowerUID can't be null.";
    if (!FollowerProvider) throw "Follower Provider can't be null.";
    if (!FollowerData) throw "Follower Data can't be null.";
    if (!FollowedUID) throw "FollowedUID can't be null.";
    if (!FollowedProvider) throw "Followed Provider can't be null.";
    if (!FollowedData) throw "Followed Data can't be null.";

    const followerUserCollectionRefernce = collection(
      db,
      `Usuarios ${FollowerProvider}/${FollowerUID}/Followed Users`
    );

    const followedUserCollectionReference = collection(
      db,
      `Usuarios ${FollowedProvider}/${FollowedUID}/Followers Users`
    );

    await addDoc(followerUserCollectionRefernce, FollowedData);
    await addDoc(followedUserCollectionReference, FollowerData);

    return {
      ok: true,
      message: `Now you're following: ${FollowedData.UserName}!`,
    };
  } catch (error) {
    return { ok: false, error };
  }
}

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

export async function UnFollowUser(
  userUID,
  Userprovider,
  followedUserUID,
  followedUserProvider
) {
  try {
    if (!userUID) throw "userUID can't be null.";
    if (!Userprovider) throw "Provider can't be null";
    if (!followedUserUID) throw "Followed User UID can't be null.";
    if (!followedUserProvider) throw "Followed user Provider can't be null.";

    const followerUserCollectionReference = collection(
      db,
      `Usuarios ${Userprovider}/${userUID}/Followed Users`
    );

    const followedUserCollectionReference = collection(
      db,
      `Usuarios ${followedUserProvider}/${followedUserUID}/Followers Users`
    );

    const queryFollower = query(
      followerUserCollectionReference,
      where('UserID', '==', followedUserUID)
    );

    const queryFollowedUser = query(
      followedUserCollectionReference,
      where('UserID', '==', userUID)
    );

    const documentInFollowerCollection = await getDocs(queryFollower);
    const documentInFollowedCollection = await getDocs(queryFollowedUser);

    await deleteDoc(
      doc(
        db,
        `Usuarios ${Userprovider}/${userUID}/Followed Users`,
        documentInFollowerCollection.docs[0].id
      )
    );

    await deleteDoc(
      doc(
        db,
        `Usuarios ${followedUserProvider}/${followedUserUID}/Followers Users`,
        documentInFollowedCollection.docs[0].id
      )
    );

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
    const queryResult = await getDocs(collectionReference);
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
    const queryResult = await getDocs(collectionReference);
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

export async function CreateNewUser(
  userIUD,
  timeStamp,
  provider,
  displayName,
  photoURL
) {
  try {
    if (!userIUD) throw "User UID can't be null.";
    if (!provider) throw "Provider can't be null.";
    if (!displayName) throw "Display Name can't be null.";
    if (!photoURL) throw "Photo can't be null";
    const defaultData = {
      displayName,
      photoURL,
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
