<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item"></span>
    </div>
</template>

<script type = "text/ecmasrcipt-6">

const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';

export default {
    props: ['size', 'score'],
    computed: {
        starType() {
            return 'star-' + this.size;
        },
        itemClasses() {
            /* 计算除当前存入的值是否大于*.5并不是整数,是则认为是半颗星并添加对应类名前缀.*/
            let result = [];
            let score = (this.score * 2 >> 0) / 2;
            let hasDecimal = score % 1 !== 0;
            let integer = (score >> 0);
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON);
            }
            if (hasDecimal) result.push(CLS_HALF);
            while (result.length < LENGTH) {
                result.push(CLS_OFF);
            };
            return result;
        }
    }
}
</script>


<style lang="scss">
.star {
    font-size: 0;
    .star-item {
        display: inline-block;
        background-repeat: no-repeat;
    }
    &.star-48 {
        .star-item {
            width: 40rem/$r;
            height: 40rem/$r;
            margin-right: 44rem/$r;
            background-size: 40rem/$r 40rem/$r;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                @include bg-image(star48_on);
            }
            &.half {
                @include bg-image(star48_half);
            }
            &.off {
                @include bg-image(star48_off);
            }
        }
    }
    &.star-36 {
        .star-item {
            width: 30rem/$r;
            height: 30rem/$r;
            margin-right: 12rem/$r;
            background-size: 30rem/$r 30rem/$r;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                @include bg-image(star36_on);
            }
            &.half {
                @include bg-image(star36_half);
            }
            &.off {
                @include bg-image(star36_off);
            }
        }
    }
    &.star-24 {
        .star-item {
            width: 20rem/$r;
            height: 20rem/$r;
            margin-right: 6rem/$r;
            background-size: 20rem/$r 20rem/$r;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                @include bg-image(star24_on);
            }
            &.half {
                @include bg-image(star24_half);
            }
            &.off {
                @include bg-image(star24_off);
            }
        }
    }
}
</style>