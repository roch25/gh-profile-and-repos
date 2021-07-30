<template>
  <section>
    <slot name="name"></slot>

    <div style="color: gray; font-size: x-small">
      <em>
        <slot name="description"></slot>
      </em>
    </div>

    <div class="lang">
      <i
        v-if="language"
        class="material-icons"
        :style="`color: ${colors[language]}; font-size: 1em`"
      >
        circle
      </i>
      {{ language }}
    </div>
  </section>
</template>

<script>
import { colors } from "../assets/colors";
export default {
  props: {
    language: {
      type: String,
    },
  },
  data() {
    return {
      colors,
    };
  },
};
</script>

<style scoped>
section {
  box-shadow: 1px 1px 2px silver;
  border-radius: 5px;
  margin: 0.5em 0;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.lang {
  display: flex;
  gap: 4px;
  font-size: 0.8em;
}

</style>
