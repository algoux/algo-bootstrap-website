<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import macOS from '@client/assets/images/macos.png';
import windows from '@client/assets/images/windows.png';
import linux from '@client/assets/images/linux.png';

export default class DownloadButton extends Vue {
  @Prop({ type: String, default: 'macOS' }) platform!: string;
  @Prop({type: String, default: '250px'}) width!: string;
  @Prop({type: String, default: '70px'}) height !: string;


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
}
</script>

<template>
  <button class="download btn" >
    <img :src="platformImage" alt="" />
    Download for {{ platform }}
  </button>
</template>

<style scoped lang="less">
.btn {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
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
  // width: 300px;
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
