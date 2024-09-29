export const validateSchema = (schema) => {
    return schema.every((field) => {
        if (field.rules) {
            field.errorMessages = field.rules
                .map((rule) => rule(field.value))
                .filter((message) => message !== true)
            return field.errorMessages.length === 0
        }
        return true
    })
}
export const validationByKey = (schema, key) => {
    let selectItem = schema.filter((item) => item.key == key)[0]
    return selectItem.value
}
