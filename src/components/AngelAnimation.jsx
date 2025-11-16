import './AngelAnimation.css';
const AngelAnimation = () => {
  return (
    <div className="angel-animation-container">
      <div className="angel angel-main">
        <div className="angel-halo"></div>
        <div className="angel-head">
          <div className="angel-face">
            <div className="angel-eye angel-eye-left"></div>
            <div className="angel-eye angel-eye-right"></div>
            <div className="angel-smile"></div>
          </div>
        </div>
        <div className="angel-body">
          <div className="angel-wing angel-wing-left"></div>
          <div className="angel-wing angel-wing-right"></div>
        </div>
        <div className="angel-glow"></div>
      </div>
      <div className="angel angel-small angel-small-1">
        <div className="angel-halo-small"></div>
        <div className="angel-body-small">
          <div className="angel-wing-small angel-wing-left"></div>
          <div className="angel-wing-small angel-wing-right"></div>
        </div>
      </div>
      <div className="angel angel-small angel-small-2">
        <div className="angel-halo-small"></div>
        <div className="angel-body-small">
          <div className="angel-wing-small angel-wing-left"></div>
          <div className="angel-wing-small angel-wing-right"></div>
        </div>
      </div>
      <div className="angel angel-small angel-small-3">
        <div className="angel-halo-small"></div>
        <div className="angel-body-small">
          <div className="angel-wing-small angel-wing-left"></div>
          <div className="angel-wing-small angel-wing-right"></div>
        </div>
      </div>
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="angel-star"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
        >
          ✨
        </div>
      ))}
    </div>
  );
};
export default AngelAnimation;
