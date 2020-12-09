import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import MyProfile from "routes/MyProfile";
import OtherProfile from "routes/OtherProfile";
import NotFound from "routes/NotFound";

const AppRouter = ({ userObj, isLoggedIn, refreshUser, setIsLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Navigation userObj={userObj} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <h1>Welcome to kta</h1>
      )}
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route path="/myprofile">
            <MyProfile userObj={userObj} refreshUser={refreshUser} />
          </Route>
          <Route
            path="/profile/:userId"
            render={(props) => <OtherProfile {...props} userObj={userObj} />}
          />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Auth />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default AppRouter;
