import React, { useState, useEffect } from 'react';
import { getAllPatients } from '../../firebase/firestore'; // Import the function
import styles from './PatientList.module.css'; // Import the CSS module

export default function PatientsList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsList = await getAllPatients();
                setPatients(patientsList);
            } catch (err) {
                setError('Failed to fetch patients');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) {
        return <p>Loading patients...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>List of Patients</h1>
            {patients.length > 0 ? (
                <div className={styles.patientList}>
                    {patients.map((patient) => (
                        <div key={patient.id} className={styles.patientItem}>
                            <p className={styles.patientName}>
                                <strong>{patient.firstName} {patient.lastName}</strong>
                            </p>  
                            <p className={styles.patientEmail}>{patient.email}</p>
                            <p className={styles.patientProfession}>{patient.profession}</p>
                            <a className={styles.medicalLink} href={patient.medical}>View Medical Records</a>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No patients found.</p>
            )}
        </div>
    );
}
