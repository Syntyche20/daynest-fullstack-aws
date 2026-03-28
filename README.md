#  Daynest  — Dashboard de Productivité Minimaliste

**Daynest** est une application Fullstack conçue pour offrir un environnement de travail numérique serein et structuré. L'accent a été mis sur une expérience utilisateur (UX) apaisante et une architecture Cloud robuste.

##  Philosophie du Design (UX/UI)
L'interface adopte les codes de la **"Calm Technology"** pour réduire la fatigue cognitive :
* **Identité Visuelle :** Palette chromatique "Cosy Nude" inspirée des tendances minimalistes, favorisant la concentration.
* **Composants :** Utilisation du *Glassmorphism* pour une profondeur visuelle subtile et élégante.
* **Mascotte Interactive :** Intégration d'un élément visuel bienveillant pour humaniser l'interface et accompagner l'utilisateur dans sa routine de productivité.

##  Stack Technique
* **Frontend :** React.js (Vite) & Nginx (Serveur Web & Reverse Proxy).
* **Backend :** API REST Python Flask.
* **Base de Données :** PostgreSQL (Amazon RDS) & SQLite (Développement).
* **Conteneurisation :** Docker & Docker Compose pour la portabilité.
* **Infrastructure Cloud :** Déploiement Serverless sur **Amazon ECS (Fargate)** via **Amazon ECR**.

##  Déploiement et Architecture Réseau
L'application est orchestrée sur AWS avec une attention particulière portée à la sécurité et à l'isolation des composants :
* **Reverse Proxy :** Nginx redirige les flux `/api` vers le conteneur Flask, masquant ainsi la complexité du backend.
* **Sécurité :** Configuration granulaire des *Security Groups* (Ports 80, 5000, 5432) pour restreindre les accès.
* **Scalabilité :** Utilisation de Fargate pour une gestion élastique des ressources sans maintenance de serveurs.

## 📦 Installation et Test Local
1.  Cloner le repository : 
    ```bash
    git clone [https://github.com/VOTRE_NOM/daynest.git](https://github.com/VOTRE_NOM/daynest.git)
    ```
2.  Lancer l'environnement via Docker Compose : 
    ```bash
    docker-compose up --build
    ```
3.  Accéder à l'interface sur : `http://localhost`

