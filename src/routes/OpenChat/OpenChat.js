import { dbService } from "mybase";
import React, { useContext, useEffect, useState } from "react";
import { UserIdContext } from "services/firestore";
import "./OpenChat.css";

const OpenChat = () => {
  const userContext = useContext(UserIdContext);
  const [data, setData] = useState("");
  const [chatList, setChatList] = useState([]);
  const [head, setHead] = useState({});
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setData(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("chat").doc().set({
      dateString: new Date().toLocaleString(),
      timestamp: Date.now(),
      userId: userContext.userId,
      userName: userContext.userName,
      data: data,
    });
    setData("");
  };

  const makeLoadedChatList = (docs) => {
    return docs.map((doc) => (
      <li key={doc.data().timestamp} className="chatmessage">
        <p className="meta">{doc.data().dateString}</p>
        <p className="meta">{doc.data().userName}'s message</p>
        <p className="data">{doc.data().data}</p>
      </li>
    ));
  };

  const onScroll = (event) => {
    const {
      target: { scrollTop },
    } = event;

    if (scrollTop === 0) {
      const headRef = dbService
        .collection("chat")
        .orderBy("timestamp", "asc")
        .endBefore(head)
        .limitToLast(5);
      headRef.get().then((snapshot) => {
        if (!snapshot.docs[0]) {
          return;
        }
        setHead(snapshot.docs[0]);
        setChatList((prev) => {
          return makeLoadedChatList(snapshot.docs).concat(prev);
        });
      });
    }
  };

  useEffect(() => {
    const firstRef = dbService
      .collection("chat")
      .orderBy("timestamp", "asc")
      .limitToLast(15);
    firstRef.get().then((snapshot) => {
      setHead(snapshot.docs[0]);
      setChatList(makeLoadedChatList(snapshot.docs));
      const scroll = document.querySelector(".chatlist");
      scroll.scrollTop = scroll.scrollHeight - scroll.clientHeight;
    });
  }, []);

  return (
    <div className="openchat">
      <ul className="chatlist" onScroll={onScroll}>
        {chatList}
      </ul>
      <form className="chatform" onSubmit={onSubmit}>
        <input
          type="text"
          value={data}
          onChange={onChange}
          placeholder="enter message here..."
          className="chatinput"
        />
        <input type="submit" value="chat" />
      </form>
    </div>
  );
};

export default OpenChat;
