import React, {useEffect} from 'react';
import { FiAlertCircle,FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const Toast: React.FC<ToastProps> = ({message, style}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }

  },[removeToast, message.id]);

  const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />,
  };

  return (
    <Container
    style={style}
    type={message.type}
    hasDescription={!!message.description}
    >
        {icons[message.type || 'info']}
        <div>
            <strong>{message.title}</strong>
            {message.description && <p>{message.description}</p>}
          </div>

          <button type="button" onClick={() => removeToast(message.id)}>
            <FiX size={18}/>
          </button>
      </Container>
  )
}

export default Toast;
