import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged , signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";



export default function LoginPage( props ) {

  const [formData, setFormData] = useState({})

  const [user] = useAuthState(auth);
  const emailSignUp = (event) => {
      event.preventDefault()
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
  };
  
  const emailSignIn = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      const user = userCredential.user;
    }) 
  }

  const googleSignUp = () => {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider)
      
    };

    const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value  })
     
    }
    
  return (
    <div>
      
      
      <h2>sign up with google account </h2>
      <button onClick={googleSignUp}>Google login</button>

      
      
      
      
    </div>
    
  )
}