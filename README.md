## 1. `yarn add swiper zepto`
## 2. 起先是想用js引入的方式直接写    
   还是练习一下webpack的使用以及ES6 import模块化加载的方式     
   `yarn add webpack webpack-cli`

## 3. 安装webpack的基本loader
`yarn add -D style-loader css-loader file-loader stylus stylus-loader url-loader`

## 4. 添加webpack.config.js并配置
```
const path = require('path')

module.exports ={
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules:[
            {test: /\.css$/, use: ['style-loader','css-loader']}
        ]
    }
}
```

## 5. 安装 webpack的插件 (html-webpack-plugin和clean-webpack-plugin)
`yarn add -D html-webpack-plugin clean-webpack-plugin`

```
在html中使用配置项的值
<%= htmlWebpackPlugin.options.title %>

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '首页',
            template: 'index.html'
        })
    ]
```

## 6. 使用ES6来写
+ 参考： [babel中文网](https://www.babeljs.cn/docs/setup/#installation)
+ `yarn add -D babel-core babel-loader`  --这种方式安装的bable-loader是8.x版本,而babel-core是6.x-对应的babel-loader需要@7版本
+ `npm uninstall babel-loader`  --先移除最新版，再安装@7版本
+ `yarn add -D babel-loader@7`       --上面安装的babel-core是6.x版本要使用7.x版本的babel-loader
+ 安装 preset
  + `yarn add -D babel-preset-env`
+ 配置webpack  module->rules
```
{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }

创建 .babelrc 配置文件
{
    "presets": ["env"]
}
```

## 7. 因为zepto不是commonjs规范, 在模块化使用时需要特殊处理
- 参考：https://blog.csdn.net/wzyxdwll/article/details/79492705
- https://blog.csdn.net/huang100qi/article/details/66971532

- `yarn add -D exports-loader script-loader`

webpack.config.js中需要配置如下 rules
```
{
    test: require.resolve('zepto'),
    loader: 'exports-loader?window.Zepto!script-loader'
},
{
    test:/node_modules\/zepto\/src\/\*.js/,
    loader: 'exports-loader?!script-loader'
}

plugins:
new webpack.ProvidePlugin({
    $: 'zepto',
    Zepto: 'zepto'
}),
```

使用之处：
```
import $ from 'zepto'
import zeptoEvent from 'zepto/src/event.js'
import zeptofx from 'zepto/src/fx.js'
import zeptofxMethod from 'zepto/src/fx_methods.js'
import zeptoTouch from 'zepto/src/touch.js'
```

## 8. package.json的scripts中添加打包脚本

`"build":"webpack --confg webpack.config.js"`

## 9. 配置webpack开发环境
+ webpack.config.js中开启sourcemap
  `devtool: 'inline-source-map',`
+ 安装 webpack-dev-server
  - `yarn add -D webpack-dev-servers`
  - webpack.config.js中加入devServer的配置  hot:true是启用hotmodulereplacement
    ```
    devServer: {
        contentBase: './dist',
        hot: true
    },
    ```
  - package.json中增加启动脚本    
    `"start": "webpack-dev-server --mode=development --open",`


