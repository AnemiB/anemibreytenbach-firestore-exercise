import { collection, addDoc, getDocs, query, where, orderBy, updateDoc, deleteDoc, doc, } from "firebase/firestore";
import { db } from "./firebase";

const COLL = "bucketItems";

export type BucketItem = { id?: string; title: string; description: string; due: string; priority: boolean; isCompleted: boolean; };

export const createNewBucketItem = async (item: BucketItem) => {
  try {
    const docRef = await addDoc(collection(db, COLL), item);
    return { ...item, id: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getMyBucketList = async (): Promise<BucketItem[]> => {
  try {
    const q = query(
      collection(db, COLL),
      where("priority", "==", true),
      orderBy("due", "asc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  } catch (e) {
    console.error("Error fetching bucket list:", e);
    return [];
  }
};

export const markItemCompleted = async (id: string) => {
  try {
    const ref = doc(db, COLL, id);
    await updateDoc(ref, { isCompleted: true });
  } catch (e) {
    console.error("Error marking completed:", e);
    throw e;
  }
};

export const deleteBucketItem = async (id: string) => {
  try {
    const ref = doc(db, COLL, id);
    await deleteDoc(ref);
  } catch (e) {
    console.error("Error deleting item:", e);
    throw e;
  }
};
