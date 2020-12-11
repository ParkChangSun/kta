import ProfileForm from "components/ProfileForm";
import React, { useContext } from "react";
import { useFriendsList, UserIdContext } from "utils/firestore";

const MyProfile = ({ refreshUser }) => {
  const userContext = useContext(UserIdContext);
  const friends = useFriendsList(userContext.userId);

  return (
    <div className="container">
      <ProfileForm refreshUser={refreshUser} />
      <p>friends</p>
      <ul>{friends}</ul>
    </div>
  );
};

export default MyProfile;
