import { ref } from 'vue'

const toast = ref({
  show: false,
  message: '',
  color: 'primary',
  location: 'bottom center'
})

const useToast = (options) => {
  toast.value = {
    ...toast.value,
    ...(typeof options === 'string' ? { message: options, color: 'primary' } : options),
    show: true
  }
}

const hideToast = () => {
  toast.value.show = false
}

export { toast, useToast, hideToast }
