const fieldSchema = {
  secondWatch: 'i',
}

const tagSchema = {
  _id: '*',
  courseId: '*',
  courseName: '*',
  courseItemId: '*',
  device: '*',
  gender: '*',
  birthday: '*',
  userEmail: '*',
  accessTime: '*',
}

const data = {
  measurement: 'study_time',
  fieldSchema,
  tagSchema,
}

export default data
