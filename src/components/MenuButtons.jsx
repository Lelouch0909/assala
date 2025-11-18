import './MenuButtons.css';

const MenuButtons = ({ onNavigate }) => {
  return (
    <div className="menu-buttons">
      <div className="menu-column menu-column-left">
        <button
          className="menu-btn menu-btn-1"
          onClick={() => onNavigate('qui-est-enis')}
        >
          <span className="menu-btn-icon">✨</span>
          <span className="menu-btn-text">Qui est Enis</span>
        </button>
        <button
          className="menu-btn menu-btn-2"
          onClick={() => onNavigate('ma-lettre')}
        >
          <span className="menu-btn-icon">💌</span>
          <span className="menu-btn-text">Ma lettre pour toi</span>
        </button>
      </div>

      <div className="menu-column menu-column-right">
        <button
          className="menu-btn menu-btn-3"
          onClick={() => onNavigate('eneis-yeux')}
        >
          <span className="menu-btn-icon">💖</span>
          <span className="menu-btn-text">A mes yeux</span>
        </button>
        <button
          className="menu-btn menu-btn-4"
          onClick={() => onNavigate('restart')}
        >
          <span className="menu-btn-icon">🔄</span>
          <span className="menu-btn-text">Relancer l'animation</span>
        </button>
      </div>
    </div>
  );
};

export default MenuButtons;

