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
  isMobile = false;
  mobileMenuOpen = false;
  get dataConfig() {
    return DataConfig;
  }
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
    if (!this.isMobile) {
      this.mobileMenuOpen = false;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
</script>

<template>
  <client-only>
    <header class="content-header">
      <div class="content-header-navbar">
        <div class="logo" @click="this.$router.push({ name: 'Home' })">
          <div class="logo-icon" v-if="!isMobile">
            <client-only>
              <img src="../assets/logo.png" alt="AlgoBootstrap" />
            </client-only>
          </div>
          <span :to="{ name: 'Home' }" class="goHome">Algo Bootstrap</span>
        </div>
        <div class="nav" v-if="!isMobile">
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
        <button v-else class="mobile-menu-button" @click="toggleMobileMenu" :class="{ 'menu-open': mobileMenuOpen }">
          <Hamburger :class="{ hidden: mobileMenuOpen }" />
          <MenuLines :class="{ hidden: !mobileMenuOpen }" />
        </button>
      </div>

      <div v-if="isMobile && mobileMenuOpen" class="mobile-dropdown-overlay" @click="closeMobileMenu">
        <div class="mobile-dropdown-menu" @click.stop>
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
      </div>
    </header>
  </client-only>
</template>

<style scoped lang="less">
.mobile-menu-button {
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
  z-index: 700; /* 确保按钮在遮罩层之上 */

  /* 移除菜单打开时的背景色 */
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

.mobile-dropdown-overlay {
  position: fixed;
  top: 70px; /* 从导航栏下方开始，不覆盖导航栏 */
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 600;
  animation: fadeIn 0.2s ease;
}

.mobile-dropdown-menu {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: var(--nav-bg-color);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease;
  backdrop-filter: blur(10px);
}

.mobile-menu-items {
  padding: 20px 0;
  z-index: 1000;
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

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #ffffff;
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

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    outline: 1px solid rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    transition: color 0.5s ease;
    font-size: var(--font-medium-size);

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
      &-icon {
        height: calc(var(--font-medium-size) * 1.6);
        aspect-ratio: 1;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
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
      flex-basis: 30%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      gap: 10px;
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
        color: var(--font-secondary-color);

        & svg {
          width: 20px;
          height: 20px;
          margin-right: 5px;
          transition: stroke 0.5s ease;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
