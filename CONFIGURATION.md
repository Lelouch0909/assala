# Configuration du Site d'Anniversaire

## Variables de Configuration

Ce fichier permet de configurer facilement les paramètres principaux du site.

### Mode Développement
- **Fichier:** `src/App.jsx`
- **Ligne:** 9
- **Variable:** `DEV_MODE`
- **Valeur par défaut:** `false`
- **Valeur pour test:** `true`

### Date Cible
- **Date:** 21 Novembre 2025 à 00:00:00
- **Fichiers à modifier:**
  - `src/App.jsx` ligne 23
  - `src/components/CountdownPage.jsx` ligne 13

### Durées des Scènes (en millisecondes)
- **Fichier:** `src/components/BirthdayPage.jsx`
- **Lignes:** 22-30

```javascript
{ id: 0, duration: 4000, component: 'intro' },      // 4 secondes
{ id: 1, duration: 5000, component: 'message1' },   // 5 secondes
{ id: 2, duration: 6000, component: 'flowers1' },   // 6 secondes
{ id: 3, duration: 5000, component: 'message2' },   // 5 secondes
{ id: 4, duration: 6000, component: 'hearts' },     // 6 secondes
{ id: 5, duration: 5000, component: 'message3' },   // 5 secondes
{ id: 6, duration: 8000, component: 'flowers2' },   // 8 secondes
{ id: 7, duration: 0, component: 'finale' }         // Infini
```

### Palette de Couleurs Principale
- Rose principal: `#d81b60`
- Rose clair: `#ff6eb4`, `#ffc3e1`
- Rose très clair: `#ffeef8`
- Violet foncé: `#1a0033`, `#330066`
- Or: `#ffd700`, `#ffeb3b`

### Polices Utilisées
- **Titre principal:** Parisienne
- **Messages:** Dancing Script
- **Titre élégant:** Great Vibes

## Personnalisation des Messages

### Page de Compte à Rebours
- **Fichier:** `src/components/CountdownPage.jsx`
- **Ligne 42:** Message principal ("Patiente mon ange")

### Messages de la Page d'Anniversaire

#### Message 1 - "Mon Ange"
- **Fichier:** `src/components/BirthdayPage.jsx`
- **Lignes:** 68-75

#### Message 2 - "Pour Toi"
- **Fichier:** `src/components/BirthdayPage.jsx`
- **Lignes:** 91-98

#### Message 3 - "Tu es Unique"
- **Fichier:** `src/components/BirthdayPage.jsx`
- **Lignes:** 114-121

#### Messages Finale
- **Fichier:** `src/components/BirthdayPage.jsx`
- **Lignes:** 147-153

## Configuration des Particules

### Particules de Cœur
- **Fichier:** `src/components/HeartParticles.jsx`
- **Lignes:** 9-14
- **Paramètres modifiables:**
  - `particleCount`: 32 (nombre de particules)
  - `speed`: 1 (vitesse d'animation)
  - `colorScheme`: 'rainbow' (schéma de couleurs)
  - `mouseInfluence`: 50 (influence de la souris)
  - `particleSize`: 10 (taille des particules)

## Optimisations Mobile

### Viewport
- **Fichier:** `index.html`
- **Ligne 7:** Meta viewport pour mobile

### Format Cible
- **Appareil:** iPhone 11
- **Résolution:** 414x896 pixels
- **Orientation:** Portrait

## Notes Importantes

1. **Avant le déploiement final:**
   - Remettre `DEV_MODE = false`
   - Vérifier la date cible
   - Tester sur un vrai iPhone

2. **Performance:**
   - Les animations sont optimisées pour mobile
   - Utilise requestAnimationFrame pour les animations
   - Pas de défilement (overflow: hidden)

3. **Compatibilité:**
   - Nécessite un navigateur moderne (ES6+)
   - Fonctionne sur iOS Safari, Chrome, Firefox
   - Testé sur iPhone 11

4. **Dépendances externes:**
   - Google Fonts (nécessite connexion internet)
   - Three.js (pour Heart3D, non utilisé dans la version finale)

