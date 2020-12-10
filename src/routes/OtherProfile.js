import FriendButton from "components/FriendButton";
import { dbService } from "mybase";
import React, { useEffect, useState } from "react";
import { useUserProfileList } from "utils/firestore";

// myprofile + otherprofile => ?
const OtherProfile = ({ match, userObj }) => {
  const [userData, setUserData] = useState(null);
  const [data, setSmallProfileList] = useUserProfileList(userObj);

  useEffect(() => {
    const getUserData = async () => {
      const snap = await dbService.doc(`profile/${match.params.userId}`).get();
      const data = snap.data();
      setUserData(data);
    };
    getUserData();
  }, [match]);

  useEffect(() => {
    const getFriends = async () => {
      const query = await dbService
        .collection("relationship")
        .where("requestorId", "==", userData.userId)
        .get();
      const promiseArray = query.docs.map((snapshot) =>
        dbService.doc(`profile/${snapshot.data().receiverId}`).get()
      );
      const values = await Promise.all(promiseArray);
      setSmallProfileList(values);
    };
    if (userData) getFriends();
  }, [userData, setSmallProfileList]);

  return (
    <div className="container">
      <p>{userData?.userName}'s profile</p>
      <p>{userData?.unit}</p>
      <p>list of friends</p>
      <ul>{data}</ul>
      {userData && (
        <FriendButton userId={userObj.userId} otherId={userData.userId} />
      )}
    </div>
  );
};

export default OtherProfile;
