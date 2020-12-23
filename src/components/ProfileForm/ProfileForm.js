import { dbService } from "mybase";
import React, { useContext, useEffect, useState } from "react";
import { updateMyProfile, UserIdContext } from "services/firestore";

const ProfileForm = () => {
  const userContext = useContext(UserIdContext);
  const [newUserName, setNewUserName] = useState(userContext.userName);
  const [newUnitName, setNewUnitName] = useState(userContext.unit);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setNewUserName(value);
    } else if (name === "unit") {
      setNewUnitName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const myDataObject = {
      userId: userContext.userId,
      userName: newUserName,
      unit: newUnitName,
    };
    updateMyProfile(myDataObject);
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
        value={newUserName}
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
