<template>
  <div class="address-edit-box">
    <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>{{ title }}</template>
    </Navbar>
    <form class="m-3 p-5 col-md-6 mx-auto" @submit.prevent="onSave">
      <div class="mb-3 text-start">
        <label for="name" class="form-label">姓名:</label>
        <input type="text" class="form-control" id="name" v-model="name" />
      </div>
      <div class="mb-3 text-start">
        <label for="phone" class="form-label">電話:</label>
        <input type="text" class="form-control" id="phone" v-model="phone" />
      </div>
      <div
        class="mb-3 text-start"
        v-show="$route.query.type == 'edit' ? true : false"
      >
        <label for="currentaddress" class="form-label">當前地址:</label>
        <input
          type="text"
          readonly
          class="form-control-plaintext"
          id="currentaddress"
          v-model="currentaddress"
        />
      </div>
      <div class="mb-3 form-check form-switch text-start" v-show="is_changes">
        <label class="form-check-label me-5" for="flexSwitchCheckDefault"
          >變更地址</label
        >
        <input
          class="form-check-input ms-5"
          type="checkbox"
          id="flexSwitchCheckDefault"
          v-model="is_change"
          @click="is_change = !is_change"
        />
      </div>
      <div class="text-start" v-show="is_change">
        <select
          id="city"
          placeholder="請選擇縣市"
          @change="getcity"
          v-model="city"
        ></select>
        <select
          id="dist"
          placeholder="請選擇鄉鎮區"
          @change="getdist"
          v-model="dist"
        ></select>
        <input
          class="js-demeter-tw-zipcode-selector d-none"
          data-city="#city"
          data-dist="#dist"
          placeholder="請輸入郵遞區號"
        />
      </div>
      <div class="mb-3 text-start" v-show="is_change">
        <label for="addressinfo" class="form-label">詳細地址:</label>
        <input
          type="text"
          class="form-control"
          id="addressinfo"
          v-model="addressinfo"
        />
      </div>
      <div class="form-check form-switch mb-5 text-start">
        <label class="form-check-label me-5" for="flexSwitchCheckDefault"
          >默認地址</label
        >
        <input
          class="form-check-input ms-5"
          type="checkbox"
          id="flexSwitchCheckDefault"
          v-model="is_default"
        />
      </div>
      <button type="submit" class="btn btn-success">儲存</button>
      <button type="button" @click="onDelete" class="btn btn-danger">刪除</button>
    </form>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import {
  deleteAddress,
  getAddressDetail,
  addAddress,
  editAddress,
} from "@/../public/network/address";
import { toRefs, reactive, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Toast } from "vant";
export default {
  name: "AddressEdit",
  components: {
    Navbar,
  },
  setup() {
    const getcity = () => {
      return $("#city").val();
    };
    const getdist = () => {
      return $("#dist").val();
    };
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      // arealist: {
      //   province_list: {},
      //   city_list: {},
      //   county_list: {},
      // },
      searchResult: [],
      addressInfo: {},
      type: "add",
      addressId: "",
      title: "",
    });
    const content = reactive({
      name: "",
      phone: "",
      city: state.addressInfo.city,
      dist: getdist(),
      addressinfo: "",
      is_default: true,
      is_change: true,
      is_changes: false,
      currentaddress: "",
    });

    onMounted(() => {
      // //接收參數
      const { type, addressId } = route.query;
      state.type = type;
      state.addressId = addressId;
      if (type == "edit") {
        content.is_changes = true;
        content.is_change = false;
        getAddressDetail(addressId).then((res) => {
          const addressDetail = res;
          console.log(res);

          state.addressInfo = {
            name: addressDetail.name,
            phone: addressDetail.phone,
            city: addressDetail.city,
            dist: addressDetail.dist,
            addressinfo: addressDetail.addressinfo,
            isDefault: !!addressDetail.is_default,
          };

          content.name = addressDetail.name;
          content.phone = addressDetail.phone;
          content.city = addressDetail.city;
          content.dist = addressDetail.dist;
          content.addressinfo = addressDetail.addressinfo;
          content.is_default = addressDetail.is_default == 0 ? false : true;
          content.currentaddress = `${content.city}-${content.dist}-${content.addressinfo}`;
        });
      }
    });
      const goBack = ()=>{
          router.go(-1);
      }
    const title = computed(() => {
      return state.type == "add" ? "新增地址" : "編輯地址";
    });

    const onSave = () => {
      const params = {
        name: content.name,
        phone: content.phone,
        city: content.city,
        dist: content.dist,
        addressinfo: content.addressinfo,
        is_default: content.is_default ? 1 : 0,
      };
      if (state.type == "edit") {
        //修改數據
        if (content.is_change == false) {
          params.city = state.addressInfo.city;
          params.dist = state.addressInfo.dist;
          console.log(params);
          editAddress(state.addressId, params).then((res) => {
            if (res.status == 400) {
              Toast.fail("編輯失敗");
            } else if (res.status == 204) {
              Toast.success("編輯成功");
              router.push({ path: "/address" });
            }
          });
        } else {
          console.log(params);
          editAddress(state.addressId, params).then((res) => {
            if (res.status == 400) {
              Toast.fail("編輯失敗");
            } else if (res.status == 204) {
              Toast.success("編輯成功");
              router.push({ path: "/address" });
            }
          });
        }
      } else if (state.type == "add") {
        addAddress(params).then((res) => {
          if (res.status == 400) {
            return Toast.fail("新增失敗");
          } else if (res.status == 204) {
            //調用接口添加數據

            Toast("保存成功");
            setTimeout(() => {
              router.back();
            }, 1000);
          }
        });
      }
    };
    const onDelete = () => {
      deleteAddress(state.addressId).then((res) => {
        if(res.status == 204){
          Toast("刪除成功");
          setTimeout(() => {
            router.back();
          }, 1000);
        }else {
          return Toast.fail('刪除失敗')
        }
      });
    };

  
    return {
      ...toRefs(state),
      ...toRefs(content),
      onSave,
      onDelete,
      title,
      getcity,
      getdist,
      goBack,
     };
  },
};
</script>
<style lang="scss">
.my-style-selector select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-color: #6ec3f5;
  border-width: 2px;
  border-radius: 10em;
  color: #1390e8;
  margin-right: 10px;
  outline: none;
  padding: 0.3em 1.25em;
}
.left {
  z-index: 1000;
  position:absolute;
  top: 0;
}
.edit {
  .van-field__body {
    textarea {
      height: 24px !important;
    }
  }
}
.address-edit-box {
  margin-top: 44px;
}
</style>