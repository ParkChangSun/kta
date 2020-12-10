import { authService, dbService } from "mybase";
import React, { createContext, useEffect, useState } from "react";
import { UserIdContext } from "utils/firestore";
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

  const userContext = createContext(null);

  return (
    <UserIdContext.Provider value={userObj}>
      {init ? (
        <AppRouter
          isLoggedIn={isLoggedIn}
          refreshUser={refreshUser}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <h1>initializing...</h1>
      )}
    </UserIdContext.Provider>
  );
}

export default App;
