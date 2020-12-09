import { authService } from "mybase";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navigation = ({ userObj, setIsLoggedIn }) => {
  const history = useHistory();
  const onClick = () => {
    authService.signOut();
    setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/myprofile">{userObj.userName}</Link>
        </li>
        <li>
          <button onClick={onClick}>Sign out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
