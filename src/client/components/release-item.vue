<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import windows from '@client/assets/images/windows_colorful.png';
import macOS from '@client/assets/images/macos_colorful.png';
import linux from '@client/assets/images/linux_colorful.png';
import DownloadButton from './download-button.vue';

@Options({
  components: {
    DownloadButton,
  },
})
export default class ReleaseItem extends Vue {
  @Prop() platform!: string;

  get platformImage(): string {
    switch (this.platform) {
      case 'windows':
        return windows;
      case 'mac':
        return macOS;
      case 'linux':
        return linux;
      default:
        return '';
    }
  }

  get downloadLink(): string {
    switch (this.platform) {
      case 'windows':
        return 'https://example.com/windows-download';
      case 'mac':
        return 'https://example.com/macos-download';
      case 'linux':
        return 'https://example.com/linux-download';
      default:
        return '';
    }
  }

  get otherLinks(): Array<{ name: string; link: string }> {
    switch (this.platform) {
      case 'windows':
        return [
          { name: 'Windows 10', link: 'https://example.com/windows-10' },
          { name: 'Windows 11', link: 'https://example.com/windows-11' },
        ];
      case 'mac':
        return [
          { name: 'macOS Monterey', link: 'https://example.com/macos-monterey' },
          { name: 'macOS Big Sur', link: 'https://example.com/macos-big-sur' },
        ];
      case 'linux':
        return [
          { name: 'Ubuntu', link: 'https://example.com/ubuntu' },
          { name: 'Fedora', link: 'https://example.com/fedora' },
        ];
      default:
        return [];
    }
  }

  get asideDesc() {
    switch (this.platform) {
      case 'windows':
        return `version ${process.env.VITE_VERSION} for .exe`;
      case 'mac':
        return `version ${process.env.VITE_VERSION} for .dmg`;
      case 'linux':
        return `version ${process.env.VITE_VERSION} for .AppImage`;
      default:
        return '';
    }
  }
}
</script>

<template>
  <div class="container">
    <header>
      <img :src="platformImage" alt="" />
    </header>
    <main>
      <DownloadButton :platform="this.platform" />
    </main>
    <aside>{{ asideDesc }}</aside>
    <footer></footer>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 30%;
  min-width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & header {
    width: 100%;
    height: fit-content;
  }

  & main {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & aside {
    width: 100%;
    height: fit-content;
    color: var(--font-secondary-color);
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & footer {
    width: 100%;
    height: fit-content;
    background-color: yellow;
  }
}
</style>
