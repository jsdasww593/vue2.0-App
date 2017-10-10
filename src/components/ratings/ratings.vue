<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @select="selectRating" @toggle="toggleContent">
      </rating-select>
      <div class="ratings-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)" class="rating-item border-1px">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type = "text/ecmasrcipt-6">
import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from 'components/split/split';
import { formatDate } from 'common/js/date';
import ratingSelect from 'components/ratingselect/ratingselect';

const ALL = 2;
const ERRO_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
    }
  },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;
      if (response.errno === ERRO_OK) {
        this.ratings = response.data;
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        });
      }
    });
  },
  methods: {
    needShow(type, text) {
      if (this.onlyContent && !text) return false;
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
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
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  components: {
    star,
    split,
    ratingSelect
  }
}
</script>


<style lang="scss">
.ratings {
  position: absolute;
  top: 348rem/$r;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 36rem/$r 0;
    .overview-left {
      flex: 0 0 274rem/$r;
      padding: 12rem/$r 0;
      width: 274rem/$r;
      border-right: 2rem/$r solid rgba(7, 17, 27, .1);
      text-align: center;
      @media only screen and (max-width: 640rem/$r) {

        flex: 0 0 240rem/$r;
        width: 240rem/$r;
      }
      .score {
        margin-bottom: 12rem/$r;
        font-size: 48rem/$r;
        line-height: 56rem/$r;
        color: rgb(255, 153, 0);
      }
      .title {
        padding-bottom: 12rem/$r;
        margin-bottom: 16rem/$r;
        line-height: 24rem/$r;
        font-size: 24rem/$r;
        color: rgb(7, 17, 27);
      }
      .rank {
        line-height: 20rem/$r;
        font-size: 20rem/$r;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 12rem/$r 0 12rem/$r 48rem/$r;
      @media only screen and (max-width: 640rem/$r) {
        padding-left:12rem/$r;
      }
      .score-wrapper {
        margin-bottom: 16rem/$r;
        font-size: 0;
        .title {
          display: inline-block;
          vertical-align: top;
          font-size: 24rem/$r;
          line-height: 36rem/$r;
          color: rgb(7, 17, 27);
        }
        .star {
          display: inline-block;
          margin: 0 24rem/$r;
          vertical-align: top;
        }
        .score {
          display: inline-block;
          line-height: 36rem/$r;
          vertical-align: top;
          font-size: 24rem/$r;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper {
        font-size: 0;
        .title {
          font-size: 24rem/$r;
          line-height: 36rem/$r;
          color: rgb(7, 17, 27);
        }
        .delivery {
          margin-left: 24rem/$r;
          font-size: 24rem/$r;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
  .ratings-wrapper {
    padding: 0 36rem/$r;
    .rating-item {
      display: flex;
      padding: 36rem/$r 0;
      position: relative;
      &:after {
        @include border-1px(rgba(7, 17, 27, .1));
      }
      .avatar {
        flex: 0 0 56rem/$r;
        width: 56rem/$r;
        margin-right: 24rem/$r;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        .name {
          margin-bottom: 8rem/$r;
          line-height: 24rem/$r;
          font-size: 20rem/$r;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          margin-bottom: 12rem/$r;
          font-size: 0;
          .star {
            display: inline-block;
            vertical-align: top;
            margin-right: 12rem/$r;
          }
          .delivery {
            display: inline-block;
            vertical-align: top;
            line-height: 24rem/$r;
            font-size: 20rem/$r;
            color: rgb(147, 153, 159);
          }
        }
        .text {
          margin-bottom: 16rem/$r;
          line-height: 36rem/$r;
          color: rgb(7, 17, 27);
          font-size: 24rem/$r;
        }
        .recommend {
          line-height: 32rem/$r;
          font-size: 0;
          .icon-thumb_up,
          .item {
            display: inline-block;
            margin: 0 16rem/$r 8rem/$r 0;
            font-size: 18rem/$r;
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
          .item {
            padding: 0 12rem/$r;
            border: 2rem/$r solid rgba(7, 17, 27, .1);
            border-radius: 2rem/$r;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 24rem/$r;
          font-size: 20rem/$r;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>


 