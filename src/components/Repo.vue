<template>
  <section class="box">
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


</style>
