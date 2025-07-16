// src/components/GuestBook/GuestBook.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '../../services/firebase';
import dayjs from 'dayjs';

interface GuestBookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: any;
}

const GuestBookContainer = styled.section`
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  min-height: 100px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 12px 24px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #ff5252;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MessageItem = styled.div`
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #ff6b6b;
`;

const GuestBook: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 익명 로그인
    signInAnonymously(auth);
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedEntries: GuestBookEntry[] = [];

      querySnapshot.forEach((doc) => {
        fetchedEntries.push({
          id: doc.id,
          ...doc.data()
        } as GuestBookEntry);
      });

      setEntries(fetchedEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'guestbook'), {
        name: name.trim(),
        message: message.trim(),
        createdAt: new Date()
      });

      setName('');
      setMessage('');
      fetchEntries();
    } catch (error) {
      console.error('Error adding entry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestBookContainer>
      <h2>방명록</h2>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextArea
          placeholder="축하 메시지를 남겨주세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? '등록 중...' : '메시지 등록'}
        </Button>
      </Form>

      <MessageList>
        {entries.map((entry) => (
          <MessageItem key={entry.id}>
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {entry.name}
            </div>
            <div style={{ marginBottom: '10px' }}>
              {entry.message}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {dayjs(entry.createdAt?.toDate()).format('YYYY.MM.DD HH:mm')}
            </div>
          </MessageItem>
        ))}
      </MessageList>
    </GuestBookContainer>
  );
};

export default GuestBook;
