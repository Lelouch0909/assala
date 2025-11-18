import { useState, useRef, useEffect, useCallback } from 'react';
import './EneisYeuxPage.css';

const EneisYeuxPage = ({ onBack }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinCode, setPinCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const inputRefs = useRef([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Les slides avec images et textes
  const slides = [
    {
      image: '/content/IMG-20251110-WA0025.jpg',
      text: 'Ton sourire illumine mes journées les plus sombres'
    },
    {
      image: '/content/IMG-20251116-WA0024.jpg',
      text: 'Ta beauté rayonne de l\'intérieur'
    },
    {
      image: '/content/IMG-20251116-WA0025.jpg',
      text: 'Chaque moment avec toi est précieux'
    },
    // Ajouter plus de slides selon les photos disponibles
  ];

  const handlePinChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return; // Seulement des chiffres

    const newPin = [...pinCode];
    newPin[index] = value;
    setPinCode(newPin);
    setError(false);

    // Focus sur le prochain input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pinCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const checkPin = useCallback(() => {
    const enteredPin = pinCode.join('');
    if (enteredPin === '2006') {
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
      // Secouer l'animation d'erreur
      setTimeout(() => {
        setPinCode(['', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 500);
    }
  }, [pinCode]);

  useEffect(() => {
    if (!isUnlocked && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isUnlocked]);

  // Vérifier automatiquement quand les 4 chiffres sont entrés
  useEffect(() => {
    if (pinCode.every(digit => digit !== '')) {
      const timer = setTimeout(() => {
        checkPin();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pinCode, checkPin]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Gestion du swipe tactile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left - next slide
      nextSlide();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swipe right - previous slide
      prevSlide();
    }
  };

  if (!isUnlocked) {
    return (
      <div className="eneis-yeux-page">
        <button className="yeux-back-btn" onClick={onBack}>
          <span className="back-arrow">←</span>
          <span>Retour</span>
        </button>

        <div className="pin-container">
          <div className="pin-card">
            <div className="lock-icon">🔒</div>
            <h2 className="pin-title">Eneis à travers mes yeux</h2>
            <p className="pin-subtitle">Entre le code pour déverrouiller</p>

            <div className={`pin-inputs ${error ? 'error' : ''}`}>
              {pinCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="pin-input"
                />
              ))}
            </div>

            {error && <p className="pin-error">Code incorrect 💔</p>}

            <div className="pin-hint">
              <span className="hint-icon">💡</span>
              <span>Indice : L'année de ta naissance</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="eneis-yeux-page unlocked">
      <button className="yeux-back-btn" onClick={onBack}>
        <span className="back-arrow">←</span>
        <span>Retour</span>
      </button>

      <div className="slides-container">
        <h1 className="slides-title">Eneis à travers mes yeux</h1>

        <div className="slides-wrapper">
          {/* Navigation précédente */}
          <button
            className="slide-nav prev"
            onClick={prevSlide}
            aria-label="Slide précédent"
          >
            ❮
          </button>

          {/* Stack de cards */}
          <div
            className="cards-stack"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => {
              const offset = index - currentSlide;
              const isActive = index === currentSlide;

              return (
                <div
                  key={index}
                  className={`slide-card ${isActive ? 'active' : ''}`}
                  style={{
                    transform: `
                      translateX(${offset * 20}px)
                      translateY(${Math.abs(offset) * 10}px)
                      scale(${1 - Math.abs(offset) * 0.1})
                      rotate(${offset * 2}deg)
                    `,
                    zIndex: slides.length - Math.abs(offset),
                    opacity: Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.3
                  }}
                >
                  <div className="card-image-container">
                    <img src={slide.image} alt={`Slide ${index + 1}`} />
                  </div>
                  <div className="card-text">
                    <p>{slide.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation suivante */}
          <button
            className="slide-nav next"
            onClick={nextSlide}
            aria-label="Slide suivant"
          >
            ❯
          </button>
        </div>

        {/* Indicateurs de slides */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Compteur */}
        <div className="slide-counter">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default EneisYeuxPage;

