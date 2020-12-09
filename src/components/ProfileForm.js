import { dbService } from "mybase";
import React, { useEffect, useState } from "react";
import { updateMyProfile } from "utils/firestore";

const ProfileForm = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.userName);
  const [newUnitName, setNewUnitName] = useState("");

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
    if (userObj.userName !== newDisplayName) {
      await userObj.updateProfile({ displayName: newDisplayName });
      refreshUser();
    }
    updateMyProfile(userObj.uid, userObj.userName, newUnitName);
  };

  useEffect(() => {
    const unSubscribe = dbService
      .doc(`profile/${userObj.uid}`)
      .onSnapshot((snapShot) => {
        setNewUnitName(snapShot.data()?.unit);
      });
    return unSubscribe;
  }, []);

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
