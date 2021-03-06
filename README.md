# NodeJS开发简易博客系统
## 技术要点
- Node.js
- 数据库：MongoDB
- Web 开发框架：express 
- HTML 模板引擎：swig
- cookie-parser
- cookies
- body-parser
- 服务端只返回 JSON，并对返回数据进行统一规范处理
- 采用模块化开发，根据api调用不同路由
- 对每个页面进行分页处理，分页又分为依赖服务端分页，和前端分页
- 对HTML页面进行拆分，需要多次使用的页面单独取出作为模板
## 部署流程
- 下载安装 Node.js 和 MongoDB（测试数据库已导出为 JSON 文件，在 db 目录下）
- 使用 cmd 进入MongoDB 安装目录下的 bin 目录
- 输入 mongod --dbpath= 该项目所在目录下的 db 目录
- 例如：mongod --dbpath=C:\Users\tqz\WebstormProjects\Node\Blog\db
- 按下回车启动数据库服务
- 使用 cmd 进入项目所在目录，例如：C:\Users\tqz\WebstormProjects\Node\Blog，
  使用命令：node app.js 启动服务器，然后在浏览器访问：http://localhost:3000/
- 登陆用户名：admin  密码：123456
  
## 项目截图
- 前端首页

![kBlO2T.png](https://s2.ax1x.com/2019/02/14/kBlO2T.png)
- 后端首页

![kBlLGV.png](https://s2.ax1x.com/2019/02/14/kBlLGV.png)
- 项目后端功能演示

![kBlXxU.gif](https://s2.ax1x.com/2019/02/14/kBlXxU.gif)
- 项目启动演示

[github 对图片大小有限制，无法显示大图片，点击这里查看启动演示](https://s2.ax1x.com/2019/02/14/kBlvMF.gif)

