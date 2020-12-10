import FriendButton from "components/FriendButton";
import SmallProfile from "components/SmallProfile";
import { dbService } from "mybase";
import React, { useContext, useEffect, useState } from "react";
import { UserIdContext, useUserProfileList } from "utils/firestore";

// myprofile + otherprofile => ?
const OtherProfile = ({ match }) => {
  const [userData, setUserData] = useState(null);
  // const [data, setSmallProfileList] = useUserProfileList(userObj);
  const userContext = useContext(UserIdContext);
  const [data, setData] = useState([]);

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
      // setSmallProfileList(values);
      setData(
        values.map((docSnap) => (
          <li key={docSnap.data().userId}>
            <SmallProfile otherData={docSnap.data()} />
          </li>
        ))
      );
    };
    if (userData) getFriends();
  }, [userData]);

  return (
    <div className="container">
      <p>{userData?.userName}'s profile</p>
      <p>{userData?.unit}</p>
      <p>list of friends</p>
      <ul>{data}</ul>
      {userData && <FriendButton otherId={userData.userId} />}
    </div>
  );
};

export default OtherProfile;
