import React, { useEffect, useState } from "react";
import './Notification.css'

const Notification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  const handleStorageChange = (e) => {
    const storedDoctorData = JSON.parse(localStorage.getItem("doctorData"));
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }

    const storedAppointmentData = JSON.parse(
      localStorage.getItem("appointmentData")
    );
    setAppointmentData(storedAppointmentData);
  };

  useEffect(() => {
    // Register an event listener to listen for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    const storedUsername = sessionStorage.getItem("email");
    if (storedUsername) {
      setIsLoggedIn(true);
    }

    // Clean up event listeners when components unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      {isLoggedIn && appointmentData && (
        <div className="appointment-card">
          <div className="appointment-card__content">
            <h3 className="appointment-card__title">Appointment Details</h3>
            <p className="appointment-card__message">
              <strong>Doctor:</strong> {doctorData?.name}
            </p>
            {/* ... (rest of the component) ... */}
          </div>
        </div>
      )}
    </>
  )  
};

export default Notification;
