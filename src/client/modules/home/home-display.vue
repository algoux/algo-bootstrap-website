<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DownloadButton from '@client/components/download-button.vue';
import { DataConfig } from '@client/utils/data.config';
import Triangle from '@client/components/svgs/triangle.vue';
import Mouse from '@client/components/svgs/mouse.vue';
import { GetArchitecture } from '@common/modules/platform/platform.dto';
import { Inject } from 'vue-property-decorator';

@Options({
  components: {
    DownloadButton,
    Triangle,
    Mouse,
  },
})
export default class HomeDisplay extends Vue {
  @Prop({ type: String, required: true }) readonly platform!: string;
  @Prop({ type: Boolean, default: false }) readonly isMobile!: boolean;
  @Prop({ type: String, required: true }) readonly version!: string;
  @Prop({ type: String, required: true }) readonly releasesTime!: string;
  @Inject() arch!: GetArchitecture;

  isStartOpen = false;
  closeTimer: number | null = null;

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

  handleStartClick(e: MouseEvent) {
    if (this.isMobile) {
      e.preventDefault();
      this.isStartOpen = !this.isStartOpen;
    }
  }

  handleStartMouseEnter() {
    if (!this.isMobile) {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
      this.isStartOpen = true;
    }
  }

  handleStartMouseLeave() {
    if (!this.isMobile) {
      this.closeTimer = window.setTimeout(() => {
        this.isStartOpen = false;
        this.closeTimer = null;
      }, 200);
    }
  }

  handleMenuMouseEnter() {
    if (!this.isMobile) {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }
    }
  }

  handleMenuMouseLeave() {
    if (!this.isMobile) {
      this.isStartOpen = false;
    }
  }

  handleClickOutside = (e: MouseEvent) => {
    if (this.isMobile) {
      const target = e.target as HTMLElement;
      const dropdown = document.querySelector('.start-dropdown') as HTMLElement;
      if (dropdown && !dropdown.contains(target)) {
        this.isStartOpen = false;
      }
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

  async mounted() {
    const mouse = document.querySelector('.mouse') as HTMLElement;
    console.log(`HomeDisplay mounted, arch prop: ${this.arch}`);
    if (mouse) {
      mouse.classList.add('mouse-anim');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
          mouse.classList.remove('mouse-anim');
        } else {
          mouse.classList.add('mouse-anim');
        }
      });
    }
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
        <DownloadButton
          :platform="platform"
          :is-home="true"
          :arch="arch"
          :version="version"
        />
        <div class="start-dropdown" @mouseenter="handleStartMouseEnter" @mouseleave="handleStartMouseLeave">
          <div class="start" :href="getLinks().docs" target="_blank" @click="handleStartClick">
            <!-- <svg
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
            </svg> -->
            快速上手
            <Triangle :isOpen="isStartOpen" />
          </div>
          <client-only>
            <div
              class="start-menu"
              :class="{ open: isStartOpen }"
              @mouseenter="handleMenuMouseEnter"
              @mouseleave="handleMenuMouseLeave"
            >
              <a class="start-menu-item" :href="getLinks().docs" target="_blank" @click="handleMenuItemClick"
                >安装教程</a
              >
              <!-- <a class="start-menu-item" :href="getLinks().faq" target="_blank" @click="handleMenuItemClick"
                >使用技巧</a
              > -->
            </div>
          </client-only>
        </div>
      </div>
      <div class="content-main-tools" v-if="!isMobile">
        <p>版本 {{ version }}，发布于 {{ releasesTime }}</p>
        <p>访问 <a :href="getLinks().algoUX" target="_blank">algoUX</a>，探索更多编程与算竞工具链产品</p>
        <p>访问 <a :href="getLinks().oldWebsite" class="old-web" target="_blank">旧版网站</a></p>
      </div>
    </main>
    <Mouse v-if="!isMobile" />
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
  transform: translateX(-50%) translateY(5px);
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

.start-dropdown::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 10px;
  z-index: 5;
}
.start-menu.open {
  opacity: 1;
  height: calc(var(--font-small-size) * 2 + 10px);
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
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
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
}

.content {
  position: relative;
  width: 70%;
  height: 100vh;
  @media screen and (max-width: 768px) {
    padding-top: 0;
    width: 100%;
  }
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 120px;

  &-main {
    flex-basis: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
