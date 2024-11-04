# Gestion de projet

Une application de gestion de projets utilisant React, Node.js et PostgreSQL.

## Table des matières
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [API](#api)
- [Autres Installation](#Autres Installation)
- [Licence](#licence)

## Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :
- [Node.js](https://nodejs.org/fr)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-nom-utilisateur/nom-du-depot.git
    ```

2. Accédez au dossier du projet :
    ```bash
    cd nom-du-depot
    ```

3. Installez les dépendances pour le frontend :
    ```bash
    cd my-project-app
    npm install
    ```

4. Installez les dépendances pour le backend :
    ```bash
    cd /server
    npm install
    ```

## Configuration

1. **Configuration de la base de données :**
   - Créez une base de données PostgreSQL pour l'application.
   - Ajoutez un fichier `.env`  dans le dossier `server` avec les variables suivantes :
     ```env
     DATABASE_URL=postgres://username:password@localhost:5432/your-database
     PORT=5000
     ```
    - Ou utiliser directement le fichier db.ts en changeant les données de connexion à la base par les votres
**Installer TypeScript**
- Assurez-vous d'avoir TypeScript installé dans votre projet. Si ce n'est pas déjà fait, vous pouvez l'installer en utilisant npm :
    ```bash
    npm install -D typescript
    ```
    ```bash
    npx tsc --init
    ```

**tsc** est l'outil de compilation de TypeScript, qui est utilisé pour convertir les fichiers TypeScript en JavaScript.
**--init** demande à tsc de créer un fichier tsconfig.json dans le répertoire courant. Ce fichier est utilisé pour centraliser les options de compilation TypeScript du projet.

2. **Lancer la base de données :**
   - Pour la création des tables referez_vous au fichier database.sql.
   - Lancer la commande 
  

## Utilisation

1. Pour démarrer le serveur backend, accédez au dossier `server` et exécutez :
     ```bash
    tsc server.tsc
    ```

    ```bash
    node server.js
    ```

2. Pour démarrer le client React, accédez au dossier `my-project-app` et exécutez :
    ```bash
    npm start
    ```

3. Accédez à l'application dans votre navigateur à l'adresse `http://localhost:3000`.

## API

### Endpoints principaux
- `GET /projects` - Récupère la liste des projets.
- `POST /project` - Ajoute un nouveau projet.
- `DELETE /project/:id` - Supprime un projet par ID.
- `PUT /project/:id` - Met à jour un projet par ID.
- `GET /categories` - Récupère la liste des catégories.
- `POST /categories` - Ajoute une nouvelle catégorie.

## Autres installations

1. npm install react-toastify (pour les popup)   
2. npm install bcryptjs (pour le hashages des mots de pass)   
3. npm install cors   (pour permettre les requêtes entre le front-end et le back-end)
4. npm install pg (pour interagir avec PostgreSQL)
5. npm install jsonwebtoken (pour générer des tokens d'authentification)
6. npm install bootstrap   

