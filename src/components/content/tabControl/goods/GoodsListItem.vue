<template>
  <div class="goods-item col-6 col-md-4 col-xl-3 mt-2" @click="itemClick">
    <img v-lazy="product.cover_url" alt="" />
    <div class="goods-info">
      <p>{{ product.title }}</p>
      <span class="price"><small>$</small>{{ product.price }}</span>
      <span class="collect"
        ><i class="far fa-star"></i>{{ product.collects_count }}</span
      >
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from "vue-router";
export default {
  name: "GoodsListItem",
  components: {},
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    return {
      itemClick: () => {
        router.push({ path: "/detail", query: { id: props.product.id } });
      },
    };
  },
};
</script>
<style lang="scss" >

.goods-item {
  width: 45%;
  padding-bottom: 40px;
  padding-top: 10px;
  position: relative;
  margin:10px 0 20px;
  &:last-child{
      margin-right: auto;
  }
  img {
    width: 80%;
    height: auto;
    border-radius: 5px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    margin-top: 10px;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price {
      color: red;
      margin-right: 20px;
    }
    .collect {
      position: relative;
    }
  }
}
@media (min-width: 768px) {
  .goods-item {
    width: 45%;
    padding-bottom: 40px;
    position: relative;
    img {
      width: 80%;
      height: auto;
      border-radius: 5px;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .goods-info {
      position: absolute;

      overflow: hidden;
      text-align: center;
      p {
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
        margin-top: 10px;
      }
      .price {
        color: red;
        font-size: 16px;
        margin-right: 20px;
      }
      .collect {
        position: relative;
      }
    }
  }
}
</style>