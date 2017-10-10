<template>
    <div>
        <div class="shopcart">
            <div class="content" @click="toggleList">
                <div class="content-left">
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop="pay">
                    <div class="pay" :class="{'enough':payDesc==='去结算'}">
                        {{payDesc}}
                    </div>
                </div>
                <div class="ball-container">
                    <div v-for="ball in balls">
                        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                            <div v-show="ball.show" class="ball">
                                <div class="inner inner-hook"></div>
                            </div>
                        </transition>
                    </div>
                </div>
                <transition name="food">
                    <div class="shopcart-list" v-show="listShow">
                        <div class="list-header">
                            <h1 class="title">购物车</h1>
                            <span class="empty" @click="empty">清空</span>
                        </div>
                        <div class="list-content" ref="listContent">
                            <ul>
                                <li class="food border-1px" v-for="food in selectFoods">
                                    <span class="name">{{food.name}}</span>
                                    <div class="price">
                                        <span>￥{{food.price * food.count}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol @click="addFood" :food="food"></cartcontrol>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <transition name="fade">
            <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>
<script  type = "text/ecmasrcipt-6">
import cartcontrol from 'components/cartcontrol/cartcontrol';
import BScroll from 'better-scroll';

export default {
    props: ['selectFoods','deliveryPrice','minPrice'],
    data() {
        return {
            balls: [
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
            ],
            dropBalls: [],
            fold: true
        }
    },
    computed: {
        totalPrice() {
            let total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            });
            return total;
        },
        totalCount() {
            let count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count;
            });
            return count;
        },
        payDesc() {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`;
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice;
                return `还差￥${diff}元起送`;
            } else {
                return '去结算';
            }
        },
        listShow() {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold;
            if (show) {
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            }
            return show;
        }
    },
    methods: {
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i];
                if (!ball.show) {
                    ball.show = true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return;
                }
            }
        },
        toggleList() {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        hideList() {
            this.fold = true;
        },
        empty() {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            });
        },
        pay() {
            if (this.totalPrice < this.minPrice) return;
            window.alert(`需要支付${this.totalPrice}元`);
        },
        addFood(target) {
            this.drop(target);
        },
        beforeDrop(el) {
            let count = this.balls.length;
            while (count--) {
                let ball = this.balls[count];
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)`;
                }
            }
        },
        dropping(el,done) {
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.display = '';
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend',done);
            });
        },
        afterDrop(el) {
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        }
    },
    components: {
        cartcontrol
    }
};
</script>
<style lang="scss">
.shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 96rem/$r;
    .content {
        display: flex;
        background: #141d27;
        font-size: 0;
        color: rgba(255, 255, 255, .4);
        .content-left {
            flex: 1;
            .logo-wrapper {
                display: inline-block;
                position: relative;
                top: -20rem/$r;
                margin: 0 24rem/$r;
                padding: 12rem/$r;
                width: 112rem/$r;
                height: 112rem/$r;
                box-sizing: border-box;
                vertical-align: top;
                border-radius: 50%;
                background: #141d27;
                .logo {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #2b343c;
                    text-align: center;
                    &.highlight {
                        background: rgb(0, 160, 220);
                    }
                    .icon-shopping_cart {
                        font-size: 48rem/$r;
                        line-height: 88rem/$r;
                        color: #80858a;
                        &.highlight {
                            color: #fff;
                        }
                    }
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 48rem/$r;
                    height: 32rem/$r;
                    line-height: 32rem/$r;
                    text-align: center;
                    border-radius: 32rem/$r;
                    font-size: 18rem/$r;
                    font-weight: 700;
                    color: #fff;
                    background: rgb(240, 20, 20);
                    box-shadow: 0 4rem/$r 8rem/$r 0 rgba(0, 0, 0, .4);
                }
            }
            .price {
                display: inline-block;
                vertical-align: top;
                margin-top: 24rem/$r;
                font-size: 32rem/$r;
                font-weight: 700;
                line-height: 48rem/$r;
                box-sizing: border-box;
                padding-right: 24rem/$r;
                border-right: 1px solid rgba(255, 255, 255, .1);
                &.highlight {
                    color: #fff;
                }
            }
            .desc {
                display: inline-block;
                vertical-align: top;
                margin: 24rem/$r 0 0 24rem/$r;
                line-height: 48rem/$r;
                font-size: 20rem/$r;
                line-height: 48rem/$r;
            }
        }
        .content-right {
            flex: 0 0 210rem/$r;
            width: 210rem/$r;
            .pay {
                height: 96rem/$r;
                line-height: 96rem/$r;
                text-align: center;
                font-size: 24rem/$r;
                font-weight: 700;
                background: #2b333b;
                &.enough {
                    background: #00b43c;
                    color: #fff;
                }
            }
        }
    }
    .ball-container {
        .ball {
            position: fixed;
            left: 64rem/$r;
            bottom: 44rem/$r;
            z-index: 200;
            transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
            .inner {
                width: 32rem/$r;
                height: 32rem/$r;
                border-radius: 50%;
                background: rgb(0, 160, 220);
                transition: all .4s linear;
            }
        }
    }
    .shopcart-list {
        position: absolute;
        top: 0;
        z-index: -1;
        width: 100%;
        transform: translate3d(0, -100%, 0);
        &.food-enter-active,
        &.food-leave-active {
            transition: all .5s;
        }
        &.food-enter,
        &.food-leave-active {
            transform: translate3d(0, 0, 0);
        }
        .list-header {
            height: 80rem/$r;
            line-height: 80rem/$r;
            padding: 0 36rem/$r;
            background: #f3f5f7;
            border-bottom: 2rem/$r solid rgba(7, 17, 27, .1);
            .title {
                float: left;
                font-size: 28rem/$r;
                color: rgb(7, 17, 27);
            }
            .empty {
                float: right;
                font-size: 24rem/$r;
                color: rgb(0, 160, 220);
            }
        }
        .list-content {
            padding: 0 36rem/$r;
            max-height: 434rem/$r;
            background: #fff;
            overflow: hidden;
            .food {
                position: relative;
                padding: 24rem/$r 0;
                box-sizing: border-box;
                &:after {
                    @include border-1px(rgba(7, 17, 27, .1));
                }
                .name {
                    line-height: 48rem/$r;
                    font-size: 28rem/$r;
                    color: rgb(7, 17, 27);
                }
                .prive {
                    position: absolute;
                    right: 180rem/$r;
                    bottom: 24rem/$r;
                    line-height: 48rem/$r;
                    font-size: 28rem/$r;
                    font-weight: 700;
                    color: rgb(240, 20, 20);
                }
                .cartcontrol-wrapper {
                    position: absolute;
                    right: 0;
                    bottom: 12rem/$r;
                }
            }
        }
    }
}

.list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    backdrop-filter: blur(20rem/$r);
    background: rgba(7, 17, 27, .6);
    &.fade-enter-active,
    &.fade-leave-active {
        transition: all .5s;
    }
    &.fade-enter,
    &.fade-leave-active {
        opacity: 0;
        background: rgba(7, 17, 27, 0);
    }
}
</style>
