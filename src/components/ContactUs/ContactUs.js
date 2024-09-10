import React from 'react';
import styles from './ContactUs.module.css';

const ContactUs = () => {
  return (
    <div className={styles.contactContainer}>
      <h2>Contact Us</h2>
      <div className={styles.formContainer}>
        <form className={styles.contactForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" placeholder="Subject" required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Your message" required></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
        
        <div className={styles.mapContainer}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0916348658075!2d74.27149267464837!3d31.466665349795104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919039ecc46db03%3A0x838badf1b0f1beb7!2sTectSoft!5e0!3m2!1sen!2s!4v1725819286718!5m2!1sen!2s" 
            width="600" 
            height="450" 
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
