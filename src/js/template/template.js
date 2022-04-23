/** template.js
 * @description 选择 DOM
 */

const queryType = {
    ID: Symbol('id type'),
    CLASS: Symbol('class type')
}

class Template {
    constructor(root) {
        this.root = root
        this.init()
    }
    set _root(size) {
        this.root.style.position = 'relative'
        this.root.style.width = this.root.style.height = size + 'px'
    }
    set _size(val) {
        this.role.width = this.role.height = val 
        this.build.width = this.build.height = val 
        this.map.width = this.map.height = val
    }
    query(el, name, type) {
        let flag = ''
        switch (type) {
            case queryType.ID: flag = '#'
                break
            case queryType.CLASS: flag = '.'
                break
            default:
                throw new Error('type error')
        }
        return el.querySelector(`${flag}${name}`)
    }
    init() {
        // canvas DOM
        this.role = this.query(this.root, 'rich-man-role', queryType.ID)
        this.build = this.query(this.root, 'rich-man-build', queryType.ID)
        this.map = this.query(this.root, 'rich-man-map', queryType.ID)

        // 显示玩家信息 DOM
        this.info = this.query(this.root, 'role-list-info', queryType.CLASS)

        // 玩家控制 DOM
        this.diceControl = this.query(this.root, 'role-control-dice', queryType.CLASS)
        this.buyControl = this.query(this.root, 'role-control-buy', queryType.CLASS)
        this.jumpControl = this.query(this.root, 'role-control-jump', queryType.CLASS)
        this.packControl = this.query(this.root, 'role-control-pack', queryType.CLASS)

        // 显示玩家可用时间 DOM
        this.roleTime = this.query(this.root, 'role-current-time', queryType.ID)

        // 显示骰子 DOM
        this.dice = this.query(this.root, 'role-dice', queryType.ID)

        // 显示消息 DOM
        this.talk = this.query(this.root, 'rich-man-talk', queryType.ID)  

        // 背包 DOM 
        this.packageList = this.query(this.root, 'role-package', queryType.CLASS)
    }
}

export default Template