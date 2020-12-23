import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth/Auth";
import Home from "routes/Home/Home";
import Navigation from "components/Navigation/Navigation";
import MyProfile from "routes/MyProfile/MyProfile";
import OtherProfile from "routes/OtherProfile/OtherProfile";
import NotFound from "routes/NotFound/NotFound";
import Footer from "components/Footer/Footer";
import OpenChat from "routes/OpenChat/OpenChat";

const AppRouter = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
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
          <Route path="/openchat">
            <OpenChat />
          </Route>
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
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
