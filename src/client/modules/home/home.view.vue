<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import Beams from '@client/components/beams.vue';
import NavBar from '@client/components/nav-bar.vue';
import DownloadButton from '@client/components/download-button.vue';
import { getPlatformInfo } from '@client/utils';
import Display from './display.vue';
import GuideContainer from './guide-container.vue';
import HomeFooter from '@client/components/home-footer.vue';
import BackTop from '@client/components/backtop.vue';

@View('/')
@Options({
  components: {
    Beams,
    NavBar,
    DownloadButton,
    Display,
    GuideContainer,
    BackTop,
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
      :isMobile="homeState.isMobile"
    />
    <back-top v-if="!homeState.isMobile" />
  </div>
</template>

<style scoped lang="less">
.backtop {
  background: var(--glass-border-color) !important;
  backdrop-filter: blur(10px);

  :deep(.el-icon) {
    color: #ffffff !important;
  }
  
  :deep(svg) {
    color: #ffffff !important;
    fill: #ffffff !important;
  }
  
  :deep(svg path) {
    fill: #ffffff !important;
    stroke: #ffffff !important;
  }
}

.home {
  width: 100vw;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
