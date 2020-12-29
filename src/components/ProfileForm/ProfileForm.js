import React, { useContext, useState } from "react";
import { updateMyProfile, UserIdContext } from "services/firestore";

const ProfileForm = () => {
  const userContext = useContext(UserIdContext);
  const [newUserName, setNewUserName] = useState(userContext.userName);
  const [newUnitName, setNewUnitName] = useState(userContext.unit);
  const [newBranch, setNewBranch] = useState(userContext.branch);

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "name") {
      setNewUserName(value);
    } else if (name === "unit") {
      setNewUnitName(value);
    } else if (name === "branch") {
      setNewBranch(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const myDataObject = {
      userId: userContext.userId,
      userName: newUserName,
      unit: newUnitName,
      branch: newBranch,
    };
    updateMyProfile(myDataObject);
  };

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
      <input
        type="text"
        placeholder="branch"
        name="branch"
        value={newBranch || ""}
        onChange={onChange}
      />
      <input type="submit" value="update profile" />
    </form>
  );
};

export default ProfileForm;
