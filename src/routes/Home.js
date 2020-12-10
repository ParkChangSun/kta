import { dbService } from "mybase";
import React, { useState } from "react";
import { useUserProfileList } from "utils/firestore";

const Home = () => {
  const [info, setInfo] = useState("");
  const [data, setSmallProfileList] = useUserProfileList();
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInfo(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const query = await dbService
      .collection("profile")
      .where("userName", "==", info)
      .get();
    setSmallProfileList(query.docs);
  };

  return (
    <div className="container">
      <p>home look for someone</p>
      <form onSubmit={onSubmit} className="searchForm">
        <input type="text" placeholder="type info here" onChange={onChange} />
        <input type="submit" value="search" />
      </form>
      <ul className="usersFoundList">{data}</ul>
    </div>
  );
};

export default Home;
