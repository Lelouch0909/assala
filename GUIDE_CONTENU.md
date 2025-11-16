# 📝 Guide pour Ajouter du Contenu aux Pages

## Vue d'ensemble

Le site dispose maintenant de 4 boutons de navigation qui apparaissent à la fin de l'animation :

1. **Qui est Enis** (en haut à gauche) - ✨
2. **Ma lettre pour toi** (en bas à gauche) - 💌
3. **Enis à travers moi** (en haut à droite) - 💖
4. **Relancer l'animation** (en bas à droite) - 🔄

## Comment ajouter du contenu

### Étape 1 : Ouvrir le fichier ContentPage.jsx

Fichier : `src/components/ContentPage.jsx`

### Étape 2 : Modifier le contenu

Dans le fichier, vous trouverez une fonction `useState` avec un `switch` statement. Voici la structure :

```javascript
const [content] = useState(() => {
  switch(pageType) {
    case 'qui-est-enis':
      return {
        title: 'Qui est Enis',
        emoji: '✨',
        sections: [
          {
            subtitle: 'Un titre de section',
            text: 'Le texte de la section.'
          }
        ]
      };
    // ... autres cas
  }
});
```

### Structure d'un contenu

Chaque page a :
- **title** : Le titre principal de la page
- **emoji** : L'emoji affiché en haut (animé)
- **sections** : Un tableau de sections, chaque section ayant :
  - **subtitle** : Sous-titre (optionnel)
  - **text** : Le texte principal

## Exemples de contenu

### Exemple 1 : Page simple avec un paragraphe

```javascript
case 'qui-est-enis':
  return {
    title: 'Qui est Enis',
    emoji: '✨',
    sections: [
      {
        subtitle: 'Mon Ange',
        text: 'Enis est une personne extraordinaire qui illumine chaque jour de ma vie...'
      }
    ]
  };
```

### Exemple 2 : Page avec plusieurs sections

```javascript
case 'enis-a-travers-moi':
  return {
    title: 'Enis à travers moi',
    emoji: '💖',
    sections: [
      {
        subtitle: 'Ce que je vois',
        text: 'Quand je te regarde, je vois une étoile qui brille...'
      },
      {
        subtitle: 'Ce que je ressens',
        text: 'Mon cœur bat plus fort à chaque instant passé avec toi...'
      },
      {
        subtitle: 'Ce que tu représentes',
        text: 'Tu es mon inspiration, ma force, mon bonheur...'
      }
    ]
  };
```

### Exemple 3 : Une lettre d'amour

```javascript
case 'ma-lettre':
  return {
    title: 'Ma lettre pour toi',
    emoji: '💌',
    sections: [
      {
        subtitle: 'Mon amour,',
        text: 'En ce jour si spécial, je voulais te dire à quel point tu comptes pour moi...'
      },
      {
        subtitle: '',
        text: 'Chaque moment avec toi est un cadeau précieux. Tu es la lumière qui guide mes pas...'
      },
      {
        subtitle: '',
        text: 'Je t\'aime de tout mon cœur, aujourd\'hui et pour toujours.'
      },
      {
        subtitle: 'Avec tout mon amour,',
        text: 'Ton [Nom] 💝'
      }
    ]
  };
```

## Conseils de rédaction

### Pour "Qui est Enis"
- Décris sa personnalité
- Ses qualités uniques
- Ce qui la rend spéciale
- Ses passions, ses rêves

### Pour "Enis à travers moi"
- Comment tu la vois
- Ce qu'elle représente pour toi
- L'impact qu'elle a sur ta vie
- Tes sentiments les plus profonds

### Pour "Ma lettre pour toi"
- Une lettre personnelle et intime
- Tes émotions sincères
- Tes souhaits pour elle
- Tes promesses d'amour

## Astuces de style

### Utiliser des emojis dans le texte
```javascript
text: 'Tu es mon soleil ☀️, ma lune 🌙, mes étoiles ✨'
```

### Sauts de ligne
Pour créer des paragraphes, utilisez plusieurs sections :
```javascript
sections: [
  { subtitle: '', text: 'Premier paragraphe...' },
  { subtitle: '', text: 'Deuxième paragraphe...' }
]
```

### Texte poétique
```javascript
{
  subtitle: '',
  text: 'Comme une fleur qui s\'épanouit au printemps, ton sourire illumine mes journées les plus sombres...'
}
```

## Modification en temps réel

Une fois que vous avez modifié le contenu :
1. Sauvegardez le fichier
2. Le navigateur se rafraîchira automatiquement (grâce à Vite)
3. Testez la navigation vers chaque page

## Navigation

- **Cliquer sur un bouton** → Ouvre la page correspondante
- **Bouton "Retour"** → Revient à la scène finale de l'animation
- **Bouton "Relancer l'animation"** → Redémarre l'animation depuis le début

## Exemple complet

Voici un exemple complet de contenu pour les 3 pages :

```javascript
const [content] = useState(() => {
  switch(pageType) {
    case 'qui-est-enis':
      return {
        title: 'Qui est Enis',
        emoji: '✨',
        sections: [
          {
            subtitle: 'Une Âme Unique',
            text: 'Enis, c\'est comme une mélodie douce qui résonne dans mon cœur. Une personne exceptionnelle dont la beauté intérieure rivalise avec celle de son sourire.'
          },
          {
            subtitle: 'Ses Qualités',
            text: 'Sa gentillesse, son intelligence, sa sensibilité... Chaque trait de sa personnalité me fascine et m\'inspire chaque jour.'
          },
          {
            subtitle: 'Mon Ange',
            text: 'Elle est mon ange gardien, celle qui illumine mes jours et adoucit mes nuits. Enis, c\'est l\'amour incarné. 💖'
          }
        ]
      };
    
    case 'enis-a-travers-moi':
      return {
        title: 'Enis à travers moi',
        emoji: '💖',
        sections: [
          {
            subtitle: 'Dans mes yeux',
            text: 'Quand je te regarde, je vois la plus belle des créations. Tes yeux brillent comme des étoiles, ton sourire réchauffe mon âme.'
          },
          {
            subtitle: 'Dans mon cœur',
            text: 'Tu occupes chaque battement de mon cœur. Tu es la raison pour laquelle je me lève chaque matin avec le sourire.'
          },
          {
            subtitle: 'Dans ma vie',
            text: 'Tu as transformé mon existence. Avant toi, je vivais. Avec toi, je ressens vraiment la vie dans toute sa splendeur.'
          }
        ]
      };
    
    case 'ma-lettre':
      return {
        title: 'Ma lettre pour toi',
        emoji: '💌',
        sections: [
          {
            subtitle: 'Mon Ange Enis,',
            text: 'Aujourd\'hui est un jour spécial, ton jour. Je voulais profiter de cette occasion pour te dire à quel point tu es importante pour moi.'
          },
          {
            subtitle: '',
            text: 'Depuis que tu es entrée dans ma vie, tout a changé. Tu as apporté de la lumière là où il y avait de l\'ombre, de la joie là où il y avait de la tristesse.'
          },
          {
            subtitle: '',
            text: 'Chaque instant passé avec toi est un trésor que je chéris. Ton rire est ma mélodie préférée, ton sourire mon soleil quotidien.'
          },
          {
            subtitle: '',
            text: 'Je te promets d\'être là pour toi, de te soutenir, de te faire rire, et de t\'aimer chaque jour un peu plus que la veille.'
          },
          {
            subtitle: '',
            text: 'Joyeux anniversaire mon amour. Que cette année t\'apporte tout le bonheur que tu mérites. 🎂✨'
          },
          {
            subtitle: 'Avec tout mon amour,',
            text: 'Ton [Ton prénom] qui t\'aime infiniment 💝'
          }
        ]
      };
    
    default:
      return {
        title: 'Page',
        emoji: '💝',
        sections: []
      };
  }
});
```

## Support

Si vous avez besoin d'aide ou souhaitez des modifications de style :
1. Les styles sont dans `src/components/ContentPage.css`
2. Les animations et couleurs peuvent être ajustées
3. N'hésitez pas à expérimenter !

---

**Bonne rédaction ! 💖✨**

