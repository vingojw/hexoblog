title: grunt笔记
date: 2014-07-05 20:26:18
tags:
---

 
grunt 笔记
[30分钟学会使用grunt打包前端代码](http://www.cnblogs.com/yexiaochai/p/3603389.html)
[grunt入门指南](http://www.36ria.com/6273)


首先是添加package.json
[http://gruntjs.cn/plugins/](http://gruntjs.cn/plugins/) 可以看到目前流行的插件



先来一个最简单的文件压缩例子： 创建一个demo/package.json文件
`package.json` 内容为
```
{
    "name": "demo",
    "version": "1.0.0",
    "devDependencies": {
        "grunt-contrib-uglify": "~0.2.0"
    }
}
```
然后npm install 下载模块

再创建一个文件 `src/hello-grunt.js` ，内容随意一段javascript

接着添加demo/Gruntfile.js
```
module.exports = function(grunt) {
 
    // 构建任务配置
    grunt.initConfig({
        //读取package.json的内容，形成个json数据
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            //文件头部输出信息
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            //具体任务配置
            build: {
                //源文件
                src: 'src/hello-grunt.js',
                //目标文件
                dest: 'build/hello-grunt-min.js'
            }
        }
    });
 
    // 加载指定插件任务
    grunt.loadNpmTasks('grunt-contrib-uglify');
 
    // 默认执行的任务
    grunt.registerTask('default', ['uglify']);
};
```
然后在此目录下运行 `grunt`
你会发现 src/hello-grunt.js 被压缩并移动到 build/hello-grunt-min.js 中


一般可能package.json是这样
```
{
  "name": "hexo-theme-landscape",
  "version": "0.0.1",
  "private": true,
  "devDependencies": {
    "grunt"               : "~0.4.2",
    "grunt-git"           : "~0.2.2",
    "grunt-contrib-copy"  : "~0.4.1"   //复制
	"grunt-contrib-coffee": "*",       //把 CoffeeScript 编译为 JavaScript
	"grunt-contrib-jshint": "~0.6.3",  //用 JSHint 检查文件  代码检查
    "grunt-contrib-uglify": "~0.2.4",  //压缩
    "grunt-contrib-concat": "*",       //合并
    "grunt-contrib-clean" : "*",       //文件清理工具
	"grunt-contrib-watch" : "*",       //监听文件修改
	"grunt-contrib-cssmin": "~0.5.0",  //压缩css
	"load-grunt-tasks"    : "~0.2.0",  //自动添加依赖 
 
  }
}
```

实时监听插件

grunt-contrib-watch非常重要，它能监测文件的修改，触发指定任务，比如less、coffee编译等。
先来看个最简单的demo：
watch: {
    options: {
        spawn: false
    },
    scripts: {
        files: [ '<%= pkg.version %>/**/*.coffee' ],
        tasks: [ 'coffee']
    }
}
监听源码目录下所有的.coffee文件的修改，触发coffee任务（编译coffee文件）。
spawn配置一般禁掉，设置为true时，运行任务会开启子进程处理，可能会出现不稳定的问题。
files：监听哪些文件的修改
tasks：文件修改后触发哪些任务
grunt.registerTask.('w',['watch:scripts'])
（PS:registerTask的name不能和task的名称重复，不然会出现死循环，比如这里不能grunt.registerTask(‘watch’]);）

小技巧
我觉得入门的时候，最烦人的就是package.json和Gruntfile.js的创建。所以grunt有一个grunt-init的工具，项目地址。通过npm install -g grunt-init安装之后，还需要创建~/.grunt-init目录。在此目录中通过git clone来加载模版。模版加载完成之后，就可以通过grunt-init TEMPLATE来创建了。

另一个小技巧，在项目目录下，先通过npm init创建默认的package.json文件，然后npm install。以后需要用到哪个模块的时候（比如grunt），使用npm install <module> --save-dev会自动把依赖关系写入到package.json中。--save-dev会自动维护package.json文件。

如果想安装制定版本的模块 可以 npm install 模块名@版本号 --save-dev

