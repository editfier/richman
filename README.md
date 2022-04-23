## 大富翁游戏

### 介绍

使用 JavaScript 编写的大富翁游戏

### 选项

| 属性   | 描述           |
| ------ | -------------- |
| root   | 根节点         |
| size   | 画布大小       |
| len    | 单个图片的长度 |
| colors | 玩家颜色       |
| names  | 玩家名称       |

### 示例

```javascript
new Richman({
  root: document.querySelector("#app"),
  size: 700,
  len: 100,
  colors: ["#c0392b", "#d35400", "#2980b9"],
  names: ["Zhangsan", "Lisi", "WangWu"],
});
```

### 效果

![项目展示](https://gitee.com/day0stack/richman/raw/master/show.JPG)