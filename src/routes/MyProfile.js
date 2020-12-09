import ProfileForm from "components/ProfileForm";
import { dbService } from "mybase";
import React, { useEffect } from "react";
import { useUserProfileList } from "utils/firestore";

const MyProfile = ({ userObj, refreshUser }) => {
  const [data, setSmallProfileList] = useUserProfileList(userObj);
  useEffect(() => {
    const getFriends = async () => {
      const query = await dbService
        .collection("relationship")
        .where("requestorId", "==", userObj.userId)
        .get();
      const promiseArray = query.docs.map((doc) =>
        dbService.doc(`profile/${doc.data().receiverId}`).get()
      );
      const values = await Promise.all(promiseArray);
      setSmallProfileList(values);
    };
    getFriends();
  }, []);

  return (
    <>
      <ProfileForm userObj={userObj} refreshUser={refreshUser} />
      <p>friends</p>
      <ul>{data}</ul>
    </>
  );
};

export default MyProfile;
