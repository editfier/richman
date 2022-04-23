/** timer.js
 * @description 计时类
 */

class Timer {
    constructor(el, role) {
        this.el = el 
        this.role = role 
        this.renderTimer = null 
        this.waitTimer = null 
    }
    render(t) {
        this.el.innerHTML = t
    }
    nextRole() {
        const lastRole = this.role._role.length - 1

        if (this.role._current < lastRole) {
            this.role._current++
        } else {
            this.role._current = 0
        }
    }
    clearTimer() {
        clearInterval(this.renderTimer)
        clearTimeout(this.waitTimer)

        this.renderTimer = null 
        this.waitTimer = null
    }
    waitCurrentRole(time) {
        return new Promise((resolve) => {
            let step = time / 1000

            this.renderTimer = setInterval(() => {
                this.render(step)
                step = step - 1
            }, 1000)

            this.waitTimer = setTimeout(() => {
                clearInterval(this.renderTimer)
                this.renderTimer = null 
                this.waitTimer = null 
                resolve()
            }, time)
        })
    }
}

export default Timer