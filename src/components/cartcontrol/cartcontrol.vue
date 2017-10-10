<template>
    <div class="cartcontrol">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart" transition="move">
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart"></div>
    </div>
</template>
<script type = "text/ecmasrcipt-6">
import Vue from 'vue';

export default {
    props: ['food'],
    methods: {
        addCart(e) {
            if (!e._constructed) return;
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1);
            } else {
                this.food.count++;
            };
            this.$emit('add', e.target);
        },
        decreaseCart(e) {
            if (!e._constructed) return;
            if (this.food.count) {
                this.food.count--;
            };
        }
    }
};
</script>
<style lang="scss">
.cartcontrol {
    font-size: 0;
    .cart-decrease {
        display: inline-block;
        padding: 12rem/$r;
        opacity: 1;
        transform: translate3D(0, 0, 0);
        .inner {
            display: inline-block;
            font-size: 48rem/$r;
            line-height: 48rem/$r;
            color: rgb(0, 160, 220);
            transition: all .4s linear;
            transform: rotate(0)
        }
        &.move-enter-active,
        &.move-leave-active {
            transition: all .4s linear;
        }
        &.move-enter,
        &.move-leave-active {
            opacity: 0;
            transform: translate3d(48rem/$r, 0, 0);
            .inner {
                transform: rotate(180deg);
            }
        }
    }
    .cart-count {
        display: inline-block;
        font-size: 20rem/$r;
        color: rgb(147, 153, 159);
        line-height: 48rem/$r;
        vertical-align: top;
        width: 24rem/$r;
        padding-top: 12rem/$r;
        text-align: center;
    }
    .cart-add {
        display: inline-block;
        padding: 12rem/$r;
        line-height: 48rem/$r;
        font-size: 48rem/$r;
        color: rgb(0, 160, 220);
    }
}
</style>
