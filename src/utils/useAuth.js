import { useEffect, useState } from "react";
import { subscribeToAuthChanges, getCurrentUser } from "./authUtils";

/**
 * Custom React hook to manage Firebase authentication state
 * Usage: const { user, loading, error } = useAuth();
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setLoading(false);
    }

    // Subscribe to auth changes
    const unsubscribe = subscribeToAuthChanges((authUser) => {
      setUser(authUser);
      setLoading(false);
      setError(null);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, loading, error };
};

export default useAuth;
