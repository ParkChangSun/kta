import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserIdContext } from "utils/firestore";
import FriendButton from "./FriendButton";

const SmallProfile = ({ otherData }) => {
  const contextUserId = useContext(UserIdContext);
  console.log(contextUserId);
  return (
    <>
      <h2>{otherData.userName}</h2>
      <p>{otherData.unit}</p>
      <Link to={`/profile/${otherData.userId}`}>see profile</Link>
      <FriendButton otherId={otherData.userId} />
    </>
  );
};

export default SmallProfile;
