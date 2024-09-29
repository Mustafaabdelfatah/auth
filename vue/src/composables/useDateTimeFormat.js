import { useNumConverter } from './useNumConverter.js'
import moment from 'moment'
export function useDateTimeFormat(locale) {
    let dateFormat = 'YYYY-MM-DD'
    if (locale === 'en') {
        dateFormat = 'DD-MM-YYYY'
    }

    function formatDateTime(dateTime) {
        let date = moment(dateTime).format(dateFormat)
        let time = moment(dateTime).format('hh:mm:ss A')

        if (locale === 'ar') {
            date = String(useNumConverter(date)).split('-').reverse().join('-')
            time =
                String(time).slice(-2).toLowerCase() == 'pm'
                    ? String(time).slice(0, -2).toLowerCase() + 'مساءاً'
                    : String(time).slice(0, -2).toLowerCase() + 'صباحاً'

            time = useNumConverter(time)
        }

        return { date, time }
    }
    return { formatDateTime }
}
