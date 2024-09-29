<template lang="">
  <div class="auth-bg">
    <img :src="img" style="width: 100%; max-width: 100%" />
    <h1>{{ $t(title) }}</h1>
    <p>{{ $t(desc) }}</p>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  desc: String,
  img: String
})
</script>
<style scoped lang="scss">
.auth-bg {
  position: absolute;
  background: rgba(var(--v-theme-primary), 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  padding: 0 3rem;
  gap: 1.5rem;
  color: rgba(var(--v-theme-white), $alpha: 1);
  img {
    max-width: 592px !important;
    max-height: 557px;
    height: 60vh;
  }
  p {
    text-align: center;
    max-width: 480px;
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.2px;
  }
}
</style>
