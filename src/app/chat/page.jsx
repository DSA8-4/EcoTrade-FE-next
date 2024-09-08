'use client';

import { useEffect, useState } from 'react';
import styles from './chat.module.css';

const Chat = () => {
  const [roomName, setRoomName] = useState('');
  useEffect(() => {
    fetch('http://localhost:8090/chat/rooms')
      .then((response) => response.json())
      .then((roomList) => {
        console.log(roomList);
        roomList.forEach((room) => {
          console.log(room);
        });
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  const createRoom = async () => {
    const response = await fetch('http://localhost:8090/chat/rooms/createRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomName),
    });
    if (response.ok) {
      const chatRoom = await response.json();
      console.log('Chat room created:', chatRoom);
    } else if (response.status === 409) {
      console.log('Chat room already exists');
    } else {
      console.error('Failed to create chat room:', response.statusText);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Chat Room</h2>
      <div className={styles.roomCreation}>
        <input
          type="text"
          placeholder="Room Name"
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button
          className={styles.btn}
          onClick={() => createRoom()}>
          Create Room
        </button>
      </div>
      <div className={styles.roomList}></div>
    </div>
  );
};

export default Chat;
