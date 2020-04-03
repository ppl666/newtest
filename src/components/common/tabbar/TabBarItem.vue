<template>

  <div class="tab-bar-item" @click="itemClick">
    <!--<img src="../../assets/img/tabbar/home.svg" alt="">-->
    <!--<div>首页</div>-->
    <!--为什么外层要包裹一层div,因为其他组件在填插槽的时候，会直接覆盖掉所有插槽上的属性，可以把一些基本的属性放到外部的div上-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-activate"></slot>
    </div>
    <div :class={active:isActive}>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tab-bar-item",
    data() {
      return {
        // isActive:true
      }
    },
    computed: {
      isActive() {
        // /home -> item1(/home) = true
        // /home -> item1(/category) = false
        // /home -> item1(/cart) = true
        // /home -> item1(/profile) = true
        return this.$route.path.indexOf(this.path) !== -1
      }
      },
      props: {
        path: String
      },
      methods: {
        itemClick() {
          console.log(this.path)
          this.$router.replace(this.path)
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    height: 49px;
    text-align: center;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }

  .active {
    color: red
  }
</style>
