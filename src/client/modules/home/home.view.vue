<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import Beams from '@client/components/beams.vue';
import NavBar from '@client/components/nav-bar.vue';

import DownloadButton from '@client/components/download-button.vue';
import { getPlatformInfo } from '@client/utils';
import Display from './display.vue';
import GuideContainer from './guide-container.vue';

@View('/')
@Options({
  components: {
    Beams,
    NavBar,
    DownloadButton,
    Display,
    GuideContainer
  },
})
export default class Home extends Vue {
  get getPlatform() {
    return getPlatformInfo();
  }
}
</script>

<template>
  <div class="home">
    <Display :platform="this.getPlatform.os" />
    <GuideContainer />
    <Beams
      :beam-width="2"
      :beam-height="15"
      :beam-number="12"
      :speed="2"
      :noise-intensity="1.75"
      :scale="0.15"
      :rotation="30"
    />
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
