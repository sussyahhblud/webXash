<template>
  <div class="window" name="Download Data">
    <div class="box">
      <button class="start-button" :disabled="loading" @click="downloadHalfLife">
        {{ loading ? 'Downloading...' : 'Download Half-Life' }}
      </button>
      <div v-if="loading && downloadProgress > 0" class="progress-container">
        <div class="progress-text">Download Progress: {{ downloadProgress }}%</div>
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: downloadProgress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useXashStore } from "/@/stores/store";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const store = useXashStore();
const { downloadHalfLifeZip } = store;
const { loading, loadingProgress } = storeToRefs(store);

// Create a computed property for download progress percentage
const downloadProgress = computed(() => {
  return Math.round(loadingProgress.value);
});

const downloadHalfLife = async () => {
  const valveZipUrl = "https://dl.dropboxusercontent.com/scl/fi/dd7xlatfsl4vjw8qo6c25/valve.zip?rlkey=uw3pzoscn27qp2y7mebwoy39j&st=bw6oc8oj&dl=0";
  await downloadHalfLifeZip?.(valveZipUrl);
};
</script>

<style scoped lang="scss">
.start-button {
  text-align: center;
  width: 100%;
}

.progress-container {
  margin-top: 1rem;
  text-align: center;
}

.progress-text {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #ddd;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%);
  transition: width 0.3s ease;
}
</style>
