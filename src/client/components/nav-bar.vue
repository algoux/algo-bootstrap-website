<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { DataConfig } from '@client/utils/data.config';
import GitHub from './svgs/github.vue';
import Doc from './svgs/doc.vue';
import Question from './svgs/question.vue';
import Download from './svgs/download.vue';
import Hamburger from './svgs/hamburger.vue';
import MenuLines from './svgs/menu-lines.vue';
import { Inject } from 'vue-property-decorator';

@Options({
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ArrowDown,
    ElIcon,
    GitHub,
    Doc,
    Question,
    Download,
    Hamburger,
    MenuLines,
  },
})
export default class NavBar extends Vue {
  mobileMenuOpen = false;

  get dataConfig() {
    return DataConfig;
  }

  // 不再需要全局点击监听器，使用遮罩层处理

  toggleMobileMenu() {
    if (this.mobileMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    this.mobileMenuOpen = true;
    this.$nextTick(() => {
      this.animateMenuOpen();
    });
  }

  // 移除了全局点击处理，现在使用遮罩层

  closeMobileMenu() {
    this.animateMenuClose(() => {
      this.mobileMenuOpen = false;
    });
  }

  animateMenuOpen() {
    const menu = document.querySelector('.mobile-dropdown-menu') as HTMLElement;
    if (!menu) return;

    menu.style.height = 'auto';
    const targetHeight = menu.scrollHeight;

    menu.style.height = '0px';
    menu.style.overflow = 'hidden';

    menu.offsetHeight;

    menu.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    menu.style.height = targetHeight + 'px';

    setTimeout(() => {
      menu.style.height = 'auto';
      menu.style.overflow = 'visible';
    }, 300);
  }

  animateMenuClose(callback: () => void) {
    const menu = document.querySelector('.mobile-dropdown-menu') as HTMLElement;
    if (!menu) {
      callback();
      return;
    }

    const currentHeight = menu.scrollHeight;
    menu.style.height = currentHeight + 'px';
    menu.style.overflow = 'hidden';

    menu.offsetHeight;

    menu.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    menu.style.height = '0px';

    setTimeout(() => {
      callback();
      menu.style.height = '';
      menu.style.overflow = '';
      menu.style.transition = '';
    }, 300);
  }
}
</script>

<template>
  <header class="content-header">
    <div class="content-header-navbar">
      <div class="logo" @click="this.$router.push({ name: 'Home' })">
        <div class="logo-icon">
          <img src="../assets/logo.png" alt="AlgoBootstrap" />
        </div>
        <span :to="{ name: 'Home' }" class="goHome">Algo Bootstrap</span>
      </div>
      <div class="nav">
        <a class="nav-link" :href="dataConfig.GITHUB_REPO" target="_blank">
          <GitHub />
          <span>GitHub</span>
        </a>
        <a class="nav-link" :href="dataConfig.DOCS_LINK" target="_blank">
          <Doc />
          帮助文档
        </a>
        <a class="nav-link" :href="dataConfig.FAQ_LINK" target="_blank">
          <Question />
          <span>常见问题</span>
        </a>
        <router-link class="nav-link" :to="{ name: 'Releases' }">
          <Download />
          <span>下载</span>
        </router-link>
      </div>
      <button class="mobile-menu-button" @click.stop="toggleMobileMenu" :class="{ 'menu-open': mobileMenuOpen }">
        <Hamburger :class="{ hidden: mobileMenuOpen }" />
        <MenuLines :class="{ hidden: !mobileMenuOpen }" />
      </button>
    </div>

    <!-- 透明遮罩层，用于捕获外部点击 -->
    <div v-show="mobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>

    <div v-show="mobileMenuOpen" class="mobile-dropdown-menu" @click.stop>
      <div class="mobile-menu-items">
        <a :href="dataConfig.GITHUB_REPO" class="mobile-menu-item" target="_blank" @click="closeMobileMenu">
          <GitHub />
          <span>GitHub</span>
        </a>
        <a :href="dataConfig.DOCS_LINK" class="mobile-menu-item" target="_blank" @click="closeMobileMenu">
          <Doc />
          <span>帮助文档</span>
        </a>
        <a :href="dataConfig.FAQ_LINK" class="mobile-menu-item" target="_blank" @click="closeMobileMenu">
          <Question />
          <span>常见问题</span>
        </a>
        <router-link :to="{ name: 'Releases' }" class="mobile-menu-item" @click="closeMobileMenu">
          <Download />
          <span>下载</span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<style scoped lang="less">
.mobile-menu-button {
  @media screen and (min-width: 769px) {
    display: none;
  }
  background: none;
  border: none;
  color: var(--font-primary-color);
  font-size: var(--font-small-size);
  position: absolute;
  right: 5%;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1002;

  /* 移除蓝色点击效果和焦点样式 */
  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    background: none;
    transform: none;
  }

  &.menu-open {
    background: none;
  }

  .menu-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease;
    opacity: 1;

    &.hidden {
      opacity: 0 !important;
      transform: translate(-50%, -50%) rotate(90deg) !important;
      pointer-events: none;
    }

    &.hamburger-icon:not(.hidden) {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }

    &.close-icon:not(.hidden) {
      opacity: 1;
      transform: translate(-50%, -50%) rotate(0deg);
    }
  }
}

/* 透明遮罩层样式 */
.mobile-menu-overlay {
  @media screen and (min-width: 769px) {
    display: none;
  }
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  z-index: 998;
  cursor: pointer;

  /* 移除蓝色点击效果 */
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  outline: none;

  &:focus {
    outline: none;
  }

  &:active {
    background: transparent;
  }
}

.mobile-dropdown-menu {
  @media screen and (min-width: 769px) {
    display: none;
  }
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: rgba(51, 51, 51, 0.9);
  backdrop-filter: blur(10px);
  z-index: 999;
  height: 0;
  overflow: hidden;
}
.mobile-menu-items {
  padding: 20px 0;
}

.mobile-menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  color: var(--font-primary-color);
  text-decoration: none;
  font-size: 16px;
  transition: all 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;

  outline: none;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;

  & svg {
    margin-right: 5px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:active {
    background: rgba(255, 255, 255, 0.08);
  }

  .mobile-menu-icon {
    margin-right: 12px;
    opacity: 0.8;
  }

  span {
    font-weight: 500;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.content-header {
  height: 70px;
  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
  }
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  z-index: 1000;

  &-navbar {
    width: 80vw;
    height: 100%;
    border-radius: 100px;

    @media screen and (max-width: 768px) {
      width: 100vw;
      border-radius: 0;
      outline: none;
    }
    background-color: var(--glass-bg-color);
    backdrop-filter: blur(20px);
    outline: 1px solid var(--glass-border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    transition: color 0.5s ease;
    font-size: var(--font-medium-size);
    position: relative;

    &:hover {
      color: var(--font-primary-color);
    }
    & svg {
      stroke: var(--font-secondary-color);
    }

    & .logo {
      width: fit-content;
      height: 100%;
      display: flex;
      justify-content: left;
      padding-left: 40px;
      cursor: pointer;
      @media screen and (max-width: 768px) {
        flex-basis: 100%;
        justify-content: center;
        padding-left: 0;
      }
      align-items: center;
      outline: none;
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
      &-icon {
        height: calc(var(--font-medium-size) * 1.6);
        aspect-ratio: 1;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        @media screen and (max-width: 769px) {
          display: none;
        }
        &::after {
          content: '';
          position: absolute;
          width: calc(var(--font-medium-size) * 1.6);
          height: calc(var(--font-medium-size) * 1.6);
          left: 0;
          bottom: 0;
          z-index: -1;
          filter: blur(30px);
          border-radius: 20px;
          background-color: #ffffff;
          background-image: radial-gradient(at 85% 51%, hsla(60, 60%, 61%, 1) 0px, transparent 50%),
            radial-gradient(at 74% 68%, hsla(235, 69%, 77%, 1) 0px, transparent 50%),
            radial-gradient(at 64% 79%, hsla(284, 72%, 73%, 1) 0px, transparent 50%),
            radial-gradient(at 75% 16%, hsla(283, 60%, 72%, 1) 0px, transparent 50%),
            radial-gradient(at 90% 65%, hsla(153, 70%, 64%, 1) 0px, transparent 50%),
            radial-gradient(at 91% 83%, hsla(283, 74%, 69%, 1) 0px, transparent 50%),
            radial-gradient(at 72% 91%, hsla(213, 75%, 75%, 1) 0px, transparent 50%);
        }

        & img {
          width: 100%;
          object-fit: contain;
        }
      }

      & .goHome {
        margin-left: 10px;
        font-size: calc(var(--font-small-size) * 1.5);
        white-space: nowrap;
        user-select: none;
        color: var(--font-primary-color);

        transition: color 0.5s ease;
        @media screen and (max-width: 768px) {
          font-size: 20px;
          color: var(--font-primary-color) !important;
        }
        text-decoration: none;
        font-weight: 700;
      }
    }
    & .nav {
      @media screen and (max-width: 769px) {
        display: none;
      }
      width: fit-content;
      // flex-basis: 30%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 20px;
      padding-right: 40px;
      color: #ffffff;
      mix-blend-mode: difference;

      &-link {
        text-decoration: none;
        font-weight: 400;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: color 0.5s ease;
        font-size: var(--font-small-size);
        color: var(--font-primary-color);

        & svg {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          transition: stroke 0.5s ease;
          stroke: var(--font-primary-color);
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
