<template>
  <div>
    <Navbar>
      <template #default>用戶登入</template>
    </Navbar>
    <div class="col-12 col-md-10 mx-auto" style="margin-top: 40px">
      <div class="van-image" style="text-align: center; padding-top: 30px">
        <van-image
          fit="contain"
          src="https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/Flagship_100_Blog_2880x1800_Apparel.jpg"
        />
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group class="col-12 col-md-6 mx-auto login-form" inset>
          <van-field
            v-model="name"
            name="用戶名稱"
            label="用戶名稱"
            placeholder="a"
            :rules="[{ required: true, message: '請填寫用戶名稱' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密碼"
            label="密碼"
            placeholder="*******"
            :rules="[{ required: true, message: '請填寫密碼' }]"
          />
        </van-cell-group>
        <div style="margin: 16px" class="col-12 col-md-6 mx-auto">
          <div
            class="link-login col-12 mx-auto"
            @click="$router.push({ path: '/register' })"
          >
            沒有帳號,立即註冊
          </div>
          <van-button
            class="col-12 col-md-6 mx-auto mt-5"
            round
            block
            type="success"
            native-type="submit"
          >
            登入
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import { ref, reactive, toRefs, onMounted } from "vue";
import { Notify, Toast } from "vant";
import { useRouter } from "vue-router";
import { login, getFacebook } from "@/../public/network/user";
import { useStore } from "vuex";
export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const store = useStore();
    const userinfo = reactive({
      password: "",
      name: "",
    });

    onMounted(() => {});
    const onSubmit = () => {
      login(userinfo).then((res) => {
        if (res.status == 400) {
          Toast.fail("帳號錯誤");
        } else if (res.status == 401) {
          Toast.fail("密碼錯誤");
        } else if (res.status == 205) {
          window.localStorage.setItem("token", res.access_token);
          window.localStorage.setItem("super", res.access_token);
          store.commit("setIsLoginsuper", true);
          store.commit("setIsLogin", true);
          Toast.success("管理員登入成功");
          userinfo.password = "";
          userinfo.name = "";
          setTimeout(() => {
            router.push({ path: "/surperuser" });
          }, 500);
          store.dispatch("updateCart");
          setTimeout(() => {
            router.go(0);
          }, 500);
        } else {
          //將Token保存在本地window.localStorage   setItem(key,value)  getItem(key)
          window.localStorage.setItem("token", res.access_token);

          //setIsLogin傳遞true
          store.commit("setIsLogin", true);
          Toast.success("登入成功");
          userinfo.password = "";
          userinfo.name = "";

          setTimeout(() => {
            router.push({ path: "/home" });
          }, 500);
          store.dispatch("updateCart");
        }
      });
    };

    return {
      ...toRefs(userinfo),
      onSubmit,
    };
  },
  components: {
    Navbar,
  },
  props: {},
};
</script>
<style lang="scss" scoped>
.login-form {
  max-width: 500px;
  margin: 0 auto;
}
.link-login {
  max-width: 450px;
  text-align: left;
  padding: 10px;
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