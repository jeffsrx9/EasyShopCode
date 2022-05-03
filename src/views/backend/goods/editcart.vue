<template>
  <div>
         <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>編輯商品{{ id }}</template>
    </Navbar>

    <van-form @submit="onSubmit" class="col-12 col-lg-6 mx-auto">
      <van-cell-group inset>
        <van-field
          style="margin-top: 100px"
          v-model="title"
          name="title"
          label="商品名稱"
          placeholder="title"
          :rules="[{ required: true, message: '請填寫商品名稱' }]"
        />
        <van-field
          v-model="description"
          name="description"
          label="商品詳情"
          placeholder="description"
          :rules="[{ required: true, message: '請填寫商品詳情' }]"
        />
        <van-field
          v-model="stock"
          name="stock"
          label="商品庫存"
          placeholder="stock"
          :rules="[{ required: true, message: '請填寫商品庫存' }]"
        />
        <van-field
          v-model="price"
          name="price"
          label="商品價格"
          placeholder="price"
          :rules="[{ required: true, message: '請填寫商品價格' }]"
        />
        <van-field
          v-model="fid"
          name="fid"
          label="商品標籤編號"
          placeholder="fid"
          :rules="[{ required: true, message: '請填寫商品標籤編號' }]"
        />
        <van-field
          v-model="sales"
          name="sales"
          label="商品出售數"
          placeholder="sales"
          :rules="[{ required: true, message: '請填寫商品出售數' }]"
        />
        <van-field
          v-model="comments_count"
          name="comments_count"
          label="商品評論數"
          placeholder="comments_count"
          :rules="[{ required: true, message: '請填寫商品評論數' }]"
        />
        <van-field
          v-model="collects_count"
          name="collects_count"
          label="商品收藏數"
          placeholder="collects_count"
          :rules="[{ required: true, message: '請填寫商品收藏數' }]"
        />
        <van-field
          v-model="cover_url"
          name="cover_url"
          label="商品圖片"
          placeholder="cover_url"
          :rules="[{ required: true, message: '請填寫商品圖片' }]"
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
  getEditCart,
  editCart,
  deleteCart,
} from "@/../public/network/surperuser";
import { Toast } from "vant";
export default {
  name: "editcart",
  components: { Navbar },
  setup() {
    const route = useRoute();
    const router = useRouter();
    let id = ref(0);
    const state = reactive({
      title: "",
      description: "",
      stock: "",
      price: "",
      fid: "",
      sales: "",
      comments_count: "",
      collects_count: "",
      cover_url: "",
    });
    let commodity = reactive({
      detail: {},
    });
    onMounted(() => {
      id.value = route.params.id;
      getEditCart(id.value).then((res) => {
        commodity.detail = res.goods;
        state.title = commodity.detail.title;
        state.description = commodity.detail.description;
        state.stock = commodity.detail.stock;
        state.price = commodity.detail.price;
        state.fid = commodity.detail.fid;
        state.sales = commodity.detail.sales;
        state.comments_count = commodity.detail.comments_count;
        state.collects_count = commodity.detail.collects_count;
        state.cover_url = commodity.detail.cover_url;
      });
    });
    const onSubmit = () => {
      editCart(id.value, state).then((res) => {
        if (res.status == 401) {
          return Toast.fail("已有相同名稱");
        } else if (res.status == 204) {
          return Toast.success("儲存成功");
        }
      });
      console.log(state);
    };
    const onDelete = () => {
      deleteCart(id.value).then((res) => {
        if (res.status == 401) {
          return Toast.fail("刪除失敗");
        } else if (res.status == 204) {
          Toast.success("刪除成功");
          setTimeout(() => {
            router.push({ path: "/getCartList" });
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
      goBack,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>