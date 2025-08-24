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
      <ReleaseItem :platform="'mac'" />
      <ReleaseItem :platform="'linux'" />
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
  gap: 20px;
  justify-content: center;
  align-items: center;

  &-header {
    font-size: 50px;
    font-weight: 700;
    color: var(--font-primary-color);
  }

  &-container {
    width: 50%;
    height: 700px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
