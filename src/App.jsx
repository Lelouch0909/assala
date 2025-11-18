import { useState, useEffect } from 'react'
import CountdownPage from './components/CountdownPage'
import BirthdayPage from './components/BirthdayPage'
import './App.css'

function App() {
  // MODE DEV: Mettre à true pour tester directement la page d'anniversaire
  const DEV_MODE = true;

  const [showBirthday, setShowBirthday] = useState(DEV_MODE);

  useEffect(() => {
    if (DEV_MODE) {
      setShowBirthday(true);
      return;
    }

    // Vérifier si la date cible est atteinte
    const checkDate = () => {
      const targetDate = new Date('2025-11-21T00:00:00').getTime();
      const now = new Date().getTime();

      if (now >= targetDate) {
        setShowBirthday(true);
      }
    };

    checkDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountdownEnd = () => {
    setShowBirthday(true);
  };

  return (
    <div className="app">
      {showBirthday ? (
        <BirthdayPage />
      ) : (
        <CountdownPage onCountdownEnd={handleCountdownEnd} />
      )}
    </div>
  );
}

export default App
