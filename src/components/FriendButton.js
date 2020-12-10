import React, { useContext } from "react";
import { deleteFriend, requestFriend, useCheckFriend, UserIdContext } from "utils/firestore";

const FriendButton = ({ otherId }) => {
  const userContext = useContext(UserIdContext)
  const isFriend = useCheckFriend(userContext.userId, otherId);
  const onClick = () => {
    if (isFriend) {
      deleteFriend(userContext.userId, otherId);
    } else {
      requestFriend(userContext.userId, otherId);
    }
  };

  return isFriend ? (
    <button onClick={onClick}>delete friend</button>
  ) : (
    <button onClick={onClick}>add friend</button>
  );
};

export default FriendButton;
