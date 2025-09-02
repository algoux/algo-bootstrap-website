<script lang="ts">
import { Vue } from 'vue-class-component';

export default class HomeFooter extends Vue {}
</script>

<template>
    <footer>
        <p class="developer-info">
            <span class="developer-info">Developed by &nbsp;<a href="https://github.com/dreamerblue" class="blue" target="_blank"><img src="@client/assets/blue.png" alt="" />&nbsp;bLue</a>&nbsp;×&nbsp;<a href="https://github.com/ATRIOR-LCL" class="atrior" target="_blank"><img src="@client/assets/atrior.png" alt="" />&nbsp;atrior</a>&nbsp;of the&nbsp;</span><a href="https://lcl.sdutacm.cn/" target="_blank">SDUTACM Lightcone Laboratory</a><span>&nbsp;with ❤️</span>
        </p>
        <p class="copyright">© 2008-2025 SDUTACM. All Rights Reserved.</p>
    </footer>
</template>

<style scoped lang="less">
footer {
    width: 100vw;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    gap: 30px;

    & .copyright {
        color: var(--font-secondary-color);
        line-height: 1.5;
        font-size: var(--font-small-size);
    }

    & .developer-info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      text-align: center;
      line-height: 1.5;
      font-size: var(--font-small-size);
      color: var(--font-secondary-color);

      & a {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: var(--font-primary-color);
        text-decoration: none;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;

        & img {
            display: block;
            height: calc(var(--font-small-size) * 1.5);
        }
        &.blue {
          color: #409eff;
        }

        &.atrior {
          color: #e6c623;
        }
      }

      & span {
        white-space: nowrap;
      }
    }
}
</style>