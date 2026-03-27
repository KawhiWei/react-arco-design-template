import './style.less';
import '@tdesign-react/chat/es/style/index.js';

import { ChatBot } from '@tdesign-react/chat';
import type { ChatMessagesData } from 'tdesign-web-components/lib/chat-engine/type';
import { Button, Empty, Menu, Space } from 'tdesign-react';
import { AddIcon, ChatIcon, UserIcon } from 'tdesign-icons-react';
import { useMemo, useRef, useState } from 'react';

type ChatBotProps = React.ComponentProps<typeof ChatBot>;
type MessageChangeEvent = Parameters<NonNullable<ChatBotProps['onMessageChange']>>[0];

type ChatSession = {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessagesData[];
};

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const readMessageText = (message: ChatMessagesData) => {
  if (!Array.isArray(message.content)) {
    return '';
  }

  for (const item of message.content) {
    if ((item.type === 'text' || item.type === 'markdown') && typeof item.data === 'string') {
      const normalized = item.data.trim();
      if (normalized.length > 0) {
        return normalized;
      }
    }
  }

  return '';
};

const readSessionTitle = (messages: ChatMessagesData[]) => {
  for (const message of messages) {
    if (message.role !== 'user') {
      continue;
    }
    const text = readMessageText(message);
    if (text) {
      return text.length > 20 ? `${text.slice(0, 20)}...` : text;
    }
  }

  return '新会话';
};

const formatTime = (timestamp: number) => new Date(timestamp).toLocaleString();

const AIAgent = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const initialId = createId();
    return [
      {
        id: initialId,
        title: '新会话',
        updatedAt: Date.now(),
        messages: [],
      },
    ];
  });
  const [activeSessionId, setActiveSessionId] = useState(() => sessions[0].id);
  const [isChatScrolling, setIsChatScrolling] = useState(false);
  const scrollTimerRef = useRef<number | null>(null);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId) ?? sessions[0],
    [activeSessionId, sessions],
  );

  const messageProps = useMemo(
    () => ({
      assistant: {
        name: 'AI 助手',
        avatar: (
          <span className="ai-agent-avatar ai-agent-avatar-assistant">
            <ChatIcon size="14px" />
          </span>
        ),
      },
      user: {
        name: '我',
        avatar: (
          <span className="ai-agent-avatar ai-agent-avatar-user">
            <UserIcon size="14px" />
          </span>
        ),
      },
    }),
    [],
  );

  const handleCreateSession = () => {
    const newSession: ChatSession = {
      id: createId(),
      title: '新会话',
      updatedAt: Date.now(),
      messages: [],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
  };

  const handleMessageChange = (event: MessageChangeEvent) => {
    const nextMessages = event.detail as ChatMessagesData[];
    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSessionId
          ? {
              ...session,
              messages: nextMessages,
              updatedAt: Date.now(),
              title: readSessionTitle(nextMessages),
            }
          : session,
      ),
    );
  };

  const handleChatScrollActivity = () => {
    setIsChatScrolling(true);
    if (scrollTimerRef.current) {
      window.clearTimeout(scrollTimerRef.current);
    }
    scrollTimerRef.current = window.setTimeout(() => {
      setIsChatScrolling(false);
      scrollTimerRef.current = null;
    }, 900);
  };

  return (
    <div className="ai-agent-page">
      <aside className="ai-agent-sessions">
        <Button className="ai-agent-new-session-btn" icon={<AddIcon />} onClick={handleCreateSession}>
          新建
        </Button>

        <div className="ai-agent-history-panel">
          <Space align="center" className="ai-agent-history-header">
            <span className="ai-agent-history-title">会话列表</span>
          </Space>

          <div className="ai-agent-sessions-list">
            {sessions.length === 0 ? (
              <Empty description="暂无历史会话" />
            ) : (
              <Menu
                className="ai-agent-session-menu"
                value={activeSessionId}
                expanded={[]}
                onChange={(value) => handleSelectSession(String(value))}
              >
                {sessions.map((session) => (
                  <Menu.MenuItem key={session.id} value={session.id} className="ai-agent-session-menu-item">
                    <div className="ai-agent-session-title-text">{session.title}</div>
                    <div className="ai-agent-session-meta">{formatTime(session.updatedAt)}</div>
                  </Menu.MenuItem>
                ))}
              </Menu>
            )}
          </div>
        </div>
      </aside>

      <div
        className={`ai-agent-content${isChatScrolling ? ' is-chat-scrolling' : ''}`}
        onWheel={handleChatScrollActivity}
        onTouchMove={handleChatScrollActivity}
      >
        <ChatBot
          key={activeSession.id}
          className="ai-agent-chatbot"
          defaultMessages={activeSession.messages}
          messageProps={messageProps}
          listProps={{
            autoScroll: true,
            defaultScrollTo: 'bottom',
          }}
          onMessageChange={handleMessageChange}
          chatServiceConfig={{
            endpoint: '/api/Chat/ChatStream',
            stream: true,
            onRequest: ({ prompt, ...rest }) => ({
              ...rest,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                message: prompt,
                userId: '1209332',
                sessionId: activeSession.id,
              }),
            }),
            onMessage: (chunk) => {
              const data = chunk?.data;
              if (typeof data === 'string') {
                if (data === '[DONE]') {
                  return null;
                }
                const normalized = data.replace(/\r/g, '');
                return { type: 'text', data: normalized, strategy: 'merge' };
              }
              return null;
            },
          }}
        />
      </div>
    </div>
  );
};

export default AIAgent;
