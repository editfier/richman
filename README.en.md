## Monopoly game

### Introduction

Monopoly game written in JavaScript

### Options

| Attribute description |

| ------ | -------------- |
| root | root node |
| size | canvas size |
| len | length of a single picture |
| colors | player colors |
| names | player name |

### Examples

```javascript
new Richman({
  root: document.querySelector("#app"),

  size: 700,

  len: 100,

  colors: ["#c0392b", "#d35400", "#2980b9"],

  names: ["Zhangsan", "Lisi", "WangWu"],
});
```

### Effect
![project presentation](https://gitee.com/day0stack/richman/raw/master/show.JPG)
