import FriendButton from "components/FriendButton";
import { dbService } from "mybase";
import React, { useEffect, useState } from "react";
import { useFriendsList } from "utils/firestore";

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
    <div className="container">
      <p>{userData?.userName}'s profile</p>
      <p>{userData?.unit}</p>
      <p>list of friends</p>
      {userData ? <ul>{friends}</ul> : <p>loading</p>}
      {userData && <FriendButton otherId={userData.userId} />}
    </div>
  );
};

export default OtherProfile;
