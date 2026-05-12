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
    let isMounted = true;

    // Load profile from Firestore
    const loadProfile = async (userId) => {
      try {
        const result = await getUserProfile(userId);
        if (isMounted) {
          if (result.success) {
            setProfile(result.data);
          } else {
            console.warn("Profile not found:", result.error);
            setProfile(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error loading profile:", err);
          setError(err.message);
        }
      }
    };

    // Subscribe to auth changes
    const unsubscribe = subscribeToAuthChanges(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        await loadProfile(authUser.uid);
        setError(null);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return { user, profile, loading, error };
};

export default useAuth;
