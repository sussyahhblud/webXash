<template>
  <div class="window" name="Start">
    <div class="box">
      <button class="start-button" :disabled="isStartDisabled" @click="start">
        {{ loading ? 'Loading...' : 'Start' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useXashStore } from '/@/stores/store';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import setCanvasLoading from '/@/utils/setCanvasLoading';

  const store = useXashStore();
  const { selectedZip, loading, downloadedZipData } = storeToRefs(store);
  const { downloadZip, startXashZip, startDownloadedGame } = store;

  // Disable start button when loading or when no zip is selected/downloaded
  const isStartDisabled = computed(() => {
    return loading.value || (!selectedZip.value && !downloadedZipData?.value);
  });

  const start = async () => {
    // If we have downloaded game data, use that instead of the traditional zip workflow
    if (downloadedZipData?.value) {
      await startDownloadedGame();
    } else {
      // Traditional zip workflow
      setCanvasLoading();
      const zip = await downloadZip();
      if (!zip) {
        alert('Selected game could not be loaded!');
        return;
      }
      await startXashZip(zip);
    }
  };
</script>

<style scoped lang="scss">
  .start-button {
    text-align: center;
    width: 100%;
  }
</style>
