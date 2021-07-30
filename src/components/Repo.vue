<template>
  <section>
    <slot name="name"></slot>
    <div style="color: gray; font-size: x-small">
      <em>
        <slot name="description"></slot>
      </em>
    </div>

    <div class="info">
      <div>
        <slot name="language"></slot>
      </div>
      <div class="counts">
        <div title="Forks">
          <slot name="forks"></slot>
        </div>
        <div title="Stars">
          <slot name="stars"></slot>
        </div>
      </div>
    </div>
  </section>
</template>

<script></script>

<style scoped>
section {
  box-shadow: 1px 1px 4px silver;
  border-radius: 5px;
  margin: 1em 0;
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info,
.counts {
  display: flex;
  gap: 10px;
  font-size: 0.8em;
  justify-content: space-between;
  padding: 2px 1em;
}

.material-icons {
  font-size: 1em;
}
</style>
