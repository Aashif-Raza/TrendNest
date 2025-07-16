import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContextContext";
import { auth, googleProvider, facebookProvider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || firebaseUser.email,
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async function register(name, email, password) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { displayName: name });
      }
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function socialLogin(providerName) {
    try {
      let provider = null;
      if (providerName === "google") provider = googleProvider;
      if (providerName === "facebook") provider = facebookProvider;
      if (!provider) throw new Error("Unknown provider");
      await signInWithPopup(auth, provider);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, socialLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}