import Heart3D from './components/Heart3D'
import HeartParticles from './components/HeartParticles'
import FlowerAnimation from './components/FlowerAnimation'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Joyeux Anniversaire Emeraude 💖</h1>
        <p className="app-subtitle">Pour mon ange - 21 Novembre</p>
      </header>

      <div className="animations-container">
        <div className="animation-card">
          <h2 className="animation-title">Cœur 3D</h2>
          <div className="animation-wrapper">
            <Heart3D />
          </div>
        </div>

        <div className="animation-card">
          <h2 className="animation-title">Particules d'Amour</h2>
          <div className="animation-wrapper">
            <HeartParticles />
          </div>
        </div>

        <div className="animation-card">
          <h2 className="animation-title">Fleurs Magiques</h2>
          <div className="animation-wrapper">
            <FlowerAnimation />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
