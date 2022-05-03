<template>
  <div class="userinfo mx-auto">
    <Navbar>
      <template #default>個人中心</template>
    </Navbar>
    <div class="user-box mx-auto">
      <div class="user-info col-12 col-md-10 mx-auto">
        <img class="col-4" src="~assets/images/user.png" alt="" />
        <div class="user-desc col-8">
          <span>帳號名稱:{{ user.name }}</span>
          <span>暱稱:{{ user.rickname }}</span>
          <span class="username">Email: {{ user.email }}</span>
        </div>
      </div>
      <ul class="user-list col-12 col-md-10 mx-auto">
        <li class="" @click="stop">
          <span>我的收藏</span>
          <i class="fas fa-chevron-right"></i>
        </li>
        <li class="" @click="stop">
          <span>我的訂單</span>
          <i class="fas fa-chevron-right"></i>
        </li>
        <li class="" @click="goTo('/profile/setting')">
          <span>帳號管理</span>
          <i class="fas fa-chevron-right"></i>
        </li>
        <li class="" @click="goTo('/address')">
          <span>地址管理</span>
          <i class="fas fa-chevron-right"></i>
        </li>
        <li class="" @click="stop">
          <span>關於我們</span>
          <i class="fas fa-chevron-right"></i>
        </li>
      </ul>
    </div>
    <div class="btn col-8 col-md-6 mt-5" style="">
      <van-button
        class="col-md-6 mx-auto"
        @click="toLogout"
        color="#42b983"
        round
        block
      >
        登出
      </van-button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import { logout, getUser } from "@/../public/network/user";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted, reactive, toRefs } from "@vue/runtime-core";

export default {
  name: "Profile",
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      user: {},
    });
    onMounted(() => {});

    getUser().then((res) => {
      state.user = res;
    });
    //登出按鈕
    const toLogout = () => {
      logout().then((res) => {
        if (res.status == "204") {
          Toast.success("登出成功");
          //清除 token
          window.localStorage.setItem("token", "");
          store.commit("setIsLogin", true);
          store.dispatch("updateCart");
          setTimeout(() => {
            router.push({ path: "/login" });
          }, 500);
          setTimeout(() => {
            router.go(0);
          }, 500);
        }
      });
    };
    //跳轉方法
    const goTo = (path, query) => {
      router.push({ path, query: query || {} });
    };
  const stop = ()=>{
    Toast.fail('開發中')
  }
    return {
      toLogout,
      ...toRefs(state),
      goTo,
      stop
    };
  },
};
</script>
<style lang="scss">
.user-box {
  max-width: 800px;
  margin-top: 50px;
  .user-info {
    background: linear-gradient(45deg, rgb(153, 227, 230), rgb(159, 231, 159));
    display: flex;
    border-radius: 10px;
    margin: 5px;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100px;
      height: auto;
      border-radius: 50%;
    }
    .user-desc {
      flex: 3;
      color: rgb(86, 91, 95);
      font-weight: 900;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-left: 10px;
      span {
        margin: 5px 0;
        &:last-child {
          text-align: left;
        }
        .sign {
          border: 2px solid rgb(175, 172, 172);
          height: 150px;
          margin: 5px;
          padding: 5px;
        }
      }
      .username {
        width: 100px;
        height: 100px;
        text-align: left;
      }
    }
  }
  .user-list {
    padding: 0 10px;
    li {
      display: flex;
      justify-content: space-between;
      margin: 30px 0;
      padding: 10px 0;
      border-bottom: 1px solid rgb(241, 239, 239);
    }
  }
}
.btn {
  margin-bottom: 65px;
}
</style>