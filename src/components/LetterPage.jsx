import { useState, useEffect, useRef, useCallback } from 'react';
import './LetterPage.css';

const PIN_CODE = '20036';

const LetterPage = ({ onBack }) => {
  // Vérifier si déjà déverrouillé en session
  const initiallyUnlocked = typeof window !== 'undefined' && sessionStorage.getItem('letter_unlocked') === 'true';

  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [locked, setLocked] = useState(!initiallyUnlocked);
  const [pinCode, setPinCode] = useState(['', '', '', '', '']);
  const [pinError, setPinError] = useState('');
  const inputRefs = useRef([]);

  // Générer les positions des particules après le rendu pour éviter l'appel impure pendant le rendu
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const generated = [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
      emoji: ['💌', '💕', '💖', '✨', '💫'][i % 5]
    }));
    const raf = requestAnimationFrame(() => setParticles(generated));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!locked) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [locked]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector('.letter-page');
      if (scrollContainer && isOpen) {
        const scrolled = scrollContainer.scrollTop;
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const progress = Math.min(scrolled / Math.max(maxScroll, 1), 1);
        setScrollProgress(progress);
      }
    };

    const scrollContainer = document.querySelector('.letter-page');
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  // Gestion du PIN avec plusieurs cases
  const handlePinChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) {
      const newPin = [...pinCode];
      newPin[index] = '';
      setPinCode(newPin);
      setPinError('');
      return;
    }

    const digit = cleaned[cleaned.length - 1];
    const newPin = [...pinCode];
    newPin[index] = digit;
    setPinCode(newPin);
    setPinError('');

    // Focus sur le prochain input automatiquement
    if (index < pinCode.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (pinCode[index]) {
        const newPin = [...pinCode];
        newPin[index] = '';
        setPinCode(newPin);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const checkPin = useCallback(() => {
    const enteredPin = pinCode.join('');
    if (enteredPin === PIN_CODE) {
      sessionStorage.setItem('letter_unlocked', 'true');
      setPinError('');
      setLocked(false);
      setIsOpen(true);
    } else {
      setPinError("Code incorrect. Réessaie.");
      setTimeout(() => {
        setPinCode(['', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }, 500);
    }
  }, [pinCode]);

  // Auto-focus sur la première case
  useEffect(() => {
    if (locked && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [locked]);

  // Vérifier automatiquement quand les 5 chiffres sont entrés
  useEffect(() => {
    if (pinCode.every(digit => digit !== '')) {
      const timer = setTimeout(() => {
        checkPin();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pinCode, checkPin]);

  // Gestion du PIN (ancienne fonction gardée pour le formulaire)
  const handleUnlock = (e) => {
    e && e.preventDefault && e.preventDefault();
    checkPin();
  };

  // Empêcher le scroll de la page quand locked
  const pageStyle = {
    overflow: locked ? 'hidden' : 'auto'
  };

  return (
    <div className="letter-page" style={pageStyle}>
      {/* Overlay PIN si verrouillé */}
      {locked && (
        <div className="pin-overlay" onKeyDown={(e) => {
          if (e.key === 'Enter') handleUnlock(e);
        }}>
          <div className="pin-box">
            <h2>Entrer le code PIN</h2>
            <p className="pin-instruction">Saisis le code pour ouvrir la lettre</p>
            <form onSubmit={handleUnlock} className="pin-form">
              <div className={`pin-inputs-grid ${pinError ? 'error' : ''}`}>
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
                    className="pin-digit-input"
                    aria-label={`Chiffre ${index + 1}`}
                  />
                ))}
              </div>
              <div className="pin-actions">
                <button type="submit" className="pin-submit">Déverrouiller</button>
                <button type="button" className="pin-cancel" onClick={onBack}>Retour</button>
              </div>
            </form>
            {pinError && <div className="pin-error">{pinError}</div>}
            <div className="pin-hint">Tu aimerais bien la lire heun ?</div>
          </div>
        </div>
      )}

      <div className="letter-background">
        {/* Particules flottantes */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="letter-particle"
            style={{
              left: particle.left,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      <button className="letter-back-btn" onClick={onBack}>
        <span className="back-arrow">←</span>
        <span>Retour</span>
      </button>

      <div className="letter-container">
        {/* Enveloppe */}
        <div className={`envelope ${isOpen ? 'open' : ''}`}>
          <div
            className="envelope-top"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 2),
              transform: `translateX(-50%) translateY(${scrollProgress * 100}px)`
            }}
          ></div>
          <div
            className="envelope-flap"
            style={{
              opacity: Math.max(0, 1 - scrollProgress * 2)
            }}
          ></div>
          <div className="envelope-body"></div>

          {/* Cachet de cire */}
          <div className="wax-seal">
            <div className="wax-seal-heart">💖</div>
          </div>
        </div>

        {/* Lettre qui sort de l'enveloppe */}
        <div
          className={`letter-paper ${isOpen ? 'visible' : ''}`}
          style={{
            transform: `translateX(-50%) translateY(${100 - scrollProgress * 100}%)`
          }}
        >
          <div className="letter-header">
            <div className="letter-date">21 Novembre 2025</div>
            <div className="letter-decoration">✨ 💖 ✨</div>
          </div>

          <div className="letter-content">
            <div className="letter-salutation">Mon Ange Emeraude,</div>

            <div className="letter-paragraph">
                <p>
                    En ce jour qui est le tien, je veux prendre un vrai moment pour te dire combien tu comptes pour moi.
                </p>

                <p>
                    Je ne compte plus les heures passées à se parler, à se confier, à rire. Et pour quelqu’un d’aussi peu sociable que moi, c’est tout sauf habituel… mais je n’ai aucune envie que ça s’arrête.
                </p>

                <p>
                    Ton rire est une mélodie qui me porte. Grâce à toi, je me surprends à faire des choses que je n’aurais jamais osé. Tu m’aides à grandir, simplement en étant toi.
                </p>

                <p>
                    Je garde en mémoire chaque conversation, chaque sourire partagé. Ce sont ces instants qui rendent ces derniers temps si beaux.
                </p>

                <p>
                    Au début, je n’imaginais pas que cela irait si loin. Aujourd’hui, j’ai confiance en toi — totalement.
                </p>

                <p>
                    Je vois tes concessions, même quand je ne le dis pas. Je les vois, je les mesure, et je te remercie pour chacune d’elles.
                </p>

                <p>
                    On a eu des désaccords, mais on a toujours trouvé la façon d’avancer ensemble. C’est ce que je veux pour nous, encore et encore.
                </p>

                <p>
                    Tu te souviens de mon premier message ? Je t’avais déjà décrite alors qu’on se connaissait à peine. J’ai le regard qui s’attarde sur les détails — surtout les tiens.
                </p>

                <p>
                    Parfois, j’analyse trop. Le moindre changement dans tes habitudes, dans tes réponses… J’en suis désolé. Ne te méprends jamais : je t’aime et j’ai confiance en toi.
                </p>

                <p>
                    Si l’étincelle a vacillé par moments, mes sentiments n’ont, eux, jamais été aussi forts. Je veux prendre soin de nous, avec plus de douceur, plus de présence.
                </p>

                <p>
                    Je repense aussi à nos fous rires, à nos lectures complices — à ce soir où ton livre érotique nous a fait rougir et sourire — et à ces instants d’intimité où tu t’abandonnes et me fais confiance. Ce sont ces élans, tes efforts, ta manière de t’ouvrir, qui me rendent si heureux de t’avoir.
                </p>

                <p>
                    Pour ton anniversaire, je te souhaite tout le bonheur que tu mérites. Que cette année t’apporte ce que tu désires, de grandes joies, et mille petites lumières au quotidien.
                </p>

                <p>
                    Je t’aime plus que tout. Je ne sais pas toujours le montrer — je manque parfois de mots et de gestes — mais ne doute jamais de la force de ce que je ressens pour toi.
                </p>

                <p>Quelques-unes des choses que j’aime chez toi et avec toi :</p>

                <p>• Nos discussions profondes, tard le soir</p>
                <p>• T’écouter me raconter tes journées</p>
                <p>• Tout ce qui me ramène à toi, même un détail</p>
                <p>• Te voir heureuse, vraiment</p>
                <p>• Quand tu partages ce qui t’a marquée dans la vie</p>
                <p>• Tes petites attentions, celles qui disent tout sans un mot</p>

                <p>
                    Je ne l’imagine pas, mais si un jour la vie devait nous éloigner, je garderais de toi une trace indélébile. Tu as déjà changé ma façon d’aimer.
                </p>

                <p>
                    Continue de briller, à ta manière. Reste cette femme rare, intense et vraie. Ta présence rend le monde — et ma vie — plus beaux.
                </p>

                <p className="letter-final">
                    Joyeux anniversaire, mon ange. Que cette journée soit aussi lumineuse que ton regard. 🎂✨
                </p>

            </div>

            <div className="letter-signature">
              <p>Avec tout mon amour,</p>
              <p className="signature-name">Hermann 💝</p>
            </div>
          </div>

          <div className="letter-footer">
            <div className="letter-hearts">💕 💖 💕</div>
          </div>
        </div>

        {/* Indication de scroll */}
        {isOpen && scrollProgress < 0.9 && (
          <div className="scroll-indicator">
            <div className="scroll-text">Fais défiler pour sortir la lettre ↑</div>
            <div className="scroll-arrow">↑</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterPage;
