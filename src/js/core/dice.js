/** dice.js
 * @description 骰子类
 */

class Dice {
    constructor(el) {
        this.el = el
        this.elDices = this.el.querySelectorAll('.role-dice-delta')
        this.renderTimer = null
        this.diceTimer = null
        this.diceNumber = 1
    }
    clearTimer() {
        clearInterval(this.renderTimer)
        clearTimeout(this.diceTimer)

        this.renderTimer = null
        this.diceTimer = null
    }
    render(dice) {
        this.elDices.forEach(el => {
            el.classList.remove('active')
        });

        switch (dice) {
            case 1:
            case 2:
            case 3: this.elDices[dice - 1].classList.add('active')
                break
            case 8: this.elDices[3].classList.add('active')
                break
            case 4: this.elDices[5].classList.add('active')
                break
            case 5: this.elDices[8].classList.add('active')
                break
            case 6: this.elDices[7].classList.add('active')
                break
            case 7: this.elDices[6].classList.add('active')
                break
        }
    }
    playDice(time) {
        return new Promise((resolve) => {
            this.renderTimer = setInterval(() => {
                if (this.diceNumber < 8) {
                    this.diceNumber++
                } else {
                    this.diceNumber = 1
                }
                this.render(this.diceNumber)
            }, 100)
            this.diceTimer = setTimeout(() => {
                clearInterval(this.renderTimer)
                this.renderTimer = null
                this.diceTimer = null
                resolve(this.diceNumber)
            }, time)
        })
    }
}

export default Dice