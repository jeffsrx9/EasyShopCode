<template>
  <div class="nav-bar d-lg-none " >
    <div class="center"><slot >EASYSHOP</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>


<nav aria-label="breadcrumb" class="aria d-md-block d-none">
  <ol class="breadcrumb">
    <div class="title"><a href="/"><img src="~assets/images/empty-cart.png" alt=""> 簡單購物</a></div>
  </ol>
</nav>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "Navbar",
  setup(){
      const router = useRouter();
      const goBack = ()=>{
          router.go(-1);
      }
      return{goBack}
  },
  components: {},
  props: {},
};
</script>
<style lang="scss">
.nav-bar {
  display:flex;
  background-color: var(--color-tint);
  color: #f6f6f6;
  position: fixed;
  left: 0; 
  right: 0;
  top: 0;
  z-index: 999;
  height: 45px;
  line-height: 45px;
  box-shadow: 0 2px 0 rgba(100, 100, 100, 0.1);

 
  .center {
    flex: 1;
  }
}
nav{
  width: 100%; 
  
  .breadcrumb{
    z-index: 99;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    transform: translateX(-5%);
    height: 50px;
    background-color: #f6f6f6;

    .title{
      margin-top: -10px;
      line-height: 50px;
      font-size: 24px;
      a{
        img{
          height: 30px;
        }
      }
    }
  }
}
.aria{z-index:9;}
</style>