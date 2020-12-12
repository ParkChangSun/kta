import { authService } from "mybase";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserIdContext } from "utils/firestore";

const Navigation = ({ setIsLoggedIn }) => {
  const userContext = useContext(UserIdContext);
  const history = useHistory();
  const onClick = () => {
    authService.signOut();
    setIsLoggedIn(false);
    history.push("/");
  };

  return (
    <nav>
      <ul className="navigation">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/myprofile">{userContext?.userName}</Link>
        </li>
        <li>
          <button onClick={onClick}>Sign out</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
