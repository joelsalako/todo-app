import {
  deleteDoc,
  addDoc,
  updateDoc,
  doc,
  collection,
} from 'firebase/firestore';
import { db } from './config';

/**
 * writes a data into the database
 * @param {object} data
 * The data to be saved into the database
 * @returns
 * docRef.id or null if error is encountered.
 */
export async function save(data) {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), data);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document: ', e);
    return null;
  }
}

/**
 * Updates a field in a document with new data.
 * @param {string} id
 * ID of the document to update
 * @param {object} data
 * New data to replace the old one in the document field
 * @returns
 * true if success and false if not.
 */
export async function update(id, data) {
  try {
    const docRef = doc(db, 'tasks', id);
    await updateDoc(docRef, data);
    return true;
  } catch {
    return false;
  }
}

/**
 * It removes a document from a collection in Firebase Firestore
 * @param {string} id
 * the ID of the document to delete
 * @returns
 * true if successfully deleted or false otherwise
 */
export async function remove(id) {
  try {
    await deleteDoc(doc(db, 'tasks', id));
    return true;
  } catch {
    return false;
  }
}

/**
 * Deletes all documents in a collection in Firebase Firestore
 * @param {Array} data
 * An array of objects containing all the documents in the collection
 * @returns
 * true if successful and false otherwise.
 */
export function clearAll(data) {
  try {
    data.forEach((doc) => {
      const id = doc.id;
      remove(id);
    });
    return true;
  } catch {
    return false;
  }
}
