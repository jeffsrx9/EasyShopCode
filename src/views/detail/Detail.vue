<template>
  <div class="detailgoods mx-auto">
    <header id="roll1_top"></header>
    <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>商品詳情{{ id }}</template>
    </Navbar>

    <van-image
      style="margin-top: 50px"
      width="100%"
      lazy-load
      :src="detail.cover_url"
    />
    <van-card
      style="text-align: left"
      :num="detail.stock"
      :price="detail.price"
      :desc="detail.description"
      :title="detail.title"
      currency="$"
    >
      <template #tags>
        <van-tag plain type="primary">新品</van-tag>
        <van-tag plain type="success">推薦</van-tag>
      </template>
      <template #footer>
        <van-button type="warning" @click="handleAddCart"
          >加入購物車</van-button
        >
        <van-button type="danger" @click="goToCart">立即購買</van-button>
      </template>
    </van-card>
    <van-tabs v-model:active="active">
      <van-tab title="描述">
        <div class="content" v-html="detail.details"></div
      ></van-tab>
      <van-tab title="熱門評論"></van-tab>
      <van-tab title="相關商品" class="like_goods">
        <goods-list :goods="like_goods"></goods-list>
      </van-tab>
    </van-tabs>
    <back-top v-show="isTabFixed"></back-top>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import BackTop from "../../components/common/backtop/BackTop.vue";
import GoodsList from "@/components/content/tabControl/goods/GoodsList.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { getDetail } from "@/../public/network/detail";
import { addCart } from "@/../public/network/cart";
import { Toast } from "vant";
export default {
  name: "Detail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    let id = ref(0);
    let commodity = reactive({
      detail: {},
      like_goods: [],
    });
    const active = ref(2);
    onMounted(() => {
      id.value = route.query.id;
      getDetail(id.value).then((res) => {
        commodity.detail = res.goods;
        commodity.like_goods = res.like_goods;
      });
    });
    //添加購物車
    const handleAddCart = () => {
      addCart({ goods_id: commodity.detail.id, num: 1 }).then((res) => {
        if (res.status == "401") return Toast.fail("本商品已加入購物車");
        if (res.status == "402") return Toast.fail("出現錯誤,請稍後嘗試");
        if (!window.localStorage.getItem("token"))
          return Toast.fail("等先登錄");
        if (res.status == "201" || res.status == "204") {
          Toast.success("新增成功");
          store.dispatch("updateCart");
        }
      });
    };

    //立即購買
    const goToCart = () => {
      addCart({ goods_id: commodity.detail.id, num: 1 }).then((res) => {
        if (res.status == "401") return Toast.fail("本商品已加入購物車");
        else if (res.status == "402") return Toast.fail("出現錯誤,請稍後嘗試");
        else if (!window.localStorage.getItem("token"))
          return Toast.fail("等先登錄");
        else if (res.status == "201" || res.status == "204") {
          Toast.success("新增成功,顯示購物車");
          store.dispatch("updateCart");
          router.push({ path: "/shopcart" });
        }
      });
    };
    const goBack = () => {
      router.go(-1);
    };

    return {
      id,
      ...toRefs(commodity),
      handleAddCart,
      goToCart,
      goBack,
      active,
    };
  },
  components: {
    Navbar,
    GoodsList,
    BackTop,
  },
};
</script>
<style lang="scss">
.detailgoods {
  max-width: 800px;
}
.content {
  padding: 10px;
}
.van-image {
  margin: 0 auto;
  object-fit: contain;
  .van-image__img {
    margin: auto;
    max-width: 220px;
    height: auto;
  }
}
.van-card__content {
  font-size: 18px;
  position: relative;
  .van-card__title {
    line-height: 50px;
    max-height: 100px;
  }
  .van-card__desc {
    line-height: 50px;
    max-height: 100px;
  }
  .van-tag {
    font-size: 18px;
    padding: 5px;
  }
  .van-card__bottom {
    .van-card__price {
      transform: translateY(100%);
      span {
        font-size: 24px;
        color: red;
      }
    }
    .van-card__num {
      position: absolute;
      top: 10px;
      right: 0;
      &::before {
        content: "庫存";
      }
    }
  }
}
.left {
  z-index: 1000;
  position: absolute;
  top: 0;
}
</style>