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
      <div className="wrapper">
        <h3 className="heading">unsafe chat</h3>
        <p className="tagline">a chat client with zero end to end encryption made by a few GA students</p>
      </div>
      {user ? (
        <div className="header-buttons">
          <button onClick={() => {navigator.clipboard.writeText(auth.currentUser.uid)}}>Copy User ID</button>
          <button onClick={signOut} className="sign-out" type="button">
            Sign Out
          </button>
        </div>
      ) : (
        <button onClick={googleSignIn} className="sign-in">Sign In</button>
      )}
    </header>
    
  )
}