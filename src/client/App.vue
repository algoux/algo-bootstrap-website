<template>
  <div class="common-layout">
    <NavBar />
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import NavBar from './components/nav-bar.vue';
import { RenderMethod, RenderMethodKind } from 'bwcx-client-vue';
import { GetPlatformInfoDTO } from '@common/modules/platform/platform.dto';
import { AsyncDataOptions } from './typings';
import { Prop, Provide } from 'vue-property-decorator';

@Options({
  components: {
    NavBar,
  },
})
@RenderMethod(RenderMethodKind.SSR)
export default class App extends Vue {
}
</script>

<style lang="less" scoped>
.common-layout {
  width: 100%;
  height: auto;
  position: relative;
}

main {
  width: 100%;
  height: 100vh;
}
</style>
