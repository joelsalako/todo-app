import { db } from './config';
import { collection, getDocs } from 'firebase/firestore';

export async function load() {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    return processQuerySnapshot(querySnapshot);
  } catch (error) {
    throw new error('Fail to load Database');
  }
}

//This is a helper function
function processQuerySnapshot(querySnapshot) {
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  return data;
}
