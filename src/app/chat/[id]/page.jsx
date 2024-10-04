'use client';

import { useEffect, useRef, useState } from 'react';
//useContext
// import { AuthContext } from '@/context/AuthContext';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styles from './chatRoom.module.css';

const ChatRoom = ({ params: { id } }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const stomp = useRef(null);
  // const { user } = useContext(AuthContext);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8090/chat/rooms/${id}/messages`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((chatMessages) => {
        setMessages(chatMessages);
      });

    stomp.current = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8090/chat-websocket'),
      onConnect: () => {
        stomp.current.subscribe(`/sub/chatroom/${id}`, ({ body }) => {
          const message = JSON.parse(body);

          setMessages((prev) => [...prev, message]);
        });
      },
    });

    stomp.current.activate();

    return () => {
      if (stomp.current) stomp.current.deactivate();
    };
  }, [id]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      stomp.current.publish({
        destination: `/pub/chat/send/${id}`,
        body: JSON.stringify({
          content: newMessage,
          sender: sessionStorage.getItem('name'),
          timestamp: new Date().toISOString(),
        }),
      });
      setNewMessage('');
    }
  };

  const handleNewLine = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    const minutes = date.getMinutes();

    return `${period} ${formattedHours}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <h2>Chat Room</h2>
      <div
        className={styles.chatBox}
        ref={chatBoxRef}>
        {messages.map((message, index) => (
          <div
            className={`${styles.messageWrapper} ${
              message.sender === sessionStorage.getItem('name') ? styles.me : styles.other
            }`}
            key={message.id || index}>
            <div className={styles.messageContent}>
              {message.sender === sessionStorage.getItem('name') && (
                <span className={styles.timestampRight}>{formatTime(message.timestamp)}</span>
              )}
              <p
                className={
                  message.sender === sessionStorage.getItem('name')
                    ? styles.myMessage
                    : styles.otherMessage
                }>
                {message.content}
              </p>
              {message.sender !== sessionStorage.getItem('name') && (
                <span className={styles.timestampLeft}>{formatTime(message.timestamp)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.messageInput}>
        <input
          onKeyDown={handleNewLine}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          value={newMessage}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className={styles.btn}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
