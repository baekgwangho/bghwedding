// src/components/Location/Location.tsx
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaCar, FaSubway, FaBus, FaPhone, FaCopy } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LocationContainer = styled.section`
  padding: 60px 20px;
  background: white;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 40px;
  font-weight: 300;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const InfoCard = styled(motion.div)`
  background: #f8f9fa;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: #ff6b6b;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  line-height: 1.6;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const AddressContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid #e9ecef;
  position: relative;
`;

const AddressText = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background: #ff5252;
  }
`;

const PhoneButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #28a745;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  transition: background 0.3s;
  
  &:hover {
    background: #218838;
  }
`;



const Location: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);


  // 결혼식장 정보 (실제 데이터로 변경하세요)
  const venueInfo = {
    name: "신도림 더링크 웨딩홀",
    address: "서울 구로구 경인로 610",
    phone: "02-852-5000",
    coords: {
      lat: 37.5054782085179,
      lng: 126.883956501896
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(venueInfo.address);
    alert('주소가 복사되었습니다!');
  };

  // 카카오맵 API 초기화
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=97b00772533a3bb1bd8f2ef74cfd187b&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {

          const options = {
            center: new window.kakao.maps.LatLng(venueInfo.coords.lat, venueInfo.coords.lng),
            level: 3
          };

          const map = new window.kakao.maps.Map(mapRef.current, options);

          const markerPosition = new window.kakao.maps.LatLng(venueInfo.coords.lat, venueInfo.coords.lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition
          });

          marker.setMap(map);

          const infoWindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${venueInfo.name}</div>`
          });

          infoWindow.open(map, marker);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <LocationContainer>
      <Title>오시는 길</Title>

      <ContentWrapper>
        <MapContainer ref={mapRef} />

        <AddressContainer>
          <AddressText>
            <strong>{venueInfo.name}</strong><br />
            {venueInfo.address}
          </AddressText>
          <CopyButton onClick={copyAddress}>
            <FaCopy />
            주소 복사
          </CopyButton>
        </AddressContainer>

        <InfoGrid>
          <InfoCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <InfoTitle>
              <FaSubway />
              지하철
            </InfoTitle>
            <InfoItem>
              <strong>2호선 강남역</strong> 3번 출구에서 도보 5분
            </InfoItem>
            <InfoItem>
              <strong>9호선 신논현역</strong> 1번 출구에서 도보 7분
            </InfoItem>
          </InfoCard>

          <InfoCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InfoTitle>
              <FaBus />
              버스
            </InfoTitle>
            <InfoItem>
              <strong>간선버스:</strong> 146, 360, 740
            </InfoItem>
            <InfoItem>
              <strong>지선버스:</strong> 3422, 4318, 6411
            </InfoItem>
            <InfoItem>
              강남역 정류장에서 하차
            </InfoItem>
          </InfoCard>

          <InfoCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <InfoTitle>
              <FaCar />
              자가용
            </InfoTitle>
            <InfoItem>
              <strong>경부고속도로:</strong> 서초 IC에서 15분
            </InfoItem>
            <InfoItem>
              <strong>올림픽대로:</strong> 잠실대교에서 20분
            </InfoItem>
            <InfoItem>
              건물 지하 1~3층 주차 가능 (3시간 무료)
            </InfoItem>
          </InfoCard>

          <InfoCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <InfoTitle>
              <FaPhone />
              연락처
            </InfoTitle>
            <InfoItem>
              <PhoneButton href={`tel:${venueInfo.phone}`}>
                <FaPhone />
                {venueInfo.phone}
              </PhoneButton>
            </InfoItem>
            <InfoItem style={{ marginTop: '15px' }}>
              식장 이용 안내 및 주차 관련 문의
            </InfoItem>
          </InfoCard>
        </InfoGrid>
      </ContentWrapper>
    </LocationContainer>
  );
};

export default Location;
