import { authService, dbService, firebaseInstance } from "mybase";
import React from "react";

const Auth = () => {
  const provider = new firebaseInstance.auth.GoogleAuthProvider();
  const onClick = async (event) => {
    const credential = await authService.signInWithPopup(provider);
    const userRef = dbService.doc(`profile/${credential.user.uid}`);
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      userRef.set({
        userId: credential.user.uid,
        userName: credential.user.displayName,
        unit: "",
        revisedAt: Date.now(),
      });
    }
  };

  return (
    <>
      <p>Sign in</p>
      <button onClick={onClick}>Google</button>
    </>
  );
};

export default Auth;
