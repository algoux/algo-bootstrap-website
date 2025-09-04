<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import ReleaseItem from '@client/components/release-item.vue';
import HomeFooter from '@client/components/home-footer.vue';

@View('/releases')
@Options({
    components: {
        ReleaseItem,
        HomeFooter
    }
})
export default class Releases extends Vue {}
</script>

<template>
  <div class="release">
    <header class="release-header">
        Download AlgoBootstrap
    </header>
    <div class="release-container">
      <ReleaseItem :platform="'windows'" />
      <ReleaseItem :platform="'macOS'" />
    </div>
    <home-footer/>
  </div>
</template>

<style scoped lang="less">
@import url('../../index.less');
.release {
  width: 100%;
  height: 100dvh;
  padding-top: 50px;
  @media screen and (max-width: 1200px) {
    height: auto;
    padding-top: 100px;
  }
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;

  @media screen and (max-width: 1200px) {
    gap: 40px;
  }
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
      gap: 40px;
    }
    justify-content: center;
    align-items: center;
  }
}
</style>
