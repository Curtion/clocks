<script setup>
const { data: clockFiles } = await useFetch('/api/clocks')
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <HelpHint title="说明">
      <ul>
        <li>提示词: 请生成一个包含 HTML、CSS 和 JS 的单个 HTML 文件，在页面中心显示一个带有时针、分针和秒针的模拟时钟，并确保它能显示当前的准确时间。 仅生成代码, 不可引用外部资源。</li>
        <li>源码: <a href="https://github.com/Curtion/clocks" target="_blank" rel="noopener noreferrer">https://github.com/Curtion/clocks</a></li>
      </ul>
    </HelpHint>
    <div class="clocks-container">
      <div v-for="file in clockFiles" :key="file" class="clock-item">
        <h3 class="clock-title">
          {{ file.replace('.html', '') }}
        </h3>
        <iframe :src="`/clocks/${file}`" class="clock-iframe" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .clocks-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 600px), 1fr));
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 36px;
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
