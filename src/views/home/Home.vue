<template>
  <div id="home" class="mx-auto col-12 col-md-10" >
    <div class="" @click="bTop">
    <Navbar>
      <template #default >首頁</template>
    </Navbar>
    </div>

    <!-- banner -->
    <div class="wrapper mx-auto col-12 col-md-10">
    <header id="roll1_top"></header>
      <div class="content mt-md-1 mx-auto">
        <div class="rw" ref="banref">
          <home-swiper :banners="banners"></home-swiper>
          <recommend-view :recommends="recommends"></recommend-view>
        </div>
        <tab-control
          class="d-md-none"
          @tabClick="tabClick"
          :titles="['熱門', '新品', '精選']"
        ></tab-control>
        <div class="all" >
          <div class="box container mx-autp p-2 d-md-block d-none">
            <div class="title p-2">
              <h2>熱門</h2>
              <p><a href="#">更多</a></p>
            </div>
            <div class="item d-md-block d-none">
              <goods-list :goods="showGoods"></goods-list>
            </div>
          </div>
          <div class="box container p-2 d-md-block d-none">
            <div class="title p-2">
              <h2>新品</h2>
              <p><a href="#">更多</a></p>
            </div>
            <div class="item d-md-block d-none">
              <goods-list :goods="goods.new.list"></goods-list>
            </div>
          </div>
          <div class="box container p-2 mb-5 d-md-block d-none">
            <div class="title p-2">
              <h2>精選</h2>
              <p><a href="#">更多</a></p>
            </div>
            <div class="item d-md-block d-none">
              <goods-list :goods="goods.recommend.list"></goods-list>
            </div>
          </div>
        </div>
        <div class=" allgoods d-md-none">
          <goods-list class="" :goods="showGoods"></goods-list>
          <div class="bottom"></div>
        </div>
      </div>
  <div class="">
    <back-top v-show="isTabFixed"></back-top>
  </div>
    </div>
  </div>
</template>

<script>
import HomeSwiper from "./ChildComps/HomeSwiper.vue"; //首頁幻燈片
import Navbar from "@/components/common/navbar/Navbar.vue";
import BackTop from "../../components/common/backtop/BackTop.vue"; //回到頂部按鈕
import TabControl from "@/components/content/tabControl/TabControl.vue";
import RecommendView from "./ChildComps/RecommendView.vue";
import GoodsList from "@/components/content/tabControl/goods/GoodsList.vue";

import {
  getHomeAllData,
  getHomeGoods,
  getSwiper
} from "@/../public/network/home";
import { onMounted, ref, reactive, computed, watchEffect, nextTick } from "vue";
import BScroll from "better-scroll"; //頁面往下自動刷新
import { Toast } from 'vant';

export default {
  name: "Home",
  setup() {
    let isTabFixed = ref(false);
    let banref = ref(null);
    let banners = ref([]);
    const recommends = ref([]);

    // 商品列表數據模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      new: { page: 1, list: [] },
      recommend: { page: 1, list: [] },
    });
    let currentType = ref("sales");
    const showGoods = computed(() => {
      return goods[currentType.value].list;
    });
    let bscroll = reactive({});

    onMounted(() => {
      getHomeAllData().then((res) => {
          recommends.value = res.data;
      });
      getSwiper().then((res) => {
        banners.value = res.data;
      });
      getHomeGoods("sales").then((res) => {
        goods.sales.list = res.data.slice(0, 8);
      });
      getHomeGoods("recommend").then((res) => {
        goods.recommend.list = res.data.slice(0, 8);
      });
      getHomeGoods("new").then((res) => {
        goods.new.list = res.data.slice(0, 8);
      });
      // 創建BetterScroll對象
      bscroll = new BScroll(document.querySelector(".allgoods"), {
        probeType: 3, //0,1,2,3  3只要在運動就觸發scroll事件
        click: true, //是否允許點擊
        pullUpLoad: true, //往上拉加仔更多 默認:false
      });
      // 觸發滾動事件
      bscroll.on("scroll", (position) => {
        isTabFixed.value = -position.y > banref.value.offsetHeight;
      });
      // 上拉加載數據,觸發pullingUp
      bscroll.on("pullingUp", () => {
        const page = goods[currentType.value].page + 1;
        getHomeGoods(currentType.value, page).then((res) => {
          goods[currentType.value].list.push(...res.data);
          goods[currentType.value].page += 1;
        });
        // 完成上拉,等數據請求完成,要將新數據展示出來
        bscroll.finishPullUp();
        // 重新計算高度
        bscroll.refresh();
      });
    });

    const tabClick = (index) => {
      let types = ["sales", "new", "recommend"];
      currentType.value = types[index];
      nextTick(() => {
        // 重新計算高度
        bscroll && bscroll.refresh();
      });
    };

    // 監聽任何一個變量有變化
    watchEffect(() => {
      nextTick(() => {
        // 重新計算高度
        bscroll && bscroll.refresh();
      });
    });

    const bTop = () => {
      bscroll.scrollTo(0, 0, 500);
    };

    return {
      recommends,
      tabClick,
      goods,
      showGoods,
      isTabFixed,
      banref,
      bTop,
      banners,
    };
  },
  components: {
    Navbar,
    RecommendView,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
  },
};
</script>
<style lang="scss"  scoped>
@media(max-width:484px){
  
  .wrapper{
    height: 0;
    .content{
      height: 0;
    .allgoods{
      height: 100%;
      .goods{
        height: 100%;
      }
    }
    }
  }
}
@media (min-width:485px)and(max-width: 991px) {
  #home {
    height: 0;
    position: relative;
  }
}

.wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  height: 0;
  .content{
    height: 0;
  }
}


@media (min-width: 992px) {
    #home {
    height:0;
    position: relative;

  }
  .wrapper {
  position: absolute;
  top: 45px;
  bottom: 50px;
  height: 100%;
  .content{
    .all{   
      height: 100%;}
  }
}
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    .rw {
      padding-top: 600px;
      width: 800px;
      margin: 0 auto;
      .my-swipe {
        .van-swipe__track {
          height: 100%;
          .van-swipe-item {
            width: 800px !important;
            img {
              height: 100%;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
.rw {
  margin: 0 auto;
  width: 100%;
  .my-swipe {
    margin: auto;

    .van-swipe__track {
      width: 100%;
      .van-swipe-item {
        max-width: 800px;
      }
    }
  }
  .recommend {
    margin: auto;
    .recommend-item {
      font-size: 18px;
      margin: auto;
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
.box {
  overflow: hidden;
  margin-bottom: 80px;
  .title {
    height: 60px;
    display: flex;
    justify-content: space-between;
    color: rgb(43, 189, 133);

    p {
      margin: auto 0;
      border: 1px solid rgb(43, 189, 133);
      padding: 5px 10px;
      border-radius: 30px;
    }
    a {
      color: rgb(43, 189, 133);

      &:hover {
        text-decoration: none;
      }
    }
  }
  .goods {
   padding-bottom: 100px;
    .goods-item {
      height: 300px;
      padding-bottom: 0;

      img {
        padding-top: 50px;
        width: 80%;
        height: 70%;
      }
    }
    .goods-info {
      p {
        font-size: 20px;
      }
      .price {
        font-size: 18px;
      }
    }
  }
}
</style>