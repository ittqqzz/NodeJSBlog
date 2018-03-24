# NodeJS开发简易博客系统（纯前端）
## 技术要点
- Node.js
- 数据库：MongoDB
- Web开发框架：express 
- HTML模板引擎：swig
- cookie-parser
- cookies
- body-parser

## 部署流程
- 下载安装Node.js和MongoDB
- 使用cmd进入MongoDB安装目录下的bin目录
- 输入mongod --dbpath=该项目所在目录下的db目录
- 例如：mongod --dbpath=C:\Users\tqz\WebstormProjects\Node\Blog\db
- 按下回车启动数据库服务
- 使用cmd进入项目所在目录，例如：C:\Users\tqz\WebstormProjects\Node\Blog，
  使用命令：node app.js启动服务器，然后访问：http://localhost:3000/
