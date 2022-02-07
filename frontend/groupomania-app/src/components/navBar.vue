<template>
<nav class="row-12  navbar navbar-expand-lg navbar mx-3 ">
            <div class="navbar-brand"><img src="../assets/icon-left-font-monochrome-black.png" alt="titre"></div>
            
            <div class="collapse navbar-collapse d-flex" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link to="/perso" class="nav-link">Ma page </router-link>
                </li>
                 <li class="nav-item">
                    <router-link to="/wall" class="nav-link">Mur</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/profil" class="nav-link">Profil</router-link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" @click="logout()">Déconnection <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
</svg></a>
                </li>
              </ul> 
            </div>
          </nav> 
       
</template>


 

<script>
export default {
        name: 'navBar',
        methods:{
            logout(){
                sessionStorage.clear();
                this.$router.push('/')
            }
        }    
}
</script>


<style scoped> 
.navbar-brand img{
        width: 150px;
        height: 50px;
        object-fit: cover;
        margin-left: 0em;
    }
.nav-item{
    font-size: large;
    font-weight: bolder;
    cursor: pointer;
     -webkit-transform: scale(1);
	transform: scale(1);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
.nav-item:hover{
  -webkit-transform: scale(1.2);
	transform: scale(1.2);
}
.nav-link{
  font-family: 'Comic Sans MS', cursive;
  color: black;
}
.navbar{
    width: 100%;
    margin-bottom: 40px;
    justify-content: center;
}
</style>