"use client";
import SockJS from "sockjs-client";
import styles from "./chat.module.css";
import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";

const Chat = ({ id }) => {
  const [roomName, setRoomName] = useState("");
  const stomp = useRef(null);

  useEffect(() => {
    stomp.current = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8090/chat-websocket"),
      onConnect: () => {
        console.log("========== Connected ==========");
      },
    });

    stomp.current.activate();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Chat Room</h2>
      <div className={styles.roomCreation}>
        <input
          type="text"
          placeholder="Room Name"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button className={styles.btn} onClick={() => createRoom()}>
          Create Room
        </button>
      </div>
      <div className={styles.roomList}></div>
      <div className={styles.chatBox}></div>
      <div className={styles.messageInput}>
        <input type="text" placeholder="Your Name" />
        <input type="text" placeholder="Type a message..." />
        <button className={styles.btn} onClick={() => sendMessage()}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
