<template>
  <li class="product-card">
    <router-link class="card-link" :to="{ name: 'product-item', params: { id: props.id } }">
      <img :src="useGlobalStore().url + props.img" alt="Картинка товара" />
      <div class="product-card__content">
        <h2>
          <strong>{{ props.type + ' ' + props.brand }}</strong>
        </h2>

        <p class="product-card__description">...</p>
      </div>
      <div class="price-and-count">
        <p class="price">{{ props.price }}₽</p>
        <p class="count">В наличии: <br />{{ props.count }}</p>
      </div>
      <div class="button-by">Редактировать</div>
    </router-link>
  </li>
</template>

<script lang="js" setup>
import { useShoppingCard } from '@/stores/shoppingCard'
import { useGlobalStore } from '@/stores/globalStore'
const storeShopping = useShoppingCard()

const props = defineProps({
  img: { type: String.fromCharCode, default: '/top.jpg' },
  brand: String,
  price: Number,
  count: Number,
  descr: String,
  type: String,
  id: Number
})
</script>

<style scoped>
h2 {
  font-size: 20px;
}
.product-card {
  background-color: var(--on-body);
  border-radius: 8px;
  padding-bottom: 20px;
  height: 500px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.177);
  transition: filter 0.3s ease-in;
  img {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  &:hover {
    filter: brightness(1.4);
  }
}
.product-card__content {
  padding: 15px;
  color: black;
  align-items: center;
}
h2 {
  text-align: center;
  margin-bottom: 10px;
}
.product-card__description {
  max-height: 145px;
  overflow: hidden;
}
.price-and-count {
  padding: 20px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .count {
    text-align: center;
    flex: 1 1 35%;
  }
  .price {
    flex: 1 1 65%;
    font-size: 20px;
    font-weight: bold;
  }
}

.card-link {
  transition: all 0.5s ease-in-out;
}
</style>
