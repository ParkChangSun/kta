import React from "react";
import { deleteFriend, requestFriend, useCheckFriend } from "utils/firestore";

const FriendButton = ({ userId, otherId }) => {
  const isFriend = useCheckFriend(userId, otherId);
  const onClick = () => {
    if (isFriend) {
      deleteFriend(userId, otherId);
    } else {
      requestFriend(userId, otherId);
    }
  };

  return isFriend ? (
    <button onClick={onClick}>delete friend</button>
  ) : (
    <button onClick={onClick}>add friend</button>
  );
};

export default FriendButton;
