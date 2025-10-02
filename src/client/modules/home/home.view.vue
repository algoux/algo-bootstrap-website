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
import { Prop, Inject } from 'vue-property-decorator';

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
  },
})
@RenderMethod(RenderMethodKind.SSR)
export default class Home extends Vue {
  @Inject()
  @Prop()
  homeState!: GetPlatformInfoDTO;
  @Prop()
  @Inject()
  isMobile!: boolean;

  mounted() {
    window.scrollTo(0, 0);
  }
}
</script>

<template>
  <div class="home">
    <HomeDisplay
      :platform="homeState.os"
      :arch="homeState.architecture"
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
