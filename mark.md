# HyperApp

HyperApp 是一个用于创建现代UI应用的1kb JavaScript库
### 1) 安装
>npm i hyperapp

### 2) 用法
嵌入到文档中.

>< script src="hyperapp.js">< /script >

试试看
```
const { app, html } = hyperapp

app({
    model: "Hi.",
    view: model => html`<h1>${model}</h1>`
})
```
在ES6中.

>import { app, html } from "hyperapp"

CommonJS中.

>const { app, html } = require("hyperapp")

Browserify

>browserify index.js -t hyperxify -g uglifyify | uglifyjs > bundle.js

Webpack

>webpack -p --module-bind "js=babel?presets[]=react,presets[]=es2015 index.js bundle.js

### 3) 示例

* Hello world
```
app({
    model: "Hi.",
    view: model => html`<h1>${model}</h1>`
})
```

* Counter
```
app({
    model: 0,
    update: {
        add: model => model + 1,
        sub: model => model - 1
    },
    view: (model, msg) => html`
        <div>
            <button onclick=${msg.add}>+</button>
            <h1>${model}</h1>
            <button onclick=${msg.sub} disabled=${model <= 0}>-</button>
        </div>`
})
```

* Inout
```{
app({
    model: "",
    update: {
        text: (_, value) => value
    },
    view: (model, msg) => html`
        <div>
            <h1>Hi${model ? " " + model : ""}.</h1>
            <input oninput=${e => msg.text(e.target.value)} />
        </div>`
})
}
```

### 4) 文件:


* ###  html:
使用html组成HTML元素
>const hello = html`<h1>Hello World!</h1>`

    HTML是一个带标记的模板字符串。如果你熟悉的反应，这就像JSX，但没有打破JavaScript。

* ###  app:
使用应用程序引导你的应用程序。

```
app({
    model, update, view, subs, effects, hooks, root
})
```
所有属性都是可选的。<br> 




* model


表示应用程序整个状态的值或对象。

要更新模型，您需要发送描述模型应该如何更改的操作。
* update


由称为减速器的函数组成的物体。这些是您发送的更新模型的一种行为。

减速器描述了如何通过返回一个新的模型或模型的一部分来改变模型。 
```
const update = {
    increment: model => model + 1,
    decrement: model => model - 1
}
```
如果一个减速器返回一个模型的一部分，则该部分将与当前模型合并。

在视图、效果或订阅中调用减速器。

减速器有签名（模型，数据），在:

模型是当前的模型，

数据是随动作一起发送的数据。
* view

视图是一个使用HTML函数返回HTML的函数。

该视图有一个签名（模型、味精、参数），其中
模型是当前的模型，
MSG是用于发送操作的对象（调用减速器或引发效果）和参数是路径参数。

使用MSG发送操作。
>msg.action(data)

* effects

影响会导致副作用，通常是异步的，比如写入数据库或向服务器发送请求。他们也可以分派其他行动。

效果有签名（模型，MSG，错误），在：

模型是当前的模型，

MSG是一个用来调用减速器/因果效应的对象（参见视图），
错误是一个函数，如果出错了，可以调用一个错误。
* subs

订阅是在DOM就绪时运行一次的函数。使用订阅来注册全局事件，如鼠标或键盘侦听器。

虽然减速器和效果是您造成的，但您不能直接调用订阅。

订阅有签名（模型、消息、错误）。
* hooks

hooks是应用程序生命周期中某些事件调用的函数。您可以使用钩子来实现中间件、日志记录器等。
* root

根是HTML元素，它将作为应用程序的容器。如果没有给出，div元素追加到document.body。

### 5) Routing:
不是将视图作为单个函数，而是声明具有多个视图的对象，并使用路由路径作为键。
```
app({
    view: {
        "*": (model, msg) => {},
        "/": (model, msg) => {},
        "/:slug": (model, msg, params) => {}
    }
})
```



/索引路由，当没有其他路由匹配时也使用

/：a/：b/：c匹配路由使用正则表达式[就] +存储每个捕获组三元件的参数对象，并传递给视图函数。

路由路径语法基于与Express中相同的语法。 



* setlocation

更新地址栏相对位置和呈现一个不同的视图，使用味精。setlocation（路径）。 



* href

作为奖励，我们拦截所有< a href =“路径”>…</a>点击和电话信息。setlocation（“路径”）你。如果您想退出此选项，请将自定义属性数据无路由添加到应以不同方式处理的任何锚元素中。 

     <a data-no-routing>...</a>

```
app({
    view: {
      "/": (model, msg) => html`
        <div>
          <h1>Home</h1>
          <a href="/about">About</a>
        </div>`,
      "/about": (model, msg) => html`
        <div>
          <h1>About</h1>
          <a href="/">Home</a>
        </div>`
    }
})
```
### 6) 参考:
>http://www.ctolib.com/hyperapp.html<br>
>http://www.opendigg.com/p/hyperapp

### 7) 自我评估:

|原创性       |技术难度         |工作量           |
| -------------|:--------------:|:--------------:|
|3|3|4|

