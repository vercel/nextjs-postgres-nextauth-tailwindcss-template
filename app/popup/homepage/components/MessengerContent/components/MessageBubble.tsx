// pages/components/MessageBubble.tsx

import React from 'react';
import styles from './MessageBubble.module.css'; // Import CSS module for styling

interface MessageBubbleProps {
  sender: string;
  content: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, content }) => {
  // Split the content by newline characters to render each line separately
  const lines = content.split('\n');

  return (
    <div className={sender === 'User' ? styles.userBubble : styles.senderBubble}>
      {lines.map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </div>
  );
};

export default MessageBubble;
