import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChatMessage, GroupMessage } from '@/types/chat.ts';
import { useMessageSubscription } from '@/hooks/useMessageSubscription.ts';

import MyMessageBox from '@/components/chatRoom/MyMessageBox.tsx';
import OthersMessageBox from '@/components/chatRoom/OthersMessageBox.tsx';
import {
  Container,
  SystemMessage,
} from '@/components/chatRoom/chatRoom.style.ts';
import GoNewMessageButton from '@/components/chatRoom/GoNewMessageButton.tsx';

const MessageList = ({
  userId,
  currentPartyId,
  inAppNotificationHandler,
  initialChatMessage,
  children,
}: {
  userId: string;
  currentPartyId: string;
  inAppNotificationHandler: (message: ChatMessage) => void;
  initialChatMessage: GroupMessage[];
  children: ReactNode;
}) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [messageList, setMessageList] = useState<GroupMessage[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [showUpButton, setShowUpButton] = useState(false);

  const handleNewMessage = (message: ChatMessage) => {
    if (message.partyId === Number(currentPartyId)) {
      chatHandler(message, setMessageList);
    } else {
      inAppNotificationHandler(message);
    }
  };

  useMessageSubscription(handleNewMessage);

  useLayoutEffect(() => {
    if (isVisible) {
      // 화면에 요소가 보일 때 발생할 이벤트
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // 화면에서 요소가 벗어났을 때 발생할 이벤트
      if (
        messageList.length > 0 &&
        messageList[messageList.length - 1].sender?.id !== userId
      ) {
        setShowUpButton(true);
      }
    }
  }, [messageList]);

  // Intersection Observer를 사용해 요소 가시성 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentRef = messageEndRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      setShowUpButton(false);
    }
  }, [isVisible]);

  // 메시지가 업데이트될 때마다 최하단으로 스크롤
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView();
    }
  }, [initialChatMessage]);

  return (
    <>
      <Container>
        {children}
        {messageList.map((message) =>
          !message.sender ? (
            <SystemMessage>{message.chat[0]}</SystemMessage>
          ) : message.sender?.id === userId ? (
            <MyMessageBox
              key={message.createdAt}
              messages={message.chat}
              time={message.createdAt}
            />
          ) : (
            <OthersMessageBox
              key={message.createdAt}
              name={message.sender?.nickname || 'user'}
              img={message.sender?.profileImage || ''}
              messages={message.chat}
              time={message.createdAt}
            />
          )
        )}
        <div ref={messageEndRef} style={{ height: '2px' }} />
      </Container>
      {showUpButton && messageList.length > 0 && (
        <GoNewMessageButton
          img={messageList[messageList.length - 1].sender?.profileImage || ''}
          name={messageList[messageList.length - 1].sender?.nickname || ''}
          message={
            messageList[messageList.length - 1].chat[
              messageList[messageList.length - 1].chat.length - 1
            ]
          }
          onClick={() => {
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}
    </>
  );
};

export default MessageList;

const chatHandler = (
  message: ChatMessage,
  setMessageList: React.Dispatch<React.SetStateAction<GroupMessage[]>>
) => {
  const setMessage = { ...message, chat: [message.message] };

  setMessageList((prevState) => {
    if (prevState.length > 0) {
      const lastMessage = prevState[prevState.length - 1];
      const isSameUser = lastMessage.sender?.id === message.sender.id;
      const isSameTime =
        lastMessage.createdAt.slice(0, 16) === message.createdAt?.slice(0, 16);

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
