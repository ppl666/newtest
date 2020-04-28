<template>
    <div id="detail">
        <detial-nav class="detail-nav" @itemClick="titleClick"></detial-nav>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @deatilImageLoad="deatilImageLoad"></detail-goods-info>
            <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommendList" ref="recommends"></goods-list>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    </div>
</template>

<script>
    import DetialNav from "./detaiComp/DetailNav"
    import DetailSwiper from "./detaiComp/DetailSwiper"
    import DetailBaseInfo from "./detaiComp/DetailBaseInfo"
    import DetailParamInfo from "./detaiComp/DetailShopInfo"
    import DetailShopInfo from "./detaiComp/DetailParamInfo"
    import DetailGoodsInfo from "./detaiComp/DetailGoodsInfo"
    import DetailCommentInfo from "./detaiComp/DetailCommentInfo"
    import GoodsList from "components/content/goods/GoodsList"
    import DetailBottomBar from "./detaiComp/DetailBottomBar"
    import {getDeatils, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
    import Scroll from "components/common/scroll/Scroll"
    import {debounce} from "common/utils";
    import {itemListenerMixin} from "common/mixin";

    export default {
        name: "detail",
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommendList: [],
                itemListener:null,
                themeTops: [],
                refresh:null,
                getThemeTopsY:null
            }
        },
        components: {
            getDeatils,
            DetialNav,
            DetailSwiper,
            DetailBaseInfo,
            DetailShopInfo,
            Scroll,
            DetailParamInfo,
            DetailGoodsInfo,
            DetailCommentInfo,
            GoodsList,
            DetailBottomBar
        },
        //混入
        mixins:[itemListenerMixin],
        activated() {
            this.iid = this.$route.params.iid
            getDeatils(this.iid).then((res) => {
                const data = res.result
                this.topImages = data.itemInfo.topImages
                // 2.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

                // 3.创建店铺信息的对象
                this.shop = new Shop(data.shopInfo)
                // 4.保存商品的详情数据
                this.detailInfo = data.detailInfo;

                // 5.获取参数的信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

                // 6.保存评论信息
                if (data.rate.list) {
                    this.commentInfo = data.rate.list[0];
                }
            })
            getRecommend().then((res, error) => {
                if (error) return
                this.recommendList = res.data.list
            })

        },
        created(){
          this.getThemeTopsY = debounce(()=>{
              this.themeTops=[]
              this.themeTops.push(0)
              this.themeTops.push(this.$refs.params.$el.offsetTop)
              this.themeTops.push(this.$refs.comment.$el.offsetTop)
              this.themeTops.push(this.$refs.recommends.$el.offsetTop)
          },100)
        },
        destoryed(){
            this.$bus.$off("imageLoad",this.itemListener)
        },
        methods:{
            titleClick(index){
                console.log(this.themeTops);
                this.$refs.scroll.scrollTo(0,-this.themeTops[index],200)
            },
            deatilImageLoad(){
                this.refresh()
                // this.$refs.scroll.refresh()
               this.getThemeTopsY()
            },
            addToCart(){
                const obj = {}
                obj.iid = this.iid;
                obj.imgURL = this.topImages[0]
                obj.title = this.goods.title
                obj.desc = this.goods.desc;
                obj.newPrice = this.goods.realPrice;
                this.$store.dispatch("addCart",obj)
            }
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav {
        position: relative;
        z-index: 9;
        background-color: #fff;
    }

    .content {
        height: calc(100% - 44px);
    }
</style>