<template>
      <div class="header">
            <div class="content-wrapper">
                  <div class="avater">
                        <img width="64" height="64" :src="seller.avatar">
                  </div>
                  <div class="content">
                        <div class="title">
                              <span class="brand"></span>
                              <span class="name">{{seller.name}}</span>
                        </div>
                        <div class="description">
                              {{seller.description}}/{{seller.deliveryTime}}分钟送到
                        </div>
                        <div v-if="seller.supports" class="support">
                              <icon :classify="1" :icon-type="seller.supports[0].type"></icon>
                              <span class="text">{{seller.supports[0].description}}</span>
                        </div>
                  </div>
                  <div v-if="seller.supports" class="support-count" @click="showDetail">
                        <span class="count">{{seller.supports.length}}个</span>
                        <i class="icon-keyboard_arrow_right"></i>
                  </div>
            </div>
            <div class="bulletin-wrapper" @click="showDetail">
                  <span class="bulletin-title"></span>
                  <span class="bulletin-text">{{seller.bulletin}}</span>
                  <i class="icon-keyboard_arrow_right"></i>
            </div>
            <div class="background">
                  <img :src="seller.avatar" width="100%" height="100%">
            </div>
            <transition name="fade">
                  <div v-show="detailShow" class="detail">
                        <div class="detail-wrapper clearfix">
                              <div class="detail-main">
                                    <h1 class="name">{{seller.name}}</h1>
                                    <div class="star-wrapper">
                                          <star :size="48" :score="seller.score"></star>
                                    </div>
                                    <div class="title">
                                          <div class="line"></div>
                                          <div class="text">优惠信息</div>
                                          <div class="line"></div>
                                    </div>
                                    <ul v-if="seller.supports" class="supports">
                                          <li class="support-item" v-for="(item,index) in seller.supports">
                                                <icon :classify="2" :icon-type="seller.supports[index].type" />
                                                <span class="text">{{seller.supports[index].description}}</span>
                                          </li>
                                    </ul>
                                    <div class="title">
                                          <div class="line"></div>
                                          <div class="text">商家公告</div>
                                          <div class="line"></div>
                                    </div>
                                    <div class="bulletin">
                                          <p class="content">
                                                {{seller.bulletin}}
                                          </p>
                                    </div>
                              </div>
                        </div>
                        <div class="detaill-close" @click="hideDetail">
                              <i class="icon-close"></i>
                        </div>
                  </div>
            </transition>
      </div>
</template>

<script type = "text/ecmasrcipt-6">
import star from 'components/star/star';
import icon from 'components/icon/icon'

export default {
      props: ['seller'],
      data() {
            return {
                  detailShow: false
            }
      },
      methods: {
            showDetail() {
                  this.detailShow = true;
            },
            hideDetail() {
                  this.detailShow = false;
            }
      },
      components: {
            star,
            icon
      }
}
</script>


<style lang="scss">
.header {
      color: #fff;
      position: relative;
      background: rgba(7, 17, 27, .5);
      .content-wrapper {
            padding: 48rem/$r 24rem/$r 36rem/$r 48rem/$r;
            font-size: 0;
            position: relative;
            .avater {
                  display: inline-block;
                  vertical-align: top;
                  img {
                        border-radius: 4rem/$r;
                  }
            }
            .content {
                  display: inline-block;
                  margin-left: 32rem/$r;
                  .title {
                        margin: 4rem/$r 0 16rem/$r 0;
                        .brand {
                              width: 60rem/$r;
                              height: 36rem/$r;
                              display: inline-block;
                              @include bg-image(brand);
                              vertical-align: top;
                              background-size: 60rem/$r 36rem/$r;
                              background-repeat: no-repeat;
                        }
                        .name {
                              margin-left: 12rem/$r;
                              font-size: 32rem/$r;
                              font-weight: bold;
                              line-height: 36rem/$r;
                        }
                  }
                  .description {
                        margin-bottom: 20rem/$r;
                        line-height: 24rem/$r;
                        font-size: 24rem/$r;
                  }
                  .support {
                        .text {
                              line-height: 24rem/$r;
                              font-size: 20rem/$r;
                        }
                  }
            }
            .support-count {
                  position: absolute;
                  right: 24rem/$r;
                  bottom: 28rem/$r;
                  padding: 0 16rem/$r;
                  height: 48rem/$r;
                  line-height: 48rem/$r;
                  border-radius: 28rem/$r;
                  background: rgba(0, 0, 0, 0.2);
                  text-align: center;
                  .count {
                        font-size: 20rem/$r;
                        vertical-align: top;
                  }
                  .icon-keyboard_arrow_right {
                        margin-left: 4rem/$r;
                        line-height: 48rem/$r;
                        font-size: 20rem/$r;
                  }
            }
      }
      .bulletin-wrapper {
            position: relative;
            overflow: hidden;
            height: 56rem/$r;
            line-height: 56rem/$r;
            padding: 0 44rem/$r 10rem/$r 24rem/$r;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            background: rgba(7, 17, 27, .2);
            .bulletin-title {
                  vertical-align: middle;
                  display: inline-block;
                  margin-top: 14rem/$r;
                  width: 44rem/$r;
                  height: 24rem/$r;
                  @include bg-image(bulletin);
                  background-size: 44rem/$r 24rem/$r;
                  background-repeat: no-repeat;
            }
            .bulletin-text {
                  margin: 0 8rem/$r;
                  font-size: 20rem/$r;
            }
            .icon-keyboard_arrow_right {
                  position: absolute;
                  font-size: 20rem/$r;
                  right: 24rem/$r;
                  top: 26rem/$r;
            }
      }
      .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter: blur(20rem/$r);
      }
      .detail {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            overflow: auto;
            opacity: 1;
            background: rgba(7, 17, 27, .8);
            backdrop-filter: blur(20rem/$r);
            &.fade-enter-active,
            &.fade-leave-active {
                  transition: all .5s;
            }
            &.fade-enter,
            &.fade-leave-active {
                  opacity: 0;
                  background: rgba(7, 17, 27, 0);
            }
            .detail-wrapper {
                  min-height: 100%;
                  width: 100%;
                  .detail-main {
                        margin-top: 128rem/$r;
                        padding-bottom: 128rem/$r;
                        .name {
                              line-height: 32rem/$r;
                              text-align: center;
                              font-size: 32rem/$r;
                              font-weight: 700;
                        }
                        .star-wrapper {
                              margin-top: 36rem/$r;
                              padding: 4rem/$r 0;
                              text-align: center;
                        }
                        .title {
                              display: flex;
                              width: 80%;
                              margin: 56rem/$r auto 48rem/$r auto;
                              .line {
                                    flex: 1;
                                    position: relative;
                                    top: -12rem/$r;
                                    border-bottom: 1px solid rgba(255, 255, 255, .2);
                              }
                              .text {
                                    padding: 0 24rem/$r;
                                    font-weight: 700;
                                    font-size: 28rem/$r;
                              }
                        }
                        .supports {
                              width: 80%;
                              margin: 0 auto;
                              .support-item {
                                    padding: 0 24rem/$r;
                                    margin-bottom: 24rem/$r;
                                    font-size: 0;
                                    &:last-child {
                                          margin-bottom: 0;
                                    }
                                    .text {
                                          font-size: 24rem/$r;
                                          line-height: 32rem/$r;
                                    }
                              }
                        }
                        .bulletin {
                              width: 80%;
                              margin: 0 auto;
                              .content {
                                    padding: 0 24rem/$r;
                                    line-height: 48rem/$r;
                                    font-size: 24rem/$r;
                              }
                        }
                  }
            }
            .detaill-close {
                  position: relative;
                  width: 64rem/$r;
                  height: 64rem/$r;
                  margin: -128rem/$r auto 0 auto;
                  clear: both;
                  font-size: 64rem/$r;
            }
      }
}
</style>


 