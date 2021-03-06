<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">
          {{seller.name}}
        </h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单 </span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="togggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <icon :classify="4" :icon-type="seller.supports[index].type" />
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title" border-1px>商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos">
            {{info}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type = "text/ecmasrcipt-6">
import { saveToLocal, loadFromLocal } from 'common/js/store';
import BScroll from 'better-scroll';
import star from 'components/star/star';
import split from 'components/split/split';
import icon from 'components/icon/icon';

export default {
  props: ['seller'],
  data() {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    }
  },
  components: {
    star,
    split,
    icon
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  mounted() {
    this._initScroll();
    this._initPics();
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });
    },
    _initPics() {
      /* 计算图片列表的ul宽度并设置横向滚动 */
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
        this.$nextTick(() => {
          this.picScroll = new BScroll(this.$refs.picWrapper, {
            scrollX: true,
            eventPassthrough: 'vertical'
          });
        });
      }
    },
    togggleFavorite(e) {
      if (!e._constructed) return;
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    }
  }
}
</script>


<style lang="scss">
.seller {
  position: absolute;
  top: 348rem/$r;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    position: relative;
    padding: 36rem/$r;
    .title {
      margin-bottom: 16rem/$r;
      line-height: 28rem/$r;
      color: rgb(7, 17, 27);
      font-size: 28rem/$r;
    }
    .desc {
      padding-bottom: 36rem/$r;
      position: relative;
      &:after {
        @include border-1px(rgba(7, 17, 27, .1));
      }
      font-size:0;
      .star {
        display: inline-block;
        vertical-align: top;
        margin-right: 16rem/$r;
      }
      .text {
        margin-right: 24rem/$r;
        line-height: 36rem/$r;
        display: inline-block;
        vertical-align: top;
        font-size: 20rem/$r;
        color: rgb(77, 85, 93);
      }
    }
    .remark {
      display: flex;
      padding-top: 36rem/$r;
      .block {
        flex: 1;
        text-align: center;
        border-right: 2rem/$r solid rgba(7, 17, 27, .1);
        &:last-child {
          border: none;
        }
        h2 {
          margin-bottom: 8rem/$r;
          line-height: 20rem/$r;
          font-size: 20rem/$r;
          color: rgb(147, 153, 159);
        }
        .content {
          line-height: 48rem/$r;
          font-size: 20rem/$r;
          color: rgb(7, 17, 27);
          .stress {
            font-size: 48rem/$r;
          }
        }
      }
    }
    .favorite {
      position: absolute;
      width: 100rem/$r;
      right: 22rem/$r;
      top: 36rem/$r;
      text-align: center;
      .icon-favorite {
        display: block;
        line-height: 48rem/$r;
        font-size: 48rem/$r;
        color: #d4d6d9;
        &.active {
          color: rgb(240, 20, 20);
        }
      }
      .text {
        line-height: 20rem/$r;
        font-size: 20rem/$r;
        color: rgb(77, 85, 93);
      }
    }
  }
  .bulletin {
    padding: 36rem/$r 36rem/$r 0 36rem/$r;
    .title {
      margin-bottom: 16rem/$r;
      line-height: 28rem/$r;
      color: rgb(7, 17, 27);
      font-size: 28rem/$r;
    }
    .content-wrapper {
      position: relative;
      padding: 0 24rem/$r 32rem/$r 24rem/$r;
      &:after {
        @include border-1px(rgba(7, 17, 27, .1));
      }
      .content {
        line-height: 48rem/$r;
        color: rgb(240, 20, 20);
        font-size: 24rem/$r;
      }
    }
    .supports {
      .support-item {
        position: relative;
        padding: 32rem/$r 24rem/$r;
        &:after {
          @include border-1px(rgba(7, 17, 27, .1));
        }
        &:last-child {
          &:after {
            @include border-none();
          }
        }
        font-size:0;
      }
      .text {
        line-height: 32rem/$r;
        font-size: 24rem/$r;
        color: rgb(7, 17, 27);
      }
    }
  }
  .pics {
    padding: 36rem/$r;
    .title {
      margin-bottom: 24rem/$r;
      line-height: 28rem/$r;
      color: rgb(7, 17, 27);
      font-size: 28rem/$r;
    }
    .pic-wrapper {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      .pic-list {
        font-size: 0;
        .pic-item {
          display: inline-block;
          margin-right: 12rem/$r;
          width: 240rem/$r;
          height: 180rem/$r;
          &:last-child {
            margin: 0;
          }
        }
      }
    }
  }
  .info {
    padding: 36rem/$r 36rem/$r 0 36rem/$r;
    color: rgb(7, 17, 27);
    .title {
      position: relative;
      padding-bottom: 24rem/$r;
      line-height: 28rem/$r;
      &:after {
        @include border-1px(rgba(7, 17, 27, .1));
      }
      font-size: 28rem/$r;
    }
    .info-item {
      position: relative;
      padding: 32rem/$r 24rem/$r;
      line-height: 32rem/$r;
      &:after {
        @include border-1px(rgba(7, 17, 27, .1));
      }
      font-size: 24rem/$r;
      &:last-child {
        &:after {
          @include border-none();
        }
      }
    }
  }
}
</style>