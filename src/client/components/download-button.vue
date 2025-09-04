<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import macOS from '@client/assets/images/macos.png';
import windows from '@client/assets/images/windows.png';

export default class DownloadButton extends Vue {
  @Prop({ type: String, default: 'Windows' }) platform!: string;
  @Prop({ type: Boolean, default: false }) isHome: Boolean;

  get platformName(): string {
    return this.platform === 'macOS' ? 'macOS' : 'Windows';
  }

  get platformImage(): string {
    switch (this.platform) {
      case 'Windows':
        return windows;
      case 'macOS':
        return macOS;
      default:
        return windows;
    }
  }
}
</script>

<template>
  <div class="btn-container">
    <button class="download btn">
      <img :src="platformImage" alt="" />
      Download for {{ platformName }}
    </button>
    <span class="download-all-platforms" v-if="(platform === 'Windows' || platform === 'macOS') && isHome">
      Download for <router-link class="link" to="/releases">other platforms</router-link>.
    </span>
    <span class="download-all-platforms" v-if="platform !== 'Windows' && platform !== 'macOS' && isHome"
      >Only Windows and macOS are supported.</span
    >
  </div>
</template>

<style scoped lang="less">
.btn-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.download-all-platforms {
  position: absolute;
  bottom: 0;
  color: var(--font-secondary-color);
  font-size: var(--font-small-size);
  transform: translateY(36px);

  @media screen and (max-width: 768px) {
    transform: translateY(48px);
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
