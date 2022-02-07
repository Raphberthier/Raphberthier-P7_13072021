<template>
  <div class="container">
    <navBar />
    <div class="container pb-cmnt-container">
      <h1>Bienvenue sur ton espace {{ user.firstName }} {{ user.lastName }}</h1>
      
      <div class="row">
        <hr class="line-color">
        <div class="col-md-9 col-md-offset-3">
          <div class="panel panel-info">
            <div class="panel-body">
              <div class="form-group green-border-focus">
                <label for="title">Sujet</label><br />
                <input type="text" v-model="title" class="form-control" placeholder="Ecrire un sujet..." /><br />
                <label for="postMsg">Exprimez vous</label>
                <textarea v-model="content" class="form-control" id="postMgs" rows="3" placeholder="Exprimez vous..." ></textarea>
                <div class="mgs">{{ message }}</div>
              </div>
              
              <button class="btn btn-primary pull-right" type="text" @click="postMessage()">Partager</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  <hr class="line-color">
    <div class="card row-8 p-3 border-blue mt-3">
      <div id="card">
        <Post v-for="post in posts" v-bind:key="post.id" :post="post" @deletePostEvent="deletePost" />
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import Post from "../components/Post.vue";
import axios from "axios";

export default {
  name: "Perso",
  components: {
    navBar,
    Post,
  },
  data() {
    return {
      user: [],
      posts: [],
      users: [],
      content: "",
      post: [],
      comment: [],
      createdAt: "",
      title: "",
      message: "",
      firstName:"",
    };
  },
  created() {
    const userId = sessionStorage.getItem("user");
    axios
      .get("http://localhost:3000/api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3000/api/auth/posts/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.posts = response.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    postMessage() {
      if (this.content == "" || this.title == "") {
        this.message = "Veuillez écrire un sujet et un message";
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/posts/post",
            { content: this.content, title: this.title, userId: sessionStorage.getItem("user")},
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.content = "";
            this.title = "";
            const userId = sessionStorage.getItem("user");
            axios
              .get("http://localhost:3000/api/auth/posts/" + userId, {
                headers: {
                  Authorization: "Bearer " + sessionStorage.token,
                },
              })
              .then((response) => {
                console.log(response);
                this.posts = response.data;
                this.message = "";
              })
              .catch((err) => console.log(err));
          });
      }
    },
    
    deletePost(item) {
      axios
        .delete("http://localhost:3000/api/auth/posts/" + item.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.posts = this.posts.filter((post) => post.id != item.id);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style scoped>
#app {
  background-color: #d1d1eb;
}
</style>

<style scoped>
body {
  background-color: rgb(218, 214, 210);
}
.container {
  font-family: "Comic Sans MS";
}
h1 {
  font-family:Arial, Helvetica, sans-serif;
  color: black;
}
.line-color{
height: 3px;
}
.card {
  margin-top:10px;
  border: 1px solid rgb(70, 68, 68);
  box-shadow: 2px 3px 3px rgb(70, 68, 68);
  background-color: rgb(218, 212, 212);
}
.form {
  margin-top: 30px;
}
.form-control {
  border-radius: 20px;
}
.form-group {
  margin-top: 30px;
}
label {
  font-family: "Comic Sans MS", cursive;
  color: rgb(48, 48, 172);
}
.row {
  margin-bottom: 50px;
  margin-top: 50px;
  background-color: rgb(216, 212, 206);
}
.btn {
  margin: 10px;
  padding: 10px;
  
}
.mgs {
  color: red;
}
</style>
