import Swal from 'sweetalert2'
import storage from './useStorage'

const locale = storage.get('locale')

const showAlert = (message, type = 'error') => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: type,
        title: message
    })
}

const confirmDelete = (message) => {
    return Swal.fire({
        title: locale == 'ar' ? 'هل أنت متأكد؟' : 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: locale == 'ar' ? true : false,
        confirmButtonColor: 'rgba(var(--v-theme-primary))',
        confirmButtonText: locale == 'ar' ? 'موافق' : 'OK',
        cancelButtonText: locale == 'ar' ? 'إلغاء' : 'Cancel'
    }).then((result) => {
        return result.isConfirmed
    })
}

export { showAlert, confirmDelete }
