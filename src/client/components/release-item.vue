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
      case 'macOS':
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

  get otherLinks(): Array<{ type: string; items: Array<{ arch: string; name: string; link: string }> }> {
    switch (this.platform) {
      case 'windows':
        return [
          {
            type: 'Installer',
            items: [
              { arch: 'x64', name: 'Windows 10', link: 'https://example.com/windows-10' },
              { arch: 'arm64', name: 'Windows 11', link: 'https://example.com/windows-11' },
            ],
          },
          {
            type: 'Portable',
            items: [
              { arch: 'x64', name: 'Windows 10', link: 'https://example.com/windows-10-msi' },
              { arch: 'arm64', name: 'Windows 11', link: 'https://example.com/windows-11-msi' },
            ],
          },
        ];
      case 'macOS':
        return [
          {
            type: '.dmg',
            items: [
              { arch: 'x64', name: 'macOS Big Sur', link: 'https://example.com/macos-big-sur' },
              { arch: 'arm64', name: 'macOS Monterey', link: 'https://example.com/macos-monterey' },
            ],
          },
        ];
      default:
        return [];
    }
  }

  get asideDesc() {
    switch (this.platform) {
      case 'windows':
        return `version ${process.env.VITE_VERSION} for .exe`;
      case 'macOS':
        return `version ${process.env.VITE_VERSION} for .dmg`;
      default:
        return `version ${process.env.VITE_VERSION} for .exe`;
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
    <footer>
      <ul v-for="value in otherLinks" :key="value.type">
        <li>
          <span class="type">{{ value.type }}</span>
          <span class="info" v-for="item in value.items" :key="item.link">
            <a :href="item.link" target="_blank">{{ item.arch }}</a>
          </span>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style scoped lang="less">
.container {
  width: 20%;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  & header {
    width: 100%;
    height: fit-content;

    & img {
      width: 100px;
      @media screen and (max-width: 768px) {
        width: calc(var(--font-large-size) * 4);
      }
    }
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
    font-size: var(--font-small-size);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & footer {
    width: 100%;
    height: fit-content;

    & ul {
      width: 100%;
      display: flex;
      justify-content: center;
      font-size: var(--font-small-size);
      & li {
        width: 50%;
        height: fit-content;
        list-style: none;
        color: var(--font-secondary-color);
        display: flex;
        margin-top: 5px;
        & .type {
          width: 40%;
          height: fit-content;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 700;
        }

        & .info {
          display: flex;
          justify-content: start;
          color: #000;
          background-color: #ffffffb0;
          margin-left: 5px;
          padding: 1px;
          & a {
            color: #000;
            text-decoration: none;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
