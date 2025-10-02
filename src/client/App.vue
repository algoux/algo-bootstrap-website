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
  @Prop()
  @Provide({ reactive: true })
  homeState!: GetPlatformInfoDTO;

  @Prop()
  @Provide({ reactive: true })
  isMobile!: boolean;

  created() {
    console.log('App created with homeState:', this.homeState);
    console.log('App created with isMobile:', this.isMobile);
  }

  async asyncData({ apiClient }: AsyncDataOptions) {
    const res = await apiClient.getPlatformInfo();
    const isMobile = res.os !== 'windows' && res.os !== 'mac';
    console.log('res', res);
    console.log('isMobile:', isMobile);
    return { homeState: res.releases, isMobile: isMobile };
  }
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
