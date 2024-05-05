import { initializeApp } from 'firebase/app';
import * as dotenv from 'dotenv';
dotenv.config();
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getProducts() {
  try {
    let JSONtoReturn = [];
    const resultQuery = await getDocs(collection(db, 'Productos'));
    resultQuery.forEach((doc) => {
      JSONtoReturn.push({ id: doc.id, ...doc.data() });
    });
    return JSONtoReturn;
  } catch (error) {
    return error;
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
    console.log(document.data());
    await setDoc(commentReference, comment);

    return { Ok: true, Message: 'Product updated successfully' };
  } catch (error) {
    console.log(error);
    return { Ok: false, error };
  }
}
