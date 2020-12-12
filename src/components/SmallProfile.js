import React from "react";
import { Link } from "react-router-dom";
import FriendButton from "./FriendButton";

const SmallProfile = ({ otherData }) => {
  return (
    <div className="smallprofile">
      <p>{otherData.userName}</p>
      <p>{otherData.unit}</p>
      <Link to={`/profile/${otherData.userId}`}>see profile</Link>
      <FriendButton otherId={otherData.userId} />
    </div>
  );
};

export default SmallProfile;
