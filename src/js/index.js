/** index.js 
 * @description 能让人开心的代码就是好代码 
 */

import '../css/richman'
const template = require('../template/richman.art')
import Template from './template/template'
import Map from './core/map'
import Role from './core/role'
import Info from './core/info'
import Build from './core/build'
import Timer from './core/timer'
import Dice from './core/dice'
import Buy from './core/buy'
import Style from './core/style'
import Package from './core/package'
import { initPlace, placeData } from './data/place'
import { rangeRandom } from './api/random'
import Talk from './core/talk'

class Richman {
    constructor(options) {
        if (typeof options === 'undefined') {
            throw new Error('options is undefined')
        }
        options.root.innerHTML = template()

        this.template = new Template(options.root)
        this.template._root = options.size
        this.template._size = options.size

        initPlace()

        this.map = new Map(this.template.map, options.size, options.len)
        this.role = new Role(this.template.role, options.size, options.len, options.colors, options.names)
        this.build = new Build(this.template.build, this.role, options.size, options.len, options.colors)
        this.info = new Info(this.template.info).render(this.role._role, this.role._current)
        this.timer = new Timer(this.template.roleTime, this.role)
        this.dice = new Dice(this.template.dice)
        this.talk = new Talk(this.template.talk)
        this.buy = new Buy(this.template.buy, this.talk, options.size, options.len)
        this.style = new Style(this.template.diceControl, this.template.buyControl, this.template.jumpControl, this.template.packControl,
            options.size, options.len)
        this.package = new Package(this.template.packControl, this.template.packageList, this.role, this.info, this.style, this.talk, this.dice)

        // 主进程计时器
        this.richMan = null
        // 是否可以下一位玩家
        this.isNextRole = true

        // 绑定 this
        this.bindDiceEvent = this.diceEvent.bind(this)
        this.bindBuyEvent = this.buyEvent.bind(this)
        this.bindJumpEvent = this.jumpEvent.bind(this)
        this.bindPackEvent = this.packEvent.bind(this)

        this.start()
        this.bindEvents()
    }
    start() {
        this.richMan = setInterval(() => {
            this.waitRoleTime()
            this.style.controlStyle(
                this.role._role, this.role._current
            )
            this.isCurrentRoleDead()

            if (this.role._role.length === 1) {
                this.dice.clearTimer()
                this.timer.clearTimer()
                this.removeEvents()
                this.style.setRemoveStyle()

                clearInterval(this.richMan)
                this.richMan = null

                alert('Win')
            }
        }, 30)
    }
    clearPlace() {
        return new Promise((resolve) => {
            placeData.forEach((p, i) => {
                if (p.buyRole === this.role._role[this.role._current].id) {
                    p.buyRole = -1
                    p.isBuy = false
                    p.rate = 0.3
                    // this.build.clear(i)
                }
            })
            resolve()
        })
    }
    async isCurrentRoleDead() {
        if (this.role._role[this.role._current].money <= 0) {
            // 清理所有计时器
            this.dice.clearTimer()
            this.timer.clearTimer()

            // 清除玩家所购买的建筑
            await this.clearPlace()

            this.build.clearAll()

            // 保存当前最大长度
            let tMax =  this.role._role.length - 1

            // 清除 role 中没钱的玩家
            this.role._role[this.role._current] = null
            this.role._role = this.role._role.filter(r => r !== null)

            /**
             * 2020-4-17
             * 修复一个 bug
             * 只有当 current 为数组的最后一个值时，才会赋为 0
             * 否则 current 不变
             */
            if (this.role._current === tMax) {
                this.role._current = 0
            }

            // 更新玩家信息
            this.info.render(this.role._role, this.role._current)

            // 可以轮到下一位玩家
            this.isNextRole = true

            // 为下一位玩家重置买房设置
            this.role._role[this.role._current].isBuyBuild = false

            // 清理人物画布
            this.role.clear()

            // 渲染人物
            this.role.render()

            // 渲染建筑
            await this.build.render()
        }
    }
    setRoleCurrent(val) {
        this.role._current = val
    }
    async waitRoleTime() {
        if (this.isNextRole) {
            this.isNextRole = false

            // 如果当前玩家没在坐牢
            if (this.role._role[this.role._current].jailTime === 0) {
                // 当前玩家等待 10 秒
                await this.timer.waitCurrentRole(20000)

                this.package.packageEl.style.display = 'none'

                // 如果玩家超过时限, 还没掷出骰子, 就掷出骰子
                if (this.role._role[this.role._current].diceTime) {

                    // 自动掷出时，玩家不可操作
                    this.removeEvents()

                    this.role._role[this.role._current].diceTime = 0

                    let diceNumber = await this.dice.playDice(1000)

                    await this.role.moveStep(diceNumber)

                    this.addEvents()
                }
            } else {
                this.role._role[this.role._current].jailTime--;
                this.talk.message(`<span>${this.role._role[this.role._current].name}</span>即将出狱`, 4000)
            }
            // 重新设置
            this.nextSettings()
        }
    }
    nextSettings() {
        // 重置当前玩家的掷出次数
        this.role._role[this.role._current].diceTime = 1

        // 下一名玩家
        this.timer.nextRole()

        // 渲染玩家信息
        this.info.render(this.role._role, this.role._current)

        // 可以轮到下一位玩家
        this.isNextRole = true

        // 为下一位玩家重置买房设置
        this.role._role[this.role._current].isBuyBuild = false

        // 为下一位玩家重置道具次数
        this.role._role[this.role._current].usePackTime = 3

        // 重新渲染角色
        this.role.render()
    }
    async diceEvent() {
        if (this.role._role[this.role._current].diceTime === 0) {
            return
        }
        this.role._role[this.role._current].diceTime--

        this.removeEvents()

        let rangeTime = rangeRandom(100, 1000)
        let diceNumber = await this.dice.playDice(rangeTime)
        await this.role.moveStep(diceNumber)

        this.buy.watch(this.role._role, this.role._current)

        this.info.render(this.role._role, this.role._current)

        this.addEvents()

        this.role._role[this.role._current].isBuyBuild = true
    }
    buyEvent() {
        if (this.role._role[this.role._current].isBuyBuild === true) {
            this.buy.buyBuild(this.role._role, this.role._current)
            this.build.clearAll()
            this.build.render()
            this.info.render(this.role._role, this.role._current)
            this.role._role[this.role._current].isBuyBuild = false
        }
    }
    packEvent() {
        if (this.role._role[this.role._current].package.length !== 0) {
            this.package.render(this.role._role, this.role._current)
        }
    }
    addEvents() {
        this.template.diceControl.addEventListener('click', this.bindDiceEvent)
        this.template.buyControl.addEventListener('click', this.bindBuyEvent)
        this.template.jumpControl.addEventListener('click', this.bindJumpEvent)
        this.template.packControl.addEventListener('click', this.bindPackEvent)
    }
    removeEvents() {
        this.template.diceControl.removeEventListener('click', this.bindDiceEvent)
        this.template.buyControl.removeEventListener('click', this.bindBuyEvent)
        this.template.jumpControl.removeEventListener('click', this.bindJumpEvent)
        this.template.packControl.removeEventListener('click', this.bindPackEvent)
    }
    jumpEvent() {
        if (this.role._role[this.role._current].diceTime === 0) {
            // 清除骰子计时器和限时计时器
            this.dice.clearTimer()
            this.timer.clearTimer()

            // 重新设置
            this.nextSettings()
        }
    }
    bindEvents() {
        this.addEvents()
    }
}

export default Richman