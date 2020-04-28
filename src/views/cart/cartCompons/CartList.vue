<template>
    <scroll>
        <div>
            <cart-list-item v-for="(item,index) in cartList " :key="index" :itemInfo="item"></cart-list-item>
        </div>
    </scroll>

</template>

<script>
    import CartListItem from "./CartListItem"
    import Scroll from "components/common/scroll/Scroll"
    import {mapGetters} from "vuex";

    export default {
        name: "cart-list",
        components: {
            CartListItem,
            Scroll
        },
        computed: {
            ...mapGetters(["cartList"])
        }
    }
</script>

<style scoped>

</style>