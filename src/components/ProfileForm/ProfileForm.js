import { dbService } from "mybase";
import React, { useContext, useEffect, useState } from "react";
import { updateMyProfile, UserIdContext } from "services/firestore";

const ProfileForm = () => {
  const userContext = useContext(UserIdContext);
  const [newDisplayName, setNewDisplayName] = useState(userContext.userName);
  const [newUnitName, setNewUnitName] = useState(userContext.unit);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setNewDisplayName(value);
    } else if (name === "unit") {
      setNewUnitName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    updateMyProfile(userContext.userId, userContext.userName, newUnitName);
  };

  useEffect(() => {
    const unSubscribe = dbService
      .doc(`profile/${userContext.userId}`)
      .onSnapshot((snapShot) => {
        setNewUnitName(snapShot.data()?.unit);
      });
    return unSubscribe;
  }, [userContext]);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={newDisplayName}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="unit that you belong to"
        name="unit"
        value={newUnitName || ""}
        onChange={onChange}
      />
      <input type="submit" value="update profile" />
    </form>
  );
};

export default ProfileForm;
