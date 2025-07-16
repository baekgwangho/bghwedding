// src/components/MainSection/MainSection.tsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHeart, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import dayjs from 'dayjs';

const MainContainer = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffeef8 0%, #fff5f5 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  color: #d63384;
  margin-bottom: 20px;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SubTitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const CoupleContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const PersonCard = styled.div`
  text-align: center;
`;

const PersonImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ffc0cb;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const PersonName = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 5px;
`;

const PersonRole = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const HeartIcon = styled(FaHeart)`
  color: #ff6b6b;
  font-size: 2rem;
  margin: 0 20px;
  
  @media (max-width: 768px) {
    margin: 10px 0;
    transform: rotate(90deg);
  }
`;

const EventInfo = styled(motion.div)`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const EventItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.1rem;
  
  svg {
    margin-right: 15px;
    color: #ff6b6b;
    font-size: 1.2rem;
  }
`;

const DdayBadge = styled(motion.div)`
  background: #ff6b6b;
  color: white;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 20px;
  display: inline-block;
`;

const MainSection: React.FC = () => {
  // 결혼식 정보 (실제 데이터로 변경하세요)
  const weddingData = {
    groom: {
      name: "백광호",
      role: "신랑",
      image: "/images/groom.jpg" // public/images/ 폴더에 이미지 추가
    },
    bride: {
      name: "이현진",
      role: "신부",
      image: "/images/bride.jpg"
    },
    wedding: {
      date: "2025-11-02",
      time: "17:00",
      venue: "더링크호텔 서울 웨딩홀",
      address: "address~~"
    }
  };

  const getDday = (weddingDate: string) => {
    const today = dayjs();
    const wedding = dayjs(weddingDate);
    const diff = wedding.diff(today, 'day');

    if (diff === 0) return "오늘이 결혼식입니다!";
    if (diff > 0) return `D-${diff}`;
    return `D+${Math.abs(diff)}`;
  };

  return (
    <MainContainer>
      <Title
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        우리 결혼합니다
      </Title>

      <SubTitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        소중한 분들을 초대합니다
      </SubTitle>

      <CoupleContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <PersonCard>
          <PersonImage src={weddingData.groom.image} alt="신랑" />
          <PersonName>{weddingData.groom.name}</PersonName>
          <PersonRole>{weddingData.groom.role}</PersonRole>
        </PersonCard>

        <HeartIcon />

        <PersonCard>
          <PersonImage src={weddingData.bride.image} alt="신부" />
          <PersonName>{weddingData.bride.name}</PersonName>
          <PersonRole>{weddingData.bride.role}</PersonRole>
        </PersonCard>
      </CoupleContainer>

      <EventInfo
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <EventItem>
          <FaCalendarAlt />
          <span>{dayjs(weddingData.wedding.date).format('YYYY년 M월 D일')}</span>
        </EventItem>

        <EventItem>
          <FaClock />
          <span>{weddingData.wedding.time}</span>
        </EventItem>

        <EventItem>
          <FaMapMarkerAlt />
          <div>
            <div>{weddingData.wedding.venue}</div>
            <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
              {weddingData.wedding.address}
            </div>
          </div>
        </EventItem>

        <DdayBadge
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          {getDday(weddingData.wedding.date)}
        </DdayBadge>
      </EventInfo>
    </MainContainer>
  );
};

export default MainSection;
