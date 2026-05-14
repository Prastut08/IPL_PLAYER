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

/**
 * Badge Tier System
 */
export const BADGE_TIERS = {
  'Beginner': { minXp: 0, maxXp: 9999, color: '#6496c8', bgColor: 'rgba(100, 150, 200, 0.15)' },
  'Intermediate': { minXp: 10000, maxXp: 19999, color: '#b0b0b0', bgColor: 'rgba(150, 150, 150, 0.15)' },
  'Advanced': { minXp: 20000, maxXp: 29999, color: '#64c8ff', bgColor: 'rgba(100, 200, 255, 0.15)' },
  'Expert': { minXp: 30000, maxXp: 39999, color: '#ff6b6b', bgColor: 'rgba(255, 100, 100, 0.15)' },
  'Pro': { minXp: 40000, maxXp: 49999, color: '#00d9ff', bgColor: 'rgba(0, 217, 255, 0.2)' },
  'Grandmaster': { minXp: 50000, maxXp: Infinity, color: '#ffd700', bgColor: 'rgba(255, 215, 0, 0.2)' },
};

/**
 * Calculate badge based on XP
 */
export const calculateBadge = (xp) => {
  if (xp >= 50000) return 'Grandmaster';
  if (xp >= 40000) return 'Pro';
  if (xp >= 30000) return 'Expert';
  if (xp >= 20000) return 'Advanced';
  if (xp >= 10000) return 'Intermediate';
  return 'Beginner';
};

/**
 * Get next badge tier info
 */
export const getNextBadgeTier = (currentBadge) => {
  const tiers = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Pro', 'Grandmaster'];
  const currentIndex = tiers.indexOf(currentBadge);
  
  if (currentIndex === -1 || currentIndex === tiers.length - 1) {
    return { name: currentBadge, xp: 50000 };
  }
  
  const nextTier = tiers[currentIndex + 1];
  const xpThreshold = BADGE_TIERS[nextTier].minXp;
  return { name: nextTier, xp: xpThreshold };
};

/**
 * Get XP progress to next tier
 */
export const getXpProgressToNextTier = (xp, currentBadge) => {
  const next = getNextBadgeTier(currentBadge);
  if (next.name === currentBadge) {
    return { current: xp, target: 50000, progress: 100 };
  }
  
  const current = BADGE_TIERS[currentBadge].minXp;
  const target = next.xp;
  const progress = Math.min(((xp - current) / (target - current)) * 100, 100);
  
  return { current: xp - current, target: target - current, progress };
};

export default {
  createUserProfile,
  getUserProfile,
  updateUserStats,
  getTopLeaderboard,
  getUserRank,
  addPredictionRecord,
  calculateBadge,
  getNextBadgeTier,
  getXpProgressToNextTier,
  BADGE_TIERS,
};
