import FriendButton from "components/FriendButton/FriendButton";
import { dbService } from "mybase";
import React, { useEffect, useState } from "react";
import { useFriendsList } from "utils/firestore";
import "./OtherProfile.css";

// myprofile + otherprofile => ?
const OtherProfile = ({ match }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const snap = await dbService.doc(`profile/${match.params.userId}`).get();
      const data = snap.data();
      setUserData(data);
    };
    getUserData();
  }, [match]);

  const friends = useFriendsList(userData?.userId);
  return (
    <div className="otherprofile">
      <p>{userData?.userName}'s profile</p>
      <p>unit : {userData?.unit}</p>
      <p>list of friends</p>
      {userData ? <ul className="friendslist">{friends}</ul> : <p>loading</p>}
      {userData && <FriendButton otherId={userData.userId} />}
    </div>
  );
};

export default OtherProfile;
