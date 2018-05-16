const Router = require('koa-router')
const axios = require('axios')

// 语雀相关设置
// 请修改这里的配置
const YUQUE_USER_NAME = 'guozeling' // 在语雀上的用户名
const YUQUE_KNOWLEDGE_LIB = 'blog' // 在语雀上用来作为博客的知识库名称
const TOKEN = '' // 在语雀的设置个人资料里面可以查看到 设置token可以使得每小时调用接口次数上限增加到5000

const blogApiRouter = new Router()

blogApiRouter.prefix('/blog/api')

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

module.exports = blogApiRouter
