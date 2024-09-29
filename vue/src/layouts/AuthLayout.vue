<template>
  <v-row color="background" class="pa-0 ma-0" :class="{ 'auth-dark-wrapper': isDark }">
    <slot></slot>
  </v-row>
</template>

<script setup>
import { useIsDark } from '@/composables/useIsDark'
// import AppThemeToggle from '@/components/app/ThemeToggle.vue'

const isDark = useIsDark()
</script>

<style lang="sass"></style>
