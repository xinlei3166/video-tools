<template>
  <div class="video">
    <div class="row">
      <a-input
        v-model:value="m3u8Url"
        class="before"
        allow-clear
        placeholder="请输入视频地址：https://xxx.com/xxx.m3u8"
      />
      <a-button class="mx-16" type="primary" :disabled="!m3u8Url" @click="onConvertM3u8ToMp4">
        转换为mp4
      </a-button>
    </div>
    <div v-if="loading" class="row">
      <span class="after">视频正在生成中...</span>
    </div>
    <div v-if="mp4Url" class="row">
      <span class="after">{{ mp4Url }}</span>
    </div>
    <div v-if="mp4Url" class="row">
      <span class="text-btn openfile-btn" @click="onOpenFolder">打开文件夹</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { urlPattern } from '@/utils/patterns'

export default defineComponent({
  props: {},
  setup() {
    const loading = ref(false)
    const m3u8Url = ref()
    const mp4Url = ref()

    const onConvertM3u8ToMp4 = async () => {
      if (!urlPattern.test(m3u8Url.value)) {
        window.ipcRenderer.invoke('showMessageBox', {
          type: 'info',
          message: '请输入正确的视频地址'
        })
        return
      }
      loading.value = true
      const value = await window.ipcRenderer.invoke('m3u8-mp4', m3u8Url.value)
      loading.value = false
      mp4Url.value = value
    }

    const onOpenFolder = () => {
      window.ipcRenderer.invoke('showItemInFolder', mp4Url.value)
    }

    return { loading, m3u8Url, mp4Url, onConvertM3u8ToMp4, onOpenFolder }
  }
})
</script>

<style lang="less" scoped>
.row {
  margin-top: 32px;
  text-align: center;
}

.before {
  width: 400px;
}

.after {
  min-width: 400px;
  display: inline-block;
  margin-top: 8px;
  color: @text-color-secondary;
}
</style>
