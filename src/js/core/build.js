/** build.js
 * @description 建筑渲染
 */

import { placeData } from '../data/place'
import { indexToPos } from '../api/transform'
import build1 from '../../assets/build-1.png'
import build2 from '../../assets/build-2.png'
import build3 from '../../assets/build-3.png'

class Build {
    constructor(el, role, size, len, colors) {
        this.el = el
        this.role = role
        this.ctx = el.getContext('2d')
        this.size = size
        this.len = len
        this.colors = colors
    }
    rateToPath(rate) {
        let path = null
        switch (rate) {
            case 0.3: path = build1
                break
            case 0.6: path = build2
                break
            case 1.2: path = build3
                break
        }
        return path
    }
    clearAll() {
        this.ctx.clearRect(0, 0, this.size, this.size)
    }
    clear(index) {
        let { x, y } = indexToPos(index, this.size, this.len)
        this.ctx.clearRect(x, y, this.len, this.len)
    }
    drawStar(r, R, x, y) {
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            this.ctx.lineTo(Math.cos((18 + i * 72) / 180 * Math.PI) * R + x,
                -Math.sin((18 + i * 72) / 180 * Math.PI) * R + y);
            this.ctx.lineTo(Math.cos((54 + i * 72) / 180 * Math.PI) * r + x,
                -Math.sin((54 + i * 72) / 180 * Math.PI) * r + y);
        }
        this.ctx.closePath();
        this.ctx.fill()
    }
    initImage(src) {
        return new Promise((resolve) => {
            const image = new Image()
            image.onload = () => {
                resolve(image)
            }
            image.src = src
        })
    }
    findIsBuy() {
        const isBuy = []
        for (let i = 0; i < placeData.length; i++) {
            if (placeData[i].isBuy === false) {
                continue
            }
            isBuy.push({
                place: placeData[i],
                index: i
            })
        }
        return isBuy
    }
    async render() {
        const renderData = this.findIsBuy()

        for (let i = 0; i < renderData.length; i++) {
            let realRoleIndex = this.role._role.findIndex(v => v.id === renderData[i].place.buyRole)
            let path = this.rateToPath(renderData[i].place.rate)

            try {
                let image = await this.initImage(path)
                let { x, y } = indexToPos(renderData[i].index, this.size, this.len)

                this.ctx.drawImage(image, x, y, this.len, this.len)
                this.ctx.fillStyle = this.role._role[realRoleIndex].color
                this.drawStar(5, 10, x + 12, y + 12)

                this.ctx.font = '12px 宋体'
                this.ctx.fillStyle = 'white'
                this.ctx.fillText(`${renderData[i].place.buyRole + 1}`, x + 10, y + 16)
            } catch (e) {
                console.error(`build.js ${e}`);
            }
        }
    }
}

export default Build