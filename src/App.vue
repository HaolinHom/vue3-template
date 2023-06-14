<template>
  <Layout>
    <router-view v-slot="{ Component }">
      <transition name="view">
        <keep-alive>
          <component
            :is="Component"
            v-if="route.meta.keepAlive"
            :key="route.fullPath"
          />
        </keep-alive>
      </transition>
      <component
        :is="Component"
        v-if="!route.meta.keepAlive"
        :key="route.fullPath"
      />
    </router-view>
  </Layout>
</template>

<script lang="ts" setup>
import { useMainStore } from './store/main';

const mainStore = useMainStore();

const route = useRoute();

onBeforeMount(() => {
  mainStore.appInitialize();
});
</script>

<style lang="less">
/* TIPS: 全局样式 */
html {
  background-color: #1e1e20;
}
</style>
