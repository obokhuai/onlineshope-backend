import React, { ReactNode } from 'react';
import './message.css';

interface MessageProps {
  variant?: 'info' | 'success' | 'danger' | 'warning';
  children: ReactNode;
}

const Message: React.FC<MessageProps> = ({ variant = 'info', children }) => {
  return <div className={`custom-alert custom-alert-${variant}`}>{children}</div>;
};

export default Message;
