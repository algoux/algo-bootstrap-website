<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import NavBar from '@client/components/nav-bar.vue';
import DownloadButton from '@client/components/download-button.vue';
import GuideContainer from './guide-container.vue';
import HomeFooter from '@client/components/home-footer.vue';
import BackTop from '@client/components/backtop.vue';
import { RenderMethod, RenderMethodKind } from 'bwcx-client-vue3';
import HomeDisplay from './home-display.vue';
import { GetPlatformInfoDTO } from '@common/modules/platform/platform.dto';
import Download from '@client/components/svgs/download.vue';
import { AsyncDataOptions } from '@client/typings';
import beams from '@client/components/beams.vue';
import { Prop } from 'vue-property-decorator';
import { Provide } from 'vue-property-decorator';
import { ElDialog, ElButton } from 'element-plus';
import MacUndetectedDialog from '@client/components/mac-undetected-dialog.vue';
import { UAParser } from 'ua-parser-js';
import { GetArchitecture } from '@common/modules/platform/platform.dto';
import { parseArch } from '@client/utils/parseArch';

@View('/')
@Options({
  components: {
    NavBar,
    DownloadButton,
    HomeDisplay,
    GuideContainer,
    BackTop,
    HomeFooter,
    Download,
    beams,
    ElDialog,
    ElButton,
    MacUndetectedDialog,
  },
})
@RenderMethod(RenderMethodKind.SSR)
export default class Home extends Vue {
  @Prop()
  @Provide()
  homeState!: GetPlatformInfoDTO;

  @Prop()
  isMobile!: boolean;

  @Provide({ reactive: true })
  isUnDetectedMac: boolean = false;

  @Provide({ reactive: true })
  isOpenMacPlatformSelectWindow: boolean = false;

  @Provide()
  openMacPlatformSelectWindow() {
    this.isOpenMacPlatformSelectWindow = true;
    console.log(`now is ${this.isOpenMacPlatformSelectWindow}`);
  }

  @Provide()
  closeMacPlatformSelectWindow() {
    this.isOpenMacPlatformSelectWindow = false;
  }

  @Provide({ reactive: true })
  arch: GetArchitecture = null;

  async getArchitecture(): Promise<GetArchitecture> {
    const parser = new UAParser();
    let architecture = parser.getResult().cpu.architecture;
    if (architecture === undefined) {
      if ((navigator as any).userAgentData) {
        const uaData = await (navigator as any).userAgentData.getHighEntropyValues(['architecture']);
        architecture = uaData.architecture;
      }
    }
    console.log('Detected architecture:', architecture);
    console.log('Parsed architecture:', parseArch(architecture));
    return parseArch(architecture);
  }

  async mounted() {
    window.scrollTo(0, 0);
    this.arch = await this.getArchitecture();
    if (!this.arch && this.homeState.os === 'mac') {
      this.isUnDetectedMac = true;
    }
    console.log('Architecture set in HomeView mounted:', this.arch);
  }

  async asyncData({ apiClient }: AsyncDataOptions) {
    try {
      const res = await apiClient.getPlatformInfo();
      console.log(res);
      return {
        homeState: res,
        isMobile: res.os !== 'windows' && res.os !== 'mac',
      };
    } catch (error) {
      console.error('Failed to fetch platform info:', error);
    }
  }
}
</script>

<template>
  <div class="home">
    <HomeDisplay
      :platform="homeState.os"
      :isMobile="isMobile"
      :releasesTime="homeState.releases.releaseDate"
      :version="homeState.releases.version"
    />
    <GuideContainer :platform="homeState.os" />
    <client-only>
      <!-- <transition name="beams" appear>
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
      </transition> -->
      <beams />
    </client-only>
    <div
      class="to-download-button"
      @click="
        this.$router.push({
          name: 'Releases',
        })
      "
    >
      <Download />
      前往下载
    </div>
    <ClientOnly>
      <back-top v-if="!isMobile" />
    </ClientOnly>
    <HomeFooter />
    <MacUndetectedDialog />
  </div>
</template>

<style scoped lang="less">
.to-download-button {
  padding: 10px 15px;
  @media screen and (min-width: 768px) {
    padding: 15px 20px;
  }
  @media screen and (min-width: 1700px) {
    padding: 20px 25px;
  }
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  border-radius: 100px;
  font-size: var(--font-small-size);
  font-weight: 600;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 100px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  outline: 1px solid rgba(255, 255, 255, 0.4);
  color: var(--font-secondary-color);
  transition: color 0.5s ease;
  cursor: pointer;
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
.beams-enter-active,
.beams-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.beams-enter-from,
.beams-leave-to {
  opacity: 0;
}
</style>
