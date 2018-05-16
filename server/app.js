const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const json = require('koa-json')
const blogApiRouter = require('./blogApiRouter')

const app = new Koa()

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

app.use(blogApiRouter.routes())

app.use(async ctx => {
  ctx.body = '404'
})

// 内部错误处理
app.on('error', function(err, ctx) {
  console.log('server error', err, ctx)
})

app.listen(4000, () => console.log('Koa app listening on 4000'))
