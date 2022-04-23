/** worldData
 * @created 2022-4-13
 * @updated 2022-4-15
 */

export const bgData = "https://img2.baidu.com/it/u=2614772324,1063362496&fm=253&fmt=auto&app=138&f=JPEG?w=890&h=500"

export function initPlace() {
    placeData.forEach(p => {
        // 当 isBuy 未定义
        if (!p.isBuy) {
            p.isBuy = false 
        }
        // 当利率未定义
        if (!p.rate) {
            p.rate = 0.3
        }
        // 购买者 id
        p.buyRole = -1
    })
}

export const placeData = [
    {
        name: "地狱边境",
        src: "https://img2.baidu.com/it/u=25899456,1478070957&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=426",
        fontColor: "#fff",
        risk: true
    },
    {
        name: "沙哈拉沙漠",
        money: 3200,
        src: "https://img2.baidu.com/it/u=313102027,2756436313&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=234",
        fontColor: "#ee5253",
    },
    {
        name: "阿勒特平原",
        money: 500,
        src: "https://img0.baidu.com/it/u=169361816,2366148185&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313",
        fontColor: "#fff",
    },
    {
        name: "幻想乡",
        money: 1000,
        src: "https://img0.baidu.com/it/u=1605457923,1953811478&fm=26&fmt=auto",
        fontColor: "#fff",
        shop: true
    },
    {
        name: "箱庭岛",
        money: 400,
        src: "https://img2.baidu.com/it/u=4212837550,2437884169&fm=253&fmt=auto&app=138&f=JPEG?w=707&h=500",
        fontColor: "#fff",
    },
    {
        name: "彩虹岛",
        money: 800,
        src: "https://img2.baidu.com/it/u=3962849056,819638092&fm=253&fmt=auto&app=138&f=JPEG?w=520&h=300",
        fontColor: "#ff9f43",
    },
    {
        name: "废气边陲",
        src: "https://img2.baidu.com/it/u=361930780,2040045157&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=296",
        risk: true
    },
    {
        name: "夏洛特梦境",
        money: 1500,
        src: "https://img1.baidu.com/it/u=2043835932,2902948496&fm=253&fmt=auto&app=138&f=JPEG?w=376&h=500",
        fontColor: "#f368e0",
    },
    {
        name: "蒸汽之都",
        money: 3000,
        src: "https://img1.baidu.com/it/u=3931350548,1754718168&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
    },
    {
        name: "英雄之村",
        money: 2200,
        src: "https://img0.baidu.com/it/u=2753552073,1865783582&fm=26&fmt=auto",
    },
    {
        name: "遗落圣坛",
        money: 1000,
        src: "https://img2.baidu.com/it/u=4158053415,2142504387&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=320",
    },
    {
        name: "山海秘境",
        money: 3000,
        src: "https://img1.baidu.com/it/u=1844050364,530456280&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
    },
    {
        name: "血腥要塞",
        src: "https://img1.baidu.com/it/u=3886299193,3912689752&fm=253&fmt=auto&app=120&f=JPEG?w=820&h=546",
        fontColor: "#fff",
        risk: true,
    },
    {
        name: "星辰海",
        money: 2500,
        src: "https://img1.baidu.com/it/u=2582105161,3093355499&fm=253&fmt=auto&app=120&f=JPEG?w=462&h=1000",
        fontColor: "#fff",
    },

    {
        name: "太空船废墟",
        money: 1300,
        src: "https://img0.baidu.com/it/u=3964159907,1109195160&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=307",
    },
    {
        name: "圣者之塔",
        money: 3000,
        src: "https://img0.baidu.com/it/u=4041345951,3549347478&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=565",
        shop: true,
    },
    {
        name: "出云岛",
        money: 1200,
        src: "https://img0.baidu.com/it/u=3248453462,3955837911&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=411",
    },
    {
        name: "混沌深渊",
        money: 1500,
        src: "https://img1.baidu.com/it/u=3615811170,235620978&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500",
    },
    {
        name: "第19区",
        src: "https://img1.baidu.com/it/u=2351069735,2607187122&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281",
        risk: true,
    },
    {
        name: "德古拉城堡",
        money: 1500,
        src: "https://img1.baidu.com/it/u=1678430886,2937951060&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=281",
    },
    {
        name: "海盗港湾",
        money: 2000,
        src: "https://img0.baidu.com/it/u=3358634266,3942708847&fm=26&fmt=auto",
    },
    {
        name: "罗杰的宝藏",
        money: 1200,
        src: "https://img2.baidu.com/it/u=1661012168,3108394996&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    },
    {
        name: "元素洞窟",
        money: 2500,
        src: "https://img0.baidu.com/it/u=4270821394,257579297&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=300",
    },
    {
        name: "古文明的遗迹",
        money: 1700,
        src: "https://img1.baidu.com/it/u=3241632604,3561253008&fm=253&fmt=auto&app=138&f=JPEG?w=904&h=500",
    },
    {
        name: "混沌深渊",
        money: 1700,
        src: "https://img2.baidu.com/it/u=3304027895,327882209&fm=253&fmt=auto&app=120&f=JPEG?w=887&h=800",
    },
]