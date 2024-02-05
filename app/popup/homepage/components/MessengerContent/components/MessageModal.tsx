import React, { useState, useEffect, useRef } from 'react';
import styles from './MessageModal.module.css'; // Import CSS module for styling
import MessageBubble from './MessageBubble'; // Import MessageBubble component

interface MessageModalProps {
  sender: string;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ sender, onClose }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Populate with 100 sample messages
    const sampleMessages = Array.from({ length: 100 }, (_, index) => ({
      sender: index % 2 === 0 ? sender : 'User',
      content: `Message ${index + 1} from ${index % 2 === 0 ? sender : 'User'}`,
    }));
    setMessages(sampleMessages);
  }, [sender]);

  useEffect(() => {
    // Scroll to bottom when new message is added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() !== '') {
      const formattedMessage = inputText;
      setMessages(prevMessages => [...prevMessages, { sender: 'User', content: formattedMessage }]);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default behavior (creating new line)
      handleSend(); // Call handleSend function when Enter key is pressed
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Auto resize the input box based on content height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
      if (inputRef.current.scrollHeight > 200) {
        inputRef.current.classList.add('auto-height');
      } else {
        inputRef.current.classList.remove('auto-height');
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClickOutside}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>{sender}</h2>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
        <div className={styles.messageList} ref={messageListRef}>
          {messages.map((message, index) => (
            <MessageBubble key={index} sender={message.sender} content={message.content} />
          ))}
        </div>
        <div className={styles.inputContainer}>
          <textarea
            ref={inputRef}
            className={styles.input}
            placeholder="Type your message..."
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Add onKeyPress event handler
          />
          <button className={styles.sendButton} onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
