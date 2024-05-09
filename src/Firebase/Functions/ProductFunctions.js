import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  where,
  query,
} from 'firebase/firestore';
import { db } from '../Firebase';

export const getProducts = async () => {
  try {
    let JSONtoReturn = [];
    const productsRef = collection(db, 'Productos');
    const querySnapshot = query(productsRef, where('enabled', '==', true));
    const productsResult = await getDocs(querySnapshot);
    productsResult.forEach((doc) => {
      JSONtoReturn.push({ id: doc.id, ...doc.data() });
    });
    return JSONtoReturn;
  } catch (error) {
    return error;
  }
};

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
