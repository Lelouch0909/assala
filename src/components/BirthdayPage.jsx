import { useState, useEffect, useRef, useMemo } from 'react';
import HeartParticles from './HeartParticles';
import FlowerAnimation from './FlowerAnimation';
import FireworksAnimation from './FireworksAnimation';
import ConfettiAnimation from './ConfettiAnimation';
import AngelAnimation from './AngelAnimation';
import MenuButtons from './MenuButtons';
import ContentPage from './ContentPage';
import './BirthdayPage.css';

const BirthdayPage = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [currentPage, setCurrentPage] = useState(null);
  const containerRef = useRef(null);

  // Generate star positions once
  const starPositions = useMemo(() => {
    return [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`
    }));
  }, []);

  // Scenes timeline (in seconds) - using useMemo to prevent recreation
  const scenes = useMemo(() => [
    { id: 0, duration: 4000, component: 'intro' },
    { id: 1, duration: 5000, component: 'message1' },
    { id: 2, duration: 4000, component: 'hearts' },
    { id: 3, duration: 5000, component: 'message2' },
      { id: 4, duration: 4000, component: 'angel' }, // Nouvelle scène avec ange
    { id: 5, duration: 5000, component: 'message3' },
    { id: 6, duration: 6000, component: 'flowers2' },
    { id: 7, duration: 0, component: 'finale' } // Infinite
  ], []);

  useEffect(() => {
    const scene = scenes[currentScene];
    if (scene.duration === 0) return; // Finale scene stays forever

    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      }
    }, scene.duration);

    return () => clearTimeout(timer);
  }, [currentScene, scenes]);

  const renderScene = () => {
    const scene = scenes[currentScene];

    switch (scene.component) {
      case 'intro':
        return (
          <div className="scene scene-intro">
            <div className="stars-container">
              {starPositions.map((pos, i) => (
                <div
                  key={i}
                  className="star"
                  style={pos}
                />
              ))}
            </div>
            <h1 className="intro-title">Joyeux Anniversaire</h1>
            <div className="sparkles">✨💖✨</div>
          </div>
        );

      case 'message1':
        return (
          <div className="scene scene-message">
            <div className="message-card animate-in">
              <h2 className="message-title">Mon Ange</h2>
              <p className="message-text">
                Aujourd'hui est un jour spécial...
              </p>
              <p className="message-text delay-1">
                tu as un an de plus!!
              </p>
              <div className="emoji-line">⭐💫✨</div>
            </div>
          </div>
        );


      case 'message2':
        return (
          <div className="scene scene-message">
            <div className="message-card animate-in">
              <h2 className="message-title">Bon anniversaire !</h2>
              <p className="message-text">
                  Garde ton cœur léger
              </p>
              <p className="message-text delay-1">
                  et ton sourire toujours
              </p>
              <div className="emoji-line">💕💗💖</div>
            </div>
          </div>
        );

      case 'hearts':
        return (
          <div className="scene scene-hearts">
            <div className="hearts-overlay">
              <HeartParticles />
            </div>
            <div className="fireworks-overlay">
              <FireworksAnimation />
            </div>
            <div className="confetti-overlay">
              <ConfettiAnimation />
            </div>
          </div>
        );

      case 'angel':
        return (
          <div className="scene scene-angel">
            <div className="angel-overlay">
              <AngelAnimation />
            </div>
            <div className="angel-message">
              <h2 className="angel-message-title">Mon Ange</h2>
              <p className="angel-message-text">18 ans aujourd’hui et plusieurs autres à t’aimer</p>
              <p className="angel-message-text delay-1">Bon anniversaire</p>
              <div className="emoji-line">👼✨💫</div>
            </div>
          </div>
        );

      case 'message3':
        return (
          <div className="scene scene-message">
            <div className="message-card animate-in">
              <h2 className="message-title">Tu es Unique</h2>
              <p className="message-text">
                  Ta présence est apaisante
              </p>
              <p className="message-text delay-1">

              </p>
              <div className="emoji-line">🌟💝🌹</div>
            </div>
          </div>
        );

      case 'flowers2':
        return (
          <div className="scene scene-flowers">
            <div className="flowers-overlay">
              <FlowerAnimation />
            </div>
            <div className="overlay-message">
              <p className="floating-text"></p>
              <p className="floating-text delay-1">Tu embellis ma vie</p>
            </div>
          </div>
        );

      case 'finale':
        return (
          <div className="scene scene-finale">
            <div className="finale-background">
              <HeartParticles />
            </div>
            <div className="finale-confetti">
              <ConfettiAnimation />
            </div>
            <div className="finale-content">
              <h1 className="finale-title">Joyeux Anniversaire</h1>
              <h2 className="finale-subtitle">Emeraude</h2>
              <p className="finale-date">21 Novembre 2025</p>
              <div className="finale-hearts">
                <span className="pulse-heart">💖</span>
                <span className="pulse-heart delay-1">💕</span>
                <span className="pulse-heart delay-2">💗</span>
              </div>
              <p className="finale-message">Je t'aime de tout mon cœur</p>
            </div>
            <div className="finale-flowers">
              <div className="small-flower flower-left">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="mini-petal" style={{ transform: `rotate(${i * 60}deg)` }} />
                ))}
              </div>
              <div className="small-flower flower-right">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="mini-petal" style={{ transform: `rotate(${i * 60}deg)` }} />
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNavigate = (destination) => {
    if (destination === 'restart') {
      setCurrentScene(0);
    } else {
      setCurrentPage(destination);
    }
  };

  const handleBack = () => {
    setCurrentPage(null);
  };

  // Si on est sur une page de contenu, l'afficher
  if (currentPage) {
    return <ContentPage pageType={currentPage} onBack={handleBack} />;
  }

  const isFinale = currentScene === scenes.length - 1;

  return (
    <div className="birthday-page" ref={containerRef}>
      {renderScene()}

      {/* Progress indicator */}
      <div className="progress-indicator">
        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            className={`progress-dot ${index === currentScene ? 'active' : ''} ${index < currentScene ? 'completed' : ''}`}
          />
        ))}
      </div>

      {/* Menu buttons - apparaît uniquement à la scène finale */}
      {isFinale && <MenuButtons onNavigate={handleNavigate} />}
    </div>
  );
};

export default BirthdayPage;

