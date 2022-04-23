/** random.js
 * @description 随机数 API
 */

/**
 * 
 * @param { 随机数的最小值 } min 
 * @param { 随机数的最大值 } max 
 * @returns { 范围内的随机数 }
 */
export function rangeRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}