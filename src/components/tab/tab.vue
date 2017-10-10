<template>
    <div class="tab border-1px">
        <div class="tab-item">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/seller">商家</router-link>
        </div>
    </div>
</template>

<script type = "text/ecmasrcipt-6">
export default {

}
</script>


<style lang="scss">
.tab {
    display: flex;
    width: 100%;
    height:80rem/$r;
    line-height:80rem/$r;
    position: relative;
    &:after{
        @include border-1px(rgba(7,17,27,0.1));
    }
    .tab-item {
        flex: 1;
        text-align:center;
        & > a{
            display:block;
            font-size:28rem/$r;
            color:rgb(77,85,93);
            &.active{
                color:rgb(240,20,20)
            }  
        }
    }
}
</style>