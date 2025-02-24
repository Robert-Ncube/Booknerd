import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

//authProvider

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const registerUser = async (email, password) => {
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Error registering user:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signInUser = async (email, password) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      return true; // Sign-in was successful
    } catch (error) {
      console.error("Error signing in user:", error);
      return false; // Sign-in failed
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };

  //manage user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsLoading(false);

      if (user) {
        const userData = {
          id: user?.uid,
          email: user?.email,
          photo: user?.photoURL,
          username: user?.displayName,
          isAdmin: false,
        };

        return () => unsubscribe();
      }
    });
  }, []);

  const value = {
    currentUser,
    isLoading,
    registerUser,
    signInUser,
    signOutUser,
    signInWithGoogle,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
