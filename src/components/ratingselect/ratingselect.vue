<template>
    <div class="ratingselect">
        <div class="rating-type border-1px">
            <span class="block positive" @click="select(2,$event)" :class="{'active':selectType===2}">{{desc.all}}
                <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}
                <span class="count">{{positives.length}}</span>
            </span>
            <span class="block negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}
                <span class="count">{{negative.length}}  </span>
            </span>
        </div>
        <div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type = "text/ecmasrcipt-6">
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

export default {
    props: {
        ratings: {
            type: Array,
            default() {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    computed:{
       positives(){
          return this.ratings.filter((rating)=>{
                  return rating.rateType === POSITIVE;    
          });
       },
       negative(){
          return this.ratings.filter((rating)=>{
                  return rating.rateType === NEGATIVE;    
          });
       },
    },
    methods: {
        select(type, e) {
            if (!e._constructed) return;
            this.$emit('select', type);
        },
        toggleContent(e) {
            if (!e._constructed) return;
            this.$emit('toggle', this.onlyContent);
        }
    }
}
</script>


<style lang="scss">
.ratingselect {
    .rating-type {
        position: relative;
        padding: 36rem/$r 36rem/$r;
        &:after {
            @include border-1px(rgba(7, 17, 27, .1));
        }
        font-size:0;
        .block {
            display: inline-block;
            padding: 16rem/$r 24rem/$r;
            margin-right: 16rem/$r;
            border-radius: 2rem/$r;
            color: rgb(77, 85, 93);
            line-height: 32rem/$r;
            font-size: 24rem/$r;
            &.active {
                color: #fff;
            }
            .count {
                margin-left: 4rem/$r;
                font-size: 16rem/$r;
            }
            &.positive {
                background: rgba(0, 160, 220, .2);
                &.active {
                    background: rgb(0, 160, 220);
                }
            }
            &.negative {
                background: rgba(77, 85, 93, .2);
                &.active {
                    background: rgb(77, 85, 93);
                }
            }
        }
    }
    .switch {
        padding: 24rem/$r 36rem/$r;
        line-height: 48rem/$r;
        border-bottom: rgba(7, 17, 27, .1);
        color: rgb(147, 153, 159);
        font-size: 0;
        &.on {
            .icon-check_circle {
                color: #00c850;
            }
        }
        .icon-check_circle {
            display: inline-block;
            vertical-align: top;
            margin-right: 8rem/$r;
            font-size: 48rem/$r;
        }
        .text {
            display: inline-block;
            vertical-align: top;
            font-size: 24rem/$r;
        }
    }
}
</style>