import ProfileForm from "components/ProfileForm/ProfileForm";
import { useFriendsList } from "hooks";
import React, { useContext } from "react";
import { UserIdContext } from "services/firestore";
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
