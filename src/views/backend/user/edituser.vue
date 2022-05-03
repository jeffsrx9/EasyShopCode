<template>
  <div>
    <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>編輯會員{{ id }}</template>
    </Navbar>

    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          style="margin-top: 100px"
          v-model="name"
          name="name"
          label="用戶名稱"
          placeholder="用戶名稱"
          :rules="[{ required: true, message: '請填寫用戶名稱' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密碼"
          placeholder="密碼"
          :rules="[{ required: true, message: '請填寫密碼' }]"
        />
        <van-field
          v-model="password_confirmation"
          type="password"
          name="password_confirmation"
          label="確認密碼"
          placeholder="確認密碼"
          :rules="[{ required: true, message: '請確認密碼' }]"
        />
        <van-field
          v-model="rickname"
          name="rickname"
          label="暱稱"
          placeholder="暱稱"
          :rules="[{ required: true, message: '請填寫暱稱' }]"
        />

        <van-field
          v-model="email"
          name="email"
          label="信箱"
          placeholder="a0123456789@gmail.com"
          :rules="[{ required: true, message: '請輸入正確的信箱格式' }]"
        />
      </van-cell-group>
      <van-button
        class="col-6 mx-auto my-4"
        round
        block
        type="success"
        native-type="submit"
      >
        儲存
      </van-button>
      <van-button
        class="col-6 mx-auto"
        round
        block
        type="danger"
        @click="onDelete"
      >
        刪除
      </van-button>
    </van-form>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, reactive, toRefs } from "vue";
import {
  getEditUser,
  editUser,
  deleteUser,
} from "@/../public/network/surperuser";
import { Toast, Notify } from "vant";
export default {
  name: "edituser",
  components: { Navbar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    let id = ref(0);
    const state = reactive({
      name: "",
      password: "",
      password_confirmation: "",
      rickname: "",
      email: "",
    });
    let commodity = reactive({
      detail: {},
    });
    onMounted(() => {
      id.value = route.params.id;
      getEditUser(id.value).then((res) => {
        commodity.detail = res.data;
        state.name = commodity.detail.name;
        state.rickname = commodity.detail.rickname;
        state.email = commodity.detail.email;
      });
    });
    const onSubmit = () => {
      if (state.password !== state.password_confirmation) {
        Notify("兩次密碼不一致");
      } else {
        editUser(id.value, state).then((res) => {
          if (res.status == 401) {
            return Toast.fail("名稱已存在");
          }
          if (res.status == 402) {
            return Toast.fail("信箱已存在");
          } else if (res.status == 204) {
            return Toast.success("儲存成功");
          }
        });
      }
    };
    const onDelete = () => {
      deleteUser(id.value).then((res) => {
        if (res.status == 401) {
          return Toast.fail("刪除失敗");
        } else if (res.status == 204) {
          Toast.success("刪除成功");
          setTimeout(() => {
            router.push({ path: "/getUserList" });
          }, 500);
        }
      });
    };  
        const goBack = ()=>{
          router.go(-1);
      }
    return {
      id,
      ...toRefs(commodity),
      ...toRefs(state),
      onSubmit,
      onDelete,
      goBack
    };
  },
};
</script>
<style lang="scss" scoped>
</style>