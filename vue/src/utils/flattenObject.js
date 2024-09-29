// src/utils/utils.js

export function flattenObject(obj, parentKey = '', res = {}) {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            flattenObject(value, newKey, res);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => {
                flattenObject(item, `${newKey}[${index}]`, res);
            });
        } else {
            res[newKey] = value;
        }
    }
    return res;
}
