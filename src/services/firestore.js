import { dbService } from "mybase";
import { createContext } from "react";

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

export { requestFriend, deleteFriend, updateMyProfile };
export const UserIdContext = createContext({});
