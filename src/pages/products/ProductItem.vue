<template>
  <div class="container">
    <div class="product-item__links">
      <router-link class="product-item__link" to="/products">Каталог</router-link>/<span
        class="product-item__link"
        >{{ data?.type.name }}</span
      >
    </div>
    <h1>{{ data?.type.name + ' ' + data?.brand.name }}</h1>
    <div class="card-wraper">
      <div class="text-and-cart">
        <div class="specifications">
          <img width="350" :src="useGlobalStore().url + data?.image" alt="" />
          <div class="specifications-item">
            <p>Бренд:</p>
            <div class="line"></div>
            <p>{{ data?.brand.name }}</p>
          </div>
          <div class="specifications-item">
            <p>Модель:</p>
            <div class="line"></div>
            <p>{{ data?.design.name }}</p>
          </div>
          <div class="specifications-item">
            <p>Поколение:</p>
            <div class="line"></div>
            <p>{{ data?.generation.name }}</p>
          </div>
          <div class="specifications-item">
            <p>Модификаци:</p>
            <div class="line"></div>
            <p>{{ data?.modification.name }}</p>
          </div>
          <div class="description">
            <p>Описание:</p>
            <p>
              {{ data?.descr }}
            </p>
          </div>
        </div>

        <div class="in-cart">
          <div class="authorization" v-if="authStore.isAuth == false">
            <p><router-link to="/cart">Авторизуйтесь,</router-link>&nbsp;что бы сделать заказ</p>
            <div class="icon-right"></div>
          </div>
          <div class="add-cart">
            <p class="price">
              Цена: <strong>{{ data?.price }}₽</strong>
            </p>
            <p>Осталось на складе:&nbsp;{{ data?.count }}&nbsp; шт.</p>
            <ButtonBy @click="storeShopping.addCard(data.id)"></ButtonBy>
          </div>
          <div class="receive">
            <strong>Способы получения заказа</strong><br />Самовывоз из магазина по адресу
            Краснодар, Средняя ул., 32/13, микрорайон Сады Калинина, Краснодар
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import getProduct from '@/composition/getProduct'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import ButtonBy from '@/components/ui/ButtonBy.vue'
import { useAuthentication } from '@/stores/authentication'
import { useGlobalStore } from '@/stores/globalStore'
import { useShoppingCard } from '@/stores/shoppingCard'

const storeShopping = useShoppingCard()
const authStore = useAuthentication()
const route = useRoute()
const { getProductItem } = getProduct()
const data = ref()

getProductItem(route.params.id).then((res) => {
  data.value = res.data.detail
})
</script>

<style scoped>
.product-item__links {
  margin-top: 20px;
}
.product-item__link {
  color: gray;
  padding: 10px;
  cursor: pointer;
}
.line {
  border-bottom: 1px dashed gray;
  flex: 1 1 auto;
  margin-bottom: 1.3rem;
  margin-left: 4px;
  margin-right: 4px;
}
.authorization {
  background-color: rgb(227, 227, 227);
  height: 100px;
  border-radius: 12px;
  background-repeat: no-repeat;
  background-size: 70px;
  display: flex;
  padding: 10%;
  a {
    color: rgb(0, 106, 255);
    font-weight: bold;
  }
}
.icon-right {
  background-image: url('../../assets/img/login_mmyigzscke6s.svg');
  background-repeat: no-repeat;
  height: 100px;
  width: 90px;
  opacity: 0.7;
}
.specifications {
  width: 100%;
  padding-right: 2%;
  margin-top: 40px;
  img {
    margin-right: 20px;
  }
}
.specifications-item {
  border-bottom: 1px;
  display: flex;
  justify-content: space-between;
}
.text-and-cart {
  display: flex;
  justify-content: flex-end;
}
.add-cart {
  background-color: rgb(227, 227, 227);
  margin-top: 20px;
  padding: 10%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  .price {
    font-size: 1.3rem;
  }
}
.receive {
  background-color: rgb(227, 227, 227);
  margin-top: 20px;
  padding: 10%;
  border-radius: 12px;
}
.in-cart {
  width: 300px;
  margin-left: 40px;
}
.card-wraper {
  padding-top: 40px;

  .text {
    text-align: justify;
  }
  h1 {
    text-align: justify;
  }
  img {
    float: left;
  }
}
</style>
