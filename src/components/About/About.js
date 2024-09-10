import React from 'react';
import { ReactTyped as Typed } from 'react-typed';
import styles from '../AboutBanner/AboutBanner.module.css';

export default function AboutUs() {
  return (
    <div className={styles.typingContainer}>
      <h2>What we provide...</h2>
      <div className={styles.typed}>
        <Typed
          strings={['Healthcare', 'Preventive Care', 'Treatment Plans', 'Support']}
          typeSpeed={50}
          backSpeed={30}
          loop
        />
      </div>
    </div>
  );
}
