import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import MyProfile from "routes/MyProfile";
import OtherProfile from "routes/OtherProfile";
import NotFound from "routes/NotFound";

const AppRouter = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/myprofile">
            <MyProfile />
          </Route>
          <Route
            path="/profile/:userId"
            render={(props) => <OtherProfile {...props} />}
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
