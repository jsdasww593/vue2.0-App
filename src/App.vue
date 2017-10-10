<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view :seller="seller" keep-a></router-view>
    </keep-alive>
  </div>
</template>

<script type = "text/ecmasrcipt-6">
import { urlParse } from 'common/js/util';
import Header from 'components/header/header';
import Tab from 'components/tab/tab';

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParm = urlParse();
          return queryParm.id;
        })()
      }
    }
  },
  created() {
    this.$http.get('api/seller?id=' + this.seller.id).then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data);
      };
    });
  },
  components: {
    "v-header": Header,
    "v-tab": Tab
  }
};

</script>

<style lang="scss">

</style>


