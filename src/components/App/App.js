import { authService, dbService } from "mybase";
import React, { useEffect, useState } from "react";
import { UserIdContext } from "services/firestore";
import AppRouter from "../AppRouter";
import Loading from "../Loading/Loading";
import "./App.css";

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
      setInit(true);
    }
  }, [userId]);

  return (
    <UserIdContext.Provider value={userObj}>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Loading />
      )}
    </UserIdContext.Provider>
  );
}

export default App;
