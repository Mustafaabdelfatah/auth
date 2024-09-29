<template>
  <div class="w-100 text-start mb-6">
    <h2 class="mb-2">{{ $t(title) }}</h2>
    <p class="">{{ $t(description) }}</p>
  </div>
</template>
<script setup>
defineProps({
  title: String,
  description: String
})
</script>
