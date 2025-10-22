<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import { ElDialog, ElButton, ElMessage } from 'element-plus';
import { ReleasesConfig } from '@client/utils/data.config';
import { GetPlatformInfoDTO } from '@common/modules/platform/platform.dto';
import { logEvent } from '@client/utils/ga';

@Options({
  components: {
    ElDialog,
    ElButton,
  },
})
export default class MacUndetectedDialog extends Vue {
  @Inject()
  isOpenMacPlatformSelectWindow: boolean;

  @Inject()
  homeState: GetPlatformInfoDTO;

  @Inject()
  closeMacPlatformSelectWindow: () => void;

  handleClickToDownload(arch: string) {
    const releasesConfig = new ReleasesConfig(this.homeState.releases.version);
    const downloadLink = releasesConfig.downloadSingleSystemLink('mac', arch);
    this.closeMacPlatformSelectWindow();
    ElMessage('下载开始，请稍候...');
    window.open(downloadLink, '_parent');
    logEvent(`下载 mac ${this.homeState.releases.version}`, {
      category: 'engagement',
      label: `mac-${arch}`,
    });
  }
}
</script>

<template>
  <el-dialog
    :model-value="isOpenMacPlatformSelectWindow"
    @update:model-value="closeMacPlatformSelectWindow"
    class="dialog"
    title="Notice"
    width="800"
    center
    align-center
  >
    <template #header>
      <h1 class="title">选择适合你的 Algo Bootstrap 版本</h1>
      <div class="dialog-container">
        <ElButton @click="handleClickToDownload('x64')" class="my-el-button" type="info" round
          >下载 Intel 芯片版本</ElButton
        >
        <ElButton @click="handleClickToDownload('arm64')" class="my-el-button" type="info" round
          >下载 Apple 芯片版本</ElButton
        >
      </div>
    </template>
    <template #footer>
      <div class="dialog-footer">
        <p class="dialog-footer-header">如何确定芯片类型？</p>
        <div class="dialog-footer-guide">
          <div class="dialog-footer-section">
            <p>在左上角，打开 <span>Apple菜单</span><br />选择"<span>关于本机</span>"</p>
            <div class="image-container">
              <img src="../assets/images/guide-about-1.png" alt="" />
            </div>
          </div>
          <div class="dialog-footer-section">
            <p>
              在"<span>处理器</span>"或"<span>芯片</span>"中<br />查看是"<span>Intel</span>"还是"<span>Apple</span>"
            </p>
            <div class="image-container">
              <img src="../assets/images/guide-about-2.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.my-el-button {
  padding: 20px;
  font-size: 18px;
}
.dialog {
  background-color: transparent !important;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: #000;
  margin-top: 100px;
  margin-bottom: 40px;
  text-align: center;
}

.dialog-container {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 16px;
}

.dialog-footer {
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.dialog-footer-header {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 16px;
  text-align: center;
}

.dialog-footer-guide {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.dialog-footer-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
  border-radius: 8px;

  p {
    position: relative;
    font-size: 14px;
    line-height: 1.4;
    color: #2d2d2d;
    margin: 0 0 12px 0;
    padding-left: 30px;
    text-align: left;

    & span {
      font-weight: bold;
      color: #131313;
    }

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      background-color: #666;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
      color: white;
    }
  }

  &:first-child p::before {
    content: '1';
  }

  &:nth-child(2) p::before {
    content: '2';
  }

  .image-container {
    width: 240px;
    height: 135px;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
}

@media screen and (max-width: 600px) {
  .dialog-footer-guide {
    flex-direction: column;
    gap: 16px;
  }

  .dialog-footer-section {
    .image-container {
      width: 140px;
      height: 105px;
    }
  }
}
</style>
