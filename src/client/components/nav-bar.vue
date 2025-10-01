<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
import { DataConfig } from '@client/utils/data.config';

@Options({
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ArrowDown,
    ElIcon,
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
    this.isMobile = window.innerWidth < 900;
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
              class="lucide lucide-github-icon lucide-github"
            >
              <path
                d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
              />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>GitHub</span>
          </a>
          <a class="nav-link" :href="dataConfig.DOCS_LINK" target="_blank">
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
              class="lucide lucide-book-text-icon lucide-book-text"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
              <path d="M8 11h8" />
              <path d="M8 7h6" />
            </svg>
            帮助文档
          </a>
          <a class="nav-link" :href="dataConfig.FAQ_LINK" target="_blank">
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
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
            <span>常见问题</span>
          </a>
          <router-link class="nav-link" :to="{ name: 'Releases' }">
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
              class="lucide lucide-circle-arrow-down-icon lucide-circle-arrow-down"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v8" />
              <path d="m8 12 4 4 4-4" />
            </svg>
            <span>下载</span>
          </router-link>
        </div>
        <button v-else class="mobile-menu-button" @click="toggleMobileMenu" :class="{ 'menu-open': mobileMenuOpen }">
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
            class="menu-icon"
          >
            <path d="M3 5h18" />
            <path d="M3 12h18" />
            <path d="M3 19h18" />
          </svg>
        </button>
      </div>

      <div v-if="isMobile && mobileMenuOpen" class="mobile-dropdown-overlay" @click="closeMobileMenu">
        <div class="mobile-dropdown-menu" @click.stop>
          <div class="mobile-menu-header">
            <span class="mobile-menu-title">菜单</span>
            <button class="mobile-menu-close" @click="closeMobileMenu">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
          <div class="mobile-menu-items">
            <a :href="dataConfig.GITHUB_REPO" class="mobile-menu-item" target="_blank" @click="closeMobileMenu">
              <svg class="mobile-menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/>
              </svg>
              <span>GitHub</span>
            </a>
            <a :href="dataConfig.DOCS_LINK" class="mobile-menu-item" target="_blank" @click="closeMobileMenu">
              <svg class="mobile-menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>
                <path d="M8 11h8"/>
                <path d="M8 7h6"/>
              </svg>
              <span>帮助文档</span>
            </a>
            <a :href="dataConfig.FAQ_LINK" class="mobile-menu-item" target="_blank" @click="closeMobileMenu">
              <svg class="mobile-menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <path d="M12 17h.01"/>
              </svg>
              <span>常见问题</span>
            </a>
            <router-link :to="{ name: 'Releases' }" class="mobile-menu-item" @click="closeMobileMenu">
              <svg class="mobile-menu-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v8"/>
                <path d="m8 12 4 4 4-4"/>
              </svg>
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

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &.menu-open {
    background: rgba(255, 255, 255, 0.15);
  }

  .menu-icon {
    width: 24px;
    height: 24px;
  }
}

.mobile-dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.2s ease;
}

.mobile-dropdown-menu {
  position: absolute;
  top: 70px;
  left: 0;
  right: 0;
  background: var(--nav-bg-color);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease;
  backdrop-filter: blur(10px);
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-menu-title {
  color: var(--font-primary-color);
  font-size: 18px;
  font-weight: 600;
}

.mobile-menu-close {
  background: none;
  border: none;
  color: var(--font-secondary-color);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: var(--font-primary-color);
  }
}

.mobile-menu-items {
  padding: 8px 0;
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
  @media screen and (max-width: 1000px) {
    position: fixed;
    top: 0;
  }
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  z-index: 20;

  &-navbar {
    width: 80vw;
    height: 100%;
    border-radius: 100px;

    @media screen and (max-width: 1000px) {
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
      // flex-basis: 40%;
      width: fit-content;
      height: 100%;
      display: flex;
      justify-content: left;
      padding-left: 40px;
      cursor: pointer;
      @media screen and (max-width: 900px) {
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
