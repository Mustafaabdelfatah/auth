export function handleFormData(data, globalKey, group = false) {
    let formData = new FormData()
    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            if (typeof item === 'object' && item !== null) {
                for (let [key, value] of Object.entries(item)) {
                    formData.append(`${globalKey}[${index}][${key}]`, value)
                    if (group) formData.append(`${globalKey}[${index}][group]`, group)
                }
            } else {
                formData.append(`${globalKey}[${index}]`, item)
            }
        })
    } else {
        for (let key in data) {
            formData.append(`${globalKey}[${key}]`, data[key])
        }
    }

    return formData
}

export function transformSchemaToObject(schema) {
    return schema.reduce((acc, field) => {
        if (field.key) {
            const keys = field.key.split('.')
            if (keys.length > 1) {
                const [parentKey, childKey] = keys
                if (!acc[parentKey]) acc[parentKey] = {}
                acc[parentKey][childKey] = field.value
            } else {

                if (field.customPayload != undefined) {
                    if (field.customPayload == Array) acc[field.key] = Array.isArray(field.value) ? field.value : [];
                    else if (field.customPayload == Object)  acc[field.key] = (typeof field.value === 'object' && field.value !== null) ? field.value : {};
                    else acc[field.key] = field.value;
                } else acc[field.key] = field.value
            }
        }
        return acc
    }, {})
}

export function updateSchemaValues(schema, data) {
    schema.forEach((item) => {
        // console.log('Processing item:', item); // Log the item to see its structure

        if (data != null) {
            if (item.key) {
                if (item.key === 'permissions' && Array.isArray(data.permissions)) {
                    item.value = data.permissions.map((permission) => permission.name);
                } else {
                    item.value = data[item.key];
                }

                const [mainKey, lang] = item.key.split('.');
                if (lang && data[mainKey] && data[mainKey][lang]) {
                    item.value = data[mainKey][lang];
                }
            } else {
                // console.warn('Item key is undefined or null:', item);
            }
        }
    });

    return schema;
}


export function resetSchemaValues(schema) {
    schema.forEach((item) => {
        if (typeof item.value == 'string') item.value = ''
        else item.value = []
    })
}

export function objectToQueryString(obj) {
    const queryParams = Object.keys(obj)
        .filter((key) => obj[key] !== undefined) // Filter out undefined values
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&')
    return queryParams
}


export function findSchemaIndex(schema, key) {
    return schema.findIndex((item) => item.key === key)
  }
