import React from "react";
import { Link } from "react-router-dom";
import FriendButton from "./FriendButton";

const SmallProfile = ({ userObj, otherData }) => {
  return (
    <>
      <h2>{otherData.userName}</h2>
      <p>{otherData.unit}</p>
      <Link to={`/profile/${otherData.userId}`}>see profile</Link>
      <FriendButton userId={userObj.userId} otherId={otherData.userId} />
    </>
  );
};

export default SmallProfile;
