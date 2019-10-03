import 'babel-polyfill'

import path from 'path'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import cors from '@koa/cors'
import gracefulShutdown from 'http-graceful-shutdown'
import { load } from '@spksoft/koa-decorator'

import config from './config'
import logger from './libraries/logger/logger'
import log from './middlewares/log'
import requestId from './middlewares/requestId'
import errorHandler from './middlewares/errorHandler'
import responseHandler from './middlewares/responseHandler'


const app = new Koa()

app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb',
  }),
)
app.use(compress())
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id'],
  }),
)
app.use(requestId())
app.use(responseHandler())
app.on('error', errorHandler)
app.use(log({ logger }))


const apiRouter = load(path.resolve(__dirname, 'controllers'), '.controller.js')

app.use(apiRouter.routes())

const server = app.listen(config.port, () => {
  logger.info({ event: 'execute' }, `API server listening on ${config.port}`)
})

gracefulShutdown(server)

export default server
