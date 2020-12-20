const {
  default: SmallProfile,
} = require("components/SmallProfile/SmallProfile");
const { dbService } = require("mybase");
const { useState, useEffect } = require("react");

const useFriendsList = (targetId) => {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const query = await dbService
        .collection("relationship")
        .where("requestorId", "==", targetId)
        .get();
      const promiseArray = query.docs.map((doc) =>
        dbService.doc(`profile/${doc.data().receiverId}`).get()
      );
      const values = await Promise.all(promiseArray);
      setFriends(
        values.map((docSnap) => (
          <SmallProfile
            key={docSnap.data().userId}
            otherData={docSnap.data()}
          />
        ))
      );
    };
    if (targetId) getFriends();
  }, [targetId]);
  return friends;
};

export { useFriendsList };
