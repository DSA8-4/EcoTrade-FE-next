"use client";
import SockJS from "sockjs-client";
import styles from "./chat.module.css";
import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";

const Chat = () => {
  const socket = Stomp.over(
    () => new SockJS("http://localhost:8090/chat-websocket"),
  );
  const stompClient = Stomp.over(socket);
  const [rn, setRn] = useState("");

  useEffect(() => {
    fetch("http://localhost:8090/chat/rooms")
      .then((response) => response.json())
      .then((roomList) => {
        roomList.forEach((room) => {
          console.log(room);
        });
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });

    stompClient.connect(
      {},
      () => {
        console.log("Connected to WebSocket");
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      },
    );

    return () => {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    };
  }, [stompClient]);

  const sendMessage = () => {};

  return (
    <div className={styles.container}>
      <h2>Chat Room</h2>
      <div className={styles.roomCreation}>
        <input
          type="text"
          placeholder="Room Name"
          onChange={(e) => setRn(e.target.value)}
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
