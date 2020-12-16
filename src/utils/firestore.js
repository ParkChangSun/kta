import SmallProfile from "components/SmallProfile/SmallProfile";
import { dbService } from "mybase";

const { useState, useEffect, createContext } = require("react");

const useCheckFriend = (userId, otherId) => {
  const [isFriend, setIsFriend] = useState(false);
  const [isMyself, setIsMyself] = useState(false);
  useEffect(() => {
    const checkIsFriend = () => {
      const unSubscribe = dbService
        .collection("relationship")
        .where("requestorId", "==", userId)
        .where("receiverId", "==", otherId)
        .onSnapshot((snapshot) => {
          setIsFriend(!snapshot.empty);
        });
      return unSubscribe;
    };
    if (userId === otherId) {
      setIsMyself(true);
    }
    const unSubscribe = checkIsFriend();
    return unSubscribe;
  }, [userId, otherId]);
  return [isFriend, isMyself];
};

const useSearchedList = () => {
  const [data, setData] = useState([]);
  const setSmallProfiles = (snapshotArray) => {
    setData(
      snapshotArray.map((docSnap) => (
        <SmallProfile key={docSnap.data().userId} otherData={docSnap.data()} />
      ))
    );
  };
  return [data, setSmallProfiles];
};

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

const requestFriend = async (requestorId, receiverId) => {
  await dbService.collection("relationship").doc().set({
    requestorId: requestorId,
    receiverId: receiverId,
    requestedAt: Date.now(),
  });
  console.log(requestorId);
};

const deleteFriend = async (requestorId, receiverId) => {
  const relationSnap = await dbService
    .collection("relationship")
    .where("requestorId", "==", requestorId)
    .where("receiverId", "==", receiverId)
    .get();
  relationSnap.docs[0].ref.delete();
};

const updateMyProfile = async (userId, userName, newUnitName) => {
  await dbService.collection("profile").doc(userId).set({
    userId: userId,
    userName: userName,
    unit: newUnitName,
    revisedAt: Date.now(),
  });
};

export {
  useCheckFriend,
  useSearchedList,
  useFriendsList,
  requestFriend,
  deleteFriend,
  updateMyProfile,
};
export const UserIdContext = createContext({});
