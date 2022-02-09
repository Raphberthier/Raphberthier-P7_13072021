<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8 d-flex justify-content-center">
        <img src="../assets/icon-left-font-monochrome-black.png" class="w-40 img-fluide" alt="titre" />
      </div>
    </div>

    <fieldset>
      <div class="d-flex flex-column justify-content-center">
        <div class="connect">
          <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
          <h1 class="card__title" v-else>Inscription</h1>
          <br />
        </div>
        <br />

        <p class="card__subtitle" v-if="mode == 'login'">
          Tu n'as pas encore de compte ?
          <span class="card__action" @click="switchToCreateAccount()"> Créer un compte</span>
        </p>
        <p class="card__subtitle" v-else>
          Tu as déjà un compte ?
          <span class="card__action" @click="switchToLogin()"> Se connecter</span>
        </p>
        <div class="mgs">{{ message }}</div>
        <div class="mgs">{{ errorMessage }}</div>
      </div>

      <div class="row-8 d-flex align-items-center flex-column">
        <div class="form-floating justify-content-center">
          <input v-model="firstName" type="text" class="form-control" v-if="mode == 'create'" id="floatingName" placeholder="Nom" />
          <label for="floatingName">Nom</label>
        </div>

        <div class="form-floating justify-content-center">
          <input v-model="lastName" type="text" class="form-control" v-if="mode == 'create'" id="floatingLastname" placeholder="Prénom" />
          <label for="floatingPassword">Prénom</label>
        </div>

        <div class="form-floating mb-3 justify-content-center">
          <input v-model="email" type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">Adresse Mail</label>
        </div>
        <div class="form-floating justify-content-center">
          <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Mot de passe</label>
        </div>

        <button type="submit" class="btn btn-primary w-auto justify-content-center" @click.prevent="userLogin()" v-if="mode == 'login'">Se connecter</button>
        <button type="submit" class="btn btn-primary w-auto justify-content-center" @click.prevent="userRegister()" v-else>Inscription</button>
      </div>
    </fieldset>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "signin",
  data: function () {
    return {
      mode: "login",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      message: "",
      errorMessage: "",
    };
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    userLogin() {
      if (this.email == "" || this.password == "") {
        alert("Veuillez entrer votre email et votre mot de passe pour vous connecter");
      } else {
        axios //post des informations
          .post("http://localhost:3000/api/users/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            let responseUser = response.data.userId;
            let responseAdmin = response.data.admin;
            sessionStorage.setItem("admin", JSON.stringify(responseAdmin));
            let responseToken = response.data.token;
            sessionStorage.setItem("user", JSON.stringify(responseUser)); //push de l'id dans la sessionStorage
            sessionStorage.setItem("token", responseToken);
            console.log(this.$router);
            this.$router.push("perso"); // redirection du client sur page perso
          })
          .catch((status) => {
            let errorMessage = JSON.stringify((status.response.data.error));
            {
              this.message = errorMessage;
            }
          });
      }
    },

    userRegister() {
      if (this.firstName == "" || this.password == "" || this.email == "" || this.lastName == "") {
        alert("Veuillez remplir tous les champs");
      } else {
        axios
          .post("http://localhost:3000/api/users/signup", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            let responseAdmin = response.data.admin;
            sessionStorage.setItem("admin", JSON.stringify(responseAdmin));
            let responseUser = response.data.userId;
            let responseToken = response.data.token;
            sessionStorage.setItem("user", JSON.stringify(responseUser)); //push de l'id dans la sessionStorage
            sessionStorage.setItem("token", responseToken);
            this.$router.push("perso");
          })
          .catch((status) => {
            let message = JSON.stringify((status.response.data.error));
            {
              this.errorMessage = message;
            }
          });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  background-color: none !important  ;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-bottom: 15px;
}
h1 {
  font-size: larger;
  margin-top: 10px;
  
}
.form-floating {
  width: 300px;
}
.btn {
  margin-top: 10px;
}
img {
  width: 300px;
}
.connect {
  display: flex;
  justify-content: center;
}
.card__subtitle {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
}
fieldset {
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  background-color: #e9e9e9;
  box-shadow: 2px 5px 5px rgb(34, 33, 33);
}
.form-control {
  margin-top: 10px;
}
.mgs {
  display: flex;
  justify-content: center;
  color: red;
}
</style>
