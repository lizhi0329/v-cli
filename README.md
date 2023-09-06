## monorepo 

结构

```
.
├─apps  # 应用代码目录
│  ├─demo  # 测试包的地方
└─packages # 公共库
    ├─cli # 自定义脚手架
    ├─component # 公共组件
    └─hooks # 公共hooks
    └─utils # 公共utils
```


## 为什么采用 monorepo

解决了这两个多仓模式下的最大痛点
1. 任意一个模块发生修改，另一个模块能够立即反馈而不用走繁琐的发布和依赖更新流程；
2. 各个模块之间也能够充分复用配置、CI 流程的脚本；各个包的版本和互相之间的依赖关系得到集中管理。

常规web应用

```js
├── packages
|   ├── portal    # 门户网站
|   ├── mis       # 管理后台
|   ├── mobile    # 移动端网站
|   ├── docs      # 开发文档
|   ├── shared    # 公共库
|   ├── api       # API 层
|   ├── ...       # 监控埋码、Nodejs 服务、更多公共模块...
├── package.json
```


## package.json

#### name

name 是区分 npm 包的唯一标识。当一个 npm 仓库中的包被安装到本地，我们能通过名称引用，而不必写复杂的 node_modules/... 引入路径就是得益于此。
对于包名称我们还要了解一个概念叫坐标，具有相同坐标的包会被安装到同一子目录下。例如 @vue/reactivity 和 @vue/runtime-core 会被安装到 node_modules 目录的 @vue 目录下，vue 不属于任何坐标，就会被安装到 node_modules 根目录。

```
📦node_modules
 ┣ 📂@vue
 ┃ ┣ 📂reactivity
 ┃ ┗ 📂runtime-core
 ┣ 📂vue
```


## * 和 **
在文件路径模式匹配中，* 与 ** 有着不同的含义。

* 表示零个或多个字符，但不能跨越目录边界。例如，src/*.js 表示 src 目录下所有以 .js 结尾的文件，但不包括子目录下的文件。

** 表示零个或多个字符，可以匹配任意数量的目录或子目录。例如，src/**/*.js 表示 src 目录及其所有子目录下的所有以 .js 结尾的文件。

在使用路径模式匹配时，需要注意以下几点：

* 和 ** 只能出现在路径的末尾，不能出现在路径的中间或开头。

在一些工具中，如 Webpack，** 可以与 {} 一起使用，以匹配特定的目录层级。例如，src/{components,pages}/**/*.{js,jsx} 表示 src/components 和 src/pages 目录及其所有子目录下的所有以 .js 或 .jsx 结尾的文件。

在 Windows 系统下，路径中的分隔符通常为反斜杠 \，但是在正则表达式中需要使用双反斜杠 \\ 进行转义。因此，为了避免繁琐的转义，可以使用正斜杠 / 作为路径分隔符，因为在 Windows 和 Unix 系统下都可以正常使用。