<template>
    <span class="icon" :class="this.classMap[iconType] + classify"></span>
</template>

<script type = "text/ecmasrcipt-6">


export default {
    props: ['iconType','classify'],
    created(){
          this.classMap = [
              'decrease_',
               'discount_', 
               'special_', 
               'invoice_', 
               'guarantee_'
            ];
    }
}
</script>


<style lang="scss">
.icon {
    display: inline-block;
    vertical-align: top;
    width: 24rem/$r;
    height: 24rem/$r;
    margin-right: 8rem/$r;
    background-size: 24rem/$r 24rem/$r;
    background-repeat: no-repeat;
    &.decrease_1 {
        @include bg-image(decrease_1);
    }
    &.discount_1 {
        @include bg-image(discount_1);
    }
    &.guarantee_1 {
        @include bg-image(guarantee_1);
    }
    &.invoice_1 {
        @include bg-image(invoice_1);
    }
    &.special_1 {
        @include bg-image(special_1);
    }
    &.decrease_2 {
        @include bg-image(decrease_2);
    }
    &.discount_2 {
        @include bg-image(discount_2);
    }
    &.guarantee_2 {
        @include bg-image(guarantee_2);
    }
    &.invoice_2 {
        @include bg-image(invoice_2);
    }
    &.special_2 {
        @include bg-image(special_2);
    }
    &.decrease_3 {
        @include bg-image(decrease_3);
    }
    &.discount_3 {
        @include bg-image(discount_3);
    }
    &.guarantee_3 {
        @include bg-image(guarantee_3);
    }
    &.invoice_3 {
        @include bg-image(invoice_3);
    }
    &.special_3 {
        @include bg-image(special_3);
    }
    &.decrease_4 {
        @include bg-image(decrease_4);
    }
    &.discount_4 {
        @include bg-image(discount_4);
    }
    &.guarantee_4 {
        @include bg-image(guarantee_4);
    }
    &.invoice_4 {
        @include bg-image(invoice_4);
    }
    &.special_4 {
        @include bg-image(special_4);
    }
}
</style>