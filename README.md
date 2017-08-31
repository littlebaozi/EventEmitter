# 简略的发布订阅实现

## EventEmitter.js
用了不少es6的语法
* on(eventName, func)：监听 eventName 事件，事件触发的时候调用 func 函数。
* emit(eventName, arg1, arg2, arg3...)：触发 eventName 事件，并且把参数 arg1, arg2, arg3... 传给事件处理函数。
* off(eventName, func)：停止监听某个事件。
使用例子：
```javascript
const emitter = new EventEmitter()
const sayHi = (name) => console.log(`Hello ${name}`)
const sayHi2 = (name) => console.log(`Good night, ${name}`)

emitter.on('hi', sayHi)
emitter.on('hi', sayHi2)
emitter.emit('hi', 'ScriptOJ')
// => Hello ScriptOJ
// => Good night, ScriptOJ

emitter.off('hi', sayHi)
emitter.emit('hi', 'ScriptOJ')
// => Good night, ScriptOJ

const emitter2 = new EventEmitter()
emitter2.on('hi', (name, age) => {
  console.log(`I am ${name}, and I am ${age} years old`)
})
emitter2.emit('hi', 'Jerry', 12)
// => I am Jerry, and I am 12 years old
```

## eventBus.js
给微信小程序用的。“借鉴”了[微信小程序跨页面通信解决思路](https://aotu.io/notes/2017/01/19/wxapp-event/)这篇文章
1. 先在app.js引入并挂载到`App({})`中
```javascript
const EventBus = require('./utils/eventBus.js');
App({
    ...
    eventBus: new EventBus(),
    ...
})
```

2. 在其他页面监听事件，触发事件
```javascript
// pageA
let app = getApp();
Page({
    onLoad: function() {
        // onLoad的时候监听事件
        let that = this;
        app.eventBus.on("abc", that.func, that);  // 事件名称， 事件函数，this作用域
    },
    onUnload: function () {
        // onUnload的时候停止监听事件
        let that = this;
        app.eventBus.off("abc")
    },
    func: function() {

    }
})
```

```javascript
// pageB
let app = getApp();
Page({
    func1: function(){
        app.eventBus.emit("abc", data); // 事件名称，数据
    }
})
```
