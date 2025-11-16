import { useState, useEffect, useMemo } from 'react';
import './CountdownPage.css';

const CountdownPage = ({ onCountdownEnd }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Generate random values for hearts once
  const heartPositions = useMemo(() => {
    return [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${5 + Math.random() * 5}s`
    }));
  }, []);

  useEffect(() => {
    const targetDate = new Date('2025-11-21T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        onCountdownEnd();
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onCountdownEnd]);

  return (
    <div className="countdown-page">
      <div className="countdown-content">
        {/* Animated flower */}
        <div className="countdown-flower">
          <div className="petal petal-1"></div>
          <div className="petal petal-2"></div>
          <div className="petal petal-3"></div>
          <div className="petal petal-4"></div>
          <div className="petal petal-5"></div>
          <div className="petal petal-6"></div>
          <div className="flower-center"></div>
        </div>

        {/* Message */}
        <h1 className="countdown-message">Patiente mon ange</h1>

        {/* Countdown timer */}
        <div className="countdown-timer">
          <div className="time-block">
            <span className="time-value">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="time-label">jours</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-value">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-label">heures</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-label">minutes</span>
          </div>
          <div className="time-separator">:</div>
          <div className="time-block">
            <span className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-label">secondes</span>
          </div>
        </div>

        {/* Floating hearts */}
        <div className="floating-hearts">
          {heartPositions.map((pos, i) => (
            <div
              key={i}
              className="floating-heart"
              style={pos}
            >
              💖
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;

