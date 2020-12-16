import React from "react";
import { Link } from "react-router-dom";
import FriendButton from "../FriendButton/FriendButton";
import "./SmallProfile.css";

const SmallProfile = ({ otherData }) => {
  return (
    <li className="smallprofile">
      <p>{otherData.userName}</p>
      <p>{otherData.unit}</p>
      <Link to={`/profile/${otherData.userId}`}>see profile</Link>
      <FriendButton otherId={otherData.userId} />
    </li>
  );
};

export default SmallProfile;
