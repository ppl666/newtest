<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll"

    export default {
        name: "scroll",
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                scroll: null
            }
        },
        mounted() {
            //创建Bscroll
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad
            })
            //监听滚动事件
            if (this.probeType === 2 || this.probeType === 3) {
                this.scroll.on("scroll", (postion) => {
                    this.$emit("scroll", postion)
                })
            }
            //监听向上滚动事件
            if (this.pullUpLoad) {
                this.scroll.on("pullingUp", () => {
                    this.$emit("pullingUp")
                })
            }

        },
        methods: {
            scrollTo(x, y, time = 500) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            },
            getScrollY() {
                return this.scroll ? this.scroll.y : 0
            }

        }
    }
</script>

<style scoped>

</style>