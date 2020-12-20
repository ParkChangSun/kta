const { dbService } = require("mybase");
const { useState, useEffect } = require("react");

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

export { useCheckFriend };
