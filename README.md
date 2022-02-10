<h1>Groupomania</h1>
<hr/>
<p>Groupomania Social Network: projet frontend et backend.</p>

<h2>CONDITIONS PRÉALABLES</h2>

<p>Ce projet utilise NodeJs, Express et MySQL pour le backend, 
et @ vue / cli  pour le frontend. Vous devrez avoir Node, MySQL et Vue CLI installés localement sur votre machine.</p>

<h2>DANS LE DOSSIER FRONTEND</h2>
<p>Ouvrez un premier terminal et faites:
npm install
puis une fois l'installation terminée:
npm run serve
Vous aurez un message similaire à celui-ci :

App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.1.109:8080/</p>
  
  <h2>DANS LE DOSSIER BACKEND</h2>
<p>Ouvrez le fichier " .env.example " : vous devez assigner des valeurs aux variables suivantes:
  <br>
  <br>
SQL_DATABASE_NAME= Nom de la dataBase
  <br>
  <br>
SQL_USER =  Nom de l'utilisateur
  <br>
  <br>
SQL_PASSWORD = Mot de passe pour la dataBase
  <br>
  <br>
JWT_KEY = Clef de securiter pour le token (variable de votre choix).
<br>
<br>
PORT = (3000)
<br>
<br>
DB_DIALECT = (mysql)
<br>
<br>
DB_HOST= 
  
  <br>
  <br>
Renommer ce dossier " .env " à la place de " .env.initial ".
Ouvrez un troisième terminal (assurez vous de bien être dans le dossier backend)

Puis faites:

npm install
puis une fois l'installation terminée:
node server ou nodemon </p>
