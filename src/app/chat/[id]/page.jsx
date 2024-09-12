'use client';

import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styles from '../chat.module.css';

const Chat = ({ params: { id } }) => {
  const [roomName, setRoomName] = useState('');
  const stomp = useRef(null);

  useEffect(() => {
    stomp.current = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8090/chat-websocket'),
      onConnect: () => {
        console.log('========== Connected ==========');
      },
    });

    fetch(`http://localhost:8090/chat/rooms/createRoom`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
       },
      body: JSON.stringify({
        member_id: sessionStorage.getItem("member_id"),
        id,
      }),
    }).then(data => console.log(data));
    stomp.current.activate();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Chat Room</h2>
      <div className={styles.roomList}></div>
      <div className={styles.chatBox}></div>
      <div className={styles.messageInput}>
        <div className={styles.name}>
          {/* {typeof window !== 'undefined' ? sessionStorage.getItem('name') : ''} */}
        </div>
        <input
          type="text"
          placeholder="Type a message..."
        />
        <button className={styles.btn}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
