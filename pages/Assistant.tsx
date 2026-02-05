import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Trash2, AlertCircle } from 'lucide-react';
import { generateAIResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const Assistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      content: 'Hello. I am the P3394 Working Group Assistant. I can help you draft agenda items, summarize standard clauses, or discuss AI topics. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateAIResponse(messages, input);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       console.error(error);
       const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "I encountered an error connecting to the knowledge base. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([{
        id: '0',
        role: 'model',
        content: 'Chat cleared. How can I help you with P3394 standards today?',
        timestamp: new Date()
    }]);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="text-ieee-blue" size={20} />
            Standardization Assistant
          </h2>
          <p className="text-xs text-gray-500">Powered by Gemini • IEEE P3394 Knowledge Base</p>
        </div>
        <button 
          onClick={clearChat}
          className="text-gray-400 hover:text-red-500 transition p-2 rounded-full hover:bg-gray-100"
          title="Clear Conversation"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
              
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-ieee-blue text-white' : 'bg-white border border-gray-200 text-ieee-blue'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>

              {/* Message Bubble */}
              <div className={`rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-ieee-blue text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap">{msg.content}</div>
                <div className={`text-[10px] mt-1 opacity-70 ${msg.role === 'user' ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex flex-row items-center gap-3 ml-11">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-xs text-gray-400">Thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="relative rounded-lg shadow-sm">
          <textarea
            rows={1}
            className="block w-full rounded-md border-0 py-3 pl-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-ieee-blue sm:text-sm sm:leading-6 resize-none"
            placeholder="Discuss topics, ask about standards, or draft agenda items..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            style={{ minHeight: '50px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute top-2 right-2 p-1.5 text-white bg-ieee-blue rounded-md hover:bg-ieee-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="mt-2 text-xs text-gray-400 text-center flex items-center justify-center gap-1">
          <AlertCircle size={12} />
          AI can make mistakes. Verify critical standard information with official documents.
        </p>
      </div>
    </div>
  );
};

export default Assistant;