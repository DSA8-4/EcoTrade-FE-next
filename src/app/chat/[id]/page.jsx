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

    stomp.current.activate();

    return () => {
      if (stomp.current) stomp.current.deactivate();
    };
  }, [id]);

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
