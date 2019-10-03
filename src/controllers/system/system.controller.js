import { HttpMethod, route } from '@spksoft/koa-decorator'

@route('/v1/system')
export default class SystemController {
  @route('/health', HttpMethod.GET)
  async health(ctx) {
    ctx.body = 'test'
  }
}
