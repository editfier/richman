/** role.js
 * @description 玩家渲染
 * @created 2022-4-14
 * @updated 2022-4-14
 */

import MoveMusic from '../../assets/moveStep.mp3'
import { packData } from '../data/package'
import { deepClone } from '../api/deepCopy'

// 私有类型
const current = Symbol()
const role = Symbol()

class Role {
    constructor(el, size, len, colors, names) {
        this.el = el
        this.ctx = el.getContext('2d')
        this.size = size
        this.len = len
        // 玩家数组
        this[role] = []
        // 当前玩家的数组索引
        this[current] = 0
        // 步数计时器
        this.timer = null
        // 初始化
        this.init(colors, names)
        // 渲染
        this.render()
        this.Audio = document.createElement('audio')
        this.Audio.src = MoveMusic
    }
    set _role(val) {
        this[role] = val
    }
    get _role() {
        return this[role]
    }
    set _current(val) {
        const max = this[role].length - 1
        // 当前玩家的数组索引范围
        if (val < 0 || val > max) {
            throw new Error(
                `set current must be 0 ~ ${max}`
            )
        }
        this[current] = val
    }
    get _current() {
        return this[current]
    }
    init(colors, names) {
        const x = this.len / 2
        const y = this.len / 2

        for (let i = 0; i < colors.length; i++) {
            this[role][i] = {
                id: i,
                name: names[i],
                money: 10000,
                x, y,
                color: colors[i],
                diceTime: 1,
                jailTime: 0,
                isBuyBuild: false,
                package: deepClone(packData),
                usePackTime: 3
            }
        }
    }
    drawRole(r, size, numColor) {
        // 画圆，代表玩家
        this.ctx.beginPath()
        this.ctx.fillStyle = r.color
        this.ctx.arc(r.x, r.y, 30, 0, Math.PI * 2)
        this.ctx.fill()
        // 画玩家 ID
        this.ctx.fillStyle = numColor
        this.ctx.font = `${size}px 宋体 bold`
        // 计算字的宽度
        const width = this.ctx.measureText(`${r.id + 1}`).width
        // 画字
        this.ctx.fillText
            (
                r.id + 1,
                r.x - (size - width) / 2,
                r.y + size / 2 - size / 5
            )
    }
    render() {
        // 渲染所有玩家
        let currentRole = null
        const lastRole = this[role].length - 1

        this[role].forEach((r, i) => {
            if (i === this[current]) {
                currentRole = r
            }
            this.drawRole(r, 24, '#666')
            // 渲染当前玩家置于顶层
            if (i === lastRole) {
                this.drawRole(currentRole, 24, '#fff')
            }
        })
    }
    clear() {
        this.ctx.clearRect(0, 0, this.size, this.size)
    }

    /**
     * 
     * @param { 当前玩家走 n 步 } step 
     * @returns { Promise<void> 代表玩家走完了 }
     */
    moveStep(step, type) {
        const active = this[current]

        return new Promise((resolve) => {
            this.timer = setInterval(() => {
                step = step - 1
                // 获取玩家的当前位置
                let { x, y } = this.moveOneStep(
                    this[role][active].x,
                    this[role][active].y
                    , type)
                
                      
                this.Audio.play()

                // 改变当前玩家的位置
                this[role][active].x = x
                this[role][active].y = y
                // 清空画布
                this.clear()
                // 重新渲染 
                this.render()
                // 玩家走完了 
                if (step === 0) {
                    clearInterval(this.timer)
                    this.timer = null
                    resolve()
                }
            }, 150)
        })
    }

    /**
     * 
     * @param { 玩家的x } x 
     * @param { 玩家的y } y 
     * @param { 走的方向 } type
     * @returns { { 玩家下一步的x, 玩家下一步的y } }
     */
    moveOneStep(x, y, type) {
        // 例如, 当 this.len = 100, this.size = 700
        //   halfStep  = 50
        //   borderOne = 550
        //   borderTwo = 650
        const halfStep = this.len / 2
        const borderOne = this.size - this.len - halfStep
        const borderTwo = this.size - halfStep

        if (type === undefined) {
            type = true
        }
        switch (type) {
            // 顺指针
            case true:
                // 顶部走法
                if (y === halfStep && (x >= halfStep && x <= borderOne)) {
                    x += this.len
                }
                // 右侧走法
                else if (x === borderTwo && (y >= halfStep && y <= borderOne)) {
                    y += this.len
                }
                // 底部走法
                else if (y === borderTwo && (x >= (halfStep + this.len) && x <= borderTwo)) {
                    x -= this.len
                }
                // 左侧走法
                else if (x === halfStep && (y >= (halfStep + this.len) && y <= borderTwo)) {
                    y -= this.len
                }
                break
            // 逆时针
            case false:
                // 顶部走法
                if (y === halfStep && (x >= (halfStep + this.len) && x <= borderTwo)) {
                    x -= this.len
                }
                // 右侧走法
                else if (x === borderTwo && (y >= (halfStep + this.len) && y <= borderTwo)) {
                    y -= this.len
                }
                // 底部走法
                else if (y === borderTwo && (x >= halfStep && x <= borderOne)) {
                    x += this.len
                }
                // 左侧走法
                else if (x === halfStep && (y >= halfStep && y <= borderOne)) {
                    y += this.len
                }
                break
        }

        return { x, y }
    }
}

export default Role 