'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styles from './chatRoom.module.css';

const Chat = ({ params: { id } }) => {
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState();
  const stomp = useRef(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:8090/chat/rooms/${id}/messages`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((chatMessages) => {
        setMessages(chatMessages);
        if (chatMessages.length === 0) sessionStorage.setItem('delete', 'true');
        else sessionStorage.setItem('delete', 'false');
      });

    stomp.current = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8090/chat-websocket'),
      onConnect: () => {
        console.log('========== Connected ==========');
        stomp.current.subscribe(`/sub/chatroom/${id}`, ({body}) => {
          const message = JSON.parse(body);
          setMessages(prev => [...prev, message])
          console.log('Received message:', chatRoomData);
        });
      },
    });

    stomp.current.activate();

    return () => {
      if (stomp.current) stomp.current.deactivate();
      if (sessionStorage.getItem('delete') === 'false') return;
      fetch(`http://localhost:8090/chat/rooms/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.ok) console.log('Chat room deleted successfully');
          else if (response.status === 409) console.log('Chat room has messages, not deleted');
        })
        .catch((error) => console.error('Error deleting chat room:', error));
    };
  }, [id]);

  const sendMessage = (e) => {
    sessionStorage.setItem('delete', 'false');
    stomp.current.publish({
      destination: `/pub/chat/send/${id}`,
      body: JSON.stringify({
        content: newMessage,
        sender: sessionStorage.getItem('name'),
      }),
    });
    
  };

  const handleNewLine = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
      e.target.value = ''
    }
  };

  return (
    <div className={styles.container}>
      <h2>Chat Room</h2>
      <div className={styles.chatBox}>
        {messages && messages.map(message => {
          return <li className={message.sender === sessionStorage.getItem('name') ? styles.me : styles.other} key={message.id}>
            <p className={message.sender === sessionStorage.getItem('name') ? styles.myMessage : styles.otherMessage}>{message.content}</p>
            </li>
        })}
      </div>
      <div className={styles.messageInput}>
      
        <input
          onKeyDown={handleNewLine}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
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

export default Chat;
