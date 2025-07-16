// src/components/Gallery/Gallery.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

// Swiper 스타일 import
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GalleryContainer = styled.section`
  padding: 60px 20px;
  background: #f8f9fa;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 40px;
  font-weight: 300;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const GalleryItem = styled(motion.div)`
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  position: relative;
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 10px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

const SwiperContainer = styled.div`
  .swiper {
    width: 100%;
    height: 400px;
  }
  
  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .swiper-pagination-bullet {
    background: #ff6b6b;
  }
  
  .swiper-button-next,
  .swiper-button-prev {
    color: #ff6b6b;
  }
`;

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // 갤러리 이미지 데이터 (실제 이미지 경로로 변경하세요)
  const images = [
    '/images/gallery1.jpg',
    '/images/gallery2.jpg',
    '/images/gallery3.jpg',
    '/images/gallery4.jpg',
    '/images/gallery5.jpg',
    '/images/gallery6.jpg',
    '/images/gallery7.jpg',
    '/images/gallery8.jpg',
    '/images/gallery9.jpg',
    '/images/gallery10.jpg',
    '/images/gallery11.jpg',
    '/images/gallery12.jpg'
  ];

  const openModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <GalleryContainer>
      <Title>갤러리</Title>

      <GalleryGrid>
        {images.map((image, index) => (
          <GalleryItem
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openModal(index)}
          >
            <GalleryImage src={image} alt={`갤러리 ${index + 1}`} />
          </GalleryItem>
        ))}
      </GalleryGrid>

      {selectedImage !== null && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <ModalContent
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={closeModal}>
              <FaTimes />
            </CloseButton>

            <SwiperContainer>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                initialSlide={selectedImage}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={`갤러리 ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperContainer>
          </ModalContent>
        </Modal>
      )}
    </GalleryContainer>
  );
};

export default Gallery;
