<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import windowsLogo from '@client/assets/images/windows_colorful.png';
import macOSLogo from '@client/assets/images/macos_colorful.png';
import DownloadButton from './download-button.vue';
import { ReleasesConfig } from '@client/utils/data.config';
import { ElMessage } from 'element-plus';

@Options({
  components: {
    DownloadButton,
  },
})
export default class ReleaseItem extends Vue {
  @Prop({ type: String, required: true }) platform!: string;
  @Prop({ type: String, required: true }) version!: string;
  @Prop({ type: String, required: true }) arch!: string;

  get platformImage(): string {
    switch (this.platform) {
      case 'windows':
        return windowsLogo;
      case 'mac':
        return macOSLogo;
      default:
        return '';
    }
  }

  get downloadLink(): string {
    const downloadLink = new ReleasesConfig(this.version).downloadSingleSystemLink(this.platform, this.arch);
    return downloadLink;
  }

  get otherLinks(): Array<{ arch: string; name?: string; link: string }> {
    switch (this.platform) {
      case 'windows':
        return [
          {
            arch: 'x64',
            name: 'Windows (x64)',
            link: new ReleasesConfig(this.version).downloadSingleSystemLink('windows', 'x64'),
          },
          {
            arch: 'Arm64',
            name: 'Windows (Arm64)',
            link: new ReleasesConfig(this.version).downloadSingleSystemLink('windows', 'arm64'),
          },
        ];
      case 'mac':
        return [
          {
            arch: 'Intel Chip',
            name: 'macOS (Intel Chip)',
            link: new ReleasesConfig(this.version).downloadSingleSystemLink('mac', 'x64'),
          },
          {
            arch: 'Apple Silicon',
            name: 'macOS (Apple Silicon)',
            link: new ReleasesConfig(this.version).downloadSingleSystemLink('mac', 'arm64'),
          },
        ];
      default:
        return [];
    }
  }

  get staticAsideDesc(): string | null {
    switch (this.platform) {
      case 'windows':
        return `version ${this.version} for x64`;
      case 'mac':
        return `version ${this.version} for Apple Silicon`;
      default:
        return null;
    }
  }

  mounted() {}

  get dynamicAsideDesc(): string | null {
    const arch = this.arch;
    switch (this.platform) {
      case 'windows':
        return `version ${this.version} for ${arch == 'arm64' ? 'Arm64' : 'x64'}`;
      case 'mac':
        if (arch == 'arm64') {
          return `version ${this.version} for Apple Silicon`;
        } else {
          return `version ${this.version} for Intel Chip`;
        }
      default:
        return null;
    }
  }

  private handleDownload(link: string) {
    console.log('Download link:', link);
    ElMessage('下载开始，请稍候...');
    window.open(link, '_parent');
  }
}
</script>

<template>
  <div class="container">
    <header>
      <img :src="platformImage" alt="" />
    </header>
    <main>
      <ClientOnly>
        <DownloadButton :platform="this.platform" :arch="this.arch" :version="this.version" />
        <template #fallback>
          <DownloadButton :platform="this.platform" :arch="this.arch" :version="this.version" />
        </template>
      </ClientOnly>
    </main>
    <ClientOnly>
      <aside>{{ dynamicAsideDesc }}</aside>
      <template #fallback>
        <aside>{{ staticAsideDesc }}</aside>
      </template>
    </ClientOnly>
    <aside style="margin-top: 15px">更多架构版本：</aside>
    <footer>
      <div v-for="item in otherLinks" key="item.arch" class="single-button" @click="this.handleDownload(item.link)">
        {{ item.arch }}
      </div>
    </footer>
  </div>
</template>

<style scoped lang="less">
.single-button {
  width: 30%;
  @media screen and (max-width: 1200px) {
    max-width: 150px;
    width: 40%;
  }
  white-space: nowrap;
  padding: 10px;
  background-color: var(--glass-bg-color);
  backdrop-filter: blur(10px);
  border-radius: 100px;
  border: var(--glass-border-color) 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: var(--font-secondary-color);
  user-select: none;
  transition: color 0.3s ease;
  font-size: var(--font-small-size);
  &:hover {
    color: var(--font-primary-color);
    cursor: pointer;
  }
}

.container {
  width: 30%;
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
    display: flex;
    justify-content: center;
    flex-shrink: 0;

    & img {
      width: 100px;
      height: auto;
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    @media screen and (max-width: 1200px) {
      flex-direction: column;
    }

    & ul {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: row;

      align-items: center;
      // font-size: var(--font-small-size);
      // font-size: var(--font-medium-size);
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
          white-space: nowrap;
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
