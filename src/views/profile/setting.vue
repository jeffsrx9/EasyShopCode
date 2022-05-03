<template>
  <div>
    <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>帳號管理</template>
    </Navbar>

    <van-form @submit="onSubmit" class="col-12 col-md-6 mx-auto">
      <van-cell-group inset>
        <van-field
          style="margin-top: 100px"
          v-model="name"
          name="name"
          label="帳號名稱"
          placeholder="帳號名稱"
          :rules="[{ required: true, message: '帳號名稱' }]"
          readonly
        />
        <van-field
          v-model="rickname"
          name="rickname"
          label="暱稱"
          placeholder="暱稱"
          :rules="[{ required: true, message: '暱稱' }]"
        />
        <van-field
          v-model="password"
          name="password"
          label="密碼"
          placeholder="******"
        />
        <div class="" v-show="password_check">
          <van-field
            v-model="password_confirmation"
            name="password"
            label="確認密碼"
            placeholder="******"
          />
        </div>
        <van-field
          v-model="email"
          name="email"
          label="Email"
          placeholder="a123456@yahoo.com"
          :rules="[{ required: true, message: 'Email' }]"
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
        @click="goBack"
        type="danger"
      >
        取消
      </van-button>
    </van-form>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import {useRouter } from "vue-router";
import { onMounted,reactive, toRefs, computed } from "vue";
import { editUser, getUser } from "@/../public/network/user";
import { Toast } from "vant";
export default {
  name: "setting",
  components: { Navbar },
  setup() {
    const router = useRouter();
    const state = reactive({
      name: "",
      rickname: "",
      password: "",
      password_confirmation: "",
      email: "",
    });
    const password_check = computed(() => {
      if (state.password !== "") {
        return true;
      } else {
        return false;
      }
    });
    onMounted(() => {
      getUser().then((res) => {
        state.name = res.name;
        state.rickname = res.rickname;
        state.email = res.email;
      });
    });
    const onSubmit = () => {
      if (state.password !== state.password_confirmation) {
        return Toast.fail("請確認密碼");
      } else {
        editUser(state).then((res) => {
          if (res.status == 401) {
            return Toast.fail("已有相同Email");
          } else if (res.status == 204) {
            Toast.success("儲存成功");
            setTimeout(() => {
              router.push({ path: "/profile" });
            }, 1000);
          }
        });
      }
      console.log(state);
    };
    const goBack = () => {
      router.push({ path: "/profile" });
    };
    return {
      ...toRefs(state),
      onSubmit,
      goBack,
      password_check,
    };
  },
};
</script>
<style lang="scss" scoped>
.left {
  z-index: 1000;
  position: absolute;
  top: 0;
}
</style>