<template>
    <div>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li v-for="(good,index) in goods" class="menu-item" :class="{current:currentIndex === index}" @click="selectMenu(index,$event)">
                        <span class="text border-1px">
                            <span v-show="good.type > 0">
                                <icon :classify="3" :icon-type="good.type" />
                            </span>
                            {{good.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wraper" ref="foodsWrapper">
                <ul>
                    <li v-for="(good,index) in goods" class="food-list" ref="foodList">
                        <h1 class="title">{{good.name}}</h1>
                        <ul>
                            <li @click="selectFood(food,$event)"  v-for="food in good.foods" class="food-item border-1px">
                                <div class="pic">
                                    <img width="57" height="57" :src="food.icon">
                                </div>
                                <div class="content">
                                    <h2 class="name">
                                        {{food.name}}
                                    </h2>
                                    <p class="desc">
                                        {{food.description}}
                                    </p>
                                    <div class="extra">
                                        <span class="count">月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cart-control @add="addFood" :food="food"></cart-control>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shop-cart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
        </div>
        <food @add="addFood" :food="selectedFood" ref="food"></food>
    </div>
</template>

<script type = "text/ecmasrcipt-6">
import icon from 'components/icon/icon';
import BScroll from 'better-scroll';
import shopCart from 'components/shopcart/shopcart';
import cartControl from 'components/cartcontrol/cartcontrol';
import food from 'components/food/food';

const ERRO_OK = 0;

export default {
    props: ['seller'],
    data() {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood:{}
        };
    },
    computed: {
        currentIndex() {
            for (let i = 0; i < this.listHeight.length; i++) {
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i + 1];
                if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
                    return i;
                };
            };
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) foods.push(food);
                })
            })
            return foods;
        }
    },
    created() {
        this.$http.get('/api/goods').then((response) => {
            response = response.body;
            if (response.errno === ERRO_OK) {
                this.goods = response.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                });
            };
        });
    },
    methods: {
        selectMenu(index, e) {
            if (!e._constructed) return;
            let foodList = this.$refs.foodList;
            let el = foodList[index];
            this.foodsScroll.scrollToElement(el, 300)
        },
        selectFood(food,e){
            if( !e._constructed ) return;
            this.selectedFood = food;
            this.$refs.food.show();
        },
        addFood(target) {
            this._drop(target);
        },
        _drop(target) {
            /* 体验优化,异步执行下落动画 */
            this.$nextTick(() => {
                this.$refs.shopcart.drop(target);
            })
        },
        _initScroll() {
            this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                click: true
            });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            });

            this.foodsScroll.on('scroll', (e) => {
                if (e.y <= 0) {
                    this.scrollY = Math.abs(Math.round(e.y));
                };
            });
        },
        _calculateHeight() {
             /* 用数组存放每次递加列表高度的值 */
            let foodList = this.$refs.foodList;
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            };
        }
    },
    components: {
        icon,
        shopCart,
        cartControl,
        food
    }
}
</script>


<style lang="scss">
.goods {
    display: flex;
    position: absolute;
    top: 358rem/$r;
    bottom: 92rem/$r;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
        flex: 0 0 160rem/$r;
        width: 160rem/$r;
        background: #f3f5f7;
        .menu-item {
            display: table;
            height: 108rem/$r;
            width: 112rem/$r;
            line-height: 28rem/$r;
            padding: 0 24rem/$r;
            &.current {
                position: relative;
                z-index: 10;
                margin-top: -2rem/$r;
                background: #fff;
                font-weight: 700;
                .text {
                    &:after {
                        @include border-none();
                    }
                }
            }
            .icon {
                margin-right: 4rem/$r;
            }
            .text {
                display: table-cell;
                width: 112rem/$r;
                vertical-align: middle;
                font-size: 24rem/$r;
                position: relative;
                &:after {
                    @include border-1px(rgba(7, 17, 27, .1));
                }
            }
        }
    }
    .foods-wraper {
        flex: 1;
        .title {
            padding-left: 28rem/$r;
            height: 52rem/$r;
            line-height: 52rem/$r;
            border-left: 4rem/$r solid #d9dde1;
            font-size: 24rem/$r;
            color: rgb(147, 153, 159);
            background: #f3f5f7;
        }
        .food-item {
            display: flex;
            margin: 36rem/$r;
            position: relative;
            padding-bottom: 36rem/$r;
            &:after {
                @include border-1px(rgba(7, 17, 27, .1));
            }
            &:last-child {
                &:after {
                    @include border-none();
                }
                margin-bottom:0;
            }
            .pic {
                flex: 0 0 114rem/$r;
                margin-right: 20rem/$r;
            }
            .content {
                flex: 1;
            }
            .name {
                margin: 4rem/$r 0 16rem/$r 0;
                height: 28rem/$r;
                font-size: 28rem/$r;
                color: rgb(7, 17, 27);
                line-height: 28rem/$r;
            }
            .desc,
            .extra {
                line-height: 20rem/$r;
                font-size: 20rem/$r;
                color: rgb(147, 153, 159);
            }
            .desc {
                line-height: 24rem/$r;
                margin-bottom: 16rem/$r;
            }
            .extra {
                .count {
                    margin-right: 24rem/$r;
                }
            }
            .price {
                font-weight: 700;
                line-height: 48rem/$r;
                .now {
                    margin-right: 16rem/$r;
                    font-size: 28rem/$r;
                    color: rgb(240, 20, 20)
                }
                .old {
                    text-decoration: line-through;
                    font-size: 20rem/$r;
                    color: rgb(147, 153, 159)
                }
            }
            .cartcontrol-wrapper {
                position: absolute;
                right: 0;
                bottom: 24rem/$r;
            }
        }
    }
}
</style>