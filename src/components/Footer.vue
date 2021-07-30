<template>
  <footer class="footer">
      <a href="http://github.com">
        <img src="/icons8-github.svg" alt="github logo" />
      </a>
    
      <ul class="columns">
        <li class="column">
          <a href="https://docs.github.com/en/rest/reference"
            >GitHub Rest API references</a
          >
        </li>
        <li class="column">
          <a
            href="https://api.github.com/users/yyx990803/repos?per_page=5&page=1"
            >Example API response</a
          >
        </li>
      </ul>
    <span>
      Made with ❤️
      <a href="http://github.com/roch25"><strong>Rochelle Martins</strong></a>
    </span>
  </footer>
</template>

<style scoped>
footer {
  padding: 3rem 1em;
  display: grid;
  place-items: center;
  color: silver;
  background: #333;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  width: 100%;
}

li {
  padding: 2px 10px;
}

a:hover {
  color: #eee;
}

span {
  padding-top: 30px;
  border-top: 1px solid silver;
}

@media (max-width: 600px) {
  ul {
    flex-direction: column;
    align-items: center;
  }
}
</style>
