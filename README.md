# NodeJS开发简易博客系统（纯前端）
##### 十分简易的node.js web入门demo，代码清晰易懂，注释还多。仅供交流学习。
## 技术要点
- Node.js
- 数据库：MongoDB
- Web开发框架：express 
- HTML模板引擎：swig
- cookie-parser
- cookies
- body-parser
- 服务端只返回JSON，并对返回数据进行统一规范处理
- 采用模块化开发，根据api调用不同路由
- 对每个页面进行分页处理，分页又分为依赖服务端分页，和前端分页
- 对HTML页面进行拆分，需要多次使用的页面单独取出作为模板
## 部署流程
- 下载安装Node.js和MongoDB（测试数据库已导出为JSON文件，在db目录下）
- 使用cmd进入MongoDB安装目录下的bin目录
- 输入mongod --dbpath=该项目所在目录下的db目录
- 例如：mongod --dbpath=C:\Users\tqz\WebstormProjects\Node\Blog\db
- 按下回车启动数据库服务
- 使用cmd进入项目所在目录，例如：C:\Users\tqz\WebstormProjects\Node\Blog，
  使用命令：node app.js启动服务器，然后在浏览器访问：http://localhost:3000/
- 登陆用户名：admin  密码：123456
  
## 项目截图
- 前端首页

![kBlO2T.png](https://s2.ax1x.com/2019/02/14/kBlO2T.png)
- 后端首页

![kBlLGV.png](https://s2.ax1x.com/2019/02/14/kBlLGV.png)
- 项目后端功能演示

![kBlXxU.gif](https://s2.ax1x.com/2019/02/14/kBlXxU.gif)
- 项目启动演示

![kBlvMF.gif](https://s2.ax1x.com/2019/02/14/kBlvMF.gif)
