<template>
  <div class="create-order">
    <Navbar>
      <template #default>訂單預覽</template>
    </Navbar>
    <div class="address-wrap col-12 col-lg-6 mx-auto">
      <div class="name" @click="goTo">
        <span>{{ address.name }}</span>
        <span>{{ address.phone }}</span>
        <span v-show="address">{{ address.address }}</span>
      </div>
      <div class="address">
       {{ address.city }} {{ address.dist }}
        {{ address.addressinfo }}
      </div>
      <i class="fas fa-chevron-right"></i>
    </div>
    <div class="good  col-12 col-lg-6 mx-auto mb-5">
      <div class="good-item" v-for="(item, index) in cartList" :key="index">
        <div class="good-img">
          <img v-lazy="item.cover_url" alt="" />
        </div>
        <div class="good-desc">
          <div class="good-title">
            <span>{{ item.title }}</span>
            <span>{{ item.count }}</span>
          </div>
          <div class="good-btn">
            <div class="price"><small>$</small>{{ item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <van-submit-bar
    class="submit-all  col-12 col-lg-6 mx-auto"
    :price="total * 100"
    button-text="生成訂單"
    @submit="handleCreateOrder"
    currency="$"

  >
    商品金額
  </van-submit-bar>
  <van-popup
    closeable
    :close-on-click-overlay="false"
    v-model:show="showPay"
    position="bottom"
    :style="{ height: '30%' }"
    @close="close"
  >
    <div
      class=""
      :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }"
    >
      <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block
        >paypal支付</van-button
      >
      <van-button color="#4fc08d" block>信用卡支付</van-button>
    </div>
  </van-popup>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import {
  getOrderPreview,
  createOrder,
} from "@/../public/network/order";
import { reactive, toRefs, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import { useStore } from "vuex";
export default {
  name: "CreateOrder",
  components: { Navbar },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      cartList: [],
      address: {},
      showPay:false,
      orderNo:'',//訂單id
    });
    const init = () => {
      Toast.loading({ message: "加載中...", forbidClick: true });
      getOrderPreview().then((res) => {
        let address = res.address;
        if (!address) {
          state.address = {
            address: "還沒有設置默認地址,請選擇或填寫地址訊息",
          };
        } else {
          state.address = res.address;
        }
        state.cartList = res.carts;
        Toast.clear();
      });
    };
    onMounted(() => {
      init();
    });

    const goTo = () => {
      router.push({ path: "/address" });
    };
    const handleCreateOrder = () => {
        const params = {
            address_id:state.address.id,
        }
        createOrder(params).then(res=>{
          if(res.status == 204){
            Toast('創建訂單成功,支付功能開發中');
             init();
            store.dispatch('updateCart');
          }
        })
    };

    
    const total = computed(() => {
      let sum = 0;
      state.cartList.forEach((item) => {
        sum += parseInt(item.count) * parseFloat(item.price);
      });
      return sum;
    });

    return {
      ...toRefs(state),
      goTo,
      handleCreateOrder,
      total,
    };
  },
};
</script>
<style lang="scss" scoped>
.address-wrap {
  position: relative;
  margin-top: 45px;
  margin-bottom: 45px;
  background-color: #ddd;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
  .name {
    margin: 10px 0;
  }

  i {
    position: absolute;
    right: 10px;
    top: 30px;
  }
}

.good {
  .good-item {
    display: flex;
    height: 150px;
    width: 100%;
    justify-content: center;
    .good-img {
      width: 100px;
      height: auto;
    }
    .good-desc {
      margin-top: 20px;
      padding: 0 20px;
      width: 70%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      .good-title {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        font-size: 22px;
        margin-bottom: 30px;
      }
      .good-btn {
        color: red;
        text-align: left;
      }
    }
  }
}
.submit-all {
  margin-bottom: 50px;
}
.van-submit-bar{
  right: 0;
}
</style>