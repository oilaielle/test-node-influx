import { HttpMethod, route } from '@spksoft/koa-decorator'
import listStudyTime from '../../../domains/studyTime/list'
import createStudyTime from '../../../domains/studyTime/create'
import updateStudyTime from '../../../domains/studyTime/update'
import viewStudyTime from '../../../domains/studyTime/view'
import deleteStudyTime from '../../../domains/studyTime/delete'


@route('/v1/studyTime')
class StudyTime {
  @route('/', HttpMethod.GET)
  async listStudyTime(ctx) {    
    const { search, ...options } = ctx.query
    const resp = await listStudyTime(search, options)
    ctx.res.ok({ data: resp })
  }

  @route('/', HttpMethod.POST)
  async createStudyTime(ctx) {
    const { body } = ctx.request
    const resp = await createStudyTime(body)
    ctx.res.ok({ data: resp })
  }

  @route('/:id', HttpMethod.PUT)
  async updateStudyTime(ctx) {    
    const { id } = ctx.params
    const { body } = ctx.request
    const resp = await updateStudyTime(id, body)
    ctx.res.ok({ data: resp })
  }

  @route('/:id', HttpMethod.GET)
  async viewStudyTime(ctx) {
    const { id } = ctx.params
    const resp = await viewStudyTime(id)
    ctx.res.ok({ data: resp })
  }

  @route('/:id', HttpMethod.DELETE)
  async deleteStudyTime(ctx) {
    const { id } = ctx.params
    const resp = await deleteStudyTime(id)
    ctx.res.ok({ data: resp })
  }
}

export default StudyTime
