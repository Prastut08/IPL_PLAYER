import { useEffect, useState } from "react";
import { subscribeToAuthChanges, getCurrentUser } from "./authUtils";
import { getUserProfile } from "./firebaseUserUtils";

/**
 * Custom React hook to manage Firebase authentication state
 * Returns: { user (auth user), profile (firestore profile), loading, error }
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Load profile from Firestore
      loadProfile(currentUser.uid);
    } else {
      setLoading(false);
    }

    // Subscribe to auth changes
    const unsubscribe = subscribeToAuthChanges(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        // Load profile from Firestore when user logs in
        await loadProfile(authUser.uid);
        setError(null);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const loadProfile = async (userId) => {
    try {
      const result = await getUserProfile(userId);
      if (result.success) {
        setProfile(result.data);
      } else {
        console.warn("Profile not found:", result.error);
        setProfile(null);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, profile, loading, error };
};

export default useAuth;
