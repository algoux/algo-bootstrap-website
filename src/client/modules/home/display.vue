<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DownloadButton from '@client/components/download-button.vue';
import { isMac, isWindows } from '@client/utils';
import { DataConfig } from '@client/utils/data.config';

@Options({
  components: {
    DownloadButton,
  },
})
export default class Display extends Vue {
  @Prop({ type: String, required: true }) readonly platform!: string;
  @Prop({ type: String, default: 'arm64' }) readonly arch!: string;
  @Prop({ type: Boolean, default: false }) readonly isMobile!: boolean;
  isSupportedPlatform = isMac() || isWindows();
  isStartOpen = false;

  private getLinks() {
    return {
      docs: DataConfig.DOCS_LINK,
      faq: DataConfig.FAQ_LINK,
      sdutacm: DataConfig.SDUTACM_LINK,
      oj: DataConfig.OJ_LINK,
      bilibili: DataConfig.BILIBILI_LINK,
      oldWebsite: DataConfig.OLD_WEBSITE_LINK,
      vscode: DataConfig.VSCODE_LINK,
      algoUX: DataConfig.ALGOUX_LINK,
    };
  }

  get getVersion() {
    return process.env.VITE_VERSION;
  }

  get getReleasesTime() {
    return process.env.VITE_RELEASES_TIME;
  }

  handleStartClick(e: MouseEvent) {
    e.preventDefault();
    this.isStartOpen = !this.isStartOpen;
  }

  handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const dropdown = document.querySelector('.start-dropdown') as HTMLElement;
    if (dropdown && !dropdown.contains(target)) {
      this.isStartOpen = false;
    }
  };

  handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.isStartOpen = false;
    }
  };

  handleMenuItemClick = () => {
    this.isStartOpen = false;
  };

  mounted() {
    const mouse = document.querySelector('.mouse') as HTMLElement;
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleEscapeKey);
    if(mouse) {
      mouse.classList.add('mouse-anim');
    }else {
      console.log("mouse not found");
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        mouse.classList.remove('mouse-anim');
      } else {
        mouse.classList.add('mouse-anim');
      }
    });
  }

  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEscapeKey);
  }
}
</script>

<template>
  <div class="content">
    <main class="content-main">
      <header class="content-main-title">
        <h1>为编程初学者而生</h1>
        <h2>一键配置现代的 C++、Python 和 VS Code 编程环境</h2>
      </header>
      <div class="content-main-subtitle">
        <DownloadButton :platform="platform" :is-home="true" :arch="arch" />
        <div class="start-dropdown">
          <a class="start" href="#" @click="handleStartClick">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="start-svg"
            >
              <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
              <rect x="2" y="6" width="14" height="12" rx="2" />
            </svg>
            快速上手
            <svg
              class="start-svg lucide lucide-chevron-down-icon lucide-chevron-down"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              :style="{ transform: isStartOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
          <div class="start-menu" :class="{ open: isStartOpen }">
            <a class="start-menu-item" :href="getLinks().docs" target="_blank" @click="handleMenuItemClick">安装教程</a>
            <a class="start-menu-item" :href="getLinks().faq" target="_blank" @click="handleMenuItemClick">使用技巧</a>
          </div>
        </div>
      </div>
      <div class="content-main-tools" v-if="!isMobile">
        <p v-if="isSupportedPlatform">版本 {{ getVersion }}，发布于 {{ getReleasesTime }}</p>
        <p>访问 <a :href="getLinks().algoUX" target="_blank">algoUX</a>，探索更多编程与算竞工具链产品</p>
        <p><a :href="getLinks().oldWebsite" class="old-web" target="_blank">旧版网站</a></p>
      </div>
    </main>
    <svg
      class="mouse"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--font-primary-color)"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      v-if="!isMobile"
    >
      <rect x="5" y="2" width="14" height="20" rx="7" />
      <path d="M12 6v4" />
    </svg>
  </div>
</template>

<style scoped lang="less">
.start-dropdown {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  outline: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  opacity: 0;
  height: 0;
  pointer-events: none;
  transition: height 0.3s, opacity 0.3s;
  z-index: 10;
}
.start-menu.open {
  opacity: 1;
  height: calc(var(--font-small-size) * 4 + 20px);
  pointer-events: auto;
}
.start-menu-item {
  display: block;
  width: 100%;
  text-align: center;
  height: calc(var(--font-small-size) * 2 + 10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-secondary-color);
  text-decoration: none;
  font-size: var(--font-small-size);
  font-weight: 600;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.3s, background 0.3s;
}
.start-menu-item:hover {
  color: var(--font-primary-color);
  background: rgba(255, 255, 255, 0.15);
}
.old-web {
  color: var(--font-secondary-color);
  transition: color 0.5s ease;
  &:hover {
    color: var(--font-primary-color);
  }
}

.mouse {
  position: absolute;
  bottom: 10%;
  opacity: 0;
  width: calc(var(--font-small-size) * 1.5);
  transform: scale(1);
  transition: all 0.3s ease;
}

.mouse-anim {
  animation: mouse 1.5s infinite;
  @keyframes mouse {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(1.3);
    }
  }
}

.content-main-subtitle {
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
  user-select: none;
  position: relative;

  @media screen and (max-width: 760px) {
    flex-direction: column;
    height: 30%;
    gap: 60px;
  }

  & .start {
    padding: 10px 15px;
    @media screen and (min-width: 768px) {
      padding: 15px 20px;
    }
    @media screen and (min-width: 1700px) {
      padding: 20px 25px;
    }
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
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    outline: 1px solid rgba(255, 255, 255, 0.4);
    color: var(--font-secondary-color);
    transition: color 0.5s ease;
    cursor: pointer;
    &:hover {
      color: var(--font-primary-color);
    }
  }

  & .start-svg {
    width: calc(var(--font-small-size) * 1.5);
    height: calc(var(--font-small-size) * 1.5);
    min-width: 0;
    min-height: 0;
    max-width: 100%;
    max-height: 100%;
    display: inline-block;
    vertical-align: middle;
  }
}

.content {
  position: relative;
  width: 70%;
  height: 100vh;
  @media screen and (max-height: 800px) {
    height: 150vh;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
    padding-top: 100px;
    padding-bottom: 100px;
  }
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  justify-content: center;
  @media screen and (max-width: 768px) {
    width: 100%;
    justify-content: center;
    gap: 10px;
  }

  &-main {
    flex-basis: 60%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    &-title {
      width: 100%;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: var(--font-large-size) !important;
      user-select: none;
      gap: 40px;

      @media screen and (max-width: 1700px) {
        gap: 20px;
      }
      @media screen and (max-width: 768px) {
        gap: 10px;
      }

      & h1 {
        color: var(--font-primary-color);
      }

      & h2 {
        font-size: var(--font-medium-size);
        color: var(--font-secondary-color);
      }
    }

    &-tools {
      flex-basis: 20%;
      width: 100%;
      user-select: none;
      margin-top: 50px;

      & p {
        color: var(--font-secondary-color);
        line-height: 1.5;
        font-size: var(--font-small-size);
      }

      & a {
        color: var(--font-primary-color);
        font-size: var(--font-small-size);
      }
    }
  }

  &-footer {
    flex-basis: 5%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-secondary-color);
    user-select: none;
    position: relative;
    font-size: var(--font-small-size) !important;
    padding: 0 20px;

    @media (max-width: 768px) {
      font-size: 12px !important;
      padding: 0 10px;

      & p {
        gap: 2px;
      }
    }

    @media (max-width: 480px) {
      font-size: 11px !important;

      & p {
        flex-direction: column;
        gap: 5px;
      }
    }

    & img {
      height: 25px;
    }
  }
}
</style>
