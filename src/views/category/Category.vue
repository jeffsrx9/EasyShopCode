<template>
  <div class="detail">
    <div  @click="bTop">
    <NavBar>
      <template #default >商品分類</template>
    </NavBar>
    </div>
    <div id="mainbox" class="col-lg-10 mx-auto">
      <van-sidebar class="leftmenu col-none col-md-block" v-model="activekey">
        <van-collapse v-model="activeName" accordion>
          <van-collapse-item
            v-for="item in categories"
            :key="item.id"
            :title="item.name"
            :name="item.name"
          >
            <van-sidebar-item
              v-for="sub in item.children"
              :key="sub.id"
              :title="sub.name"
              @click="getGoods(sub.id)"
            />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
      <div class="showup d-none d-sm-block" >
        <van-cell is-link @click="showPopup"
          ><i class="fas fa-list"></i
        ></van-cell>
        <van-popup
          v-model:show="show"
          position="right"
          :style="{ height: '100%', width: '50%' }"
        >
          <van-sidebar class="manage-cid" v-model="activekey">
            <van-collapse v-model="activeName" accordion>
              <van-collapse-item
                v-for="item in categories"
                :key="item.id"
                :title="item.name"
                :name="item.name"
              >
                <van-sidebar-item
                  v-for="sub in item.children"
                  :key="sub.id"
                  :title="sub.name"
                  @click="getGoods(sub.id)"
                />
              </van-collapse-item>
            </van-collapse>
          </van-sidebar>
        </van-popup>
      </div>
      <div class="ordertab"  id="roll1_top">
        <van-tabs v-model:active="active" @click="tabClick" >
          <van-tab title="銷量排序"></van-tab>
          <van-tab title="價格排序"></van-tab>
          <van-tab title="評價排序"></van-tab>
        </van-tabs>
      </div>

      <div class="goodslist"  >
        <div class="content"  >
          <van-card
            class="card col-12 col-md-6 col-lg-12"
            v-for="item in showGoods"
            :key="item.id"
            :num="item.comments_count"
            :tag="item.comments_count >= 20 ? '熱銷' : '新品'"
            :price="item.price"
            :desc="item.updated_at"
            :title="item.title"
            :thumb="item.cover_url"
            :lazy-load="true"
            currency="$"
            @click="itemClick(item.id)"
          />
        </div>
      </div>
    </div>
    <div class="d-none d-lg-block" @click="bTop">
      <back-top @bTop="bTop" v-show="isTabFixed"></back-top>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/Navbar.vue";
import { ref, reactive, onMounted, computed, watchEffect, nextTick } from "vue";
import { getCategory, getCategoryGoods } from "@/../public/network/category.js";
import BScroll from "better-scroll"; //頁面往下刷新
import BackTop from "components/common/backtop/BackTop.vue"; //回到頂部按鈕
import { useRouter } from "vue-router";
export default {
  name: "Category",
  setup() {
    const router = useRouter();
    let banref = ref(null);
    let active = ref(0);
    let activekey = ref(0);
    let activeName = ref(180);
    let categories = ref([]);
    const show = ref(false);
    const option1 = ref([]);
    const value1 = ref(179);
    const value2 = ref(180);
   const showPopup = () => {
      show.value = true;
    };
    //當前的排序條件
    let currentOrder = ref("sales");
    //當前的分類id
    let currentCid = ref(180);
    let isTabFixed = ref(false);
    //數據模型
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });

    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    });

    //從接口獲取的數據放到數據模型裡面
    const init = () => {
      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.data;
      });
      getCategoryGoods("price", currentCid.value).then((res) => {
        goods.price.list = res.data;
      });
      getCategoryGoods("comments_count", currentCid.value).then((res) => {
        goods.comments_count.list = res.data;
      });
    };

    let bscroll = reactive({});
   

    onMounted(() => {
      getCategory().then((res) => {
        categories.value = res.categories;

      });

      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.data;
      });

      // 創建BetterScroll對象
      bscroll = new BScroll(document.querySelector(".goodslist"), {
        probeType: 3, //0,1,2,3  3只要在運動就觸發scroll事件
        click: true, //是否允許點擊
        pullUpLoad: true, //往上拉加載更多 默認:false
      });

      // 上拉加載數據,觸發pullingUp
      bscroll.on("pullingUp", () => {
        const page = goods[currentOrder.value].page + 1; //默認為第一頁

        getCategoryGoods(currentOrder.value, currentCid.value, page).then(
          (res) => {
            goods[currentOrder.value].list.push(...res.data);
            goods[currentOrder.value].page += 1;
          }
        );
        // 完成上拉,等數據請求完成,要將新數據展示出來
        bscroll.finishPullUp();
        // 重新計算高度
        bscroll.refresh();
      });
    });

    //排序選項卡
    const tabClick = (index) => {
      let orders = ["sales", "price", "comments_count"];
      currentOrder.value = orders[index];

      getCategoryGoods(currentOrder.value, currentCid.value).then((res) => {
        goods[currentOrder.value].list = res.data;
      });
         nextTick(() => {
        // 重新計算高度
        bscroll && bscroll.refresh();
      });
    }; 
  
    //通過分類get商品
    const getGoods = (Cid) => {
      currentCid.value = Cid;
      init();
    };

    // 監聽任何一個變量有變化
    watchEffect(() => {
      nextTick(() => {
        // // 重新計算高度
        bscroll && bscroll.refresh();
      });
    });

    const bTop = () => {
      bscroll.scrollTo(0, 0, 300);
    };

    return {
      active,
      activekey,
      categories,
      activeName,
      tabClick,
      currentOrder,
      currentCid,
      getGoods,
      goods,
      show,
      showGoods,
      showPopup,
      banref,
      bscroll,
      isTabFixed,
      bTop,
      value1,
      value2,
      option1,
      itemClick: (id) => {
        router.push({ path: "/detail", query: { id } });
      },
    };
  },
  components: {
    NavBar,
    BackTop,
  },
};
</script>

<style lang="scss" >
@media (max-width: 484px) {
  #mainbox {
    margin-top: 45px;
    display: flex;
    .ordertab {
      z-index: 999;
      flex: 1;
      float: right;
      position: fixed;
      top: 45px;
      right: 0;
      left: 120px;
      height: 50px;
    }
    .leftmenu {
      width: 130px;
      position: fixed;
      top: 95px;
      left: 0;
    }
    .goodslist {
      position: absolute;
      top: 50px;
      left: 120px;
      right: 0;
      flex: 1;
      height: 80vh;
      width: 240px;
    }
    .van-card__content {
      font-size: 12px;
      display: flex;
      justify-content: center;
      .van-card__title {
        transform: translateY(-100%);
        line-height: 12px;
      }
      .van-card__bottom {
        position: relative;

        text-align: left;
        .van-card__price {
          color: red;
          span {
            font-size: 12px;
          }
        }
        .van-card__num {
          height: 20px;
          position: absolute;
          transform: translateY(60%);

          &::before {
            content: "存貨";
          }
        }
      }
    }
  }
}
@media (min-width: 485px) and(max-width:1023px) {
  #mainbox {
    .showup {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 999;
      background-color: var(--color-tint);
      height: 45px;
      width: 48px;
      font-size: 36px;
      line-height: 45px;
      .manage-cid {
        width: 100%;
      }
    }
  
    .leftmenu {
      display: none;
    }
    .van-dropdown-menu {
      margin-top: 50px;
    }
    .ordertab {
      margin-top: 50px;
      background-color: #fff;
      .van-tabs__line {
        z-index: 0;
      }
    }
    .goodslist {
      height: 80vh;
    }
    .content {
      display: flex;
      flex-wrap: wrap;

      .van-card {
        &:first-child{
          transform: translateY(2%);
          height: 355px;
        }
        padding: 10px;
        max-height: 500px;
        .van-card__header {
          display: flex;
          flex-direction: column;
          .van-card__thumb {
            margin: 0 auto;
            height: auto;
            width: 100%;
            .van-image {
              height: auto;
              img {
                width: 100%;
              }
            }
          }
          .van-card__content {
            text-align: left;
            font-size: 24px;
            margin-top: 20px;
            .van-card__title {
              line-height: 24px;
            }
            .van-card__bottom {
              .van-card__price {
                color: red;
                transform: translateY(10%);
                span {
                  font-size: 24px;
                }
              }
              .van-card__num {
                &::before {
                  content: "存貨";
                }
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 1024px) {
  .leftmenu {
    width: 130px;
    position: absolute;
    top: 90px;
    left: 0;
  }
  .ordertab {
    padding-top: 50px;
    margin: 0px auto 10px;
    max-width: 800px;
  }
  .goodslist{
    height: 0;
  }
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;
    .van-card {
      .van-card__header {
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .van-card__thumb {
          height: auto;
          width: 200px;
          .van-image {
            height: auto;
            img {
              width: 100%;
            }
          }
        }
        .van-card__content {
          font-size: 24px;
          display: flex;

          .van-card__title {
            transform: translateY(-100%);
            line-height: 24px;
          }
          .van-card__bottom {
            .van-card__price {
              color: red;
              span {
                font-size: 24px;
              }
            }
            .van-card__num {
              &::before {
                content: "存貨";
              }
            }
          }
        }
      }
    }
  }
}
@media (min-width: 1600px) {
  .leftmenu {
    width: 130px;
    position: absolute;
    top: 90px;
    left: 100px;
  }

}
</style>