<template>
  <div class="shopcart mx-auto">
    <Navbar>
      <template #default
        >購物車(<span style="color: red">{{ $store.state.cartCount }}</span
        >)</template
      >
    </Navbar>

    <div class="cart-box">
      <div class="cart-body">
        <van-checkbox-group
          ref="checkboxGroup"
          @change="groupChange"
          v-model="result"
        >
          <van-swipe-cell
            :right-width="50"
            v-for="(item, index) in list"
            :key="index"
          >
            <div class="goods-item ">
              <van-checkbox :name="item.id" />
              <div class="good-img">
                <img :src="item.cover_url" alt="" />
              </div>
              <div class="good-desc">
                <div class="good-title">
                  <span>{{ item.title }}</span>
                  <span></span>
                </div>
                <div class="good-btn">
                  <div class="price">
                    <small>$</small>{{ item.price }}
                  </div>
                  <van-stepper
                    v-model="value"
                    integer
                    class="goods-step"
                    :min="1"
                    :max="item.stock"
                    :model-value="item.count"
                    :name="item.id"
                    @change="onChange"
                    async-change
                  ></van-stepper>
                </div>
              </div>
            </div>
            <template #right>
              <van-button
                square
                text=""
                type="danger"
                class="delete-button"
                @click="deleteGood(item.id)"
                ><i class="fas fa-trash"></i
              ></van-button>
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <van-submit-bar
        class="Allprice"
        :price="total*100 "
        button-text="結算"
        currency="$"
        @submit="onSubmit" 
      >
        <van-checkbox v-model:checked="checkAll" @click="allCheck" class="All"
          >全選</van-checkbox
        >
      </van-submit-bar>


      <!-- 購物車為空 -->
      <div class="empty" v-if="!list.length">
        <img
          class="empty-cart"
          src="~assets/images/empty-cart.png"
          alt="空購物車"
        />
        <div class="title">購物車空空如也~~</div>
        <van-button round color="#1baeae" type="primary" block @click="goTo"
          >前往選購</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import {reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import {
  getCart,
  checkedCart,
  modifyCart,
  deleteCartItem,
} from "@/../public/network/cart";
export default {
  name: "ShopCart",
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    //數據模型,狀態
    const state = reactive({
      list: [],
      result: [], //id數組
      checkAll: true,
    });

    //初始化購物車數據
    const init = () => {
      Toast.loading({ message: "載入中...", forbidClick: true });
      getCart().then((res) => {
        state.list = res.data;
          //把選中的購物車列表取出ID
        state.result = res.data.filter((n) => n.is_checked == 1).map((item) => item.id);
        Toast.clear();
     
      });

    };
    onMounted(() => {
      init();
    });
    //異布改變購物車數量
    const onChange = (value, detail) => {
      Toast.loading({ message: "修改中...", forbidClick: true });

      modifyCart(detail.name, { num: value }).then((res) => {
        //在onMounted中的list中的num也要改
        state.list.forEach((item) => {
          if (item.id == detail.name) {
            item.count = value;
          }
        });
        Toast.clear();
      }); 
    };
    //選擇框改變事件
    const groupChange = (result) => {
      if (result.length == state.list.length) {
         state.checkAll = true;
      } else {
        state.checkAll = false;
      }   
      state.result = result;
      //改變數據表中選中狀態
      checkedCart({ cart_ids: result }).then((res)=>{
      });
    };
    //全選按鈕
    const allCheck = () => {
      if (!state.checkAll) {
        state.result = state.list.map((item) => item.id);
        state.checkAll = true;
      } else {
        state.result = [];
        state.checkAll = false;
      }
    };
    //刪除商品
    const deleteGood = (id) => {
      deleteCartItem(id).then((res) => {
        init(); //重新初始化
        store.dispatch("updateCart"); //改變vuex中的狀態數量
      });
    };

    //通過計算屬性  計算總價格
    const total = computed(() => {
      let sum = 0;
      state.list
        .filter((item) => state.result.includes(item.id))
        .forEach((item) => {
          sum +=parseInt(item.count)  *parseFloat(item.price) ;
        });
        return sum;
    });

//創建訂單
const onSubmit = ()=>{
  if(state.result.length ==0){
    Toast.fail('請選擇商品進行結算')
    return;
  }else{
    router.push({path:'/createorder'})
  }
}


    //前往購物
    const goTo = () => {
      router.push({ path: "/home" });
    };

    return {
      ...toRefs(state),
      goTo,
      onChange,
      groupChange,
      allCheck,
      deleteGood,
      total,
      onSubmit
    };
  },
};
</script>
<style lang="scss" >
@media(min-width:993px){
  .shopcart{
    max-width: 800px;
  }
.cart-box{

    .delete-button{
    height: 50px;
    margin: 10px 0;
  }
}
  .Allprice {
    margin:0 auto 60px;
  width: 100%;
    .van-submit-bar__bar{
      background-color: rgb(231, 227, 227);
      max-width: 800px;
      margin: 0 auto;
      border-radius: 80px;
      transform: translateX(30px);
    }
  }

.van-swipe-cell__right{
     transform: translate(0%);
}
}
.cart-box {
  margin-top: 50px;
  padding: 5px;
    height: 100%;
  margin-bottom: 100px;
  .delete-button {
    height: 100px;
    text-align: left;
  }
  .goods-item {
    transform: translateX(5%);
    width: 100%;
    display: flex;
    .good-img {
      width: 100px;
    }
    .good-desc {
      padding: 5px 15px;
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: space-between;
        .price {
          color: red;
        }
      }
    }
  }
  .Allprice {
    margin:0 auto 60px;
  
  }
  .empty {
    width: 100%;
    padding: 50px;
    margin-top: 100px; 
    img {
      max-width: 100px;
    }
    .title {
      padding: 20px 0;
    }
  }
}
</style>