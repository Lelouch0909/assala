# 🚀 Guide de Démarrage Rapide

## Lancement du projet

```bash
npm run dev
```

Le serveur démarrera sur http://localhost:5173 (ou un autre port si celui-ci est occupé)

## 🔧 Mode Développement

Pour tester immédiatement la page d'anniversaire sans attendre le 21 novembre :

1. Ouvrir le fichier `src/App.jsx`
2. Ligne 9, changer :
   ```javascript
   const DEV_MODE = false;
   ```
   en :
   ```javascript
   const DEV_MODE = true;
   ```
3. Sauvegarder le fichier
4. Le site affichera directement la page d'anniversaire

## 📱 Test sur Mobile

### Option 1 : Simulateur du navigateur
1. Ouvrir les DevTools (F12)
2. Activer le mode responsive (Ctrl+Shift+M)
3. Sélectionner "iPhone 11" ou "iPhone XR" dans la liste

### Option 2 : Test sur vrai appareil
1. Obtenir votre adresse IP locale :
   ```bash
   ip addr | grep inet
   ```
2. Lancer le serveur avec :
   ```bash
   npm run dev -- --host
   ```
3. Sur votre mobile, accéder à : `http://VOTRE_IP:5173`

## 🎬 Structure de la Timeline

La page d'anniversaire comporte 8 scènes qui s'enchaînent automatiquement :

| Scène | Durée | Description |
|-------|-------|-------------|
| 1. Intro | 4s | "Joyeux Anniversaire" avec étoiles |
| 2. Message 1 | 5s | "Mon Ange" |
| 3. Fleurs 1 | 6s | Animation de fleurs |
| 4. Message 2 | 5s | "Pour Toi" |
| 5. Cœurs | 6s | Particules de cœur |
| 6. Message 3 | 5s | "Tu es Unique" |
| 7. Fleurs 2 | 8s | Fleurs avec texte |
| 8. Finale | ∞ | Scène finale permanente |

**Durée totale :** ~39 secondes avant la scène finale

## 🎨 Personnalisation

### Modifier les messages
Éditer `src/components/BirthdayPage.jsx` et changer le contenu dans les sections `case 'message1'`, `case 'message2'`, etc.

### Modifier les durées
Dans `src/components/BirthdayPage.jsx`, ligne 22-30, ajuster les valeurs `duration` (en millisecondes).

### Modifier les couleurs
Les fichiers CSS correspondants :
- `src/components/CountdownPage.css` - Page de compte à rebours
- `src/components/BirthdayPage.css` - Page d'anniversaire
- `src/components/HeartParticles.css` - Particules
- `src/components/FlowerAnimation.css` - Fleurs

## 📅 Date Cible

**Date actuelle configurée :** 21 Novembre 2025 à 00:00:00

Pour changer la date, modifier dans `src/App.jsx` et `src/components/CountdownPage.jsx` :
```javascript
const targetDate = new Date('2025-11-21T00:00:00').getTime();
```

## 🛠️ Commandes Utiles

```bash
# Installation des dépendances
npm install

# Développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

## 🎯 Checklist avant le déploiement

- [ ] Remettre `DEV_MODE = false` dans `src/App.jsx`
- [ ] Vérifier la date cible (21 novembre 2025)
- [ ] Tester sur mobile réel
- [ ] Vérifier que toutes les animations fonctionnent
- [ ] Tester le compte à rebours
- [ ] Build de production : `npm run build`

## 💝 Notes

- Le site est optimisé pour iPhone 11 (414x896)
- Fonctionne en mode portrait uniquement
- Nécessite une connexion internet pour les polices Google Fonts
- Les animations utilisent les Canvas API et CSS animations

---

**Créé avec amour pour Emeraude 💖**

