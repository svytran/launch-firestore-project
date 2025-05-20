import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase.js"; // adjust path if needed

// Fetch all responses, sorted by upvotes
export const fetchAllResponses = async () => {
  const q = query(collection(db, "responses"), orderBy("upvotes", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Add a new response
export const addResponse = async (text) => {
  await addDoc(collection(db, "responses"), { text, upvotes: 0 });
};

// Upvote a response
export const upvoteResponse = async (id, currentUpvotes) => {
  const responseRef = doc(db, "responses", id);
  await updateDoc(responseRef, { upvotes: currentUpvotes + 1 });
};