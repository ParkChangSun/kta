import { authService, dbService } from "mybase";
import React, { useEffect, useState } from "react";
import AppRouter from "./AppRouter";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        setIsLoggedIn(true);
      } else {
        setUserId("");
      }
    });
  }, []);

  useEffect(() => {
    if (userId !== "") {
      const unSubscribe = dbService
        .doc(`profile/${userId}`)
        .onSnapshot((snapshot) => {
          setUserObj(snapshot.data());
          setInit(true);
        });
      return unSubscribe;
    } else {
      console.log("userid is null");
    }
  }, [userId]);

  // need to fix this
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      uid: user.uid,
      displayName: user.displayName,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          userObj={userObj}
          isLoggedIn={isLoggedIn}
          refreshUser={refreshUser}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <h1>initializing...</h1>
      )}
    </>
  );
}

export default App;
