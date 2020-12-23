import { authService, dbService, firebaseInstance } from "mybase";
import React from "react";
import { updateMyProfile } from "services/firestore";
import "./Auth.css";

const Auth = () => {
  const provider = new firebaseInstance.auth.GoogleAuthProvider();
  const onClick = async () => {
    const credential = await authService.signInWithPopup(provider);
    const userSnap = await dbService
      .doc(`profile/${credential.user.uid}`)
      .get();
    if (!userSnap.exists) {
      const myDataObject = {
        userId: credential.user.uid,
        userName: credential.user.displayName,
        unit: "",
      };
      updateMyProfile(myDataObject);
    }
  };

  return (
    <div className="auth">
      <p>Sign in</p>
      <button onClick={onClick}>Google</button>
    </div>
  );
};

export default Auth;
