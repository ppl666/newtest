<template>
  <div id="cart">
    <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
      <cart-list></cart-list>
      <bottom-nav></bottom-nav>
  </div>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar"

    import CartList from "./cartCompons/CartList"
    import BottomNav from "./cartCompons/BottomNav"
    import {mapGetters} from "vuex"
    export default {
        name: "cart",
        components:{
            NavBar,
            CartList,
            BottomNav
        },
        computed:{
            ...mapGetters(["cartLength"])
        }
    }
</script>

<style scoped>
    #cart {
        /*position: relative;*/
        height: 100vh;
    }

    .nav-bar {
        background-color: var(--color-tint);
        font-weight: 700;
        color: #fff;
    }

    .cart-list {
        position: absolute;
        top: 44px;
        bottom: 49px;
        width: 100%;
    }
</style>
