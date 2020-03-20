<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
:root {
  --bean-brown: #2f2926;
  --bean-darkgreen: #0e927d;
  --bean-lightgreen: #58bf94;
  --bean-pink: #f3e4e1;
  --bean-orange: #e5674e;
  --bean-black: #2f2926;
}

body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Work Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'PT Serif', serif;
  font-weight: bold;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
