/** 2022-4-19
 * @description 深拷贝
 */

export function deepClone(obj) {
    const newObj = Array.isArray(obj) ? [] : {}

    if (obj && typeof obj === 'object') {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === "object") {
                    newObj[key] = deepClone(obj[key])
                } else {
                    newObj[key] = obj[key]
                }
            }
        }
    }
    return newObj
}