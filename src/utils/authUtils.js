import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../../firebase";

// Enable session persistence
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Persistence error:", err);
});

/**
 * Register a new user with email and password
 */
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Registration error:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Sign in user with email and password
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Login error:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Sign out the current user
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
    return { success: true };
  } catch (error) {
    console.error("Logout error:", error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Subscribe to auth state changes
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

/**
 * Get current user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

export default { registerUser, loginUser, logoutUser, subscribeToAuthChanges, getCurrentUser };
