<template>
  <div id="app">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/leaderboard">Leaderboard</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  nav {
    position: fixed;   
    top: 0;
    left: 0;
    width: 100%;  

    display: flex;
    align-items: center;
    gap: 1.5rem;

    padding: 1rem 2rem;
    background: #111111;

    box-sizing: border-box;
    z-index: 1000; 
  }

  nav a {
    color: #e0e0e0;
    text-decoration: none;
    font-size: 1rem;
  }

  nav a:hover {
    color: white;
  }

  nav a.router-link-active {
    color: #f5c518;
    font-weight: bold;
  }

  body {
    margin: 0;
    padding-top: 64px;
  }
</style>

