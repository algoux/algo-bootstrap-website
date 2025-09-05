<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus';
import { ArrowDown } from '@element-plus/icons-vue';
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

  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.checkMobile);
  }

  checkMobile() {
    this.isMobile = window.innerWidth < 768;
  }
}
</script>

<template>
  <header class="content-header">
    <div class="content-header-navbar">
      <div class="logo">
        <div class="logo-icon" v-if="!isMobile">
          <img src="../assets/logo.png" alt="AlgoBootstrap" />
        </div>
        <router-link to="/" class="goHome">Algo Bootstrap</router-link>
      </div>
      <div class="nav" v-if="!isMobile">
        <router-link class="nav-link" to="/">
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
        </router-link>
        <router-link class="nav-link" to="/docs">
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
          Help
        </router-link>
        <a class="nav-link" href="#" target="_blank">
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
          <span>F&Q</span>
        </a>
        <router-link class="nav-link" to="/releases">
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
          <span>Download</span>
        </router-link>
      </div>
      <el-dropdown v-else class="dropdown-style">
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
          class="lucide lucide-hamburger-icon lucide-hamburger"
        >
          <path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" />
          <path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" />
          <path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" />
          <path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
        </svg>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <router-link to="/" class="dropdown-item"> GitHub </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="dropdown-item" to="/docs"> Help </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="dropdown-item" href="#" target="_blank"> F&Q </a>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <router-link class="dropdown-item" to="/releases"> Download </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<style scoped lang="less">
.dropdown-item {
  text-decoration: none;
  color: var(--bg-color);
  display: block;
  width: 100%;
  height: 100%;

  &:hover {
    color: var(--font-primary-color);
  }
}

.dropdown-style {
  font-size: var(--font-small-size);
  color: var(--font-primary-color);
  flex-basis: 20%;
  position: absolute;
  right: 5%;

  &:focus {
    outline: none;
    border: none;
  }

  :deep(.el-dropdown-link) {
    outline: none;
    border: none;

    &:focus {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }

    &:focus-visible {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
    }
  }

  :deep(.el-dropdown) {
    outline: none;
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }

    &:focus-visible {
      outline: none !important;
      box-shadow: none !important;
    }
  }

  :deep(.el-dropdown-item) {
    background-color: var(--glass-bg-color) !important;
  }
}

.content-header {
  height: 70px;
  @media screen and (max-width: 768px) {
    height: 40px;
  }
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 20px;
  z-index: 20;

  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
  }
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
    color: var(--font-secondary-color);
    transition: color 0.5s ease;
    font-size: var(--font-medium-size);
    & .nav-link {
      color: var(--font-secondary-color);
    }
    & svg {
      stroke: var(--font-secondary-color);
    }

    &:hover {
      color: var(--font-primary-color);
      & .nav-link {
        color: var(--font-primary-color);
      }
      & svg {
        stroke: var(--font-primary-color);
      }

      .goHome {
        color: var(--font-primary-color);
      }
    }

    & .logo {
      flex-basis: 40%;
      height: 100%;
      display: flex;
      justify-content: left;
      padding-left: 50px;
      @media screen and (max-width: 768px) {
        flex-basis: 100%;
        justify-content: center;
        padding-left: 0;
      }
      align-items: center;
      &-icon {
        width: 50px;
        height: 50px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &::after {
          content: '';
          position: absolute;
          width: 110%;
          height: 100%;
          left: 0;
          bottom: 0;
          z-index: -1;
          filter: blur(30px);
          border-radius: 20px;
          background-color: #999cff;
          background-image: radial-gradient(at 85% 51%, hsla(60, 60%, 61%, 1) 0px, transparent 50%),
            radial-gradient(at 74% 68%, hsla(235, 69%, 77%, 1) 0px, transparent 50%),
            radial-gradient(at 64% 79%, hsla(284, 72%, 73%, 1) 0px, transparent 50%),
            radial-gradient(at 75% 16%, hsla(283, 60%, 72%, 1) 0px, transparent 50%),
            radial-gradient(at 90% 65%, hsla(153, 70%, 64%, 1) 0px, transparent 50%),
            radial-gradient(at 91% 83%, hsla(283, 74%, 69%, 1) 0px, transparent 50%),
            radial-gradient(at 72% 91%, hsla(213, 75%, 75%, 1) 0px, transparent 50%);
        }

        & img {
          width: auto;
          height: 80%;
          display: block;
        }
      }

      & .goHome {
        margin-left: 10px;
        font-size: var(--font-medium-size);
        color: var(--font-secondary-color);

        @media screen and (max-width: 768px) {
          color: var(--font-primary-color) !important;
        }
        text-decoration: none;
        font-weight: 700;
      }
    }
    & .nav {
      flex-basis: 40%;
      height: 100%;
      display: flex;
      justify-content: end;
      align-items: center;
      // background-color: red;
      gap: 20px;
      padding-right: 50px;

      &-link {
        text-decoration: none;
        font-weight: 400;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: color 0.5s ease;

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
