<template>
    <div id="home">
        <NavBar class="home-nav">
            <div slot="center">购物街</div>
        </NavBar>
        <Scroll class="content"
                ref="scroll" @scroll="contentClick" :probeType="3" @pullingUp="loadMore" :pullUpLoad="true">
            <home-swiper :banners="banners">
            </home-swiper>
            <recommend-view :recommends="recommends"></recommend-view>
            <feature></feature>
            <tab-control
                    :titles="['流行', '新款', '精选']"
                    class="tab-control"
                    @tabClick="tabClick"
            ></tab-control>
            <goods-list :goods='showGoods'></goods-list>
        </Scroll>
        <back-top @click.native="backClick" v-show="isShow"></back-top>
    </div>
</template>

<script>

    import HomeSwiper from "./childComponents/HomeSwiper"
    import RecommendView from "./childComponents/RecommendView"
    import Feature from "./childComponents/Featrue"

    import NavBar from "components/common/navbar/NavBar"
    import GoodsList from "components/content/goods/GoodsList"
    import TabControl from "components/content/tabControl/TabControl"
    import Scroll from "components/common/scroll/Scroll"
    import BackTop from "components/content/backTop/BackTop"

    import {getHomeMultidata, getHomeGoods} from "network/home"
    import {debounce} from "common/utils";
    import {itemListenerMixin} from "common/mixin";

    export default {
        name: "home",
        mixins:[itemListenerMixin],
        components: {
            NavBar,
            HomeSwiper,
            RecommendView,
            Feature,
            TabControl,
            GoodsList,
            Scroll,
            BackTop
        },
        data() {
            return {
                banners: [],
                recommends: [],
                goods: {
                    'pop': {page: 0, list: []},
                    'new': {page: 0, list: []},
                    'sell': {page: 0, list: []},
                },
                currentType: 'pop',
                isShow: false,
                saveY: 0,
                itemListener:null
            }
        },
        computed: {
            showGoods() {
                return this.goods[this.currentType].list
            }
        },
        created() {
            this.getHomeMultidata()

            this.getHomeGoods("pop")
            this.getHomeGoods("new")
            this.getHomeGoods("sell")


        },
        activated(){
            //回来的时候设置回来
            this.$refs.scroll.scrollTo(0,this.saveY,0)
        },

        deactivated(){
            //在离开时的时候，记录现在的高度
          this.saveY = this.$refs.scroll.getScrollY()

            //取消事件
            this.$bus.$off("imageLoad",this.itemListener)
        },
        mounted() {
        },
        methods: {

            /**
             * 页面方法
             */

            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break

                    case 1:
                        this.currentType = 'new'
                        break

                    case 2:
                        this.currentType = 'sell'
                        break


                }
            },
            backClick() {
                this.$refs.scroll.scrollTo(0, 0)
            },
            contentClick(postion) {
                this.isShow = (-postion.y) > 1000
            },
            loadMore() {
                this.getHomeGoods(this.currentType)
            },
            /**
             * 网络请求数据方法
             */
            getHomeMultidata() {
                getHomeMultidata().then(res => {

                    this.banners = res.data.banner.list
                    this.recommends = res.data.recommend.list
                })
            },
            getHomeGoods(type) {
                const page = this.goods[type].page + 1
                getHomeGoods(type, page).then(res => {
                    this.goods[type].list.push(...res.data.list)
                    this.goods[type].page += 1

                    this.$refs.scroll.finishPullUp()
                })
            }
        }
    }
</script>

<style scoped>
    #home {
        /*padding-top: 44px;*/
        height: 100vh;
        position: relative;
    }

    .home-nav {
        background-color: var(--color-tint);
        color: #fff;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }

    .tab-control {
        position: sticky;
        top: 44px;
        position: -webkit-sticky;
        /*z-index: 9;*/
    }

    .content {
        overflow: hidden;

        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>
