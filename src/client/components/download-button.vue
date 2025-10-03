<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import macOS from '@client/assets/images/macos.png';
import windows from '@client/assets/images/windows.png';
import download from '@client/assets/images/download.png';
import { ReleasesConfig } from '@client/utils/data.config';
import { ElMessage } from 'element-plus';

@Options({
  components: {},
})
export default class DownloadButton extends Vue {
  @Prop({ type: String, required: true }) platform!: string;
  @Prop({ type: String, required: true }) arch!: string;
  @Prop({ type: Boolean, default: false }) isHome: Boolean;
  @Prop({ type: String, required: true }) version!: string;

  get isMobileDevice(): boolean {
    return this.platform !== 'windows' && this.platform !== 'mac';
  }

  get isSupportedPlatform(): boolean {
    // 只有在主页时才考虑移动设备检测
    if (this.isHome && this.isMobileDevice) {
      return false;
    }
    return this.platform === 'windows' || this.platform === 'mac';
  }

  get isUnsupportedPlatform(): boolean {
    // 只有在主页时才考虑移动设备，releases页面按正常平台逻辑
    if (this.isHome && this.isMobileDevice) {
      return true;
    }
    return this.platform !== 'windows' && this.platform !== 'mac';
  }

  get platformName(): string {
    // 只有在主页时才显示移动设备名称
    if (this.isHome && this.isMobileDevice) {
      return '移动设备';
    }

    // 确保服务端和客户端返回一致的平台名称
    switch (this.platform) {
      case 'mac':
        return 'macOS';
      case 'windows':
        return 'Windows';
      default:
        return 'Unknown';
    }
  }

  get platformImage(): string {
    // 只有在主页时，移动设备才显示通用下载图标
    if (this.isHome && this.isMobileDevice) {
      return download;
    }

    switch (this.platform) {
      case 'windows':
        return windows;
      case 'mac':
        return macOS;
      default:
        return download;
    }
  }

  private handleDownload() {
    if (this.isMobileDevice) {
      this.$router.push({ name: 'Releases' });
      return;
    }
    const releasesConfig = new ReleasesConfig(this.version);
    let downloadLink = releasesConfig.downloadSingleSystemLink(this.platform, this.arch);
    ElMessage('下载开始，请稍候...');
    window.open(downloadLink, '_parent');
  }
}
</script>

<template>
  <div class="btn-container">
    <button class="download btn" @click="handleDownload">
      <img :src="platformImage" alt="" />
      {{ isUnsupportedPlatform && isHome ? '下载可用版本' : '下载 ' + platformName + ' 版本' }}
    </button>
    <span class="download-all-platforms" v-if="isSupportedPlatform && isHome">
      下载 <router-link class="link" :to="{ name: 'Releases' }">其他平台</router-link> 版本
    </span>
    <span class="download-all-platforms" v-if="isUnsupportedPlatform && isHome">仅支持 Windows 和 macOS</span>
  </div>
</template>

<style scoped lang="less">
.btn-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.download-all-platforms {
  position: absolute;
  bottom: 0;
  color: var(--font-secondary-color);
  font-size: var(--font-small-size);
  transform: translateY(38px);
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    transform: translateY(150%);
  }

  & .link {
    color: var(--font-primary-color);
  }
}
.btn {
  padding: 10px 15px;
  position: relative;
  @media screen and (min-width: 768px) {
    padding: 15px 20px;
  }
  @media screen and (min-width: 1700px) {
    padding: 20px 25px;
  }
  background-color: transparent;
  border: none;
  outline: none;
  border-radius: 100px;
  font-size: var(--font-small-size);
  font-weight: 600;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.download {
  background-color: #fff;
  color: #000;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 2px solid transparent;
  outline: 2px solid var(--glass-border-color);

  & img {
    height: calc(var(--font-small-size) * 1.5);
  }

  &:hover {
    background-color: #dddddd;
  }
}
</style>
