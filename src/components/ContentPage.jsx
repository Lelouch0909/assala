import LetterPage from './LetterPage';
import QuiEstEneisPage from './QuiEstEneisPage';
import EneisYeuxPage from './EneisYeuxPage';
import './ContentPage.css';

const ContentPage = ({ pageType, onBack }) => {
  // Si c'est la page lettre, afficher le composant LetterPage
  if (pageType === 'ma-lettre') {
    return <LetterPage onBack={onBack} />;
  }

  // Si c'est la page qui-est-enis, afficher le composant QuiEstEneisPage
  if (pageType === 'qui-est-enis') {
    return <QuiEstEneisPage onBack={onBack} />;
  }

  // Si c'est la page eneis-yeux, afficher le composant EneisYeuxPage
  if (pageType === 'eneis-yeux') {
    return <EneisYeuxPage onBack={onBack} />;
  }

  // Pour les autres pages, afficher un contenu par défaut
  return (
    <div className="content-page">
      <div className="content-page-container">
        <button className="content-back-btn" onClick={onBack}>
          <span className="back-arrow">←</span>
          <span>Retour</span>
        </button>
        <div className="content-header">
          <h1 className="content-title">Page en construction</h1>
        </div>
      </div>
    </div>
  );
};

export default ContentPage;
