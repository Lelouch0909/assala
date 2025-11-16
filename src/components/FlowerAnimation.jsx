import { useEffect } from 'react';
import './FlowerAnimation.css';

const FlowerAnimation = () => {
  useEffect(() => {
    // Remove the container class if needed
    document.body.classList.remove("container");
  }, []);

  return (
    <div className="flower-animation-container">
      <div className="night"></div>
      <div className="flowers">
        {/* Flower 1 */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`flower__light flower__light--${i}`}></div>
            ))}
          </div>
          <div className="flower__line">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i}`}></div>
            ))}
          </div>
        </div>

        {/* Flower 2 */}
        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`flower__light flower__light--${i}`}></div>
            ))}
          </div>
          <div className="flower__line">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i}`}></div>
            ))}
          </div>
        </div>

        {/* Flower 3 */}
        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`flower__light flower__light--${i}`}></div>
            ))}
          </div>
          <div className="flower__line">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i}`}></div>
            ))}
          </div>
        </div>

        {/* Long grass elements */}
        <div className="grow-ans" style={{'--d': '1.2s'}}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        {/* Grass 1 */}
        <div className="growing-grass">
          <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i}`}></div>
            ))}
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        {/* Grass 2 */}
        <div className="growing-grass">
          <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i}`}></div>
            ))}
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        {/* Right grass */}
        <div className="grow-ans" style={{'--d': '2.4s'}}>
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={{'--d': '2.8s'}}>
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf"></div>
          </div>
        </div>

        {/* Front grass */}
        <div className="grow-ans" style={{'--d': '2.8s'}}>
          <div className="flower__g-front">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i}`}>
                <div className="flower__g-front__leaf"></div>
              </div>
            ))}
            <div className="flower__g-front__line"></div>
          </div>
        </div>

        {/* Front grass with leaves */}
        <div className="grow-ans" style={{'--d': '3.2s'}}>
          <div className="flower__g-fr">
            <div className="leaf"></div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className={`flower__g-fr__leaf flower__g-fr__leaf--${i}`}></div>
            ))}
          </div>
        </div>

        {/* Long grass groups */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(groupIndex => (
          <div key={groupIndex} className={`long-g long-g--${groupIndex}`}>
            {[0, 1, 2, 3].map(leafIndex => (
              <div key={leafIndex} className="grow-ans" style={{'--d': `${3 + groupIndex * 0.2 + leafIndex * 0.2}s`}}>
                <div className={`leaf leaf--${leafIndex}`}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlowerAnimation;

