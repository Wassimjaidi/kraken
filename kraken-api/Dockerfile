# Étape 1 : Utiliser une image Node.js comme base
FROM node:18

WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste du code source
COPY . .

# Exposer le port sur lequel tourne le backend
EXPOSE 3000

# Démarrer le serveur
CMD ["npm", "start"]
