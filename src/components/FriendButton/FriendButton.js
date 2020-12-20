import { useCheckFriend } from "hooks";
import React, { useContext } from "react";
import { deleteFriend, requestFriend, UserIdContext } from "services/firestore";
import "./FriendButton.css";

const FriendButton = ({ otherId }) => {
  const userContext = useContext(UserIdContext);
  const [isFriend, isMyself] = useCheckFriend(userContext.userId, otherId);
  const onClick = () => {
    if (isFriend) {
      deleteFriend(userContext.userId, otherId);
    } else {
      requestFriend(userContext.userId, otherId);
    }
  };

  return isMyself ? (
    <button className="friendbutton">it's you!</button>
  ) : (
    <button onClick={onClick} className="friendbutton">
      {isFriend ? "delete friend" : "add friend"}
    </button>
  );
};

export default FriendButton;
