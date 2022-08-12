<template>
  <div id="navbar-root">
    <div id="navbar-background">
      <div id="header-center-title">Zomby7e's Blog</div>
      <div id="header-center-links">
        <router-link to="/" class="header-center-link">主页</router-link>
        <router-link to="/about" class="header-center-link">关于</router-link>
        <a href="https://www.fsf.org/" class="header-center-link">了解自由软件</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
#navbar-root {
  top: 0;
  left: 0;
  right: 0;
}

#navbar-background {
  padding: 0 80px;
  background-color: #21D4FD;
  background-image: linear-gradient(248deg, #21D4FD 0%, #B721FF 100%);
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-around;
}

#header-center {
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: space-around;
}

#header-center-title {
  font-size: 1.5rem;
  color: white;
  text-align: left;
}

#header-center-links {
  display: flex;
}

.header-center-link {
  margin-right: 8px;
}

a:link, a:visited{
  color: white;
  text-decoration: none;
}

a:hover {
  color: white;
  text-decoration: underline;
}

a:active {
  text-shadow: 5px 5px 5px #21D4FD;
}
</style>
