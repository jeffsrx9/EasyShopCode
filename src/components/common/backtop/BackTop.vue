<template>
  <div id="roll0" @click="roll0" class="backTop d-block d-sm-none">
    <i class="far fa-arrow-alt-circle-up"></i>
  </div>
  <div  id="roll1" @click="roll1" class="back-to-top d-none  d-sm-block "> <i class="far fa-arrow-alt-circle-up"></i></div>
</template>

<script>
export default { 
  name: "BackTop",
  setup(props, { emit }) {
    
      const roll1 =   ()=> {
          document.querySelector("#roll1_top").scrollIntoView(true);
        };
       const roll0 =  ()=> {
          document.querySelector("#roll1_top").scrollIntoView(true);
        };
   
 
    return {
      roll0,
      roll1,
      backtop: () => {
        emit("bTop");
      },
    };
  },
};
</script>
<style lang="scss" >

.back-to-top {
  z-index: 998;
  position:fixed;
  right: 70px;
  width: 50px;
  height: 48px;
  bottom: 100px;

  i {
    color: rgb(51, 172, 172);
    font-size: 48px;
  }
}
.backTop i {
  z-index: 99;
  color: darkcyan;
  font-size: 30px;
  background-color: #fff;
  border-radius: 50%;
  position: fixed;
  bottom: 80px;
  left: 0px;
}

</style>