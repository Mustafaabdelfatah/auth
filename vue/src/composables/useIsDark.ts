import { computed } from 'vue'
import { useTheme } from 'vuetify' // only be used in TypeScript files.

export function useIsDark() {
  const { current } = useTheme()
  const isDark = computed(() => current.value.dark)

  return isDark
}
