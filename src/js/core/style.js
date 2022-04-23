/** style.js
 * @description 按钮样式控制
 */

import { placeData } from "../data/place"
import { rolePosToIndex } from '../api/transform'

class Style {
    /**
     * 
     * @param { 骰子DOM } diceEl 
     * @param { 购买(升级)DOM } buyEl 
     * @param { 跳过DOM } jumpEl 
     * @param { size } size 
     * @param { len } len 
     */
    constructor(diceEl, buyEl, jumpEl, packEl, size, len) {
        this.size = size
        this.len = len
        this.diceEl = diceEl
        this.buyEl = buyEl
        this.jumpEl = jumpEl
        this.packEl = packEl
    }
    setRemoveStyle() {
        this.diceEl.classList.add('disabled')
        this.buyEl.classList.add('disabled')
        this.jumpEl.classList.add('disabled')
        this.packEl.classList.add('disabled')
    }
    controlStyle(role, current) {
        let placeIndex = rolePosToIndex(
            role[current].x,
            role[current].y,
            this.size,
            this.len
        )

        if (role[current].diceTime === 0) {
            this.diceEl.classList.add('disabled')
            this.jumpEl.classList.remove('disabled')

            if (placeData[placeIndex].isBuy === false) {
                if (placeData[placeIndex].risk === true) {
                    return
                }
                if (role[current].isBuyBuild) {
                    this.buyEl.classList.remove('disabled')
                } else {
                    this.buyEl.classList.add('disabled')
                }
            } else {
                if (role[current].id === placeData[placeIndex].buyRole) {
                    if (role[current].isBuyBuild) {
                        this.buyEl.classList.remove('disabled')
                    } else {
                        this.buyEl.classList.add('disabled')
                    }
                }
            }
        } else {
            this.diceEl.classList.remove('disabled')
            this.jumpEl.classList.add('disabled')
            this.buyEl.classList.add('disabled')

            if (placeData[placeIndex].risk === true) {
                return
            }
            if (role[current].isBuyBuild) {
                this.buyEl.classList.remove('disabled')
            } else {
                this.buyEl.classList.add('disabled')
            }
        }
        if (role[current].package.length === 0) {
            this.packEl.classList.add('disabled')
        } else {
            this.packEl.classList.remove('disabled')
        }
    }
}

export default Style