<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { View } from 'bwcx-client-vue3';
import ReleaseItem from '@client/components/release-item.vue';

@View('/releases')
@Options({
    components: {
        ReleaseItem
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
      <ReleaseItem :platform="'linux'" />
      <ReleaseItem :platform="'macOS'" />
    </div>
  </div>
</template>

<style scoped lang="less">
.release {
  width: 100%;
  height: 100dvh;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 100px;
  align-items: center;

  &-header {
    font-size: 50px;
    font-weight: 700;
    color: var(--font-primary-color);
    // background-color: red;
  }

  &-container {
    width: 40%;
    height: 700px;
    // background-color: red;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
