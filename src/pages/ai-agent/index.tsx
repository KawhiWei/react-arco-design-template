import './style.less';

import { Avatar, Button, Card, Input, Space, Typography } from '@arco-design/web-react';
import { IconPlus } from '@arco-design/web-react/icon';
import { useEffect, useMemo, useRef, useState } from 'react';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

type ChatSession = {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
};

const { TextArea } = Input;
const { Title, Paragraph, Text } = Typography;

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const getTitle = (text: string, maxLength = 24) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const AIAgent = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const initialSessionIdRef = useRef(createId());
  const [sessions, setSessions] = useState<ChatSession[]>(() => [
    {
      id: initialSessionIdRef.current,
      title: '新会话',
      messages: [],
      updatedAt: Date.now(),
    },
  ]);
  const [activeSessionId, setActiveSessionId] = useState(initialSessionIdRef.current);
  const controllerRef = useRef<AbortController | null>(null);
  const typingTimerRef = useRef<number | null>(null);
  const typingQueueRef = useRef<string[]>([]);
  const activeAssistantIdRef = useRef<string | null>(null);
  const activeAssistantSessionIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeSession = useMemo(
    () => sessions.find((session) => session.id === activeSessionId),
    [activeSessionId, sessions]
  );

  const messages = activeSession?.messages || [];
  const activeSessionTitle = activeSession?.title || '新会话';

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (sessions.length > 0 && !sessions.some((session) => session.id === activeSessionId)) {
      setActiveSessionId(sessions[0].id);
    }
  }, [activeSessionId, sessions]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
      }
      controllerRef.current?.abort();
    };
  }, []);

  const stopTyping = () => {
    if (typingTimerRef.current) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
  };

  const enqueueTyping = (text: string, assistantId: string, sessionId: string) => {
    if (!text) return;
    activeAssistantIdRef.current = assistantId;
    activeAssistantSessionIdRef.current = sessionId;
    for (const char of text) {
      typingQueueRef.current.push(char);
    }
    if (!typingTimerRef.current) {
      typingTimerRef.current = window.setInterval(() => {
        if (typingQueueRef.current.length === 0) {
          stopTyping();
          return;
        }
        const nextChar = typingQueueRef.current.shift();
        if (!nextChar || !activeAssistantIdRef.current || !activeAssistantSessionIdRef.current) return;
        setSessions((prev) =>
          prev.map((session) =>
            session.id === activeAssistantSessionIdRef.current
              ? {
                  ...session,
                  messages: session.messages.map((item) =>
                    item.id === activeAssistantIdRef.current
                      ? { ...item, content: item.content + nextChar }
                      : item
                  ),
                }
              : session
          )
        );
      }, 18);
    }
  };

  const parseSseChunk = (chunk: string) => {
    const dataLines = chunk
      .split('\n')
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.replace(/^data:\s?/, ''))
      .filter((line) => line && line !== '[DONE]');
    return dataLines.join('');
  };

  const startStream = async (prompt: string, assistantId: string, sessionId: string) => {
    const controller = new AbortController();
    controllerRef.current = controller;

    const response = await fetch('/api/Chat/ChatStream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: prompt }),
      signal: controller.signal,
    });

    if (!response.ok || !response.body) {
      throw new Error('SSE connection failed');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split('\n\n');
      buffer = parts.pop() || '';
      for (const part of parts) {
        const text = parseSseChunk(part);
        enqueueTyping(text, assistantId, sessionId);
      }
    }

    if (buffer) {
      enqueueTyping(parseSseChunk(buffer), assistantId, sessionId);
    }
  };

  const handleSend = async () => {
    if (!canSend) return;
    const prompt = input.trim();
    setInput('');
    const userId = createId();
    const assistantId = createId();
    const sessionId = activeSessionId;
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? {
              ...session,
              title: session.title === '新会话' ? getTitle(prompt) : session.title,
              updatedAt: Date.now(),
              messages: [
                ...session.messages,
                { id: userId, role: 'user', content: prompt },
                { id: assistantId, role: 'assistant', content: '' },
              ],
            }
          : session
      )
    );
    setLoading(true);
    try {
      await startStream(prompt, assistantId, sessionId);
    } catch (error) {
      setSessions((prev) =>
        prev.map((session) =>
          session.id === sessionId
            ? {
                ...session,
                messages: session.messages.map((item) =>
                  item.id === assistantId
                    ? { ...item, content: '连接失败，请稍后重试。' }
                    : item
                ),
              }
            : session
        )
      );
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  };

  const handleStop = () => {
    controllerRef.current?.abort();
    stopTyping();
    setLoading(false);
  };

  const handleCreateSession = () => {
    handleStop();
    const newSession: ChatSession = {
      id: createId(),
      title: '新会话',
      messages: [],
      updatedAt: Date.now(),
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  };

  const handleSelectSession = (sessionId: string) => {
    if (sessionId === activeSessionId) return;
    if (loading) {
      handleStop();
    }
    setActiveSessionId(sessionId);
  };

  return (
    <div className="ai-agent-page">
      <div className="ai-agent-sessions">
        <div className="ai-agent-sessions-header">
          <Title heading={6}>历史会话</Title>
          <Button type="text" size="mini" icon={<IconPlus />} onClick={handleCreateSession}>
            新建
          </Button>
        </div>
        <div className="ai-agent-session-list">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`ai-agent-session-item${
                session.id === activeSessionId ? ' is-active' : ''
              }`}
              onClick={() => handleSelectSession(session.id)}
              role="button"
            >
              <div className="ai-agent-session-title">{session.title}</div>
              <Text type="secondary" className="ai-agent-session-meta">
                {new Date(session.updatedAt).toLocaleString()}
              </Text>
            </div>
          ))}
        </div>
      </div>
      <div className="ai-agent-panel">
        <div className="ai-agent-session-title">
          <Title heading={4}>{activeSessionTitle}</Title>
          <Text type="secondary">SSE 实时输出，打字机效果呈现</Text>
        </div>
        <div className="ai-agent-messages">
          <Space direction="vertical" size={16} style={{ width: '100%' }}>
            {messages.length === 0 ? (
              <div className="ai-agent-empty">暂无对话，开始一个新问题吧。</div>
            ) : (
              messages.map((item) => (
                <div key={item.id} className={`ai-agent-message ${item.role}`}>
                  <Avatar size={28} className="ai-agent-avatar">
                    {item.role === 'user' ? 'U' : 'AI'}
                  </Avatar>
                  <Card className="ai-agent-bubble" bordered={false}>
                    <Paragraph style={{ marginBottom: 0, whiteSpace: 'pre-wrap' }}>
                      {item.content || (item.role === 'assistant' ? '...' : '')}
                    </Paragraph>
                  </Card>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </Space>
        </div>

        <Card className="ai-agent-input" bordered={false}>
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <TextArea
              value={input}
              placeholder="请输入你想咨询的问题，Ctrl + Enter 发送"
              autoSize={{ minRows: 3, maxRows: 6 }}
              onChange={setInput}
              onKeyDown={(event) => {
                if (event.ctrlKey && event.key === 'Enter') {
                  handleSend();
                }
              }}
            />
            <div className="ai-agent-actions">
              <Button type="primary" onClick={handleSend} loading={loading} disabled={!input.trim()}>
                发送
              </Button>
              <Button onClick={handleStop} disabled={!loading}>
                停止
              </Button>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default AIAgent;
