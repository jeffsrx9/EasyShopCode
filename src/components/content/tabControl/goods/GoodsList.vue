<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" :key="item"  :product="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
name:'GoodsList',
  components: {GoodsListItem},
  props: {
      goods:{
          type:Array,
          default(){
              return []
          }
      }
  },

};
</script>
<style  lang="scss">
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px;
        padding-bottom: 60px;
     
    }

</style>