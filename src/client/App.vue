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

@Options({
  components: {
    NavBar,
  },
})
export default class App extends Vue {}
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
