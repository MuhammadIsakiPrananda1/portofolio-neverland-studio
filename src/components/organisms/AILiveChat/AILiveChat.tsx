import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageCircle, X, RotateCcw } from 'lucide-react';
import { useBodyScrollLock, useSidebarState, useAutoScrollToBottom, useChatMessages } from '@hooks';
import { COMPANY_INFO } from '@config/constants';
import type { Message } from '@hooks';
import type { QuestionTemplate } from '@config/chatTemplates';

// Message Component
interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const isUser = message.type === 'user';
  const messageClasses = isUser
    ? 'bg-red-500/20 border border-red-500/30 text-white'
    : 'bg-[#0f172a] border border-white/10 text-slate-300';
  
  const timeClasses = isUser 
    ? 'text-red-300/70' 
    : 'text-slate-500';

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
    >
      <div className={`max-w-[85%] rounded-sm px-3 py-2 shadow-sm ${messageClasses}`}>
        <p className="text-xs leading-relaxed whitespace-pre-line">
          {message.text}
        </p>
        <p className={`text-[10px] mt-1 font-mono ${timeClasses}`}>
          {message.timestamp.toLocaleTimeString('id-ID', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
};

// Template Questions Component
interface TemplateQuestionsProps {
  templates: QuestionTemplate[];
  onTemplateClick: (template: QuestionTemplate) => void;
}

const TemplateQuestions = ({ templates, onTemplateClick }: TemplateQuestionsProps) => (
  <div className="p-3 border-t border-white/10 space-y-1.5 max-h-48 overflow-y-auto bg-[#0B1120] shrink-0 custom-scrollbar">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-0.5 h-3.5 bg-red-500 rounded-full" />
      <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Quick Questions</p>
    </div>
    {templates.map((template) => (
      <button
        key={template.id}
        onClick={() => onTemplateClick(template)}
        className="w-full text-left px-3 py-2 rounded-sm bg-[#0f172a] border border-white/5 hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-200 group"
      >
        <p className="text-xs text-slate-400 group-hover:text-red-300 transition-colors leading-snug">
          {template.text}
        </p>
      </button>
    ))}
  </div>
);

// Chat Header Component
interface ChatHeaderProps {
  onClose: () => void;
}

const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="relative bg-[#0f172a] border-b border-white/10 p-3.5 shrink-0">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-9 h-9 rounded-sm bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-red-400" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-sm border border-[#0f172a]" />
        </div>
        <div>
          <h3 className="text-white font-black text-sm uppercase tracking-wide">Neverland AI</h3>
          <p className="text-green-400 text-[10px] font-mono font-bold uppercase tracking-widest">● Online</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-white hover:bg-white/10 p-1.5 rounded-sm transition-all duration-200"
        aria-label="Close chat"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Chat Footer Component
interface ChatFooterProps {
  onReset: () => void;
}

const ChatFooter = ({ onReset }: ChatFooterProps) => (
  <div className="p-3 border-t border-white/10 bg-[#0f172a] shrink-0">
    <button
      onClick={onReset}
      className="w-full py-2 px-3 rounded-sm bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 transition-all duration-200 flex items-center justify-center gap-2 group"
    >
      <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-300" />
      <span className="text-[11px] font-mono font-bold uppercase tracking-widest">New Conversation</span>
    </button>
  </div>
);

// Main Component
export default function AILiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const isSidebarOpen = useSidebarState();
  const location = useLocation();
  const { messages, showTemplates, templates, handleTemplateClick, resetChat } = useChatMessages();
  const { ref: messagesEndRef } = useAutoScrollToBottom<HTMLDivElement>([messages]);
  
  useBodyScrollLock(isOpen);

  const blurClass = isSidebarOpen 
    ? 'blur-[2px] opacity-50 pointer-events-none lg:blur-none lg:opacity-100 lg:pointer-events-auto' 
    : '';

  const isStorePage = location.pathname.startsWith('/store');
  const whatsappBottom = isStorePage ? 'bottom-[7.5rem]' : 'bottom-[4.5rem]';
  const waNumber = COMPANY_INFO.phone.replace('+', '');

  return (
    <>
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed ${whatsappBottom} right-6 w-11 h-11 rounded-sm bg-[#0f172a] border border-[#25D366]/40 hover:border-[#25D366] hover:bg-[#25D366]/10 transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.15)] hover:shadow-[0_0_25px_rgba(37,211,102,0.3)] flex items-center justify-center z-50 group ${blurClass}`}
        aria-label="WhatsApp"
      >
        <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0f172a] border border-white/10 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest">WhatsApp</span>
        </div>
      </a>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed bottom-[4.5rem] right-6 w-[340px] max-h-[500px] bg-[#0B1120] border border-white/10 rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.5)] z-[60] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 transition-all duration-300 ${blurClass}`}>
          <ChatHeader onClose={() => setIsOpen(false)} />

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#0B1120] custom-scrollbar">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {showTemplates && (
            <TemplateQuestions 
              templates={templates} 
              onTemplateClick={handleTemplateClick} 
            />
          )}

          <ChatFooter onReset={resetChat} />
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-11 h-11 rounded-sm bg-[#0f172a] border border-red-500/40 hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 shadow-[0_0_20px_rgba(239,68,68,0.15)] hover:shadow-[0_0_25px_rgba(239,68,68,0.3)] flex items-center justify-center z-50 group ${blurClass}`}
        aria-label="AI Live Chat"
      >
        {isOpen ? (
          <X className="w-4 h-4 text-red-400" />
        ) : (
          <>
            <MessageCircle className="w-4 h-4 text-red-400" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-sm border border-[#0f172a] animate-pulse" />
          </>
        )}
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0f172a] border border-white/10 rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
          <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-widest">AI Chat</span>
        </div>
      </button>
    </>
  );
}


