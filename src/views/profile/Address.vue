<template>
  <div class="address-box col-12 col-lg-4 mx-auto">
    <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>地址管理</template>
    </Navbar>

    <div class="" v-show="list.length == 0" style="margin-top: 300px">
      還沒有地址訊息,去添加吧!
    </div>
    <div class="address-item">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :tel-validator="validator"
        :disabled-list="disabledList"
        default-tag-text="默認"
        @add="onAdd"
        @edit="onEdit"
      />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import { getAddressList } from "@/../public/network/address";
import { toRefs, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "Address",
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      chosenAddressId: "1",
      list: [],
    });
    onMounted(() => {
      getAddressList().then((res) => {
        if (res.data.length == 0) {
          state.list = []; //初始化
          return;
        }

        state.list = res.data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            tel: item.phone,
            address: `${item.city}-${item.dist}-${item.addressinfo}`,
            isDefault: !!item.is_default,
          };
        });
      });
    });
    //電話格式驗證
    const validator = (e) => {
      let myreg1 = /^09[0-9]{8}$/; //手機
      let myreg2 = /^0[1-9]{1}[0-9]{7}$/; //市話
      if (!myreg1.test(e) && !myreg2.test(e)) {
        return false;
      } else {
        return true;
      }
    };

    const onAdd = () => {
      router.push({ path: "/addressedit", query: { type: "add" } });
      setTimeout(() => {
        router.go(0);
      }, 500);
    };
    const onEdit = (item) => {
      router.push({
        path: "/addressedit",
        query: { type: "edit", addressId: item.id },
      });
      setTimeout(() => {
        router.go(0);
      }, 500);
    };
    const goBack = () => {
      router.push({ path: "/profile" });
    };
    return {
      ...toRefs(state),
      onAdd,
      onEdit,
      validator,
      goBack,
    };
  },
};
</script>
<style lang="scss">
.left {
  z-index: 1000;
  position: fixed;
  top: 0;
}
.address-box {
  margin-top: 45px;
  height: 300px;
  .van-radio__icon {
    display: none;
  }
  .address-item {
    margin-top: 45px;
    .van-button {
      background: var(--color-tint);
      border-color: var(--color-tint);
    }
  }
}
.van-address-list__bottom {
  bottom: 100px !important;
  button {
    max-width: 300px;
    margin: 0 auto;
  }
}
</style>