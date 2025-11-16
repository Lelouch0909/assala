import { useState, useEffect, useMemo } from 'react';
import './LetterPage.css';

const LetterPage = ({ onBack }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Générer les positions des particules une seule fois
  const particles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 2}s`,
      emoji: ['💌', '💕', '💖', '✨', '💫'][i % 5]
    }));
  }, []);

  useEffect(() => {
    // Ouvrir l'enveloppe après 1 seconde
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="letter-page">
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
          <div className="envelope-top"></div>
          <div className="envelope-flap"></div>
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
              {/* Le contenu de la lettre sera ajouté ici */}
              <p>
                En ce jour si spécial, je voulais prendre un moment pour te dire à quel point tu comptes pour moi...
              </p>

              <p>
                Chaque jour passé à tes côtés est un cadeau précieux. Tu illumines ma vie de ta présence, de ton sourire, de ta douceur.
              </p>

              <p>
                Tu es bien plus qu'une simple personne dans ma vie. Tu es mon inspiration, ma force, mon bonheur quotidien.
              </p>

              <p>
                Ton rire est la plus belle des mélodies, tes yeux sont les étoiles qui guident mon chemin, et ton cœur est le refuge où je trouve la paix.
              </p>

              <p>
                Je me souviens de chaque moment partagé, de chaque conversation, de chaque sourire échangé. Ce sont ces instants qui rendent la vie si belle.
              </p>

              <p>
                Tu as apporté de la couleur dans un monde qui était en noir et blanc. Tu as apporté de la joie là où il y avait de la tristesse. Tu as apporté de l'amour là où il y avait du vide.
              </p>

              <p>
                Pour ton anniversaire, je te souhaite tout le bonheur du monde. Que cette nouvelle année t'apporte tout ce que tu désires, tous tes rêves les plus fous, toutes les joies que tu mérites.
              </p>

              <p>
                Sache que peu importe où la vie nous mène, tu auras toujours une place spéciale dans mon cœur. Tu es unique, irremplaçable, extraordinaire.
              </p>

              <p>
                Continue de briller comme tu le fais si bien. Continue d'être cette personne merveilleuse que tu es. Continue de faire de ce monde un endroit meilleur par ta simple présence.
              </p>

              <p className="letter-final">
                Joyeux anniversaire mon ange. Que cette journée soit aussi belle que toi. 🎂✨
              </p>
            </div>

            <div className="letter-signature">
              <p>Avec tout mon amour,</p>
              <p className="signature-name">Ton [Prénom] 💝</p>
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

