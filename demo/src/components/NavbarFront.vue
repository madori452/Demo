<template>
    <nav class="navbar-front">
        <router-link class="text-white" to="/">Login</router-link>
        <router-link class="text-white" to="/dashboard/map">Map</router-link>
    </nav>
</template>
<style>
.navbar-front{
    padding: 10px;
    background-color: #00406c;
}

nav a{
    text-decoration: none;
    font-size: 18px;
}
nav a:nth-of-type(2){
    padding-left: 10px;
}
nav a.router-link-exact-active{
    color: rgb(0 247 255)  !important;
}
</style>
