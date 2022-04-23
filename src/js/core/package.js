/** package.js
 * @description 玩家背包类
 */

import { rangeRandom } from "../api/random"

class Package {
    constructor(packControl, packageEl, role, info, style, talk, dice) {
        this.packControl = packControl
        this.packageEl = packageEl
        this.close = packageEl.querySelector('.role-package-close')
        this.packageList = packageEl.querySelector('.role-package-list')
        this.packageItem = []
        this.bindSwitchEvents = []
        this.role = role
        this.info = info
        this.style = style
        this.talk = talk
        this.dice = dice
        this.bindEvent()
    }
    render(role, current) {
        this.packageEl.style.display = 'flex'
        this.packageEl.setAttribute('data-packname', `${role[current].name}的背包`)
        this.packageList.innerHTML = ''

        if (role[current].package.length === 0) {
            return
        }
        if (role[current].usePackTime === 0) {
            this.packageEl.style.display = 'none'
            this.talk.message('使用<span>道具次数</span>达到上限', 4000)
            return
        }

        role[current].package.forEach((pack) => {
            this.packageList.insertAdjacentHTML('beforeend', `
                <div class="role-package-item">
                    <div class="role-package-name">${pack.name}</div>
                    <img src="${pack.src}" />
                    <div class="role-package-count">${pack.num}个</div>
                </div>
            `)
        });
        this.packageItem = this.packageList.querySelectorAll('.role-package-item')
        this.packageItem.forEach((v, i) => {
            this.bindSwitchEvents[i] = this.switchEvent.bind(this, i, role, current)
            v.addEventListener('click', this.bindSwitchEvents[i])
        })
    }
    switchEvent(i, role, current) {
        switch (role[current].package[i].type) {
            case 1:
                let randomMoney = rangeRandom(-1000, 3000)

                if (randomMoney === 0) {
                    this.talk.message(`<span>${role[current].name}</span>去赌博了，啥也没赚，白忙活了`, 4000)
                } else if (randomMoney > 0) {
                    this.talk.message(`<span>${role[current].name}</span>去赌博了，从现在开始这里叫${role[current].name}广场，+${randomMoney}$`, 4000)
                } else {
                    this.talk.message(`<span>${role[current].name}</span>去赌博了，被赶出了赌场，${randomMoney}$`, 4000)
                }

                role[current].money += randomMoney
                role[current].package[i].num--
                role[current].usePackTime--
                this.info.render(role, current)
                break
            case 2:
                if (this.role.timer === null) {
                    role[current].isBuyBuild = true
                    this.style.controlStyle(role, current)

                    role[current].package[i].num--
                    role[current].usePackTime--

                    this.talk.message(`<span>${role[current].name}</span>准备买买买`, 4000)
                }
                break
            case 3:
                if (this.role.timer === null) {
                    let randomStep = rangeRandom(1, 8)
                    this.role.moveStep(randomStep, false)

                    role[current].package[i].num--
                    role[current].usePackTime--

                    this.talk.message(`<span>${role[current].name}</span>反向起飞了，现在开始一次不死，并且超神`, 4000)
                }
                break
        }


        if (role[current].package[i].num === 0) {
            role[current].package[i] = null
            role[current].package = role[current].package.filter((v) => v !== null)
        }
        this.render(role, current)
    }
    bindEvent() {
        this.close.addEventListener('click', () => {
            this.packageEl.style.display = 'none'
            this.packageItem.forEach((v, i) => {
                v.removeEventListener('click', this.bindSwitchEvents[i])
            })
        })
    }
}

export default Package