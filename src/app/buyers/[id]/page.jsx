'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './buyer.module.css';

const Buyers = ({ params: { id } }) => {
  const [chatRooms, setChatRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8090/chat/rooms/${id}`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChatRooms(data);
      });
  }, [id]);

  return (
    <div className={styles.container}>
      <h2>{chatRooms.length && chatRooms[0].name}에 관심을 보인 사람들</h2>
      <div className={styles.roomList}>
        {chatRooms.map((room, index) => (
          <div
            onClick={() => router.push(`/chat/${id}`)}
            key={`${room.id}-${index}`}
            className={styles.roomItem}>
            <div className={styles.icon}>
              <Image
                src="/images/profile-icon.png"
                alt="아이콘"
                width={30}
                height={30}
              />
            </div>
            <div className={styles.text}>
              <h3>{room.sender}</h3>
              <div className={styles.messageWrapper}>
                <p>{room.lastMessage}</p>
                <span className={styles.date}>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <button className={styles.assertBuyer}>구매 확정</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Buyers;
