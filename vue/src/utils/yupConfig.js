import { setLocale } from 'yup'
import { useNumConverter } from '@/composables/useNumConverter.js'
import storage from '@/composables/useStorage'
const lang = storage.get('locale')
export function configureYup() {
  setLocale({
    mixed: {
      required: lang === 'en' ? 'This field is required' : 'هذا الحقل مطلوب',
      number:
        lang === 'en' ? 'Please enter a number value' : 'هذا الحقل لابد أن يحتوي علي قيمة رقمية',
      min: ({ min }) =>
        lang === 'en'
          ? `This field must be at least ${min} characters long`
          : `هذا الحقل لابد أن يحتوي علي الأقل علي ${useNumConverter(min)} عناصر`,
      max: ({ max }) =>
        lang === 'en'
          ? `This field must be at most ${max} characters long`
          : `هذا الحقل لابد أن يحتوي علي الأكثر علي ${useNumConverter(max)} عناصر`,
      oneOf:
        lang === 'en' ? 'Please enter a matched value' : 'هذا الحقل لابد أن يتطابق مع الحقل السابق'
    },
    string: {
      default:
        lang === 'en' ? 'Please enter a string value' : 'هذا الحقل لابد أن يحتوي علي صيغة نصية',
      email:
        lang === 'en'
          ? 'Please enter a valid email address'
          : 'هذا الحقل لابد أن يحتوي علي بريد إلكتروني صالح',
      min: ({ min }) =>
        lang === 'en'
          ? `The field must have at least ${min} characters`
          : `هذا الحقل لابد أن يحتوي علي الأقل علي ${useNumConverter(min)} حروف`,
      max: ({ max }) =>
        lang === 'en'
          ? `The field must have at most ${max} characters`
          : `هذا الحقل لابد أن يحتوي علي الأكثر علي ${useNumConverter(max)} حروف`
    },
    number: {
      default: lang === 'en' ? 'Please enter a valid number' : 'يرجى إدخال قيمة رقمية صالحة',
      min: ({ min }) =>
        lang === 'en'
          ? `The field must have at least ${min} numbers`
          : `هذا الحقل لابد أن يحتوي علي الأقل علي ${useNumConverter(min)} أرقام`,
      max: ({ max }) =>
        lang === 'en'
          ? `The field must have at most ${max} numbers`
          : `هذا الحقل لابد أن يحتوي علي الأكثر علي ${useNumConverter(max)} أرقام`
    },
    array: {
      min: ({ min }) =>
        lang === 'en'
          ? `The field must have at least ${min} items`
          : `هذا الحقل لابد أن يحتوي علي الأقل علي ${useNumConverter(min)} عناصر`,
      max: ({ max }) =>
        lang === 'en'
          ? `The field must have at most ${max} items`
          : `هذا الحقل لابد أن يحتوي علي الأكثر علي ${useNumConverter(max)} عناصر`
    }
  })
}
