import SmallProfile from "components/SmallProfile";
import { dbService } from "mybase";

const { useState, useEffect, createContext } = require("react");
export const UserIdContext = createContext({});

const useCheckFriend = (userId, otherId) => {
  const [isFriend, setIsFriend] = useState(false);
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
    const unSubscribe = checkIsFriend();
    return unSubscribe;
  }, [userId, otherId]);
  return isFriend;
};

const useUserProfileList = () => {
  const [data, setData] = useState([]);
  const setSmallProfiles = (snapshotArray) => {
    setData(
      snapshotArray.map((docSnap) => (
        <li key={docSnap.data().userId}>
          <SmallProfile otherData={docSnap.data()} />
        </li>
      ))
    );
  };
  return [data, setSmallProfiles];
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
  useUserProfileList,
  requestFriend,
  deleteFriend,
  updateMyProfile,
};
