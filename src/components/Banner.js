import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export default function Banner() {
    const [user] = useAuthState(auth);
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
      };

    const signOut = () => {
    auth.signOut();
  };

 
    
  return (
    <header className="Header">
      <p>unsafe chat</p>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button onClick={googleSignIn} className="sign-in">Sign In</button>
      )}
    </header>
    
  )
}