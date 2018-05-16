# yq-blog

使用 React 和 Koa 实现了一个博客系统，该项目依赖于 [语雀](https://yuque.com/) 提供的接口来实现。

演示地址: [http://guozeling.cn/](http://guozeling.cn/)

语雀开发者文档: [https://yuque.com/yuque/developer](https://yuque.com/yuque/developer)



##  安装方法

1. 在 [语雀](http://yuque.com/) 创建知识库，并设置权限为公开

2. 将该项目下载到本地

   ```Shell
   # 下载项目至本地
   git clone https://github.com/zaleGZL/yq-blog
   
   cd yq-blog
   
   # 安装依赖包
   yarn
   ```

3. 打开 `src` 目录下面的 `constants.js` 文件并修改相应的值

   ```Javascript
   // 修改以下信息
   
   export default {
     TITLE: "ZALE'S BLOGS", // 页面显示的标题
     SUB_TITLE: 'Front end & Node.js', // 页面显示的子标题
     YUQUE_USER_NAME: 'guozeling', // 在语雀上的用户名
     YUQUE_KNOWLEDGE_LIB: 'blog', // 在语雀上用来作为博客的知识库名称
     GITHUB: 'https://github.com/zaleGZL' // 自己的 github 地址
   }
   ```

4. 修改 `public` 目录下面的 `index.html`，可以修改页面的 title， 更换图标等等

5. 构建生产环境版本的代码

   ```Shell
   yarn run build
   ```

6. 打开 `server` 目录下的 `blogApiRouter` 文件并修改相应的值并设置 token

   ```javascript
   // 语雀相关设置
   // 请修改这里的配置
   const YUQUE_USER_NAME = 'guozeling' // 在语雀上的用户名
   const YUQUE_KNOWLEDGE_LIB = 'blog' // 在语雀上用来作为博客的知识库名称
   const TOKEN = '' // 在语雀的设置个人资料里查看 设置token可以使得每小时调用接口次数上限增加到5000
   ```

7. 本地运行

   ````shell
   node server/app.js
   ````

8. 打开 [http://127.0.0.1:4000/](http://127.0.0.1:4000/)

9. 接下来你可以把这个项目部署到你的服务器上

10. 使用 axios 在 Koa 上对 API 进行代理，并且对数据进行缓存

    ```Javascript
    // 由于接口调用数量有限制，所以使用缓存
    const blogListCache = {
      time: +new Date(),
      isValid: false,
      data: []
    }
    // 缓存时间(单位为毫秒)
    const CACHE_TIME = 30000
    
    // 代理获取博客列表信息
    blogApiRouter.get('/bloglist', async ctx => {
      const now = +new Date()
    
      // 可以使用缓存的资源
      if (
        now - blogListCache.time <= CACHE_TIME &&
        blogListCache.isValid === true
      ) {
        return (ctx.body = { data: blogListCache.data })
      }
    
      await axios
        .get(
          `https://yuque.com/api/v2/repos/${YUQUE_USER_NAME}/${YUQUE_KNOWLEDGE_LIB}/toc`,
          {
            headers: {
              'User-Agent': 'personalBlog',
              'X-Auth-Token': TOKEN
            }
          }
        )
        .then(response => {
          // 设置缓存信息
          blogListCache.time = +new Date()
          blogListCache.isValid = true
          blogListCache.data = response.data.data
    
          ctx.body = response.data
        })
        .catch(error => {
          console.log(error.message)
    
          ctx.response.status = 404
          ctx.response.body = {
            status: 'fail'
          }
        })
    })
    ```

    