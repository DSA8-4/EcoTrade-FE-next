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
        console.log('chatroombyid', data);
        setChatRooms(data);
      });
  }, [id]);

  const selectBuyer = (name) => {
    console.log(name);
    fetch(`http://localhost:8090/products/purchase/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        console.log(response);
        alert('구매가 확정되었습니다.');
        router.replace('/');
      })
      .catch(() => alert('구매확정을 할 수 없습니다.'));
  };

  return (
    <div className={styles.container}>
      <h2>{chatRooms.length && chatRooms[0].name}에 관심을 보인 사람들</h2>
      <div className={styles.roomList}>
        {chatRooms.length !== 0
          ? chatRooms.map((room, index) => (
              <div
                key={`${room.id}-${index}`}
                className={styles.roomItem}>
                <div
                  onClick={() => router.push(`/chat/${room.id}`)}
                  className={styles.icon}>
                  <Image
                    src="/images/profile-icon.png"
                    alt="아이콘"
                    width={40}
                    height={40}
                  />
                  <div className={styles.text}>
                    <h3>{room.otherPerson}님과의 대화</h3>
                    <h3>{room.sender}</h3>
                    <div className={styles.messageWrapper}>
                      <p>{room.lastMessage}</p>
                      <span className={styles.date}>
                        {new Date(room.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {room.unreadCount > 0 && <p className={styles.unReadMessage}>{room.unreadCount}</p>}
                <button
                  onClick={() => selectBuyer(room.otherPerson)}
                  className={styles.assertBuyer}>
                  구매 확정
                </button>
              </div>
            ))
          : '진행중인 채팅이 없습니다.'}
      </div>
    </div>
  );
};
export default Buyers;
