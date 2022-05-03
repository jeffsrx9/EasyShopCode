<template>
  <div class="shopcart mx-auto">
         <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>管理商品列表</template>
    </Navbar>
    <div class="showup">
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
        <van-sidebar class="card-category d-none d-lg-block" v-model="activekey">
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
    <div class="manage-goodslist">
      <ul class="" v-for="item in showGoods" :key="item.id">
        <li>
          <img :src="item.cover_url" alt="" />
          <div class="title">
            <p>{{ item.title }}</p>
            <div class="btn">
              <button class="btn btn-success" @click="itemClick(item.id)">
                編輯
              </button>
              <button class="btn btn-danger" @click="onDelete(item.id)">
                刪除
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import {  deleteCart } from "@/../public/network/surperuser";
import { getCategory, getCategoryGoods } from "@/../public/network/category";
export default {
  name: "goodslist",
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const show = ref(false);
    let active = ref(0);
    let activekey = ref(0);
    let activeName = ref(180);
    let categories = ref([]);
    let currentCid = ref(180);
    let currentOrder = ref("sales");
    //數據模型,狀態
    const state = reactive({
      list: [],
      result: [], //id數組
      checkAll: true,
    });
    const goods = reactive({
      sales: { page: 1, list: [] },
      price: { page: 1, list: [] },
      comments_count: { page: 1, list: [] },
    });
    const showPopup = () => {
      show.value = true;
    };

    const showGoods = computed(() => {
      return goods[currentOrder.value].list;
    });
    //初始化購物車數據
    const init = () => {
      Toast.loading({ message: "載入中...", forbidClick: true });
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
    onMounted(() => {
      init();
      getCategory().then((res) => {
        categories.value = res.categories;
      });
      getCategoryGoods("sales", currentCid.value).then((res) => {
        goods.sales.list = res.data;
      });
    });

    //排序選項卡
    const tabClick = (index) => {
      let orders = ["sales", "price", "comments_count"];
      currentOrder.value = orders[index];

      getCategoryGoods(currentOrder.value, currentCid.value).then((res) => {
        goods[currentOrder.value].list = res.data;
      });
    };

    //刪除商品
    const onDelete = (id) => {
      deleteCart(id).then((res) => {
        if (res.status == 401) {
          return Toast.fail("刪除失敗");
        } else if (res.status == 204) {
          Toast.success("刪除成功");
          init();
        }
      });
    };

    const getGoods = (Cid) => {
      currentCid.value = Cid;
      init();
    };
     const goBack = ()=>{
          router.go(-1);
      }
    return {
      ...toRefs(state),
      goBack,
      onDelete,
      show,
      showPopup,
      goods,
      showGoods,
      getGoods,
      categories,
      activeName,
      currentOrder,
      currentCid,
      tabClick,
      active,
      activekey,
      itemClick: (id) => {
        router.push({ path: `/editCart/${id}` });
      },
    };
  },
};
</script>
<style lang="scss" >
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
.manage-goodslist {
  margin-top: 60px;
  margin-bottom: 60px;
  ul {
    max-width: 800px;
    li {
      display: flex;
      justify-content: space-between;
      margin: 20px 10px;
      border-bottom: 2px solid #000;
      img {
        max-width: 100px;
        height: auto;
      }
      .tltle {
        p {
          margin: auto 0;
        }
      }
      .btn {
        margin: auto 0;
      }
      .van-overlay{
          background-color: rgb(162, 161, 161,0.3);
          }
        .showbox{
          display: flex;
          flex-direction: column;
          justify-content: center;
          p{color: #000;}
          width: 200px;
          height: 200px;
        }
      
    }
  }
}
@media (min-width:992px){
  nav .breadcrumb{
    transform: translateX(0%);
  }
  .card-category{
    position:absolute;
    width: 200px;
    left: 200px;
    
  }
}
</style>