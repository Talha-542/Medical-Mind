
import React from 'react'
import styles from './AboutBanner.module.css'
export default function HeroSection() {
    return (
        <>
            <div className={styles.banner}>
                <div className={styles.bannerContent}>
                    <h1 className={styles.bannerHeading}>About Us</h1>
                </div>
            </div>
        </>
    )
}