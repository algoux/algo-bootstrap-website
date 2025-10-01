<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
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
import { markRaw } from 'vue';

@View('/')
@Options({
  components: {
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

  // 动态加载 Beams 组件
  BeamsComponent: any = null;
  isBeamsLoaded: boolean = false;
  areAllResourcesLoaded: boolean = false;

  private checkIfMobile = () => {
    const platformInfo = getPlatformInfo();
    if (typeof window !== 'undefined') {
      const isDesktopPlatform = platformInfo.os === 'mac' || platformInfo.os === 'windows';
      this.isMobile = !isDesktopPlatform;
    } else {
      // 服务端默认为非移动设备
      this.isMobile = false;
    }
  };  private handleResize = () => {
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

    // 等待所有资源加载完成后再加载 Beams 组件
    this.waitForResourcesAndLoadBeams();
  }

  async waitForResourcesAndLoadBeams() {
    // 等待 DOM 完全加载
    await this.$nextTick();

    // 等待版本数据加载完成
    while (!this.homeState.version) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // 等待图片和其他资源加载完成
    if (document.readyState === 'complete') {
      this.loadBeamsComponent();
    } else {
      window.addEventListener('load', () => {
        // 额外延迟一点时间确保所有资源都已加载
        setTimeout(() => {
          this.loadBeamsComponent();
        }, 500);
      });
    }
  }

  async loadBeamsComponent() {
    try {
      // 动态导入 Beams 组件
      const BeamsModule = await import('@client/components/beams.vue');
      // 使用 markRaw 避免 Vue 将组件转为响应式对象
      this.BeamsComponent = markRaw(BeamsModule.default);

      // 动态注册组件
      this.$options.components = this.$options.components || {};
      this.$options.components.DynamicBeams = markRaw(BeamsModule.default);

      this.isBeamsLoaded = true;
      this.areAllResourcesLoaded = true;
      console.log('Beams component loaded successfully');
    } catch (error) {
      console.error('Failed to load Beams component:', error);
    }
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
    <client-only>
      <!-- 动态加载的 Beams 组件，带过渡效果 -->
      <transition name="beams" appear>
        <component
          v-if="isBeamsLoaded && BeamsComponent"
          :is="BeamsComponent"
          :beam-width="2"
          :beam-height="15"
          :beam-number="12"
          :speed="2"
          :noise-intensity="1.75"
          :scale="0.15"
          :rotation="30"
          :isMobile="this.isMobile"
        />
      </transition>
    </client-only>
    <client-only>
      <div
        class="to-download-button"
        @click="
          this.$router.push({
            name: 'Releases',
          })
        "
      >
        前往下载
      </div>
    </client-only>
    <ClientOnly>
      <back-top v-if="!isMobile" />
    </ClientOnly>
    <HomeFooter />
  </div>
</template>

<style scoped lang="less">
.to-download-button {
  width: fit-content;
  height: fit-content;
  padding: 5px 20px;
  font-size: var(--font-small-size);
  background-color: var(--glass-bg-color);
  border: 2px solid var(--glass-border-color);
  border-radius: 100px;
  cursor: pointer;
  color: var(--font-secondary-color);
  z-index: 10;
  transition: color 0.3s ease;
  margin: 50px;
  &:hover {
    color: var(--font-primary-color);
  }
}

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

/* 动态组件过渡效果 */
.beams-enter-active, .beams-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.beams-enter-from, .beams-leave-to {
  opacity: 0;
}
</style>
