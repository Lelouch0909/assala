import { useState, useMemo } from 'react';
import LetterPage from './LetterPage';
import './ContentPage.css';

const ContentPage = ({ pageType, onBack }) => {
  // Si c'est la page lettre, afficher le composant LetterPage
  if (pageType === 'ma-lettre') {
    return <LetterPage onBack={onBack} />;
  }
  // Generate particle positions once
  const particles = useMemo(() => {
    return [...Array(20)].map(() => ({
      emoji: ['💖', '💕', '✨', '🌸', '💫'][Math.floor(Math.random() * 5)],
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`
    }));
  }, []);

  const [content] = useState(() => {
    switch(pageType) {
      case 'qui-est-Eneis':
        return {
          title: 'Qui est Eneis',
          emoji: '✨',
          sections: [
            {
              subtitle: 'À compléter...',
              text: 'Le contenu de cette page sera ajouté prochainement.'
            }
          ]
        };

      case 'Eneis-a-travers-moi':
        return {
          title: 'Eneis à travers moi',
          emoji: '💖',
          sections: [
            {
              subtitle: 'À compléter...',
              text: 'Le contenu de cette page sera ajouté prochainement.'
            }
          ]
        };

      case 'ma-lettre':
        return {
          title: 'Ma lettre pour toi',
          emoji: '💌',
          sections: [
            {
              subtitle: 'À compléter...',
              text: 'Le contenu de cette page sera ajouté prochainement.'
            }
          ]
        };

      default:
        return {
          title: 'Page',
          emoji: '💝',
          sections: []
        };
    }
  });

  return (
    <div className="content-page">
      <div className="content-page-background">
        <div className="floating-particles">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="particle"
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
      </div>

      <div className="content-page-container">
        <button className="content-back-btn" onClick={onBack}>
          <span className="back-arrow">←</span>
          <span>Retour</span>
        </button>

        <div className="content-header">
          <div className="content-emoji">{content.emoji}</div>
          <h1 className="content-title">{content.title}</h1>
        </div>

        <div className="content-body">
          {content.sections.map((section, index) => (
            <div key={index} className="content-section">
              {section.subtitle && (
                <h2 className="content-subtitle">{section.subtitle}</h2>
              )}
              <p className="content-text">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentPage;

