<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import Beams from '@client/components/beams.vue';
import NavBar from '@client/components/nav-bar.vue';
import DownloadButton from '@client/components/download-button.vue';
import { getPlatformInfo } from '@common/utils/platform-ssr.util';
import GuideContainer from './guide-container.vue';
import HomeFooter from '@client/components/home-footer.vue';
import BackTop from '@client/components/backtop.vue';
import { RenderMethod, RenderMethodKind } from 'bwcx-client-vue3';
import HomeDisplay from './home-display.vue';
import axios from 'axios';
import GetReleasesDTO from '@common/modules/releases/releases.dto';

@View('/')
@Options({
  components: {
    Beams,
    NavBar,
    DownloadButton,
    HomeDisplay,
    GuideContainer,
    BackTop,
    HomeFooter,
  },
})
@RenderMethod(RenderMethodKind.SSR)
export default class Home extends Vue {
  homeState: GetReleasesDTO = {
    version: '',
    releaseDate: '',
    url: '',
    releasesInfo: {} as any,
  };
  isMobile: boolean = false;
  // 默认值，避免SSR水合不匹配
  platform: string = 'windows';
  arch: string = 'x64';
  isClientMounted: boolean = false;

  private checkIfMobile = () => {
    this.isMobile = window.innerWidth < 768;
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

    // 客户端平台检测
    const platformInfo = getPlatformInfo();
    this.platform = platformInfo.os !== 'Unknown' ? platformInfo.os : 'windows';
    this.arch = platformInfo.architecture !== 'Unknown' ? platformInfo.architecture : 'x64';
    this.isClientMounted = true;
    console.log('Home View Info:', this.homeState);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
  created() {
    try {
      axios.get('https://cdn.algoux.cn/algo-bootstrap/version.json').then((response) => {
        console.log('Home View Data loaded:', response.data);
        this.homeState = response.data;
      });
    } catch (error) {
      console.error('Failed to load home view data:', error);
      this.homeState = this.homeState; // 使用默认值
    }
  }
}
</script>

<template>
  <div class="home">
    <HomeDisplay
      :platform="platform"
      :arch="arch"
      :isMobile="isMobile"
      :isClientMounted="isClientMounted"
      :releasesTime="homeState.releaseDate"
      :version="homeState.version"
    />
    <GuideContainer :platform="platform" />
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
