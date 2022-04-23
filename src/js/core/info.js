/** info.js
 * @description 玩家信息渲染
 */

class Info {
    constructor(el) {
        this.el = el
    }

    /**
     * 
     * @param { 玩家数组 } role 
     * @param { 当前玩家 } current 
     * @returns { Info }
     */
    render(role, current) {
        if (role.length === 0) {
            this.el.innerHTML = `
                <div class="role-list-title">暂无玩家</div>
            `
            return;
        } 
        this.el.innerHTML = `
            <div class="role-list-title">玩家信息</div>
        `
        let list = document.createElement('div')
        list.className = 'role-list-item'

        role.forEach((r, i) => {
            let el = document.createElement('div')
            // 当前玩家设置活动样式
            if (current === i) {
                el.setAttribute('class', 'role-item role-item-active')
            } else {
                el.setAttribute('class', 'role-item')
            }

            let id = document.createElement('div')
            let name = document.createElement('div')
            let money = document.createElement('div')

            id.className = 'role-id'
            name.className = 'role-name'
            money.className = 'role-money'

            id.innerHTML = `${r.id + 1}`
            name.innerHTML = r.name 
            money.innerHTML = r.money

            el.appendChild(id)
            el.appendChild(name)
            el.appendChild(money)
            
            list.appendChild(el)
        })

        this.el.appendChild(list)

        return this 
    }
}

export default Info