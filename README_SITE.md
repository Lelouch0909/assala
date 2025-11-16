# 🎂 Site d'Anniversaire - Emeraude 💖

Un site web d'anniversaire interactif et romantique avec animations, conçu spécifiquement pour mobile (iPhone 11).

## 🌟 Fonctionnalités

### 1. **Page de Compte à Rebours** ⏰
- Compte à rebours élégant jusqu'au 21 novembre à minuit
- Animation de fleur flottante
- Cœurs flottants en arrière-plan
- Message "Patiente mon ange"
- Design rose romantique

### 2. **Page d'Anniversaire** 🎉
Une expérience vidéo/cinématique avec 8 scènes animées :

1. **Intro** - "Joyeux Anniversaire" avec étoiles scintillantes
2. **Message 1** - "Mon Ange" avec texte poétique
3. **Fleurs 1** - Animation complète de fleurs magiques
4. **Message 2** - "Pour Toi" avec déclarations d'amour
5. **Cœurs** - Particules de cœur interactives
6. **Message 3** - "Tu es Unique" avec messages personnalisés
7. **Fleurs 2** - Deuxième animation de fleurs avec texte superposé
8. **Finale** - Scène finale avec tous les éléments combinés

## 🎨 Composants

- **CountdownPage** : Page de compte à rebours animée
- **BirthdayPage** : Page principale avec timeline d'animations
- **HeartParticles** : Particules de cœur interactives avec effet de trainée
- **FlowerAnimation** : Animation complexe de fleurs qui poussent
- **Heart3D** : Cœur 3D rotatif avec particules (non utilisé dans la version finale)

## 🛠️ Mode Développement

Pour tester directement la page d'anniversaire sans attendre la date :

1. Ouvrir `src/App.jsx`
2. Changer `const DEV_MODE = false;` en `const DEV_MODE = true;`
3. La page d'anniversaire s'affichera immédiatement

```javascript
// MODE DEV: Mettre à true pour tester directement la page d'anniversaire
const DEV_MODE = true; // ← Changer ici
```

## 📱 Optimisation Mobile

Le site est optimisé pour :
- iPhone 11 (414x896)
- Format portrait
- Touch interactions
- Viewport fixe pour éviter les problèmes de défilement

## 🚀 Installation et Lancement

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour production
npm run build
```

## 🎯 Date Cible

**21 Novembre 2025 à 00:00:00**

Le site basculera automatiquement du compte à rebours vers la page d'anniversaire à cette date exacte.

## 🎨 Palette de Couleurs

- Rose principal : `#d81b60`
- Rose clair : `#ff6eb4`, `#ffc3e1`
- Rose très clair : `#ffeef8`
- Violet foncé : `#1a0033`, `#330066`
- Or : `#ffd700`, `#ffeb3b`

## 💝 Thème

Design romantique rose avec :
- Polices élégantes : Parisienne, Dancing Script, Great Vibes
- Animations fluides et douces
- Particules et effets lumineux
- Transitions cinématiques

## 📝 Structure du Projet

```
src/
├── App.jsx                      # Point d'entrée principal avec logique de navigation
├── App.css                      # Styles globaux
├── components/
│   ├── CountdownPage.jsx        # Page de compte à rebours
│   ├── CountdownPage.css
│   ├── BirthdayPage.jsx         # Page d'anniversaire avec timeline
│   ├── BirthdayPage.css
│   ├── HeartParticles.jsx       # Animation de particules
│   ├── HeartParticles.css
│   ├── FlowerAnimation.jsx      # Animation de fleurs
│   ├── FlowerAnimation.css
│   ├── Heart3D.jsx              # Cœur 3D (bonus)
│   └── Heart3D.css
```

## 🎬 Durée des Scènes

- Intro : 4 secondes
- Message 1 : 5 secondes
- Fleurs 1 : 6 secondes
- Message 2 : 5 secondes
- Cœurs : 6 secondes
- Message 3 : 5 secondes
- Fleurs 2 : 8 secondes
- Finale : Infini (reste affichée)

**Durée totale avant la scène finale : ~39 secondes**

## 💖 Pour Mon Ange

Créé avec amour pour célébrer un jour spécial 🌹✨

