<template>
  <div class="search">
    <div class="searchBox">
      <input
        type="search"
        placeholder="Search user"
        v-model.trim="searchStr"
        @input="onChange"
      />

      <i class="material-icons">search</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let searchStr = "";
    return {
      searchStr,
    };
  },
  methods: {
    oninput() {
      // GET request
    },
  },
};
</script>

<style scoped>
.searchBox {
  width: 40%;
  position: relative;
}

input {
  padding: 10px 30px 10px 5px;
  border: 2px solid silver;
  border-radius: 6px;
  width: 100%;
  position: relative;
}

.search {
  display: grid;
  place-items: center;
  padding: 1em 3em;
}

i.material-icons {
  position: absolute;
  right: 5px;
  padding: 8px 0;
}

@media (max-width: 600px) {
  input {
    width: 100%;
  }

  .search {
    padding: 1rem;
  }
}
</style>
