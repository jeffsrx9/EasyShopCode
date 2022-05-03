<template>
  
    <van-swipe v-if="banners.length" class="my-swipe" :autoplay="3000" indicator-color="white" :width="auto">
      <van-swipe-item v-for="(item,index) in banners" :key="index">
          <img v-lazy="item.url" alt="">
      </van-swipe-item>
    </van-swipe>
 
</template>

<script>
export default {
  name: "HomeSwiper",
  components: {},
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
 
};
</script>
<style lang="scss" scoped>
.my-swipe{
  img{
      height: 100%;
      width:100%;
      object-fit: cover;
  }
}
</style>