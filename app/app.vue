<script setup>
const { data } = await useFetch('/api/clocks')

const categories = computed(() => data.value?.categories ?? ['All'])
const clocks = computed(() => data.value?.clocks ?? [])

const selected = ref('All')

const filteredClocks = computed(() =>
  selected.value === 'All'
    ? clocks.value
    : clocks.value.filter(c => c.category === selected.value),
)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <HelpHint title="说明">
      <ul>
        <li>提示词: 请生成一个包含 HTML、CSS 和 JS 的单个 HTML 文件，在页面中心显示一个带有时针、分针和秒针的模拟时钟，并确保它能显示当前的准确时间。 仅生成代码, 不可引用外部资源。</li>
        <li>源码: <a href="https://github.com/Curtion/clocks" target="_blank">https://github.com/Curtion/clocks</a></li>
      </ul>
    </HelpHint>
    <nav class="category-bar">
      <button
        v-for="cat in categories"
        :key="cat"
        class="category-button"
        :class="{ active: cat === selected }"
        @click="selected = cat"
      >
        {{ cat }}
      </button>
    </nav>
    <div class="clocks-container">
      <div v-for="file in filteredClocks" :key="file.path" class="clock-item">
        <h3 class="clock-title">
          <a :href="`/clocks/${file.path}`" target="_blank">{{ file.name }}</a>
        </h3>
        <iframe :src="`/clocks/${file.path}`" class="clock-iframe" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .category-bar {
    position: sticky;
    top: 0;
    z-index: 1000;
    display: flex;
    gap: 8px;
    padding: 12px 60px 12px 20px;
    background: #fff;
    border-bottom: 1px solid #eee;
    overflow-x: auto;
    white-space: nowrap;
    box-sizing: border-box;
  }

  .category-button {
    flex: 0 0 auto;
    padding: 6px 14px;
    border: 1px solid #ddd;
    border-radius: 16px;
    background: #fff;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .category-button:hover {
    background: #f3f3f3;
  }

  .category-button.active {
    background: #333;
    color: #fff;
    border-color: #333;
  }

  .clocks-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 600px), 1fr));
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
  }

  .clock-item {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background: #f9f9f9;
  }

  .clock-title {
    margin: 0 0 10px 0;
    font-size: 18px;
    text-align: center;
    color: #333;
  }

  .clock-iframe {
    width: 100%;
    height: 600px;
    border: none;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .clocks-container {
      grid-template-columns: 1fr;
    }
  }
</style>

<style>
  body {
    margin: 0;
    overflow: auto;
  }
</style>
