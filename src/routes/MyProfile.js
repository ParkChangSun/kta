import ProfileForm from "components/ProfileForm";
import { dbService } from "mybase";
import React, { useContext, useEffect, useState } from "react";
import { UserIdContext, useUserProfileList } from "utils/firestore";
import SmallProfile from "components/SmallProfile";

const MyProfile = ({ refreshUser }) => {
  const userContext = useContext(UserIdContext);
  const [data, setData] = useState([]);
  console.log(userContext);
  // const [data, setSmallProfileList] = useUserProfileList(userObj);
  useEffect(() => {
    const getFriends = async () => {
      const query = await dbService
        .collection("relationship")
        .where("requestorId", "==", userContext.userId)
        .get();
      const promiseArray = query.docs.map((doc) =>
        dbService.doc(`profile/${doc.data().receiverId}`).get()
      );
      const values = await Promise.all(promiseArray);
      setData(
        values.map((docSnap) => (
          <li key={docSnap.data().userId}>
            <SmallProfile otherData={docSnap.data()} />
          </li>
        ))
      );
    };
    getFriends();
  }, []);

  return (
    <div className="container">
      <ProfileForm refreshUser={refreshUser} />
      <p>friends</p>
      <ul>{data}</ul>
    </div>
  );
};

export default MyProfile;
