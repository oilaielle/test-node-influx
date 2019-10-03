import { HttpMethod, route } from '@spksoft/koa-decorator'
import listExample from '../../../domains/example/list'
import createExample from '../../../domains/example/create'
import updateExample from '../../../domains/example/update'
import viewExample from '../../../domains/example/view'
import deleteExample from '../../../domains/example/delete'
import mockDataExample from '../../../domains/example/mockData'


@route('/v1/example')
class Example {
  @route('/', HttpMethod.GET)
  async listExample(ctx) {    
    const { search, ...options } = ctx.query
    const resp = await listExample(search, options)
    ctx.res.ok({ data: resp })
  }

  @route('/', HttpMethod.POST)
  async createExample(ctx) {
    const { body } = ctx.request
    const resp = await createExample(body)
    ctx.res.ok({ data: resp })
  }

  @route('/:id', HttpMethod.PUT)
  async updateExample(ctx) {    
    const { id } = ctx.params
    const { body } = ctx.request
    const resp = await updateExample(id, body)
    ctx.res.ok({ data: resp })
  }

  @route('/:id', HttpMethod.GET)
  async viewExample(ctx) {
    const { id } = ctx.params
    const resp = await viewExample(id)
    ctx.res.ok({ data: resp })
  }

  @route('/:id', HttpMethod.DELETE)
  async deleteExample(ctx) {
    const { id } = ctx.params
    const resp = await deleteExample(id)
    ctx.res.ok({ data: resp })
  }

  @route('/mock/data', HttpMethod.GET)
  async mockDataExample(ctx) {    
    const { search, ...options } = ctx.query
    const resp = await mockDataExample(search, options)
    ctx.res.ok({ data: resp })
  }
}

export default Example
