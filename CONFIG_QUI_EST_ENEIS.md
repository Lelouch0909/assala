# Configuration du contenu - Page "Qui est Eneis"

## 📸 Ajouter de nouvelles photos/vidéos

### Étape 1 : Ajouter les fichiers
Placez vos fichiers dans `/public/content/`

### Étape 2 : Éditer QuiEstEneisPage.jsx
Trouvez le tableau `content` (ligne ~17) et ajoutez vos éléments :

```javascript
// Pour ajouter une photo
{
  type: 'image',
  src: '/content/NOM_DU_FICHIER.jpg',
  caption: 'Votre légende ici',
  animation: 'flipCard'  // ou 'zoomIn', 'rotateIn'
}

// Pour ajouter une vidéo
{
  type: 'video',
  src: '/content/NOM_DU_FICHIER.mp4',
  caption: 'Votre légende ici',
  animation: 'zoomIn'  // ou 'rotateIn', 'fadeInUp'
}

// Pour ajouter du texte
{
  type: 'text',
  content: 'Votre message...',
  animation: 'fadeInUp'  // ou 'slideInLeft', 'slideInRight'
}
```

## 🎨 Animations disponibles

### Pour les images (type: 'image')
- `flipCard` - **Recommandé** - Effet de retournement 3D au survol
- `zoomIn` - Zoom depuis le centre
- `rotateIn` - Rotation avec zoom

### Pour les vidéos (type: 'video')
- `zoomIn` - **Recommandé** - Zoom depuis le centre
- `rotateIn` - Rotation avec zoom
- `fadeInUp` - Apparition depuis le bas

### Pour les textes (type: 'text')
- `fadeInUp` - Apparition depuis le bas
- `slideInLeft` - Glissement depuis la gauche
- `slideInRight` - Glissement depuis la droite

## 💡 Exemple de contenu complet

```javascript
const content = [
  {
    type: 'text',
    content: 'Qui est Eneis ?',
    isTitle: true  // Pour un titre principal
  },
  {
    type: 'text',
    content: 'Une personne extraordinaire...',
    animation: 'fadeInUp'
  },
  {
    type: 'image',
    src: '/content/photo1.jpg',
    caption: 'Un moment magique',
    animation: 'flipCard'
  },
  {
    type: 'video',
    src: '/content/video1.mp4',
    caption: 'Des souvenirs précieux',
    animation: 'zoomIn'
  },
  {
    type: 'text',
    content: 'Un autre message...',
    animation: 'slideInLeft'
  }
];
```

## 📝 Ordre recommandé

Pour une meilleure expérience :
1. Commencez par un titre
2. Alternez entre textes, images et vidéos
3. Ne mettez pas trop d'éléments du même type à la suite
4. Variez les animations pour plus de dynamisme

## 🎯 Bonnes pratiques

### Images
- Format : JPG ou PNG
- Taille recommandée : 1000-2000px de largeur
- Poids : < 2 MB par image

### Vidéos
- Format : MP4
- Durée : 10-30 secondes idéalement
- Poids : < 10 MB par vidéo

### Textes
- Longueur : 1-3 phrases pour les paragraphes
- Utilisez des phrases courtes et impactantes
- Privilégiez l'émotion

## 🌈 Personnaliser les couleurs

### Fond principal
```css
/* Dans QuiEstEneisPage.css, ligne 1 */
.qui-est-eneis-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}
```

### Guirlande
```css
/* Ligne 50 */
.light-bulb {
  background: linear-gradient(135deg, #ff6b9d, #ffc3a0);
}
```

### Cartes (verso)
```css
/* Ligne 264 */
.card-back {
  background: linear-gradient(135deg, #667eea, #764ba2);
}
```

## 🔄 Ordre des éléments actuels

Actuellement, la page contient (dans l'ordre) :
1. Titre principal
2. Texte d'introduction
3. Image 1 (IMG-20251110-WA0025.jpg)
4. Texte
5. Vidéo 1 (VID-20251116-WA0026.mp4)
6. Texte
7. Image 2 (IMG-20251116-WA0024.jpg)
8. Vidéo 2 (VID-20251110-WA0028.mp4)
9. Texte
10. Image 3 (IMG-20251116-WA0025.jpg)
11. Vidéo 3 (VID-20251116-WA0027.mp4)
12. Texte de conclusion
13. Section finale avec animation de cœurs

## 🚀 Ajout rapide

Pour ajouter rapidement un élément :

1. Ouvrez `/src/components/QuiEstEneisPage.jsx`
2. Trouvez le tableau `content` (ligne ~17)
3. Copiez un élément existant similaire
4. Modifiez les valeurs (src, content, caption)
5. Sauvegardez - le changement est automatique !

## 📱 Test sur mobile

N'oubliez pas de tester sur mobile :
- Les animations sont adaptées
- La guirlande est simplifiée
- Les cartes s'adaptent à l'écran
- Le texte est lisible

