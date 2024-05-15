import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  where,
  query,
  getCountFromServer,
  getAggregateFromServer,
  average,
} from 'firebase/firestore';
import { db } from '../Firebase';
import { GetFollowedUsersUID } from './UsersFunctions';

export const getProducts = async (userUID, userProvider) => {
  try {
    let JSONtoReturn = [];
    const productsRef = collection(db, 'Productos');
    const querySnapshot = query(productsRef, where('enabled', '==', true));
    const productsResult = await getDocs(querySnapshot);
    const { followedUsers } = await GetFollowedUsersUID(userUID, userProvider);

    for (const doc of productsResult.docs) {
      const commentsResult = await getCommentsCountInProduct(doc.id);
      const averageRatingResult = await getAverageRatingInProduct(doc.id);

      JSONtoReturn.push({
        id: doc.id,
        ...doc.data(),
        commentsCount: commentsResult.commentsCount,
        averageRating: averageRatingResult.averageRating,
        isMadeByAFollwedUser: followedUsers?.includes(doc.data().createdBy),
      });
    }
    JSONtoReturn.sort(function (x, y) {
      return x.isMadeByAFollwedUser === y.isMadeByAFollwedUser
        ? 0
        : x.isMadeByAFollwedUser
        ? -1
        : 1;
    });
    return JSONtoReturn;
  } catch (error) {
    return error;
  }
};

export async function getAverageRatingInProduct(productUID) {
  try {
    if (!productUID) throw "ProductUID can't be null.";
    const commentsCollectionReference = collection(
      db,
      `Productos/${productUID}/Comments`
    );
    const averageRatingResult = await getAggregateFromServer(
      commentsCollectionReference,
      {
        averageRating: average('Rating'),
      }
    );
    return {
      ok: true,
      averageRating: averageRatingResult.data().averageRating,
    };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getCommentsInProduct(productUID) {
  try {
    if (!productUID) throw "ProductUID can't be null.";
    const commentsRef = collection(db, `Productos/${productUID}/Comments`);
    const commentsResult = await getDocs(commentsRef);
    let JSONToReturn = [];
    commentsResult.forEach((comment) => {
      JSONToReturn.push({ id: comment.id, ...comment.data() });
    });
    return { ok: true, comments: JSONToReturn };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getCommentsCountInProduct(productUID) {
  try {
    if (!productUID) throw "ProductUID can't be null.";
    const commentsRef = collection(db, `Productos/${productUID}/Comments`);
    const commentsResult = await getCountFromServer(commentsRef);
    return { ok: true, commentsCount: commentsResult.data().count };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function setProductInDisabled(productUID) {
  try {
    if (!productUID) throw "ProductUID can't be null.";

    const documentReference = doc(db, 'Productos', productUID);
    const document = await getDoc(documentReference);
    if (!document.exists()) throw "Document doesn't exist.";

    await setDoc(documentReference, { enabled: false }, { merge: true });
    return { Ok: true, Message: 'Product updated successfully' };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function setProductInEnabled(productUID) {
  try {
    if (!productUID) throw "ProductUID can't be null.";

    const documentReference = doc(db, 'Productos', productUID);
    const document = await getDoc(documentReference);
    if (!document.exists()) throw "Document doesn't exist.";

    await setDoc(documentReference, { enabled: true }, { merge: true });
    return { Ok: true, Message: 'Product updated successfully' };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getProductById(productUID) {
  try {
    if (!productUID) throw "ProductUID can't be null.";

    const documentReference = doc(db, 'Productos', productUID);
    const document = await getDoc(documentReference);
    if (!document.exists()) throw "Document doesn't exist.";

    const product = { id: document.id, ...document.data() };
    return { ok: true, product };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function getProductsCreatedByUserUID(userUID) {
  try {
    if (!userUID) throw "UserUID can't be null.";
    const productsRef = collection(db, 'Productos');
    const querySnapshot = query(productsRef, where('createdBy', '==', userUID));
    const productsResult = await getDocs(querySnapshot);
    let JSONToReturn = [];
    productsResult.forEach((doc) => {
      JSONToReturn.push({ id: doc.id, ...doc.data() });
    });

    return { ok: true, products: JSONToReturn };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function addProduct(product) {
  try {
    if (!product) throw "Product can't be null.";
    const addedDoc = await addDoc(collection(db, 'Productos'), product);

    return {
      Ok: true,
      Message: `Product added successfully. docID ${addedDoc.id}`,
    };
  } catch (error) {
    return { Ok: false, Error: `Error when adding the product. ${error}` };
  }
}

export async function UpdateProduct(product, productUID) {
  try {
    if (!productUID) throw "Product UID can't be null.";
    if (!product) throw "Product can't be null.";

    const productReference = doc(db, `Productos`, productUID);
    await setDoc(productReference, product, { merge: true });
    return { ok: true, message: 'product modified successfully!' };
  } catch (error) {
    return { ok: false, error };
  }
}

export async function addCommentInProduct(productUid, comment) {
  try {
    if (!productUid) throw "ProductUID can't be null.";
    if (!comment) throw "Comment can't be null.";

    const documentReference = doc(db, 'Productos', productUid);
    const document = await getDoc(documentReference);
    if (!document.exists()) throw "Document doesn't exist.";

    const commentReference = doc(
      collection(db, `Productos/${productUid}/Comments`)
    );

    await setDoc(commentReference, comment);

    return { Ok: true, Message: 'Product updated successfully' };
  } catch (error) {
    return { Ok: false, error };
  }
}
