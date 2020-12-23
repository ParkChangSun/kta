import { dbService } from "mybase";
import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "services/firestore";

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
      timestamp: Date.now(),
      userId: userContext.userId,
      data: data,
    });
    setData("");
  };
  useEffect(() => {
    const unSubscribe = dbService.collection("chat").onSnapshot((snapshot) => {
      setChatList(
        snapshot.docs.map((doc, index) => (
          <li key={index}>{doc.data().data}</li>
        ))
      );
    });
    return unSubscribe;
  }, []);
  return (
    <>
      <ul className={chatlist}>{chatList}</ul>
      <form onSubmit={onSubmit}>
        <input type="text" value={data} onChange={onChange} />
        <input type="submit" value="chat" />
      </form>
    </>
  );
};

export default OpenChat;
