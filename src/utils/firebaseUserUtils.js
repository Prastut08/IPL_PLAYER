import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  getDocs,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const USERS_COLLECTION = "users";
const LEADERBOARD_COLLECTION = "leaderboard";

/**
 * Create or update user profile
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      xp: userData.xp || 0,
      accuracy: userData.accuracy || 0,
      predictions: userData.predictions || 0,
      correct: userData.correct || 0,
    }, { merge: true });
    console.log("User profile created:", userId);
    return { success: true };
  } catch (error) {
    console.error("Error creating user profile:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return { success: true, data: userSnap.data() };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Update user XP and accuracy
 */
export const updateUserStats = async (userId, xpPoints, isCorrect) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    
    // Get current stats
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      throw new Error("User not found");
    }
    
    const userData = userSnap.data();
    const predictions = (userData.predictions || 0) + 1;
    const correct = isCorrect ? (userData.correct || 0) + 1 : userData.correct || 0;
    const xp = (userData.xp || 0) + xpPoints;
    const accuracy = predictions > 0 ? Math.round((correct / predictions) * 100) : 0;

    await updateDoc(userRef, {
      xp,
      accuracy,
      predictions,
      correct,
      lastUpdated: new Date(),
    });

    return { success: true, xp, accuracy, predictions, correct };
  } catch (error) {
    console.error("Error updating user stats:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get top leaderboard entries (sorted by XP)
 */
export const getTopLeaderboard = async (topCount = 10) => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      orderBy("xp", "desc"),
      limit(topCount)
    );
    const querySnapshot = await getDocs(q);
    const leaderboard = querySnapshot.docs.map((doc, index) => ({
      id: doc.id,
      rank: index + 1,
      ...doc.data(),
    }));
    return { success: true, data: leaderboard };
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Get user rank
 */
export const getUserRank = async (userId) => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      orderBy("xp", "desc")
    );
    const querySnapshot = await getDocs(q);
    let rank = 0;
    querySnapshot.docs.forEach((doc, index) => {
      if (doc.id === userId) {
        rank = index + 1;
      }
    });
    return { success: true, rank };
  } catch (error) {
    console.error("Error getting user rank:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Add prediction record
 */
export const addPredictionRecord = async (userId, predictionData) => {
  try {
    const predictionsRef = collection(db, USERS_COLLECTION, userId, "predictions");
    await addDoc(predictionsRef, {
      ...predictionData,
      createdAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding prediction:", error);
    return { success: false, error: error.message };
  }
};

export default {
  createUserProfile,
  getUserProfile,
  updateUserStats,
  getTopLeaderboard,
  getUserRank,
  addPredictionRecord,
};
