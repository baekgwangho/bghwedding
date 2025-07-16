import React from 'react';
import styled from 'styled-components';

import GuestBook from './components/GuestBook/GuestBook';
import './index.css';
import Header from './components/Header.tsx';
import MainSection from './components/MainSection.tsx';
import Gallery from './components/Gallery.tsx';
import Location from './components/Location.tsx';

const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
`;

const Section = styled.section`
  scroll-margin-top: 80px;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Section id="main">
        <MainSection />
      </Section>
      <Section id="gallery">
        <Gallery />
      </Section>
      <Section id="location">
        <Location />
      </Section>
      <Section id="guestbook">
        <GuestBook />
      </Section>
    </AppContainer>
  );
}

export default App;
