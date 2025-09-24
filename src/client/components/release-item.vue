<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import windows from '@client/assets/images/windows_colorful.png';
import macOS from '@client/assets/images/macos_colorful.png';
import DownloadButton from './download-button.vue';
import { ReleasesConfig } from '@client/utils/data.config';
import platformUtil from '@client/utils/platform.util';

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
      default:
        return '';
    }
  }

  get downloadLink(): string {
    const arch = platformUtil.getArchitecture();
    const downloadLink = new ReleasesConfig(process.env.VITE_VERSION as string).downloadSingleSystemLink(
      this.platform,
      arch,
    );
    return downloadLink;
  }

  get otherLinks(): Array<{ type: string; items: Array<{ arch: string; name: string; link: string }> }> {
    switch (this.platform) {
      case 'windows':
        return [
          {
            type: 'Intel',
            items: [
              {
                arch: 'x64',
                name: 'Windows (Intel)',
                link: new ReleasesConfig(process.env.VITE_VERSION as string).downloadSingleSystemLink('windows', 'x64'),
              },
            ],
          },
          {
            type: 'Apple Silicon',
            items: [
              {
                arch: 'arm64',
                name: 'Windows (Apple Silicon)',
                link: new ReleasesConfig(process.env.VITE_VERSION as string).downloadSingleSystemLink(
                  'windows',
                  'arm64',
                ),
              },
            ],
          },
        ];
      case 'mac':
        return [
          {
            type: 'Apple Silicon',
            items: [
              {
                arch: 'arm64',
                name: 'macOS (Apple Silicon)',
                link: new ReleasesConfig(process.env.VITE_VERSION as string).downloadSingleSystemLink('mac', 'arm64'),
              },
            ],
          },
          {
            type: 'Intel',
            items: [
              {
                arch: 'x64',
                name: 'macOS (Intel)',
                link: new ReleasesConfig(process.env.VITE_VERSION as string).downloadSingleSystemLink('mac', 'x64'),
              },
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
      case 'mac':
        return `version ${process.env.VITE_VERSION} for .dmg`;
      default:
        return null;
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
  @media screen and (max-width: 1200px) {
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
          width: 50%;
          height: fit-content;
          display: flex;
          white-space: nowrap;
          justify-content: end;
          align-items: center;
          padding-right: 10px;
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
