<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import Beams from '@client/components/beams.vue';
import NavBar from '@client/components/nav-bar.vue';
import { ElBacktop } from 'element-plus';
import DownloadButton from '@client/components/download-button.vue';
import { getPlatformInfo } from '@client/utils';
import Display from './display.vue';
import GuideContainer from './guide-container.vue';
import HomeFooter from '@client/components/home-footer.vue';

@View('/')
@Options({
  components: {
    Beams,
    NavBar,
    DownloadButton,
    Display,
    GuideContainer,
    ElBacktop,
    HomeFooter,
  },
})
export default class Home extends Vue {
  homeState = {
    isMobile: false,
  };
  private checkIfMobile = () => {
    this.homeState.isMobile = window.innerWidth < 768;
  };

  private handleResize = () => {
    this.checkIfMobile();
  };

  get getPlatform() {
    return getPlatformInfo();
  }

  mounted() {
    this.checkIfMobile();
    window.addEventListener('resize', this.handleResize);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
}
</script>

<template>
  <div class="home">
    <Display :platform="this.getPlatform.os" :isMobile="homeState.isMobile" />
    <GuideContainer />
    <HomeFooter />
    <Beams
      :beam-width="2"
      :beam-height="15"
      :beam-number="12"
      :speed="2"
      :noise-intensity="1.75"
      :scale="0.15"
      :rotation="30"
      v-if="!homeState.isMobile"
    />
    <el-backtop v-if="!homeState.isMobile" :right="100" :bottom="100" :style="{ zIndex: 999 }" />
  </div>
</template>

<style scoped lang="less">
.home {
  width: 100vw;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
