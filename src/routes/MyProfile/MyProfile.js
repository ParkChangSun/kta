import ProfileForm from "components/ProfileForm/ProfileForm";
import React, { useContext } from "react";
import { useFriendsList, UserIdContext } from "utils/firestore";
import "./MyProfile.css";

const MyProfile = () => {
  const userContext = useContext(UserIdContext);
  const friends = useFriendsList(userContext.userId);

  return (
    <div className="myprofile">
      <p>my profile</p>
      <ProfileForm />
      <p>friends</p>
      <ul className="friendslist">{friends}</ul>
    </div>
  );
};

export default MyProfile;
