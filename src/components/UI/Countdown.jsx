import React, { useState, useEffect } from "react";

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    // If there is no expiry date, don't run the timer
    if (!expiryDate) return;

    const calculateTimeLeft = () => {
      // Subtracts the current time from the expiry time
      const difference = expiryDate - Date.now();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        // Shows this when the timer hits zero
        setTimeLeft("EXPIRED");
      }
    };

    // Runs the calculation immediately so there is no 1-second delay on load
    calculateTimeLeft();

    // Sets up the interval to run every 1000 milliseconds (1 second)
    const timerId = setInterval(calculateTimeLeft, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(timerId);
  }, [expiryDate]);

  // Don't render the UI box if there is no expiry date
  if (!expiryDate) return null;

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;
