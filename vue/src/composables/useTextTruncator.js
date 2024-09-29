import { computed } from 'vue'

export function useTextTruncator(text= '', maxLength = 30) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...'
    } else return text
}
