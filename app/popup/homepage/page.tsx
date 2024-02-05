'use client';

// pages/homepage.tsx

import React, { useState } from 'react';
import Head from 'next/head';
import styles from './styles/Homepage.module.css';

import ExploreContent from './components/ExploreContent';
import MapContent from './components/MapContent';
import CalendarContent from './components/CalendarContent';
import MessengerContent from './components/MessengerContent/MessengerContent';
import MyPopupsContent from './components/MyPopupsContent';

const Homepage: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  let content = <p><div><ExploreContent /></div></p>;

  switch (selectedOption) {
    case 'explore':
      content = <ExploreContent />;
      break;
    case 'map':
      content = <MapContent />;
      break;
    case 'calendar':
      content = <CalendarContent />;
      break;
    case 'messenger':
      content = <MessengerContent />;
      break;
    case 'myPopups':
      content = <MyPopupsContent />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>PopUp Spaces</title>
      </Head>

      <header className={styles.header}>
        <h1>PopUp Spaces</h1>
      </header>
      
      <nav className={styles.nav}>
        <button onClick={() => handleOptionClick('explore')}>Explore</button>
        <button onClick={() => handleOptionClick('map')}>Map</button>
        <button onClick={() => handleOptionClick('calendar')}>Calendar</button>
        <button onClick={() => handleOptionClick('messenger')}>Messenger</button>
        <button onClick={() => handleOptionClick('myPopups')}>My Popups</button>
      </nav>
      
      <div className={styles.content}>
        {content}
      </div>
    </div>
  );
};

export default Homepage;
