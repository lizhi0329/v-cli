#! /usr/bin/env node


// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改
const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
// const path = require('path')
// const fs = require('fs')
// const ejs = require('ejs')

const program = require('commander')
program
  // 定义命令和参数
  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    require('./create.js')(name, options)
  })

program
   // 配置版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')


program
  // 监听 --help 执行
  .on('--help', () => {
    // 使用 figlet 绘制 Logo
    console.log('\r\n' + figlet.textSync('hello', {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
    }));
    // 新增说明信息
    console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`)
  })

// 解析用户执行命令传入参数
program.parse(process.argv);
// 配置 ui 命令
program
  .command('ui')
  .description('start add open roc-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })
// inquirer.prompt([
//   {
//     type: 'input', //type： input, number, confirm, list, checkbox ... 
//     name: 'name', // key 名
//     message: 'project name', // 提示信息
//     default: 'tiku-vue-temp' // 默认值
//   }
// ]).then(answers => {
//   const destUrl = path.join(__dirname, 'templates'); 
//   // process.cwd() 对应控制台所在目录
//   const cwdUrl = process.cwd();
//   fs.readdir(destUrl, (err, files) => {
//     if (err) throw err;
//     files.forEach((file) => {
//       // 使用 ejs 渲染对应的模版文件
//       // renderFile（模版文件地址，传入渲染数据）
//       ejs.renderFile(path.join(destUrl, file), answers).then(data => {
//         // 生成 ejs 处理后的模版文件
//         fs.writeFileSync(path.join(cwdUrl, file) , data)
//       })
//     })
//   })
// })