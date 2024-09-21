import { Container, SystemMessage, } from '@/components/chatRoom/chatRoom.style.ts';
import MyMessageBox from '@/components/chatRoom/MyMessageBox.tsx';
import OthersMessageBox from '@/components/chatRoom/OthersMessageBox.tsx';
import { useLayoutEffect, useRef, useState } from 'react';

interface testChat {
  _id: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
  };
}

interface groupMessage {
  _id: string;
  chat: string[];
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
  };
}

// Todo: userName은 id로 변경 필요
const MessageList = () => {
  const [messageList, setMessageList] = useState<groupMessage[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleMessage = (message: testChat) => {
    const setMessage = { ...message, chat: [message.chat] };

    setMessageList((prevState) => {
      if (prevState.length > 0) {
        const lastMessage = prevState[prevState.length - 1];
        const isSameUser = lastMessage.user.id === message.user.id;
        const isSameTime =
          lastMessage?.createdAt.slice(0, 16) ===
          message.createdAt.slice(0, 16);

        if (isSameUser && isSameTime) {
          const updatedMessage = {
            ...lastMessage,
            chat: [...lastMessage.chat, ...setMessage.chat],
          };
          return [...prevState.slice(0, prevState.length - 1), updatedMessage];
        }
      }
      return [...prevState, setMessage];
    });
  };
  handleMessage({
    _id: '1',
    chat: '안녕하세요',
    createdAt: '2021-09-21T14:00:00',
    updatedAt: '2021-09-21T14:00:00',
    user: {
      id: '1',
      name: '이준석'
    }
  });

  // useEffect(() => {
  //   socket.on('message', (message: testChat) => {
  //     handleMessage(message);
  //   });
  // }, []);

  useLayoutEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageList]);

  return (
    <Container>
      <SystemMessage>이준석님이 들어왔습니다.</SystemMessage>
      <SystemMessage>2024년 9월 21일 토요일</SystemMessage>
      {messageList.map((message) =>
        // Todo: 본인 확인 로직 추가 필요 userId로
        message.user.name ? (
          <MyMessageBox
            key={message.createdAt}
            messages={message.chat}
            time={message.createdAt}
          />
        ) : (
          <OthersMessageBox
            key={message.createdAt}
            name={message.user.name}
            img={''}
            messages={message.chat}
            time={message.createdAt}
          />
        )
      )}
      <div ref={messageEndRef} />
    </Container>
  );
};

export default MessageList;
