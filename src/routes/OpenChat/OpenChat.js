import { dbService } from "mybase";
import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "services/firestore";
import "./OpenChat.css";

const OpenChat = () => {
  const userContext = useContext(UserIdContext);
  const [data, setData] = useState("");
  const [chatList, setChatList] = useState([]);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setData(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("chat").doc().set({
      timestamp: new Date().toLocaleString(),
      userId: userContext.userId,
      userName: userContext.userName,
      data: data,
    });
    setData("");
  };
  useEffect(() => {
    const unSubscribe = dbService.collection("chat").onSnapshot((snapshot) => {
      setChatList(
        snapshot.docs.map((doc, index) => (
          <li key={index}>
            <p className="meta">{doc.data().timestamp}</p>
            <p className="meta">{doc.data().userName}'s message</p>
            <p className="data">{doc.data().data}</p>
          </li>
        ))
      );
    });
    return unSubscribe;
  }, []);
  return (
    <div className="openchat">
      <ul className="chatlist">{chatList}</ul>
      <form className="chatform" onSubmit={onSubmit}>
        <input
          type="text"
          value={data}
          onChange={onChange}
          className="chatinput"
        />
        <input type="submit" value="chat" />
      </form>
    </div>
  );
};

export default OpenChat;
