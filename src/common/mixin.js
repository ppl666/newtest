import {debounce} from "./utils";

export const itemListenerMixin = {
    data(){
        return{
            refresh:null
        }
    },
    mounted(){
        this.refresh = debounce(this.$refs.scroll.refresh, 50)
        this.itemListener = ()=>{
            this.refresh()
        }
        this.$bus.$on("imageLoad",this.itemListener)
    }
}