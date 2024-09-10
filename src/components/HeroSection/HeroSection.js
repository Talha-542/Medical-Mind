import React from 'react'
import styles from './HeroSection.module.css'
export default function HeroSection() {
    return (
        <>
            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    <h1 className={styles.bannerHeading}>Efficient Patient Management System for Streamlined Care</h1>
                    <p class={styles.bannerParagraph}>
                        Streamline your healthcare operations with our efficient and user-friendly patient management system,<br></br> designed to enhance patient care and administrative processes.
                    </p>
                </div>
            </div>
        </>
    )
}