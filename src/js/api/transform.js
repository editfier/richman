/** transform.js
 * @description 转换 API
 */

/**
 * @description 地点索引转换成地点坐标
 * @param { 地点索引 } index 
 * @param { 地图大小 } size
 * @param { 一块地的长度 } len
 * @returns { 地点坐标 }
 */
export function indexToPos(index, size, len) {
    let count = (size / len) - 1
    let row, col 

    // 如果是顶部索引
    if (index >= 0 && index <= count - 1) {
        row = 0
        col = index 
    }
    // 如果是右侧索引 
    else if (index >= count && index <= 2 * count - 1) {
        row = index - count  
        col = count
    }
    // 如果是底部索引
    else if (index >= count * 2 && index <= 3 * count - 1) {
        row = count 
        col = count * 3 - index
    }
    // 如果是左侧索引
    else if (index >= count * 3 && index <= 4 * count - 1) {
        row = count * 4 - index
        col = 0
    }
    
    return {
        x: col * len,
        y: row * len
    }
}

/**
 * @description 玩家 (x, y) 转换为地点索引
 * @param { 玩家的x } x 
 * @param { 玩家的y } y 
 * @param { 地图大小 } size
 * @param { 一块地的长度 } len
 * @returns { 地点索引 }
 */
export function rolePosToIndex(x, y, size, len) {
    let row = Math.floor(y / len)
    let col = Math.floor(x / len)
    let count = (size / len) - 1
    let index = -1

    // 如果玩家在顶部位置
    if (row === 0 && (col >= 0 && col <= count - 1)) {
        index = col
    }
    // 如果玩家在左侧位置
    else if (col === count && (row >= 0 && row <= count - 1)) {
        index = col + row
    }
    // 如果玩家在底部位置
    else if (row === count && (col >= 1 && col <= count)) {
        index = count * 3 - col
    }
    // 如果玩家在左侧位置
    else if (col === 0 && (row >= 1 && row <= count)) {
        index = count * 4 - row 
    }

    return index
}