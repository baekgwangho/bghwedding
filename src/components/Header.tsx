// src/components/Header/Header.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
  padding: 15px 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #ff6b6b;
  font-weight: 300;
  margin: 0;
`;

const NavMenu = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 30px;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #333;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        boxShadow: scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <HeaderContent>
        <Logo>Wedding</Logo>

        <NavMenu isOpen={isMenuOpen}>
          <NavItem href="#main" onClick={(e) => { e.preventDefault(); scrollToSection('main'); }}>
            메인
          </NavItem>
          <NavItem href="#gallery" onClick={(e) => { e.preventDefault(); scrollToSection('gallery'); }}>
            갤러리
          </NavItem>
          <NavItem href="#location" onClick={(e) => { e.preventDefault(); scrollToSection('location'); }}>
            오시는 길
          </NavItem>
          <NavItem href="#guestbook" onClick={(e) => { e.preventDefault(); scrollToSection('guestbook'); }}>
            방명록
          </NavItem>
        </NavMenu>

        <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuToggle>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
