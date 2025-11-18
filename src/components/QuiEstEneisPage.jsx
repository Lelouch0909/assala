import { useState, useEffect, useRef } from 'react';
import './QuiEstEneisPage.css';

const createParticles = () => {
  return [...Array(15)].map((_, i) => ({
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
    emoji: ['✨', '💫', '🌸', '💕', '🎀'][i % 5]
  }));
};

const QuiEstEneisPage = ({ onBack }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [particles] = useState(createParticles);
  const observerRef = useRef(null);
  const videoRefs = useRef({});

  // Contenu de la page avec photos, vidéos et textes
  const content = [
    {
      type: 'text',
      content: 'Qui est Eneis ?',
      isTitle: true
    },
    {
      type: 'text',
      content: 'Une personne extraordinaire qui illumine chaque jour...',
      animation: 'fadeInUp'
    },
    {
      type: 'image',
      src: '/content/IMG-20251110-WA0025.jpg',
      caption: 'Un moment inoubliable',
      animation: 'flipCard'
    },
    {
      type: 'text',
      content: 'Des moments précieux qui resteront gravés dans nos cœurs...',
      animation: 'slideInLeft'
    },
    {
      type: 'video',
      src: '/content/VID-20251116-WA0026.mp4',
      caption: 'Des souvenirs en mouvement',
      animation: 'zoomIn'
    },
    {
      type: 'text',
      content: 'Chaque sourire, chaque rire, chaque instant partagé...',
      animation: 'slideInRight'
    },
    {
      type: 'image',
      src: '/content/IMG-20251116-WA0024.jpg',
      caption: 'Toujours radieuse',
      animation: 'flipCard'
    },
    {
      type: 'video',
      src: '/content/VID-20251110-WA0028.mp4',
      caption: 'Des moments de joie',
      animation: 'rotateIn'
    },
    {
      type: 'text',
      content: 'Une personnalité unique, une présence magique...',
      animation: 'fadeInUp'
    },
    {
      type: 'image',
      src: '/content/IMG-20251116-WA0025.jpg',
      caption: 'Simplement toi',
      animation: 'flipCard'
    },
    {
      type: 'video',
      src: '/content/VID-20251116-WA0027.mp4',
      caption: 'Ces instants précieux',
      animation: 'zoomIn'
    },
    {
      type: 'text',
      content: 'Et tant d\'autres moments qui font de toi quelqu\'un d\'extraordinaire...',
      animation: 'slideInLeft'
    }
  ];

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index);
          
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));

            // Lancer la vidéo si visible à 80%
            if (entry.intersectionRatio >= 0.8) {
              const videoElement = videoRefs.current[index];
              if (videoElement) {
                videoElement.play().catch(err => {
                  console.log('Autoplay empêché:', err);
                });
              }
            }
          } else {
            // Mettre en pause quand la vidéo sort du viewport
            const videoElement = videoRefs.current[index];
            if (videoElement) {
              videoElement.pause();
            }
          }
        });
      },
      {
        threshold: [0.2, 0.8],
        rootMargin: '0px'
      }
    );

    const elements = document.querySelectorAll('.content-item');
    elements.forEach((el) => observerRef.current.observe(el));

    // Les guirlandes bougent naturellement avec les animations CSS
    // Pas besoin d'interférer avec le scroll

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="qui-est-eneis-page">
      {/* Guirlande décorative verticale */}
      <div className="garland-container">
        <div className="garland-line" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="garland-light"
            style={{ top: `${(i / 19) * 100}%` }}
          >
            <div className="light-bulb" />
            <div className="light-glow" />
          </div>
        ))}
      </div>

      {/* Bouton retour */}
      <button className="qui-back-btn" onClick={onBack}>
        <span className="back-arrow">←</span>
        <span>Retour</span>
      </button>

      {/* Contenu scrollable */}
      <div className="qui-content-container">
        {content.map((item, index) => (
          <div
            key={index}
            data-index={index}
            className={`content-item ${item.type}-item ${
              visibleItems.has(index) ? 'visible' : ''
            } ${item.animation || ''} ${item.isTitle ? 'title-item' : ''}`}
          >
            {item.type === 'text' && (
              <div className="text-content">
                {item.isTitle ? (
                  <h1 className="page-title">{item.content}</h1>
                ) : (
                  <p className="text-paragraph">{item.content}</p>
                )}
              </div>
            )}

            {item.type === 'image' && (
              <div className="image-card">
                <div className="card-inner">
                  <div className="card-front">
                    <img src={item.src} alt={item.caption} />
                  </div>
                  <div className="card-back">
                    <div className="card-back-content">
                      <p>{item.caption}</p>
                      <span className="heart-icon">💖</span>
                    </div>
                  </div>
                </div>
                <p className="item-caption">{item.caption}</p>
              </div>
            )}

            {item.type === 'video' && (
              <div className="video-card">
                <div className="video-wrapper">
                  <video
                    ref={(el) => { if (el) videoRefs.current[index] = el; }}
                    loop
                    muted
                    playsInline
                  >
                    <source src={item.src} type="video/mp4" />
                    Votre navigateur ne supporte pas la vidéo.
                  </video>
                </div>
                <p className="item-caption">{item.caption}</p>
              </div>
            )}
          </div>
        ))}

        {/* Fin de la page */}
        <div className="end-section">
          <div className="heart-burst">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="burst-heart">
                💖
              </span>
            ))}
          </div>
          <p className="end-text">C'est toi, Eneis ✨</p>
        </div>
      </div>

      {/* Particules flottantes */}
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
  );
};

export default QuiEstEneisPage;
