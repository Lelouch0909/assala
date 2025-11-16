# Site d'Anniversaire pour Emeraude 💖

## Description
Un site web interactif créé pour l'anniversaire d'Emeraude (21 Novembre), affichant trois magnifiques animations côte à côte.

## Composants créés

### 1. Heart3D (`src/components/Heart3D.jsx`)
- Animation 3D de particules formant un cœur
- Utilise THREE.js avec des shaders WebGL personnalisés
- 3000 particules animées suivant une formule mathématique de cœur
- Interaction avec la souris pour déplacer la caméra
- Couleurs roses et violettes dégradées

### 2. HeartParticles (`src/components/HeartParticles.jsx`)
- Animation Canvas 2D de particules formant un cœur
- Particules qui suivent un tracé de cœur avec des traînées
- Interaction avec la souris pour attirer les particules
- Couleurs arc-en-ciel personnalisables
- Environ 32 traînées de particules

### 3. FlowerAnimation (`src/components/FlowerAnimation.jsx`)
- Animation CSS pure de fleurs qui poussent
- 3 fleurs avec des lumières scintillantes
- Herbes et feuilles animées
- Fond de nuit étoilé
- Aucune dépendance JavaScript, tout en CSS

## Structure du projet

```
src/
├── components/
│   ├── Heart3D.jsx              # Composant cœur 3D
│   ├── Heart3D.css              # Styles pour Heart3D
│   ├── HeartParticles.jsx       # Composant particules cœur
│   ├── HeartParticles.css       # Styles pour HeartParticles
│   ├── FlowerAnimation.jsx      # Composant fleurs animées
│   └── FlowerAnimation.css      # Styles pour FlowerAnimation
├── App.jsx                      # Composant principal
├── App.css                      # Styles de la page principale
└── main.jsx                     # Point d'entrée
```

## Installation et lancement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur http://localhost:5173

## Technologies utilisées

- **React** - Framework UI
- **Vite** - Build tool et dev server
- **THREE.js** - Rendu 3D WebGL
- **Canvas API** - Animation 2D
- **CSS Animations** - Animations CSS pures

## Personnalisation

### Informations personnalisées
- Prénom : Emeraude
- Surnom : mon ange
- Date : 21 Novembre

Ces informations apparaissent dans le titre de la page.

## Fonctionnalités

- **Design responsive** : S'adapte aux mobiles et tablettes
- **Animations fluides** : 60 FPS sur tous les composants
- **Interactions** : Mouvement de la souris pour interagir avec les animations
- **Esthétique** : Design moderne avec dégradés et ombres portées
- **Performance optimisée** : Utilisation efficace de WebGL et Canvas

## Navigation

Les trois animations sont affichées côte à côte dans des cartes élégantes :
1. **Cœur 3D** - Animation WebGL interactive
2. **Particules d'Amour** - Canvas 2D avec traînées
3. **Fleurs Magiques** - Animation CSS pure

Chaque carte a un effet de survol qui la soulève légèrement.

---

Fait avec ❤️ pour Emeraude

