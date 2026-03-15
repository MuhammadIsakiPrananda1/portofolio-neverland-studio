import { useState, useCallback } from 'react';
import { CHAT_TEMPLATES, WELCOME_MESSAGE, CHAT_CONFIG } from '@config/chatTemplates';
import type { QuestionTemplate } from '@config/chatTemplates';

export interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const createInitialMessage = (): Message => ({
  id: 0,
  type: 'bot',
  text: WELCOME_MESSAGE,
  timestamp: new Date(),
});

/**
 * Custom hook to manage chat state and operations
 */
export const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([createInitialMessage()]);
  const [showTemplates, setShowTemplates] = useState(true);

  const handleTemplateClick = useCallback((template: QuestionTemplate) => {
    const userMessage: Message = {
      id: messages.length,
      type: 'user',
      text: template.text,
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: messages.length + 1,
      type: 'bot',
      text: template.response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
    setShowTemplates(false);

    // Show templates again after delay
    setTimeout(() => {
      setShowTemplates(true);
    }, CHAT_CONFIG.TEMPLATE_DISPLAY_DELAY);
  }, [messages.length]);

  const resetChat = useCallback(() => {
    setMessages([createInitialMessage()]);
    setShowTemplates(true);
  }, []);

  return {
    messages,
    showTemplates,
    templates: CHAT_TEMPLATES,
    handleTemplateClick,
    resetChat,
  };
};
