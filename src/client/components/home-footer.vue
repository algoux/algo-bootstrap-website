<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { DataConfig } from '@client/utils/data.config';

@Options({})
export default class HomeFooter extends Vue {
  getLinks() {
    return {
      rankland: DataConfig.RANKLAND_LINK,
      sdutacm: DataConfig.SDUTACM_LINK,
      algoUX: DataConfig.ALGOUX_LINK,
      pasteThenAC: DataConfig.PASTE_THEN_AC_LINK,
    };
  }
}
</script>

<template>
  <footer>
    <div class="friend-link">
      <a :href="getLinks().algoUX" class="friend-link-item" target="_blank">
        <client-only>
          <img src="../assets/images/algoUX.ico" alt="" />
        </client-only>
        algoUX
      </a>
      <a :href="getLinks().pasteThenAC" class="friend-link-item" target="_blank">
        <client-only>
          <img src="../assets/images/thenac.ico" alt="" />
        </client-only>
        paste.then.ac
      </a>
      <a :href="getLinks().rankland" class="friend-link-item" target="_blank">
        <client-only>
          <img src="../assets/images/rankland.ico" alt="" />
        </client-only>
        RankLand
      </a>
      <a :href="getLinks().sdutacm" class="friend-link-item" target="_blank">
        <client-only>
          <img src="../assets/images/sdutacm_logo_colorful.png" alt="" />
        </client-only>
        SDUTACM
      </a>
    </div>
    <p class="copyright">© 2019-present algoUX. All Rights Reserved.</p>
  </footer>
</template>

<style scoped lang="less">
footer {
  width: 100vw;
  height: auto;
  margin-bottom: 50px;
  user-select: none;
  margin-top: 60px;

  @media screen and (max-width: 768px) {
    height: auto;
    padding: 40px 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  gap: 30px;

  & .friend-link {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;

    &-item {
      font-size: var(--font-small-size);
      // width: 150px;
      height: fit-content;
      padding: 5px 10px;
      color: var(--font-secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      text-decoration: none;
      gap: 5px;
      font-weight: 600;
      transition: color 0.5s ease;
      z-index: 999;
      &:hover {
        color: var(--font-primary-color);
      }
      & img {
        height: calc(var(--font-small-size));
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 80vw;
  }

  & .copyright {
    color: var(--font-secondary-color);
    line-height: 1.5;
    font-size: var(--font-small-size);
  }
}
</style>
