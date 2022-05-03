<template >
  <router-view :key="$route.fullPath" />
  <div class="">
    <nav class="nav">
      <router-link to="/" class="tab-bar-item"
        ><div class=""><i class="fas fa-home"></i></div>
        <div class="">首頁</div></router-link
      >
      <router-link to="/category" class="tab-bar-item"
        ><div class=""><i class="fas fa-solid fa-bars"></i></div>
        <div class="">分類</div></router-link
      >
      <router-link to="/shopcart"  class="tab-bar-item"
        ><div>
          <van-badge class="shopcart" :content="$store.state.cartCount" max="9"
            ><i class="fas fa-shopping-cart"></i>
          </van-badge>
        </div>
        <div class="">購物車</div></router-link
      >
      <router-link :to="user" class="tab-bar-item"
        ><div class=""><i class="fas fa-solid fa-user"></i></div>
        <div class="">我的</div></router-link
      >
    </nav>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    
  const user = ref(window.localStorage.getItem('super') ? '/surperuser':'/profile')
    onMounted(() => {
      store.dispatch("updateCart");
    });
   
    return {
      user,
    };
  },
};
</script>

<style lang="scss">
@import "assets/css/base.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@media (max-width: 992px) {
  .nav {
    z-index: 99;
    position: fixed;
    display: flex;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #f6f6f6;
    a {
      color: var(--color-text);
      &.router-link-exact-active {
        color: var(--color-hight-text);
      }
    }

    .tab-bar-item {
      flex: 1;
      text-align: center;
      height: 50px;
      font-size: var(--font-size);
      i {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        line-height: 24px;
      }
      .shopcart {
        .van-badge--top-right {
          top: 10px;
        }
      }
    }
  }
}

@media (min-width: 993px) {
  .nav {
    z-index: 1000;
    position: fixed;
    display: flex;
    right: 0;
    top: 0;
    width: 500px;
    background-color: #f6f6f6;

    a {
      color: var(--color-text);

      &.router-link-exact-active {
        color: var(--color-hight-text);
      }
    }

    .tab-bar-item {
      flex: 1;
      text-align: center;
      height: 50px;
      font-size: var(--font-size);
      i {
        width: 24px;
        height: 24px;
        margin-top: 3px;
        line-height: 24px;
      }
      .shopcart {
        .van-badge--top-right {
          top: 10px;
        }
      }
    }
  }
}
</style>
