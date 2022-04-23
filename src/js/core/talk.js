/** talk.js
 * @description 说话类
 */

class Talk {
    constructor(el) {
        this.el = el
        this.talkTimer = null 
    }
    /**
     * 
     * @param { 要传递的话 } talk 
     */
    message(talk, time) {
        if (this.talkTimer) {
            clearTimeout(this.talkTimer)
            this.talkTimer = null 
        }
        this.el.classList.add('active')
        this.el.innerHTML = talk 

        this.talkTimer = setTimeout(() => {
            this.el.classList.remove('active')
        }, time)
    }
}

export default Talk 