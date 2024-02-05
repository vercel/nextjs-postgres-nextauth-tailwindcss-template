// pages/components/Message.tsx

import React, { useState } from 'react';
import styles from './Message.module.css'; // Import CSS module for styling
import MessageModal from './MessageModal'; // Import MessageModal component

interface MessageProps {
  sender: string;
  preview: string;
  time: string;
}

const Message: React.FC<MessageProps> = ({ sender, preview, time }) => {
  const [showModal, setShowModal] = useState(false);

  const messages = Array.from({ length: 10 }, (_, index) => `Message ${index + 1}`); // Dummy messages

  return (
    <>
      <div className={styles.message} onClick={() => setShowModal(true)}>
        <div className={styles.sender}>{sender}</div>
        <div className={styles.preview}>{preview}</div>
        <div className={styles.time}>{time}</div>
      </div>
      {showModal && (
        <MessageModal
          sender={sender}
          messages={messages}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Message;
