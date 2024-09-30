'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './chat.module.css';

const Chat = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8090/chat/rooms/list', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((roomList) => {
        const uniqueRooms = Array.from(new Map(roomList.map((room) => [room.id, room])).values());
        setChatRooms(uniqueRooms);
        console.log(roomList);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  const handleRoomClick = (id) => {
    router.push(`/chat/${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>Chat List</h2>
      <div className={styles.roomList}>
        {chatRooms.map((room, index) => (
          <div
            key={`${room.id}-${index}`}
            className={styles.roomItem}
            onClick={() => handleRoomClick(room.id)}>
            <div className={styles.icon}>
              <Image
                src="/images/profile-icon.png"
                alt="아이콘"
                width={30}
                height={30}
              />
            </div>
            <div className={styles.text}>
              <h3 className={styles.nameSender}>
                <p>품명: {room.name}</p>
                <p>닉네임: {room.sender}</p>
              </h3>
              <div className={styles.messageWrapper}>
                <p>{room.lastMessage}</p>
                <span className={styles.date}>{new Date(room.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
            <div className={styles.productImage}>
              <Image
                src={room.imageUrl}
                alt="상품 이미지"
                width={45}
                height={45}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
