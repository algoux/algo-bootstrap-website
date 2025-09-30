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
import { GetReleasesDTO } from '@common/modules/releases/releases.dto';

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
    version: '1.0.0-beta.1', // 默认版本，避免空字符串
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
    // 检查是否在浏览器环境中
    if (typeof window !== 'undefined') {
      this.isMobile = window.innerWidth < 768;
    } else {
      // 服务端默认为非移动设备
      this.isMobile = false;
    }
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
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  }
  async created() {
    this.loadVersionData();
  }

  async loadVersionData() {
    try {
      const response = await axios.get('https://cdn.algoux.cn/algo-bootstrap/version.json?t=' + Date.now());
      this.homeState = response.data;
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
    <client-only>
      <Beams
        :beam-width="2"
        :beam-height="15"
        :beam-number="12"
        :speed="2"
        :noise-intensity="1.75"
        :scale="0.15"
        :rotation="30"
        :isMobile="this.isMobile"
      />
    </client-only>
    <ClientOnly>
      <back-top v-if="!isMobile" />
    </ClientOnly>
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
