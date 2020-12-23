import SmallProfile from "components/SmallProfile/SmallProfile";

const { useState } = require("react");

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

export { useSearchedList };
