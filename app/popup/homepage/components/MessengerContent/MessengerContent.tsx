// pages/components/MessengerContent.tsx

import React from 'react';
import styles from './MessengerContent.module.css'; // Import CSS module for styling
import Message from './components/Message'; // Import Message component

const MessengerContent: React.FC = () => {
  // Dummy data for messages
  const messages = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    sender: `Sender ${index + 1}`,
    preview: `Preview of Message ${index + 1}`,
    time: new Date().toLocaleTimeString(), // Use current time as a placeholder
  }));

  return (
    <div className={styles.container}>
      <div className={styles.messages}>
        {messages.map(message => (
          <Message
            key={message.id}
            sender={message.sender}
            preview={message.preview}
            time={message.time}
          />
        ))}
      </div>
    </div>
  );
};

export default MessengerContent;
