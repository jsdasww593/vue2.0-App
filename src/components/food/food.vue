    <template>
    <transition name="move">
        <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cart-control @add="addFood" :food="food"></cart-control>
                    </div>
                    <transition name="fade">
                        <div class="buy" @click.stop="addFirst" v-show="!food.count || food.count === 0">
                            加入购物车
                        </div>
                    </transition>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <rating-select @select="selectRating" @toggle="toggleContent" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></rating-select>
                    <div class="rating-wrapper border-1px">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img :src="rating.avatar" class="avatar" width="12" height="12">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
                            暂无评价
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

    <script type = "text/ecmasrcipt-6">
import BScroll from 'better-scroll';
import Vue from 'vue';
import { formatDate } from 'common/js/date';
import cartControl from 'components/cartcontrol/cartcontrol';
import split from 'components/split/split';
import ratingSelect from 'components/ratingselect/ratingselect';

const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: ['food'],
    data() {
        return {
            showFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }
    },
    methods: {
        show() {
            this.showFlag = true;
            this.selectType = ALL;
            this.onlyContent = true;
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    });
                } else {
                    this.scroll.refresh();
                };
            });
        },
        hide() {
            this.showFlag = false;
        },
        addFirst(e) {
            if (!e._constructed) return;
            this.$emit('add', e.target);
            Vue.set(this.food, 'count', 1);
        },
        addFood(target) {
            this.$emit('add', target);
        },
        selectRating(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        toggleContent() {
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        needShow(type, text) {
            if (this.onlyContent && !text) return false;
            if (this.selectType === ALL) {
                return true;
            } else {
                return type === this.selectType;
            }
        }
    },
    filters: {
        formatDate(time) {
            let date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    },
    components: {
        cartControl,
        split,
        ratingSelect
    }
}
</script>


    <style lang="scss">
.food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 96rem/$r;
    z-index: 30;
    width: 100%;
    background: #fff;
    transform: translate3d(0, 0, 0);
    &.move-enter-active,
    &.move-leave-active {
        transition: all .2s linear;
    }
    &.move-enter,
    &.move-leave-active {
        transform: translate3d(100%, 0, 0);
    }
    .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .back {
            position: absolute;
            top: 20rem/$r;
            left: 0;
            .icon-arrow_lift {
                display: block;
                padding: 20rem/$r;
                font-size: 40rem/$r;
                color: #f0f0f0;
            }
        }
    }
    .content {
        position: relative;
        padding: 36rem/$r;
        .title {
            line-height: 28rem/$r;
            margin-bottom: 16rem/$r;
            font-size: 28rem/$r;
            font-weight: 700;
            color: rgb(7, 17, 27);
        }
        .detail {
            margin-bottom: 36rem/$r;
            line-height: 20rem/$r;
            height: 20rem/$r;
            font-size: 0;
            .sell-count,
            .rating {
                font-size: 20rem/$r;
                color: rgb(147, 153, 159);
            }
            .sell-count {
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
            right: 24rem/$r;
            bottom: 24rem/$r;
        }
        .buy {
            position: absolute;
            right: 36rem/$r;
            bottom: 36rem/$r;
            z-index: 10;
            height: 48rem/$r;
            line-height: 48rem/$r;
            padding: 0 24rem/$r;
            box-sizing: border-box;
            font-size: 20rem/$r;
            border-radius: 24rem/$r;
            color: #fff;
            background: rgb(0, 160, 220);
            opacity: 1;
            &.fade-enter-active,
            &.fade-leave-active {
                transition: all .2s;
            }
            &.fade-enter,
            &.fade-leave-active {
                opacity: 0;
            }
        }
    }
    .info {
        padding: 36rem/$r;
        .title {
            line-height: 28rem/$r;
            margin-bottom: 12rem/$r;
            font-size: 28rem/$r;
            color: rgb(7, 17, 27);
        }
        .text {
            font-size: 24rem/$r;
            color: rgb(77, 85, 93);
            line-height: 48rem/$r;
            padding: 0 16rem/$r;
        }
    }
    .rating {
        padding-top: 36rem/$r;
        .title {
            line-height: 28rem/$r;
            margin-left: 36rem/$r;
            font-size: 28rem/$r;
            color: rgb(7, 17, 27);
        }
        .rating-wrapper {
            padding: 0 36rem/$r;
            .rating-item {
                position: relative;
                padding: 32rem/$r 0;
                &:after {
                    @include border-1px(rgba(7, 17, 27, .1));
                }
                .user {
                    position: absolute;
                    right: 0;
                    top: 32rem/$r;
                    line-height: 24rem/$r;
                    font-size: 0;
                    .name {
                        display: inline-block;
                        vertical-align: top;
                        margin-right: 12rem/$r;
                        font-size: 20rem/$r;
                        color: rgb(147, 153, 159);
                    }
                    .avatar {
                        border-radius: 50%;
                    }
                }
                .time {
                    margin-bottom: 12rem/$r;
                    font-size: 20rem/$r;
                    color: rgb(147, 153, 159);
                    line-height: 24rem/$r;
                }
                .text {
                    line-height: 32rem/$r;
                    font-size: 24rem/$r;
                    color: rgb(7, 17, 27);
                    .icon-thumb_up,
                    .icon-thumb_down {
                        line-height: 48rem/$r;
                        margin-right: 8rem/$r;
                        font-size: 24rem/$r;
                    }
                    .icon-thumb_up {
                        color: rgb(0, 160, 220);
                    }
                    .icon-thumb_down {
                        color: rgb(147, 153, 159);
                    }
                }
            }
            .no-rating {
                padding: 32rem/$r 0;
                font-size: 24rem/$r;
                color: rgb(147, 153, 159);
            }
        }
    }
}
</style>


    