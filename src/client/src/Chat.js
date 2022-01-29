import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    console.log("ws established...");
    socket.on("get:msg", (data) => {
      console.log(data);
      setMessages(Array.from(data.msg));
    });
    return () => {
      socket.off("get:msg");
      socket.disconnect("end");
    }; // close socket on unmount
  }, []);

  return (
    <ul>
      {messages.map((m) => (
        <Message messageContent={m} key={m.id} />
      ))}
    </ul>
  );
};

const Message = ({ messageContent }) => {
  return (
    <li>
      User: {messageContent.user} || Message: {messageContent.text} || Time:{" "}
      {messageContent.time.toString()}
    </li>
  );
};

export default Chat;
