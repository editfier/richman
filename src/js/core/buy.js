/** buy.js
 * @description buy
 */

import { rangeRandom } from '../api/random'
import { rolePosToIndex } from '../api/transform'
import { placeData } from '../data/place'
import { packData } from '../data/package'

class Buy {
    constructor(el, talk, size, len) {
        this.el = el
        this.size = size
        this.len = len
        this.talk = talk
    }
    buyBuild(role, current) {
        let placeIndex = rolePosToIndex(
            role[current].x, role[current].y,
            this.size, this.len
        )
        if (placeData[placeIndex].risk === true) {
            return
        }

        if (placeData[placeIndex].isBuy === false) {
            if (placeData[placeIndex].money > role[current].money) {
                this.talk.message(`<span>${role[current].name}</span>钱不够，无法购买`, 4000)
                return 
            }
            placeData[placeIndex].isBuy = true
            placeData[placeIndex].buyRole = role[current].id

            role[current].money -= placeData[placeIndex].money
            this.talk.message(`
            <span>${role[current].name}</span>购买了<span>${placeData[placeIndex].name}</span>，花费${placeData[placeIndex].money}
        `, 4000)
        }
        else {
            if (placeData[placeIndex].buyRole === role[current].id) {
                const rateMoney = placeData[placeIndex].money * placeData[placeIndex].rate

                if (rateMoney > role[current].money) {
                    this.talk.message(`<span>${role[current].name}</span>钱不够，无法升级`, 4000)
                    return 
                }

                if (placeData[placeIndex].rate < 1) {
                    
                    role[current].money -= rateMoney

                    placeData[placeIndex].rate *= 2
                    this.talk.message(`
                        <span>${role[current].name}</span>升级了<span>${placeData[placeIndex].name}</span>，花费${rateMoney}，
                         当前利率 <span>${placeData[placeIndex].rate}</span>
                    `, 4000)
                } else {
                    this.talk.message(`再升级就要被世界政府制裁了`, 4000)
                }
            }
        }
    }
    addPack(role, current, name, src, type, size, num) {
        if (size === 0) {
            role[current].package[size] =
            {
                name,
                src,
                num,
                type
            };
        } else {
            let realIndex = role[current].package.findIndex((v) => v.type === type)
            if (realIndex === -1) {
                role[current].package[size] = {
                    name,
                    src,
                    num,
                    type
                }
            } else {
                role[current].package[realIndex].num += num;
            }
        }
    }
    riskEvent(role, current, placeIndex) {
        let evenType = rangeRandom(0, 1)
        if (evenType === 0) {
            let getMoney = rangeRandom(-2000, 2000)
            role[current].money += getMoney

            if (getMoney > 0) {
                this.talk.message(`
                ${role[current].name}在<span>${placeData[placeIndex].name}</span>挖出了一笔财宝，+${getMoney}
            `, 4000)
            } else {
                this.talk.message(`
                ${role[current].name}在<span>${placeData[placeIndex].name}</span>遇到了盗贼，${getMoney}
            `, 4000)
            }
        } else {
            role[current].jailTime = 1
            this.talk.message(`
            ${role[current].name}在<span>${placeData[placeIndex].name}</span>
            被疯狂科学家抓去<span>实验</span>,下回合无法行动，
            `, 4000)
        }
    }
    watch(role, current) {
        let placeIndex = rolePosToIndex(
            role[current].x, role[current].y,
            this.size, this.len
        )
        if (placeData[placeIndex].risk === true) {
            this.riskEvent(role, current, placeIndex)
            return
        }
        if (placeData[placeIndex].shop === true) {
            const maxLen = packData.length - 1
            const pack = packData[rangeRandom(0, maxLen)]
            const size = role[current].package.length;
            const num = rangeRandom(1, 2)

            this.addPack(role, current, pack.name, pack.src, pack.type, size, num)
        }
        if (placeData[placeIndex].isBuy === true) {
            if (placeData[placeIndex].buyRole !== role[current].id) {
                const rateMoney = placeData[placeIndex].money * placeData[placeIndex].rate

                role[current].money -= rateMoney
                const realRoleIndex = role.findIndex((v) => v.id === placeData[placeIndex].buyRole)
                role[realRoleIndex].money += rateMoney

                this.talk.message(`
                    <span>${role[realRoleIndex].name}</span>收取了<span>${role[current].name}</span>，+${rateMoney}$
                `, 4000)
            }
        }
    }
}

export default Buy