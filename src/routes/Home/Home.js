import { dbService } from "mybase";
import React, { useState } from "react";
import { useSearchedList } from "utils/firestore";
import "./Home.css";

const Home = () => {
  const [info, setInfo] = useState("");
  const [data, setSmallProfileList] = useSearchedList();
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
    <div className="home">
      <p>home look for someone</p>
      <form onSubmit={onSubmit} className="searchForm">
        <input type="text" placeholder="type info here" onChange={onChange} />
        <input type="submit" value="search" />
      </form>
      <ul className="usersfoundlist">{data}</ul>
    </div>
  );
};

export default Home;
