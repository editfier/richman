/** map.js
 * @description 地图渲染
 */

import { placeData, bgData } from '../data/place'

const Align = {
    TOP: Symbol('top align'),
    MIDDLE: Symbol('middle align'),
    BOTTOM: Symbol('bottom align')
}

class Map {
    constructor(el, size, len) {
        this.el = el
        this.ctx = el.getContext('2d')
        this.size = size
        this.len = len
        this.background(bgData)
        this.render()
    }
    background(src) {
        const image = new Image()
        image.onload = () => {
            this.ctx.drawImage
                (
                    image,
                    this.len, this.len,
                    this.size - this.len * 2,
                    this.size - this.len * 2
                )
        }
        image.src = src
    }
    text(text, x, y, color, size, type) {
        this.ctx.font = `${size}px 宋体 bold`
        this.ctx.fillStyle = color

        const width = this.ctx.measureText(text).width
        x += (this.len - width) / 2

        switch (type) {
            case Align.TOP: y += size + size / 2
                break
            case Align.MIDDLE: y += (this.len - size) / 2
                break
            case Align.BOTTOM: y += (this.len - size) + size / 2
                break
            default:
                throw new Error('text type error.')
        }

        this.ctx.fillText(text, x, y)
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
    async render() {
        let x = 0, y = 0
        const count = (this.size / this.len) - 1
        const total = count * 4

        for (let i = 0; i < total; i++) { 
            let image = await this.initImage(placeData[i].src)

            this.ctx.drawImage(image, x, y, this.len, this.len)
            this.text(placeData[i].name, x, y, '#fff', 16, Align.MIDDLE)

            if (placeData[i].money) {
                this.text(placeData[i].money, x, y, '#fff', 14, Align.TOP)
            }
            if (placeData[i].risk === true) {
                this.text('无人区', x, y, 'red', 16, Align.BOTTOM)
            }
            if (placeData[i].shop) {
                this.text('道具城', x, y, '#fdcb6e', 16, Align.BOTTOM)
            }

            if (i < count) {
                x += this.len
            } else if (i < count * 2) {
                y += this.len
            } else if (i < count * 3) {
                x -= this.len
            } else if (i < count * 4) {
                y -= this.len
            }
        }
    }
}

export default Map 