const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const json = require('koa-json')
const axios = require('axios')
const Router = require('koa-router')

const app = new Koa()

// 语雀相关设置
const YUQUE_USER_NAME = 'guozeling' // 在语雀上的用户名
const YUQUE_KNOWLEDGE_LIB = 'blog' // 在语雀上用来作为博客的知识库名称
const TOKEN = '' // 在语雀的设置个人资料里面可以查看到 设置token可以使得每小时调用接口次数上限增加到2000

// 静态文件中间件
app.use(
  serve(path.resolve(__dirname, '../build'), {
    maxage: 7 * 24 * 60 * 60 * 1000
  })
)

// 返回JSON结构的数据
app.use(
  json({
    pretty: false
  })
)

var blogRouter = new Router()

blogRouter.prefix('/blog/api')

// 代理获取博客列表信息
blogRouter.get('/bloglist', async ctx => {
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

app.use(blogRouter.routes())

app.use(async ctx => {
  ctx.body = '404'
})

// 内部错误处理
app.on('error', function(err, ctx) {
  console.log('server error', err, ctx)
})

app.listen(4000, () => console.log('Koa app listening on 4000'))
