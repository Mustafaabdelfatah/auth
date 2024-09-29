function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']

    if (bytes === 0) {
        return '0 Byte'
    }

    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))

    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
        return r + r + g + g + b + b
    })

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

    return result
        ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
        : null
}
function sizeToBytes(sizeString) { // passing like '3 MB'
    const units = {
        B: 1,
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
        TB: 1024 * 1024 * 1024 * 1024
    }

    const sizeParts = sizeString.split(' ')
    const size = parseFloat(sizeParts[0])
    const unit = sizeParts[1]

    if (isNaN(size) || !units[unit]) {
        return NaN
    }

    return size * units[unit]
}

export { sizeToBytes, bytesToSize, hexToRgb }
