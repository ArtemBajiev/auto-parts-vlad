<template>
  <button class="button-by">
    В корзину <Icon class="w-5 h-5" :name="'ph:shopping-cart-light'"></Icon>
  </button>
</template>
<script>
export default {}
</script>
<style lang="scss">
.button-by {
  border-radius: 25px;
  background-color: var(--secondary);
  border: 0px;
  width: 100%;
  color: white;
  min-height: 40px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--primary);
  }
}
</style>
