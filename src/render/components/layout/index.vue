<template>
  <div id="layout">
    <div class="layout-logo">
      <img class="layout-logo-img" alt="logo" src="@/assets/logo.png" />
    </div>
    <div class="layout-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
  props: {},
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style lang="less" scoped>
#layout {
  display: flex;
  flex-direction: column;
}

.layout-logo {
  margin-top: 24px;
  flex-shrink: 0;
  text-align: center;
  .layout-logo-img {
    max-width: 280px;
  }
}

.layout-content {
  flex: 1;
}
</style>
