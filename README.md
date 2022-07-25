# 0. 个人信息

姓名：章华鹏
学校：南京大学
专业：软件工程
年级：大二
QQ：1109815290

# 1. 代码架构

![image-20220720133042840](https://s2.loli.net/2022/07/20/nfzmvtPdbxIHkBr.png)

- __test\_\_ : 存放单元测试文件
- coverage：存放覆盖率导出报告
- dist：存放webpack打包文件
- example：存放演示页面的demo.html文件
- src：代码实现文件

# 2. 实现功能及演示

## 2.1 实现功能

- MVVM核心框架
- 插值表达式{{}}
- 单向绑定 v-text
- 双向绑定 v-model
- 事件触发 @

## 2.2 功能演示如图

- 页面初始状态

  ![image-20220720133602064](https://s2.loli.net/2022/07/20/aWtfVEhiKgesCqQ.png)

- 插值运算符 {{ }}演示

  ![image-20220720133958619](https://s2.loli.net/2022/07/20/SiX6JhPgNt1mRBZ.png)

  ![image-20220720134028397](https://s2.loli.net/2022/07/20/7vJf2lscEuGNdXL.png)

- 单向绑定 v-text演示：

  ![image-20220720133754595](https://s2.loli.net/2022/07/20/dOkEU2SJ5uZwCbs.png)

  ![image-20220720133814726](https://s2.loli.net/2022/07/20/5AuBRZfpFsOGiUw.png)

- 双向绑定 v-model演示：修改输入框内的内容，实际msg值也在改变，显示的msg值也改变

  ![image-20220720134110709](https://s2.loli.net/2022/07/20/u8Kgx7AUZrpTJVv.png)

- 事件触发 @演示：使用@click绑定点击事件，点击按钮后得到

  ![image-20220720134218145](https://s2.loli.net/2022/07/20/Ngsm7aUrGF1TJzv.png)

# 3. 使用方法

## 3.1 安装依赖

在终端中执行依赖安装命令：

```
npm install
```

## 3.2 webpack打包

在终端中执行打包命令：

```
npm run build
```

## 3.3 显示demo页面

在谷歌浏览器中打开/example/demo.html文件即可

# 4. 单元测试

## 4.1 进行单元测试并显示测试覆盖率报告

在终端中执行如下命令即可进行单元测试并显示测试覆盖率报告

```javascript
npm run test
```

下附测试覆盖率报告截图![image-20220720134907299](https://s2.loli.net/2022/07/20/NEuHFJG4eKb295Y.png)
