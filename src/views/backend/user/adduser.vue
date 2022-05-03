<template>
  <div>
    <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>新增會員</template>
    </Navbar>
    <div class="col-12 col-md-10 mx-auto" style="margin-top: 40px">
      <div class="" style="text-align: center; padding-top: 30px"></div>
      <van-form @submit="onSubmit">
        <van-cell-group class="col-12 col-md-6 mx-auto register-form" inset>
          <van-field
            v-model="name"
            name="用戶名稱"
            label="用戶名稱"
            placeholder="用戶名稱"
            :rules="[{ required: true, message: '請填寫用戶名稱' }]"
          />
          <van-field
            v-model="rickname"
            name="rickname"
            label="暱稱"
            placeholder="暱稱"
            :rules="[{ required: true, message: '請填寫暱稱' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密碼"
            label="密碼"
            placeholder="密碼"
            :rules="[{ required: true, message: '請填寫密碼' }]"
          />
          <van-field
            v-model="password_confirmation"
            type="password"
            name="確認密碼"
            label="確認密碼"
            placeholder="確認密碼"
            :rules="[{ required: true, message: '請確認密碼' }]"
          />
          <van-field
            v-model="email"
            name="信箱"
            label="信箱"
            placeholder="a0123456789@gmail.com"
            :rules="[{ required: true, message: '請輸入正確的信箱格式' }]"
          />
        </van-cell-group>
        <div style="margin: 16px" class="col-12 col-md-6 mx-auto">
          <van-button
            class="col-12 col-md-6 mx-auto"
            round
            block
            type="success"
            native-type="submit"
          >
            新增
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import {reactive, toRefs } from "vue";
import { Notify, Toast } from "vant";
import { addUser } from "@/../public/network/surperuser";
import { useRouter } from "vue-router";
export default {
  name: "adduser",
  setup() {
    const router = useRouter();
    const userinfo = reactive({
      name: "",
      password: "",
      rickname: "",
      password_confirmation: "",
      email: "",
    });
    const onSubmit = () => {
      //先驗證
      if (userinfo.password !== userinfo.password_confirmation) {
        Notify("兩次密碼不一致");
      } else {
        // 提交給server
        addUser(userinfo).then((res) => {
          if (res.status == 401) {
            return Toast.fail("名稱已存在");
          } else if (res.status == 402) {
            return Toast.fail("信箱已存在");
          } else if (res.status == 204) {
            Toast.success("註冊成功");
            setTimeout(() => {
              router.push({ path: "/getUserList" });
            }, 1000);
          }
        });
      }
    };
      const goBack = ()=>{
          router.go(-1);
      }
    return {
      ...toRefs(userinfo),
      onSubmit,
      goBack
    };
  },
  components: {
    Navbar,
  },
  props: {},
};
</script>
<style lang="scss" scoped>

.register-form {
  max-width: 500px;
  margin: 0 auto;
}
.link-login {
  max-width: 300px;
  text-align: left;

  color: #44b883;
  font-weight: 900;
  font-size: 16px;
}
@media (max-width: 484px) {
  .link-login {
    width: 100%;
    .van-image {
      width: 20rem;
      height: 10rem;
    }
  }
}
</style>