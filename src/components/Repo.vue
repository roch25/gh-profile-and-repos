<template>
  <section>
    <h4>
      <slot name="name"></slot>
    </h4>

    <div>
      <slot name="url"> </slot>
    </div>

    <div>
      <slot name="description"></slot>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
section {
  box-shadow: 1px 2px 6px silver;
  border-radius: 5px;
  margin: 0.5em 0;
  padding: 1em 2vmin;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

</style>
