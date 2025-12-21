<script setup>
const props = defineProps({
  title: { type: String, default: '说明' },
  buttonAria: { type: String, default: '打开提示' },
  closeAria: { type: String, default: '关闭' },
})

const show = ref(false)
</script>

<template>
  <div>
    <button
      class="help-button"
      :aria-label="props.buttonAria"
      @click="show = true"
    >
      ?
    </button>

    <div v-if="show" class="help-overlay" @click.self="show = false">
      <div class="help-content" role="dialog" aria-modal="true" :aria-label="props.title">
        <button class="help-close" :aria-label="props.closeAria" @click="show = false">
          ×
        </button>
        <h2 class="help-title">
          {{ props.title }}
        </h2>
        <div class="help-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .help-button {
    position: fixed;
    top: 12px;
    right: 12px;
    z-index: 1100;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    color: #333;
    font-size: 20px;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
  }

  .help-button:hover {
    background: #f3f3f3;
  }

  .help-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1099;
    padding: 16px;
  }

  .help-content {
    width: min(720px, 92vw);
    max-height: 80vh;
    overflow: auto;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0,0,0,0.2);
    padding: 20px 24px 24px 24px;
    position: relative;
  }

  .help-close {
    position: absolute;
    top: 10px;
    right: 12px;
    border: none;
    background: transparent;
    font-size: 24px;
    line-height: 24px;
    color: #666;
    cursor: pointer;
  }

  .help-title {
    margin: 0 0 12px;
    font-size: 20px;
    color: #222;
    text-align: left;
  }

  .help-body {
    color: #333;
    font-size: 14px;
    line-height: 1.7;
  }
</style>
