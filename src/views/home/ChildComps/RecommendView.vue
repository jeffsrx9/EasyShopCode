<template>
  <div class="recommend">
    <div
      class="recommend-item"
      v-for="item in recommends.slice(2,6) "
      :key="item.id"
    >
      <a  @click.prevent="goDetail(item.id)"
        ><img v-lazy="item.cover_url" alt="" />
        <div class="">{{ item.title }}</div></a
      >
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"; 
export default {
  name: "RecommendView",
    props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup() {
    const router = useRouter();

    const goDetail = (id) => { 
      router.push({ path: '/detail', query: { id } });
    };
    return { goDetail };
  },
  components: {},
};
</script>
<style  lang="scss">
.recommend {
  max-width:800px;
  display: flex;
  text-align: center;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
  font-size: 12px;
}
.recommend-item {
  img {
    width: 100%;
   max-height: 200px;
    margin-bottom: 10px;
  }
}
@media(min-width:485){
  .recommend-item {
  img {
    width:100%;
    height: auto;
  }
}
}
</style>