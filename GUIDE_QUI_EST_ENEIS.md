# Page "Qui est Eneis" - Documentation

## 🎨 Ce qui a été implémenté

### ✨ Fonctionnalités principales

1. **Guirlande décorative animée**
   - Guirlande lumineuse en haut de la page avec effet de balancement
   - Lumières qui changent de couleur avec effet de pulsation
   - Animation synchronisée pour un effet visuel dynamique

2. **Cartes photos avec effet flip 3D**
   - Les images se retournent au survol (hover)
   - Face avant : la photo
   - Face arrière : un message personnalisé + emoji cœur animé
   - Effet 3D avec perspective
   - Animation de retournement fluide

3. **Cartes vidéos animées**
   - Vidéos intégrées avec contrôles natifs
   - Effet de zoom au survol
   - Bordure arrondie et ombres portées élégantes
   - Responsive et adaptées à tous les écrans

4. **Textes animés**
   - Titre principal avec effet de dégradé animé et brillance
   - Paragraphes avec effet glassmorphism
   - Animations variées : fadeInUp, slideInLeft, slideInRight, etc.

5. **Animations au scroll**
   - Détection automatique des éléments visibles
   - Animations déclenchées quand l'élément entre dans le viewport
   - Intersection Observer pour des performances optimales

6. **Particules flottantes**
   - Emojis qui flottent du bas vers le haut
   - Rotation et opacité animées
   - Distribution aléatoire sur toute la page

7. **Section finale**
   - Animation de cœurs en éclatement (burst)
   - Message de conclusion avec animation

### 🎯 Animations disponibles

Les éléments peuvent avoir différentes animations :
- `fadeInUp` : Apparition depuis le bas
- `slideInLeft` : Glissement depuis la gauche
- `slideInRight` : Glissement depuis la droite
- `zoomIn` : Zoom depuis le centre
- `rotateIn` : Rotation avec zoom
- `flipCard` : Retournement 3D (pour les images)

### 📁 Contenu utilisé

Le composant utilise les médias du dossier `public/content/` :
- **Images** : IMG-20251110-WA0025.jpg, IMG-20251116-WA0024.jpg, IMG-20251116-WA0025.jpg
- **Vidéos** : VID-20251116-WA0026.mp4, VID-20251110-WA0028.mp4, VID-20251116-WA0027.mp4

### 🎨 Palette de couleurs

- Gradient principal : Violet (#667eea) → Mauve (#764ba2) → Rose (#f093fb)
- Guirlande : Rose dégradé avec effets lumineux
- Cartes : Fond blanc pour photos, gradient violet pour le verso
- Textes : Blanc avec ombres pour la lisibilité

### 📱 Responsive Design

- Adaptation automatique pour mobile
- Guirlande simplifiée sur petits écrans
- Tailles de police ajustées
- Espacement optimisé

## 🔧 Personnalisation

### Modifier le contenu

Dans `QuiEstEneisPage.jsx`, vous pouvez modifier le tableau `content` :

```javascript
const content = [
  {
    type: 'text',
    content: 'Votre texte ici...',
    animation: 'fadeInUp'
  },
  {
    type: 'image',
    src: '/content/votre-image.jpg',
    caption: 'Légende de l\'image',
    animation: 'flipCard'
  },
  {
    type: 'video',
    src: '/content/votre-video.mp4',
    caption: 'Légende de la vidéo',
    animation: 'zoomIn'
  }
];
```

### Ajouter plus de médias

1. Ajoutez vos fichiers dans `/public/content/`
2. Ajoutez de nouveaux objets dans le tableau `content`
3. Choisissez une animation appropriée

### Modifier les couleurs

Dans `QuiEstEneisPage.css`, modifiez les gradients :
- `.qui-est-eneis-page` pour le fond principal
- `.garland-light` pour les couleurs de la guirlande
- `.card-back` pour le verso des cartes

## 🚀 Fonctionnalités techniques

- **React Hooks** : useState, useEffect, useRef, useMemo
- **Intersection Observer API** : pour détecter les éléments visibles
- **CSS 3D Transforms** : pour l'effet flip des cartes
- **CSS Animations** : pour tous les effets animés
- **Responsive** : Media queries pour mobile

## 📝 Notes

- Les animations se déclenchent automatiquement au scroll
- Les cartes images se retournent au survol (pas sur mobile : tap)
- Les vidéos ont des contrôles natifs (play, pause, volume)
- Bouton retour toujours accessible en haut à gauche
- Performance optimisée avec useMemo pour les particules

## 🎉 Résultat

Une page interactive et visuellement riche qui présente Eneis avec :
- ✅ Guirlande décorative
- ✅ Photos avec effet flip 3D
- ✅ Vidéos animées
- ✅ Textes avec animations variées
- ✅ Particules flottantes
- ✅ Design responsive
- ✅ Expérience utilisateur fluide

