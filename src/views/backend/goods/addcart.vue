<template>
  <div>
    <div class="left" @click="goBack">
      <img src="~assets/images/211686_white_arrow_icon.png" alt="" />
    </div>
    <Navbar>
      <template #default>新增商品</template>
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
      <div class="col-12 col-md-6 mx-auto">
        <van-button round block type="success" native-type="submit">
          儲存
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Navbar from "@/components/common/navbar/Navbar.vue";
import {  reactive, toRefs } from "vue";
import { Toast } from "vant";
import { useRouter } from "vue-router";
import { addAcart } from "@/../public/network/surperuser";
export default {
  name: "addcart",
  components: { Navbar },
  setup() {
    const router = useRouter();
    const userinfo = reactive({
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
    const onSubmit = () => {
      addAcart(userinfo).then((res) => {
        if (res.status == "202") {
          return Toast.fail("新增失敗");
        } else if (res.status == "203") {
          return Toast.fail("title重複了");
        } else if (res.status == "204") {
          return Toast.fail("圖片路徑重複了");
        } else if (res.status == "201") {
          Toast.success("新增成功");
        }
        userinfo.title = "";
        userinfo.description = "";
        userinfo.stock = "";
        userinfo.price = "";
        userinfo.fid = "";
        userinfo.sales = "";
        userinfo.comments_count = "";
        userinfo.collects_count = "";
        userinfo.cover_url = "";
      });
    };
       const goBack = ()=>{
          router.go(-1);
      }
    return {
      ...toRefs(userinfo),
      onSubmit,
      goBack,
    };
  },
};
</script>
<style lang="scss" scoped>
</style>