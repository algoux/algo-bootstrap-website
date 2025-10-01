<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import ReleaseItem from '@client/components/release-item.vue';
import HomeFooter from '@client/components/home-footer.vue';
import { DataConfig } from '@client/utils/data.config';
import { RenderMethod, RenderMethodKind } from 'bwcx-client-vue3';
import axios from 'axios';
import { GetReleasesDTO } from '@common/modules/releases/releases.dto';
@View('/releases')
@Options({
  components: {
    ReleaseItem,
    HomeFooter,
  },
})
@RenderMethod(RenderMethodKind.SSR)
export default class Releases extends Vue {
  releasesState: GetReleasesDTO = {
    version: '', // 默认版本，避免空字符串
    url: '',
    releaseDate: '',
    releasesInfo: {} as any,
  };

  get getHistoricalReleases() {
    return DataConfig.GITHUB_RELEASES;
  }

  async asyncData() {
    try {
      const response = await axios.get('https://cdn.algoux.cn/algo-bootstrap/version.json?t=' + Date.now());
      return {
        releasesState: response.data,
      }
    } catch (error) {
      console.error('Failed to load release data in asyncData:', error);
      return {
        releasesState: this.releasesState, // 使用默认值
      }
    }
  }

  async mounted() {
    // 客户端也加载数据，确保数据同步
    try {
      const response = await axios.get('https://cdn.algoux.cn/algo-bootstrap/version.json?t=' + Date.now());
      this.releasesState = response.data;
    } catch (error) {
      console.error('Failed to load release data in mounted:', error);
    }
  }
}
</script>

<template>
  <div class="release">
    <header class="release-header">下载 Algo Bootstrap</header>
    <div class="release-container">
      <ReleaseItem :platform="'windows'" :version="releasesState.version" />
      <ReleaseItem :platform="'mac'" :version="releasesState.version" />
      <a :href="getHistoricalReleases" class="old-version" target="_blank">浏览历史版本</a>
    </div>
    <home-footer />
  </div>
</template>

<style scoped lang="less">
@import url('../../index.less');
.release {
  width: 100%;
  height: 100vh;
  gap: 70px;
  position: relative;
  @media screen and (max-width: 1200px) {
    height: auto;
    gap: 40px;
  }
  padding-top: 90px;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  &-header {
    font-size: var(--font-large-size);
    font-weight: 700;
    color: var(--font-primary-color);
  }

  &-container {
    width: 100%;
    height: auto;
    display: flex;
    @media screen and (max-width: 1200px) {
      flex-direction: column;
      gap: 20px;
      margin-bottom: 100px;
    }

    @media screen and (max-width: 768px) {
      margin-bottom: 50px;
    }
    gap: 0px;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .old-version {
    position: absolute;
    bottom: 0;
    transform: translateY(100px);
    font-size: var(--font-small-size);
    color: var(--font-secondary-color);
    transition: color 0.3s ease;

    &:hover {
      color: var(--font-primary-color);
    }
  }
}
</style>
