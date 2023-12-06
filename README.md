# Projet de recherche d'adresse avec authentification

Ce projet permet de rechercher des adresses en fonction de différents critères tels que le code postal, la ville, le DPE, le GES, la surface maximale et minimale, et la surface exacte. Il comprend également un système d'authentification.

## Installation

1. Clonez le dépôt : `git clone https://github.com/username/project.git`
2. Installez les dépendances : `npm install`



## Utilisation

### Authentification

Pour vous inscrire, envoyez une requête POST à `/register` avec un corps de requête contenant `email`, `password`, `nom`, et `prenom`.

Pour vous connecter, envoyez une requête POST à `/login` avec un corps de requête contenant `email` et `password`. Vous recevrez un token d'accès en réponse.

### Recherche d'adresse

Pour rechercher une adresse, envoyez une requête POST à `/getAdresse` avec un corps de requête contenant les critères de recherche (`codepostal`, `ville`, `Dpe`, `Ges`, `surface_Max`, `surface_Min`, `surface_exacte`).

Pour obtenir la longitude et la latitude d'une adresse, envoyez une requête POST à `/getLongLat` avec les mêmes critères de recherche.

## Débogage

Si vous rencontrez des erreurs de type `Cannot read properties of undefined`, assurez-vous que les arguments que vous passez à `getAdresse` et `getLongLat` sont définis. Si vous obtenez `undefined` en retour de `getAdresse` ou `getLongLat`, assurez-vous que la fonction `getLongLat` renvoie un tableau.

S
## Routes
les routes pour utiliser l'api sont
   /api/v1/ouquc/login
   /api/v1/ouquc/register
   /api/v1/ouquc/adresse
   /api/v1/ouquc/longlat
   /api/v1/ouquc/listRecherche
    /api/v1/ouquc/deleteRecherche
    /api/v1/ouquc/relancerRecherche

pour lancer le serveur j'utilise  nodemon run dev